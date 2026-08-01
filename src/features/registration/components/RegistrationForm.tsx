import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Stepper, Step, StepLabel, Button, Alert, Paper, Typography, Tooltip,
} from '@mui/material';
import { FormProvider, useForm, type FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { RegistrationFormValues } from '@/types/registration';
import { useRegistrationStatus } from '@/features/registration/hooks';
import { createRegistrationSchema } from '@/features/registration/model/schema';
import { piccColors, gradientMesh } from '@/theme/palette';
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

const createMember = (role: 'leader' | 'member') => ({
  role,
  fullName: '',
  studentId: '',
  major: '',
  email: '',
  phone: '',
});

const createMembers = (teamSize: number) => Array.from(
  { length: teamSize },
  (_, index) => createMember(index === 0 ? 'leader' : 'member'),
);

const normalizeDraft = (
  draft: Partial<RegistrationFormValues> | null,
  teamMin: number,
  teamMax: number,
): Partial<RegistrationFormValues> | null => {
  if (!draft) return null;

  const requestedSize = typeof draft.teamSize === 'number' ? draft.teamSize : teamMax;
  const teamSize = Math.min(Math.max(requestedSize, teamMin), teamMax);
  const draftMembers = Array.isArray(draft.members) ? draft.members.slice(0, teamSize) : [];
  const members = Array.from({ length: teamSize }, (_, index) => ({
    ...(draftMembers[index] ?? createMember(index === 0 ? 'leader' : 'member')),
    role: index === 0 ? 'leader' as const : 'member' as const,
  }));

  return { ...draft, teamSize, members };
};

export const RegistrationForm = () => {
  const { status, config } = useRegistrationStatus();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  const teamMin = config.teamSize.min;
  const teamMax = config.teamSize.max ?? 4;
  const draft = normalizeDraft(loadDraft(), teamMin, teamMax);

  const defaultValues: RegistrationFormValues = {
    teamName: '',
    teamSize: teamMax,
    challengeCategories: [],
    previousCompetitions: '',
    featuredProject: '',
    expectations: '',
    companyExperience: 'none',
    members: createMembers(teamMax),
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
    teamMin,
    teamMax,
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

  const { handleSubmit, trigger, getValues, reset, setValue } = methods;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const subscription = methods.watch((values, { name }) => {
      if (name !== 'teamSize') return;

      const selectedSize = typeof values.teamSize === 'number' ? values.teamSize : teamMin;
      const normalizedSize = Math.min(Math.max(selectedSize, teamMin), teamMax);
      const currentMembers = Array.isArray(values.members) ? values.members : [];
      const members = Array.from({ length: normalizedSize }, (_, index) => ({
        ...(currentMembers[index] ?? createMember(index === 0 ? 'leader' : 'member')),
        role: index === 0 ? 'leader' as const : 'member' as const,
      }));

      if (selectedSize !== normalizedSize) {
        setValue('teamSize', normalizedSize, { shouldValidate: true });
      }
      setValue('members', members, { shouldValidate: true });
    });
    return () => subscription.unsubscribe();
  }, [methods, setValue, teamMin, teamMax]);

  useEffect(() => {
    const subscription = methods.watch((values) => {
      saveDraft(values as RegistrationFormValues);
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const handleNext = useCallback(async () => {
    const fieldsToValidate: FieldPath<RegistrationFormValues>[] = activeStep === 0
      ? [
          'teamName', 'teamSize', 'challengeCategories', 'featuredProject',
          'expectations', 'companyExperience',
          'members.0.email', 'members.0.phone', 'members.0.fullName',
          'members.0.studentId', 'members.0.major',
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
        setSubmitError('Cổng đăng ký chưa mở (Mở chính thức từ 01/08/2026).');
        return;
      }
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const { submitRegistration } = await import('@/services/registrations/api');
        const result = await submitRegistration(
          { ...data, companyExperience: data.companyExperience },
          idempotencyKey,
        );
        if (result.success) {
          clearDraft();
          navigate('/dang-ky/thanh-cong', { replace: true });
        }
      } catch (err: unknown) {
        const apiErr = (err as { error?: { code?: string; fieldErrors?: Record<string, string>; message?: string } })?.error ||
          (err as { code?: string; fieldErrors?: Record<string, string>; message?: string });
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
          setSubmitError('Hệ thống tiếp nhận đăng ký trực tuyến đang được cấu hình. Vui lòng thử lại sau.');
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
      case 0: return <FormStep1 teamMin={teamMin} teamMax={teamMax} />;
      case 1: return <FormStep2 teamMin={teamMin} teamMax={teamMax} />;
      case 2: return <FormStep3 onEdit={(step) => setActiveStep(step)} />;
      default: return null;
    }
  };

  const isFormOpen = status === 'open';

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.25, sm: 4, md: 6 },
        borderRadius: 6,
        border: '1px solid rgba(226, 232, 240, 0.9)',
        boxShadow: '0 20px 60px rgba(23, 59, 102, 0.12)',
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Box sx={{ display: { xs: 'block', sm: 'none' }, mb: 4 }}>
        <Typography sx={{ color: piccColors.ptitRed, fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Bước {activeStep + 1}/3
        </Typography>
        <Typography sx={{ color: piccColors.ptitNavy, fontSize: '1.05rem', fontWeight: 800, mt: 0.25 }}>
          {STEPS[activeStep]}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.75, mt: 1.5 }}>
          {STEPS.map((label, index) => (
            <Box key={label} sx={{ height: 5, flex: 1, borderRadius: 999, bgcolor: index <= activeStep ? piccColors.ptitRed : piccColors.neutral[200] }} />
          ))}
        </Box>
      </Box>

      <Stepper activeStep={activeStep} sx={{ display: { xs: 'none', sm: 'flex' }, mb: 6 }}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  fontSize: 28,
                  '&.Mui-active': { color: piccColors.ptitRed },
                  '&.Mui-completed': { color: piccColors.emerald[600] },
                },
              }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {submitError && (
            <Alert severity="error" sx={{ mb: 4, borderRadius: 3, fontWeight: 600 }}>
              {submitError}
            </Alert>
          )}

          {renderStepContent()}

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: 2,
              mt: 6,
              pt: 4,
              borderTop: '1px solid rgba(226,232,240,0.8)',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, order: { xs: 2, sm: 1 } }}>
              {activeStep > 0 && (
                <Button
                  onClick={handleBack}
                  variant="outlined"
                  disabled={isSubmitting}
                  sx={{
                    borderRadius: 999,
                    px: 3,
                    py: 1.2,
                    fontWeight: 700,
                  }}
                >
                  Quay lại
                </Button>
              )}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', sm: 'row' }, gap: 1.5, alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'flex-end', order: { xs: 1, sm: 2 } }}>
              <Button
                onClick={handleClearDraft}
                variant="text"
                color="inherit"
                size="small"
                sx={{ color: piccColors.neutral[500], fontSize: '0.825rem' }}
              >
                Xóa dữ liệu đã nhập
              </Button>
              {activeStep < 2 ? (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    sx={{
                      borderRadius: 999,
                      width: { xs: '100%', sm: 'auto' },
                      px: 4,
                      py: 1.2,
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      background: gradientMesh.ptitCta,
                      boxShadow: '0 4px 14px rgba(188, 38, 38, 0.3)',
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(188, 38, 38, 0.4)',
                      },
                    }}
                  >
                  Tiếp tục
                </Button>
              ) : isFormOpen ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      borderRadius: 999,
                      width: { xs: '100%', sm: 'auto' },
                      px: 4.5,
                      py: 1.3,
                      fontWeight: 800,
                      fontSize: '1rem',
                      background: gradientMesh.ptitCta,
                      boxShadow: '0 6px 20px rgba(188, 38, 38, 0.35)',
                      '&:hover': {
                        boxShadow: '0 8px 24px rgba(188, 38, 38, 0.5)',
                      },
                    }}
                  >
                  {isSubmitting ? 'Đang gửi hồ sơ...' : 'Gửi Đăng Ký Tranh Tài'}
                </Button>
              ) : (
                <Tooltip title="Cổng đăng ký chưa chính thức mở (Mở từ 01/08/2026)">
                  <span>
                    <Button
                      variant="contained"
                      disabled
                      sx={{
                        borderRadius: 999,
                        px: 4.5,
                        py: 1.3,
                        fontWeight: 800,
                        fontSize: '0.95rem',
                      }}
                    >
                      Sắp mở đăng ký
                    </Button>
                  </span>
                </Tooltip>
              )}
            </Box>
          </Box>
        </Box>
      </FormProvider>
    </Paper>
  );
};