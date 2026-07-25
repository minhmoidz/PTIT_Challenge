import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Grid, Chip, Divider } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';

interface TeamMember {
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  major: string;
  role: string;
}

interface RegistrationItem {
  id: string;
  registrationCode: string;
  submittedAt: string;
  status: string;
  data: {
    teamName: string;
    teamSize: number;
    challengeCategories: string[];
    featuredProject: string;
    expectations?: string;
    companyExperience?: string;
    members: TeamMember[];
  };
}

interface Props {
  open: boolean;
  registration: RegistrationItem | null;
  onClose: () => void;
  onVerify?: (id: string) => void;
  onReject?: (id: string) => void;
}

export const RegistrationDetailModal = ({ open, registration, onClose, onVerify, onReject }: Props) => {
  if (!registration) return null;
  const { registrationCode, status, submittedAt, data } = registration;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth paperProps={{ sx: { borderRadius: 4, p: 1 } }}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#163A67' }}>
            Chi Tiết Đơn Đăng Ký — {data.teamName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            Mã Đơn: <strong>{registrationCode}</strong> · Nộp lúc: {new Date(submittedAt).toLocaleString('vi-VN')}
          </Typography>
        </Box>
        <Chip
          label={status === 'SUBMITTED' ? 'Mới Nộp' : status === 'VERIFIED' ? 'Đã Xác Minh' : status}
          color={status === 'VERIFIED' ? 'success' : 'warning'}
          sx={{ fontWeight: 800 }}
        />
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 2.5 }}>
        {/* Team Summary Info */}
        <Box sx={{ p: 2.5, borderRadius: 3, bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#163A67', mb: 1.5 }}>
            📌 Thông Tin Tổng Quan Đội Thi
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="caption" color="text.secondary" display="block">Tên đội thi</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>{data.teamName}</Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="caption" color="text.secondary" display="block">Quy mô đội</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>{data.teamSize} Thành viên</Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="caption" color="text.secondary" display="block">Nhóm bài toán</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#397CE8' }}>
                {data.challengeCategories?.join(', ') || 'Chưa chọn'}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography variant="caption" color="text.secondary" display="block">Mô tả dự án nổi bật / Ý tưởng</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155', mt: 0.5 }}>
                {data.featuredProject || '—'}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Full Team Members List */}
        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#163A67', mb: 2 }}>
          👥 Danh Sách Tất Cả Thành Viên ({data.members?.length || 0} Người)
        </Typography>

        <Grid container spacing={2}>
          {data.members?.map((m, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Box sx={{ p: 2, borderRadius: 3, border: '1px solid #E2E8F0', bgcolor: m.role === 'leader' ? '#EEF2FF' : '#FFFFFF' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonRoundedIcon sx={{ fontSize: 18, color: '#397CE8' }} />
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#1E293B' }}>
                      {m.fullName}
                    </Typography>
                  </Box>
                  <Chip
                    label={m.role === 'leader' ? 'Đội Trưởng' : `Thành viên ${i + 1}`}
                    size="small"
                    color={m.role === 'leader' ? 'primary' : 'default'}
                    sx={{ height: 20, fontSize: '0.675rem', fontWeight: 800 }}
                  />
                </Box>

                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#475569', mt: 0.5 }}>
                  <BadgeRoundedIcon sx={{ fontSize: 14 }} /> Mã SV: <strong>{m.studentId}</strong> ({m.major || 'PTIT'})
                </Typography>

                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#475569', mt: 0.5 }}>
                  <EmailRoundedIcon sx={{ fontSize: 14 }} /> {m.email}
                </Typography>

                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#475569', mt: 0.5 }}>
                  <PhoneRoundedIcon sx={{ fontSize: 14 }} /> {m.phone}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2.5, justifyContent: 'space-between' }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 999, px: 3 }}>
          Đóng
        </Button>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {onReject && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => { onReject(registration.id); onClose(); }}
              startIcon={<CancelRoundedIcon />}
              sx={{ borderRadius: 999 }}
            >
              Từ Chối Hồ Sơ
            </Button>
          )}

          {onVerify && (
            <Button
              variant="contained"
              color="success"
              onClick={() => { onVerify(registration.id); onClose(); }}
              startIcon={<CheckCircleRoundedIcon />}
              sx={{ borderRadius: 999, fontWeight: 700 }}
            >
              Xác Minh Hồ Sơ Thành Công
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};
