import { Box, Typography, Grid, Checkbox, FormControlLabel, FormGroup, Button, Divider, Alert } from '@mui/material';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import { useFormContext } from 'react-hook-form';
import type { RegistrationFormValues } from '@/types/registration';
import { competitionData } from '@/data/competition';

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
      <Typography variant="body1" sx={{ fontWeight: 700, color: '#163A67' }}>
        {title}
      </Typography>
      {onEdit && (
        <Button size="small" onClick={onEdit} variant="text" sx={{ fontWeight: 700 }}>
          Chỉnh sửa
        </Button>
      )}
    </Box>
    {children}
    <Divider sx={{ mt: 2 }} />
  </Box>
);

const FieldReview = ({ label, value }: { label: string; value?: string | number | boolean }) => (
  <Grid size={{ xs: 12, sm: 6 }}>
    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E293B' }}>
      {value ?? '—'}
    </Typography>
  </Grid>
);

export const FormStep3 = ({ onEdit }: Props) => {
  const { getValues, register, formState: { errors } } = useFormContext<RegistrationFormValues>();
  const values = getValues();

  return (
    <Box>
      <Typography variant="h3" component="h3" sx={{ fontSize: '1.15rem', fontWeight: 800, color: '#163A67', mb: 3 }}>
        Phần III — Xác nhận &amp; Cam kết
      </Typography>

      <SectionReview title="Thông tin đội thi" onEdit={() => onEdit(0)}>
        <Grid container spacing={1.5}>
          <FieldReview label="Tên đội thi" value={values.teamName} />
          <FieldReview label="Số thành viên" value={`${values.teamSize} người`} />
          <FieldReview label="Nhóm bài toán" value={values.challengeCategories?.join(', ')} />
          {values.otherChallengeCategory && (
            <FieldReview label="Nhóm bài toán khác" value={values.otherChallengeCategory} />
          )}
          <FieldReview
            label="Kinh nghiệm cuộc thi"
            value={
              values.companyExperience === 'none'
                ? 'Chưa từng tham gia'
                : values.companyExperience === 'previous'
                  ? 'Đã tham gia cuộc thi tương tự'
                  : 'Đang tham gia dự án/dự thi khác'
            }
          />
        </Grid>
      </SectionReview>

      <SectionReview title="Thông tin Đội trưởng" onEdit={() => onEdit(0)}>
        <Grid container spacing={1.5}>
          <FieldReview label="Họ tên" value={values.members?.[0]?.fullName} />
          <FieldReview label="Mã sinh viên" value={values.members?.[0]?.studentId} />
          <FieldReview label="Ngành học" value={values.members?.[0]?.major} />
          <FieldReview label="Email" value={values.members?.[0]?.email} />
          <FieldReview label="Số điện thoại" value={values.members?.[0]?.phone} />
        </Grid>
      </SectionReview>

      {values.members?.slice(1, values.teamSize).map((member, i) => (
        <SectionReview key={i} title={`Thành viên ${i + 2}`} onEdit={() => onEdit(1)}>
          <Grid container spacing={1.5}>
            <FieldReview label="Họ tên" value={member.fullName} />
            <FieldReview label="Mã sinh viên" value={member.studentId} />
            <FieldReview label="Ngành học" value={member.major} />
            <FieldReview label="Email" value={member.email} />
            <FieldReview label="Số điện thoại" value={member.phone} />
          </Grid>
        </SectionReview>
      ))}

      {/* ── Mandatory Commitments ── */}
      <Box sx={{ mt: 3.5, p: 2.5, borderRadius: 3, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
        <Typography variant="body1" sx={{ fontWeight: 800, color: '#163A67', mb: 2 }}>
          Biểu Mẫu Cam Kết Đội Thi *
        </Typography>

        <FormGroup sx={{ gap: 1.5 }}>
          <FormControlLabel
            control={
              <Checkbox
                {...register('commitments.truthfulInformation')}
                color="primary"
              />
            }
            label={
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                {competitionData.form.commitment.checkboxes[0]}
              </Typography>
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                {...register('commitments.mediaConsent')}
                color="primary"
              />
            }
            label={
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                {competitionData.form.commitment.checkboxes[1]}
              </Typography>
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                {...register('commitments.rulesAccepted')}
                color="primary"
              />
            }
            label={
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                {competitionData.form.commitment.checkboxes[2]}
              </Typography>
            }
          />
        </FormGroup>

        {errors.commitments && (
          <Typography variant="caption" color="error" sx={{ mt: 1.5, display: 'block', fontWeight: 700 }}>
            ⚠️ Vui lòng đánh dấu hoàn thành cả 03 cam kết bắt buộc để gửi biểu mẫu đăng ký.
          </Typography>
        )}
      </Box>

      {/* ── Granular Public Consent Section (Optional choices for public profile) ── */}
      <Box sx={{ mt: 3, p: 2.5, borderRadius: 3, bgcolor: 'rgba(234, 242, 255, 0.7)', border: '1px solid rgba(57, 124, 232, 0.25)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <PublicRoundedIcon sx={{ color: '#397CE8', fontSize: 20 }} />
          <Typography variant="body1" sx={{ fontWeight: 800, color: '#163A67' }}>
            Quyền Hiển Thị Công Khai Hồ Sơ Đội Thi
          </Typography>
        </Box>

        <Typography sx={{ fontSize: '0.8rem', color: '#475569', mb: 2, lineHeight: 1.5 }}>
          Lựa chọn thông tin đội đồng ý xuất bản trên trang danh sách công khai <strong>/doi-thi</strong>. Ban Tổ chức sẽ xác minh và phê duyệt trước khi công bố.
        </Typography>

        <FormGroup sx={{ gap: 1.25 }}>
          <FormControlLabel
            control={<Checkbox {...register('publicConsent.shareTeamProfile')} color="primary" defaultChecked={false} />}
            label={
              <Typography sx={{ fontSize: '0.825rem', fontWeight: 600, color: '#334155' }}>
                Chúng tôi đồng ý công khai tên đội, nhóm bài toán, quy mô đội và trạng thái cuộc thi trên website PICC 2026.
              </Typography>
            }
          />

          <FormControlLabel
            control={<Checkbox {...register('publicConsent.shareMemberNames')} color="primary" defaultChecked={false} />}
            label={
              <Typography sx={{ fontSize: '0.825rem', fontWeight: 600, color: '#334155' }}>
                Chúng tôi đồng ý công khai tên các thành viên trong hồ sơ đội thi.
              </Typography>
            }
          />

          <FormControlLabel
            control={<Checkbox {...register('publicConsent.shareLogoOrPhotos')} color="primary" defaultChecked={false} />}
            label={
              <Typography sx={{ fontSize: '0.825rem', fontWeight: 600, color: '#334155' }}>
                Chúng tôi đồng ý công khai ảnh hoặc logo đội do đội cung cấp.
              </Typography>
            }
          />

          <FormControlLabel
            control={<Checkbox {...register('publicConsent.shareProjectSummary')} color="primary" defaultChecked={false} />}
            label={
              <Typography sx={{ fontSize: '0.825rem', fontWeight: 600, color: '#334155' }}>
                Chúng tôi đồng ý công khai phần giới thiệu ngắn và mô tả dự án sau khi được Ban Tổ chức phê duyệt.
              </Typography>
            }
          />
        </FormGroup>

        <Alert severity="info" icon={<LockRoundedIcon sx={{ fontSize: 18 }} />} sx={{ mt: 2, bgcolor: '#FFFFFF', fontSize: '0.775rem' }}>
          🔒 <strong>Bảo mật thông tin:</strong> Mã sinh viên, email cá nhân và số điện thoại hoàn toàn KHÔNG bao giờ được công khai trên website.
        </Alert>
      </Box>

      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 3, textAlign: 'center' }}>
        Thông tin đăng ký sẽ được gửi trực tiếp tới Hệ thống Ban Tổ chức PICC 2026.
        Mọi thông tin cá nhân được bảo mật theo chính sách quyền riêng tư.
      </Typography>
    </Box>
  );
};
