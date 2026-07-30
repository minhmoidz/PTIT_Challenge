import { Grid, Box } from '@mui/material';
import { motion } from 'motion/react';
import { fadeInUp, staggerContainer } from '@/motion/variants';
import AwardCard from './AwardCard';
import { competitionData } from '@/data/competition';

const prizePerk = (prize: (typeof competitionData.prizes)[number]) => ({
  text: prize.status === 'confirmed' ? prize.value : 'Cơ cấu giải thưởng đang được cập nhật',
  iconType: 'check' as const,
});

export const AwardPodium = () => {
  const p1 = competitionData.prizes.find((p) => p.rank === 1) || competitionData.prizes[0];
  const p2 = competitionData.prizes.find((p) => p.rank === 2) || competitionData.prizes[1];
  const p3 = competitionData.prizes.find((p) => p.rank === 3) || competitionData.prizes[2];

  return (
    <Box
      component={motion.div}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      sx={{ mb: { xs: 5, md: 7 } }}
    >
      <Grid container spacing={{ xs: 3, md: 3.5 }} alignItems="stretch" justifyContent="center">
        {/* Á QUÂN (#02) - Desktop: Left (Order 1), Mobile: 2nd */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }} sx={{ order: { xs: 2, lg: 1 } }}>
          <motion.div variants={fadeInUp} style={{ height: '100%' }}>
            <AwardCard
              rankNumber="02"
              title={`Giải ${p2.title}`}
              badgeLabel="Á QUÂN"
              variant="runner-up"
              perks={[
                prizePerk(p2),
                { text: 'Bằng khen & Chứng nhận chính thức PICC 2026', iconType: 'school' },
                { text: 'Cơ hội thực tập & Mentoring cùng doanh nghiệp', iconType: 'business' },
              ]}
            />
          </motion.div>
        </Grid>

        {/* QUÁN QUÂN (#01) - Desktop: Center & Highest (Order 2), Mobile: 1st */}
        <Grid size={{ xs: 12, sm: 12, lg: 4 }} sx={{ order: { xs: 1, lg: 2 } }}>
          <motion.div variants={fadeInUp} style={{ height: '100%' }}>
            <AwardCard
              rankNumber="01"
              title={`Giải ${p1.title}`}
              badgeLabel="GIẢI THƯỞNG CAO NHẤT"
              variant="champion"
              perks={[
                prizePerk(p1),
                { text: 'Cúp vàng & Bằng khen danh dự PICC 2026', iconType: 'rocket' },
                { text: 'Suất thực tập chính thức tại doanh nghiệp đồng hành', iconType: 'business' },
                { text: 'Đặc quyền Mentoring 1:1 và ươm tạo dự án', iconType: 'school' },
              ]}
            />
          </motion.div>
        </Grid>

        {/* QUÝ QUÂN (#03) - Desktop: Right (Order 3), Mobile: 3rd */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }} sx={{ order: { xs: 3, lg: 3 } }}>
          <motion.div variants={fadeInUp} style={{ height: '100%' }}>
            <AwardCard
              rankNumber="03"
              title={`Giải ${p3.title}`}
              badgeLabel="QUÝ QUÂN"
              variant="third"
              perks={[
                prizePerk(p3),
                { text: 'Huy chương Đồng & Bằng khen PICC 2026', iconType: 'school' },
                { text: 'Hỗ trợ tư vấn hoàn thiện giải pháp và kết nối doanh nghiệp', iconType: 'rocket' },
              ]}
            />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AwardPodium;
