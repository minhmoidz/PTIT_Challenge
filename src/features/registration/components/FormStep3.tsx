import { Box, Typography, Grid, Checkbox, FormControlLabel, FormGroup, Button, Divider } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { RegistrationFormValues } from '@/types/registration';

interface Props {
  onEdit: (step: number) => void;
}

const SectionReview = ({
  title,
  children,
  onEdit,
}: {
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
}) => (
  <Box sx={{ mb: 3 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
      <Typography variant="body1" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      {onEdit && (
        <Button size="small" onClick={onEdit} variant="text">
          Chỉnh sửa
        </Button>
      )}
    </Box>
    {children}
    <Divider sx={{ mt: 2 }} />
  </Box>
);

const FieldReview = ({ label, value }: { label: string; value?: string | number | boolean }) => (
  <Grid item xs={12} sm={6}>
    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 500 }}>
      {value ?? '—'}
    </Typography>
  </Grid>
);

export const FormStep3 = ({ onEdit }: Props) => {
  const { getValues, register, formState: { errors } } = useFormContext<RegistrationFormValues>();
  const values = getValues();

  return (
    <Box>
      <SectionReview title="Thông tin đội" onEdit={() => onEdit(0)}>
        <Grid container spacing={1}>
          <FieldReview label="Tên đội" value={values.teamName} />
          <FieldReview label="Số thành viên" value={values.teamSize} />
          <FieldReview label="Nhóm bài toán" value={values.challengeCategories?.join(', ')} />
          {values.otherChallengeCategory && (
            <FieldReview label="Nhóm khác" value={values.otherChallengeCategory} />
          )}
          <FieldReview label="Kinh nghiệm" value={
            values.companyExperience === 'none'
              ? 'Chưa từng tham gia'
              : values.companyExperience === 'previous'
                ? 'Đã tham gia cuộc thi tương tự'
                : 'Đang tham gia dự án/dự thi khác'
          } />
        </Grid>
      </SectionReview>

      <SectionReview title="Đội trưởng" onEdit={() => onEdit(0)}>
        <Grid container spacing={1}>
          <FieldReview label="Họ tên" value={values.members?.[0]?.fullName} />
          <FieldReview label="Mã SV" value={values.members?.[0]?.studentId} />
          <FieldReview label="Ngành" value={values.members?.[0]?.major} />
          <FieldReview label="Email" value={values.members?.[0]?.email} />
          <FieldReview label="SĐT" value={values.members?.[0]?.phone} />
        </Grid>
      </SectionReview>

      {values.members?.slice(1).map((member, i) => (
        <SectionReview key={i} title={`Thành viên ${i + 2}`} onEdit={() => onEdit(1)}>
          <Grid container spacing={1}>
            <FieldReview label="Họ tên" value={member.fullName} />
            <FieldReview label="Mã SV" value={member.studentId} />
            <FieldReview label="Ngành" value={member.major} />
            <FieldReview label="Email" value={member.email} />
            <FieldReview label="SĐT" value={member.phone} />
          </Grid>
        </SectionReview>
      ))}

      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" sx={{ fontWeight: 700, mb: 2 }}>
          Cam kết
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                {...register('commitments.truthfulInformation')}
                color="primary"
              />
            }
            label="Tôi cam kết thông tin đăng ký là chính xác và trung thực."
          />
          <FormControlLabel
            control={
              <Checkbox
                {...register('commitments.mediaConsent')}
                color="primary"
              />
            }
            label="Tôi đồng ý cho phép BTC sử dụng hình ảnh và thông tin đội thi cho mục đích truyền thông."
          />
          <FormControlLabel
            control={
              <Checkbox
                {...register('commitments.rulesAccepted')}
                color="primary"
              />
            }
            label="Đội thi đã đọc và chấp nhận thể lệ cuộc thi."
          />
          <FormControlLabel
            control={
              <Checkbox
                {...register('commitments.privacyAcknowledged')}
                color="primary"
              />
            }
            label="Tôi đã đọc và đồng ý với chính sách bảo mật thông tin."
          />
        </FormGroup>
        {errors.commitments && (
          <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
            Vui lòng hoàn thành tất cả cam kết để gửi đăng ký.
          </Typography>
        )}
      </Box>

      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 3 }}>
        Bằng cách gửi đăng ký, bạn xác nhận đội thi đồng ý với tất cả điều khoản và điều kiện của cuộc thi.
        Thông tin cá nhân sẽ được bảo mật theo chính sách của BTC.
      </Typography>
    </Box>
  );
};
