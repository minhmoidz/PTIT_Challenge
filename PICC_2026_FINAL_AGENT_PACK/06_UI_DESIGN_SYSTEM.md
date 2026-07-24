# 06 — UI Design System

## 1. Single system rule

Material UI v7 là nguồn duy nhất cho:

- Component behavior.
- Theme tokens.
- Typography.
- Spacing.
- Breakpoints.
- Radius/shadow.
- Focus/disabled/error state.

Không thêm utility CSS framework.

## 2. Palette

Palette lấy gần màu trong artwork, sau đó điều chỉnh text để đủ contrast.

```ts
export const piccColors = {
  sky: {
    50: '#F5FBFF',
    100: '#E7F6FF',
    200: '#CDEEFF',
    300: '#AFE0FF',
    400: '#83C9FA',
    500: '#63B8EE',
  },
  blue: {
    100: '#DCEBFF',
    300: '#91BFF6',
    500: '#4F8FEA',
    700: '#245FA8',
    900: '#173B66',
  },
  pink: {
    100: '#FFE5F2',
    300: '#F7B0D2',
    500: '#E85B9F',
    700: '#B83273',
  },
  yellow: {
    100: '#FFF6D2',
    300: '#FFE28A',
    700: '#755600',
  },
  success: '#177245',
  danger: '#B42318',
  warning: '#8A5A00',
  ink: '#173B66',
  surface: '#FFFFFF',
};
```

Pastel không dùng làm text nhỏ trên nền trắng.

## 3. Theme roles

```ts
palette.primary.main = piccColors.blue[700];
palette.secondary.main = piccColors.pink[500];
palette.background.default = piccColors.sky[50];
palette.background.paper = '#FFFFFF';
palette.text.primary = piccColors.ink;
palette.text.secondary = '#46637E';
```

## 4. Typography

Ưu tiên:

```text
"Be Vietnam Pro", "Inter", system-ui, -apple-system, sans-serif
```

Nếu chưa có license/self-host, dùng system stack và không chặn dự án.

| Token | Mobile | Desktop |
|---|---|---|
| Display/H1 | 2.5rem / 1.08 / 800 | 4rem / 1.05 / 800 |
| H2 | 2rem / 1.15 / 750 | 3rem / 1.1 / 750 |
| H3 | 1.35rem / 1.25 / 700 | 1.6rem / 1.25 / 700 |
| Body | 1rem / 1.65 / 400 | 1rem / 1.7 / 400 |
| Button | 0.95rem / 1 / 700 | same |

Không cố tái tạo font chữ bảng hiệu bằng web font; artwork đã chứa kiểu chữ đó.

## 5. Layout

- Container max-width: 1200px.
- Mobile gutter: 16px.
- Tablet: 24px.
- Desktop: 32px.
- Section spacing: 72px mobile, 112px desktop.
- Header height: 64px mobile, 76px desktop.

## 6. Breakpoints

Dùng MUI defaults có điều chỉnh nếu cần:

```ts
xs: 0
sm: 600
md: 900
lg: 1200
xl: 1536
```

Không tự tạo breakpoint rải rác.

## 7. Radius and elevation

- Button: 999px cho CTA chính, 14px cho button form nếu cần.
- Input: 14px.
- Card: 20–28px.
- Hero glass panel: 28px.
- Elevation nhẹ; shadow custom tối đa 3 cấp.

```ts
shadows.soft = '0 16px 40px rgba(23, 59, 102, 0.12)';
shadows.hover = '0 20px 48px rgba(23, 59, 102, 0.18)';
```

## 8. Component variants

Tạo theme variants cho:

- `MuiButton`: `piccPrimary`, `piccSecondary`, `piccGhost` hoặc dùng contained/outlined nhất quán.
- `MuiCard`: default soft card.
- `MuiTextField`: rounded, error helper stable.
- `MuiAccordion`: no heavy divider, clear focus.
- `MuiChip`: status/quick fact.
- `MuiAlert`: domain states.

## 9. Icon rules

Chỉ dùng `@mui/icons-material`.

Đề xuất:

- `RocketLaunchRounded` — vượt giới hạn/CTA.
- `LightbulbRounded` — innovation.
- `BusinessCenterRounded` — doanh nghiệp.
- `GroupsRounded` — đội thi.
- `TrendingUpRounded` — phát triển.
- `AutoAwesomeRounded` — decorative sparkle.
- `CalendarMonthRounded` — timeline.
- `EmojiEventsRounded` — giải thưởng.
- `VerifiedRounded` — cam kết.

Icon decorative: `aria-hidden`. Icon-only button: có accessible label.

## 10. Section surfaces

- Hero: sky gradient + artwork.
- Introduction: white surface với cloud-like soft shapes.
- Timeline: sky-100/white gradient.
- Rules/Form: near-white solid để đọc tốt.
- Awards: pink/yellow accents trên card trắng.
- Footer: blue-900 với text trắng.

## 11. Anti-patterns

- Không phủ blur dày lên toàn page.
- Không đặt body text lên vùng mây nhiều chi tiết.
- Không dùng shadow neon.
- Không dùng pink/yellow cho text body.
- Không dùng quá ba style card khác nhau.
- Không làm mọi section đều animated cùng lúc.
