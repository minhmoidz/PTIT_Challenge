import { Card, CardContent, Box, Typography } from '@mui/material';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { motion } from 'motion/react';
import { fadeInUp } from '@/motion/variants';

export const SubmissionRequirements = () => {
  return (
    <motion.div variants={fadeInUp} style={{ height: '100%' }}>
      <Card
        sx={{
          height: '100%',
          borderRadius: 4,
          bgcolor: '#FFFFFF',
          border: '1px solid #DDE6F1',
          boxShadow: '0 8px 30px rgba(22, 58, 103, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 14px 40px rgba(22, 58, 103, 0.1)',
            transform: 'translateY(-3px)',
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 }, pt: 3, pb: '24px !important', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Card Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                bgcolor: '#EAF2FF',
                color: '#397CE8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FolderZipRoundedIcon sx={{ fontSize: 19 }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: '0.675rem', fontWeight: 800, color: '#397CE8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Hướng Dẫn Hồ Sơ
              </Typography>
              <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.2rem' }, fontWeight: 800, color: '#163A67', lineHeight: 1.2 }}>
                Hồ Sơ Dự Thi & Sản Phẩm
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: '#F4F8FD',
              border: '1px solid rgba(57, 124, 232, 0.2)',
            }}
          >
            <Typography sx={{ fontSize: '0.875rem', color: '#163A67', lineHeight: 1.6, fontWeight: 500, mb: 1.5 }}>
              Các đội phân tích vấn đề và đề xuất hướng giải quyết thông qua hồ sơ dự thi theo hướng dẫn chính thức của Ban Tổ chức.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#397CE8' }}>
              <InfoOutlinedIcon sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 650 }}>
                Hướng dẫn định dạng hồ sơ chi tiết sẽ được Ban Tổ chức cập nhật tới các đội thi.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SubmissionRequirements;
