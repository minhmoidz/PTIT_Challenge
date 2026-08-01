import { Box, Chip, TextField, InputAdornment, IconButton, MenuItem } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import type { ChallengeCategoryType, TeamCompetitionStatus } from '@/types/publicTeam';
import { CATEGORY_LABEL_MAP } from '@/types/publicTeam';
import { piccColors } from '@/theme/palette';

interface Props {
  selectedCategory: ChallengeCategoryType | 'all';
  onSelectCategory: (category: ChallengeCategoryType | 'all') => void;
  selectedStatus: TeamCompetitionStatus | 'all';
  onSelectStatus: (status: TeamCompetitionStatus | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showSearch: boolean;
}

const CATEGORY_OPTIONS: { value: ChallengeCategoryType | 'all'; label: string }[] = [
  { value: 'all', label: 'Tất cả nhóm bài toán' },
  { value: 'business', label: CATEGORY_LABEL_MAP.business },
  { value: 'technology', label: CATEGORY_LABEL_MAP.technology },
  { value: 'marketing', label: CATEGORY_LABEL_MAP.marketing },
  { value: 'communications', label: CATEGORY_LABEL_MAP.communications },
  { value: 'other', label: CATEGORY_LABEL_MAP.other },
];

const STATUS_OPTIONS: { value: TeamCompetitionStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'finalist', label: 'Top 6 Chung kết' },
  { value: 'semifinalist', label: 'Top 18 Bán kết' },
  { value: 'verified', label: 'Đã xác nhận' },
];

export const TeamFilter = ({
  selectedCategory,
  onSelectCategory,
  selectedStatus,
  onSelectStatus,
  searchQuery,
  onSearchChange,
  showSearch,
}: Props) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          mb: 2.5,
        }}
      >
        {/* Category Chips Bar */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            alignItems: 'center',
          }}
        >
          {CATEGORY_OPTIONS.map((opt) => {
            const isSelected = selectedCategory === opt.value;
            return (
              <Chip
                key={opt.value}
                label={opt.label}
                onClick={() => onSelectCategory(opt.value)}
                sx={{
                  fontWeight: isSelected ? 800 : 600,
                  fontSize: '0.825rem',
                  py: 1.8,
                  px: 1,
                  borderRadius: '999px',
                  bgcolor: isSelected ? piccColors.blue[600] : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : piccColors.slate[700],
                  border: isSelected ? '1px solid transparent' : `1px solid ${piccColors.slate[200]}`,
                  boxShadow: isSelected
                    ? '0 4px 14px rgba(56, 130, 241, 0.35)'
                    : '0 2px 6px rgba(15, 42, 82, 0.03)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: isSelected ? piccColors.blue[700] : 'rgba(241, 246, 254, 0.8)',
                    color: isSelected ? '#FFFFFF' : piccColors.blue[700],
                  },
                }}
              />
            );
          })}
        </Box>

        {/* Status Dropdown Filter */}
        <Box sx={{ minWidth: { xs: '100%', sm: 200 } }}>
          <TextField
            select
            fullWidth
            size="small"
            value={selectedStatus}
            onChange={(e) => onSelectStatus(e.target.value as TeamCompetitionStatus | 'all')}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                fontWeight: 700,
                fontSize: '0.85rem',
              },
            }}
          >
            {STATUS_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      {/* Search Input Bar (Conditionally rendered when showSearch is true or when user is searching) */}
      {(showSearch || searchQuery !== '') && (
        <Box sx={{ maxWidth: 540 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Tìm kiếm theo tên đội, slogan hoặc dự án..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon sx={{ color: piccColors.slate[400], fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery !== '' ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => onSearchChange('')}>
                      <ClearRoundedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 999,
              '& .MuiOutlinedInput-root': {
                borderRadius: 999,
                px: 1.5,
                fontSize: '0.875rem',
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};
