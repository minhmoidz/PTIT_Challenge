import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Alert,
  Paper,
} from '@mui/material';
import {
  FormProvider,
  useForm,
  type FieldPath,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { RegistrationFormValues } from '@/types/registration';
import { useRegistrationStatus } from '@/features/registration/hooks';
import { createRegistrationSchema } from '@/features/registration/model/schema';
import { piccColors } from '@/theme/palette';
import { FormStep1 } from './FormStep1';
import { FormStep2 } from './FormStep2';
import { FormStep3 } from './FormStep3';

const STEPS = ['Thông tin đội', 'Thành viên', 'Kiểm tra và cam kết'];
const STORAGE_KEY = 'picc-registration-draft';
const DRAFT_TTL = 12 * 60 * 60 * 1000;

const loadDraft = (): Partial<RegistrationFormValues> | null => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const envelope = JSON.parse(raw);
    if (envelope.version !== 1) return null;
    if (Date.now() > new Date(envelope.expiresAt).getTime()) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return envelope.values;
  } catch {
    return null;
  }
};

const saveDraft = (values: Partial<RegistrationFormValues>) => {
  try {
    const safeValues = { ...values };
    delete safeValues.honeypot;
    const envelope = {
      version: 1 as const,
      savedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + DRAFT_TTL).toISOString(),
      values: safeValues,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
  } catch {
    // sessionStorage unavailable
  }
};

const clearDraft = () => {
  sessionStorage.removeItem(STORAGE_KEY);
};

export const RegistrationForm = () => {
  const { status, config } = useRegistrationStatus();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  const draft = loadDraft();

  const defaultValues: RegistrationFormValues = {
    teamName: '',
    teamSize: config.teamSize.max ?? 5,
    challengeCategories: [],
    previousCompetitions: '',
    featuredProject: '',
    expectations: '',
    companyExperience: 'none',
    members: [
      {
        role: 'leader',
        fullName: '',
        studentId: '',
        major: '',
        email: '',
        phone: '',
      },
      {
        role: 'member',
        fullName: '',
        studentId: '',
        major: '',
        email: '',
        phone: '',
      },
      {
        role: 'member',
        fullName: '',
        studentId: '',
        major: '',
        email: '',
        phone: '',
      },
    ],
    commitments: {
      truthfulInformation: false,
      mediaConsent: false,
      rulesAccepted: false,
      privacyAcknowledged: false,
    },
    honeypot: '',
    formStartedAt: new Date().toISOString(),
  };

  const schema = createRegistrationSchema({
    teamMin: config.teamSize.min,
    teamMax: config.teamSize.max ?? 5,
    challengeMode: config.challengeSelection.mode,
    maxSelections: config.challengeSelection.maxSelections,
  });

  const methods = useForm<RegistrationFormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      ...defaultValues,
      ...(draft ? { ...draft, honeypot: '' } : {}),
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, trigger, getValues, reset } = methods;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const subscription = methods.watch((values) => {
      saveDraft(values as RegistrationFormValues);
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const handleNext = useCallback(async () => {
    const fieldsToValidate: FieldPath<RegistrationFormValues>[] = activeStep === 0
      ? [
          'teamName',
          'teamSize',
          'challengeCategories',
          'featuredProject',
          'expectations',
          'companyExperience',
          'members.0.email',
          'members.0.phone',
          'members.0.fullName',
          'members.0.studentId',
          'members.0.major',
        ]
      : activeStep === 1
        ? (() => {
            const fields: FieldPath<RegistrationFormValues>[] = [];
            const size = getValues('teamSize');
            for (let i = 1; i < size; i++) {
              fields.push(`members.${i}.fullName` as FieldPath<RegistrationFormValues>);
              fields.push(`members.${i}.studentId` as FieldPath<RegistrationFormValues>);
              fields.push(`members.${i}.major` as FieldPath<RegistrationFormValues>);
              fields.push(`members.${i}.email` as FieldPath<RegistrationFormValues>);
              fields.push(`members.${i}.phone` as FieldPath<RegistrationFormValues>);
            }
            return fields;
          })()
        : [];

    const valid = await trigger(fieldsToValidate);
    if (valid) {
      setActiveStep((prev) => Math.min(prev + 1, 2));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeStep, trigger, getValues]);

  const handleBack = useCallback(() => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const onSubmit = useCallback(
    async (data: RegistrationFormValues) => {
      if (status !== 'open') {
        setSubmitError('Đăng ký hiện không mở.');
        return;
      }

      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const { submitRegistration } = await import('@/services/registrations/api');
        const result = await submitRegistration(
          {
            ...data,
            companyExperience: data.companyExperience,
          },
          idempotencyKey,
        );
        if (result.success) {
          clearDraft();
          navigate('/dang-ky/thanh-cong', { replace: true });
        }
      } catch (err: unknown) {
        const apiErr = (err as { error?: { code?: string; fieldErrors?: Record<string, string>; message?: string } })?.error || (err as { code?: string; fieldErrors?: Record<string, string>; message?: string });
        if (apiErr?.code === 'REGISTRATION_CLOSED') {
          setSubmitError('Đăng ký đã kết thúc. Vui lòng liên hệ Ban Tổ chức.');
        } else if (apiErr?.code === 'VALIDATION_ERROR') {
          const fieldErrors = apiErr.fieldErrors;
          if (fieldErrors && typeof fieldErrors === 'object') {
            Object.entries(fieldErrors).forEach(([field, message]) => {
              methods.setError(field as FieldPath<RegistrationFormValues>, { message: message as string });
            });
            setSubmitError('Vui lòng kiểm tra lại các trường có lỗi.');
          } else {
            setSubmitError(apiErr.message || 'Dữ liệu chưa hợp lệ.');
          }
        } else if (apiErr?.code === 'DUPLICATE_REGISTRATION') {
          setSubmitError('Đội của bạn đã đăng ký trước đó. Vui lòng liên hệ BTC nếu cần hỗ trợ.');
        } else if (apiErr?.code === 'RATE_LIMITED') {
          setSubmitError('Vui lòng đợi một lát trước khi thử lại.');
        } else {
          setSubmitError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [status, idempotencyKey, navigate, methods],
  );

  const handleClearDraft = () => {
    clearDraft();
    reset(defaultValues);
    setActiveStep(0);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <FormStep1 />;
      case 1:
        return <FormStep2 />;
      case 2:
        return <FormStep3 onEdit={(step) => setActiveStep(step)} />;
      default:
        return null;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 5 },
        borderRadius: 6,
        border: `1.5px solid ${piccColors.sky[200]}`,
        boxShadow: '0 20px 48px rgba(23,59,102,0.08)',
        bgcolor: '#FFFFFF',
      }}
    >
      <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  '&.Mui-active': { color: piccColors.blue[700] },
                  '&.Mui-completed': { color: piccColors.success },
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {submitError}
            </Alert>
          )}

          {renderStepContent()}

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column-reverse', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: 2,
              mt: 5,
              pt: 3,
              borderTop: `1px solid ${piccColors.sky[200]}`,
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              {activeStep > 0 && (
                <Button onClick={handleBack} variant="outlined" disabled={isSubmitting}>
                  Quay lại
                </Button>
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
              <Button onClick={handleClearDraft} variant="text" color="inherit" size="small">
                Xóa dữ liệu đã nhập
              </Button>
              {activeStep < 2 ? (
                <Button onClick={handleNext} variant="contained">
                  Tiếp tục
                </Button>
              ) : (
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  {isSubmitting ? 'Đang gửi...' : 'Gửi đăng ký'}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </FormProvider>
    </Paper>
  );
};
