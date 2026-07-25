import { Box, Typography } from '@mui/material';

interface PartnerLogoProps {
  name: string;
  logoUrl?: string;
  height?: number;
}

/**
 * Official SVG Brand Logos for PICC 2026 Partners & Sponsors
 */
const BrandSvgLogo = ({ name, height = 48 }: { name: string; height?: number }) => {
  const normalized = name.toLowerCase();

  // 1. Viettel Group
  if (normalized.includes('viettel')) {
    return (
      <svg
        height={height}
        viewBox="0 0 200 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Viettel Logo"
        style={{ maxWidth: '100%', height: 'auto', maxHeight: height }}
      >
        {/* Viettel stylized text mark */}
        <text
          x="10"
          y="35"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="32"
          fill="#EE0000"
          letterSpacing="-0.03em"
        >
          viettel
        </text>
        <circle cx="178" cy="18" r="4" fill="#EE0000" />
      </svg>
    );
  }

  // 2. VNPT Technology
  if (normalized.includes('vnpt')) {
    return (
      <svg
        height={height}
        viewBox="0 0 210 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="VNPT Logo"
        style={{ maxWidth: '100%', height: 'auto', maxHeight: height }}
      >
        {/* VNPT Globe Icon */}
        <g transform="translate(10, 5)">
          <circle cx="20" cy="20" r="18" fill="#0066B3" />
          <path
            d="M8 20 C8 12, 32 12, 32 20 C32 28, 8 28, 8 20 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
          />
          <path d="M20 2 V38" stroke="#FFFFFF" strokeWidth="2.5" />
        </g>
        {/* VNPT Typography */}
        <text
          x="62"
          y="34"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="26"
          fill="#0066B3"
          letterSpacing="0.02em"
        >
          VNPT
        </text>
        <text
          x="138"
          y="34"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
          fontSize="14"
          fill="#475569"
        >
          Technology
        </text>
      </svg>
    );
  }

  // 3. FPT Software
  if (normalized.includes('fpt')) {
    return (
      <svg
        height={height}
        viewBox="0 0 200 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="FPT Logo"
        style={{ maxWidth: '100%', height: 'auto', maxHeight: height }}
      >
        {/* FPT Three Parallelograms (Orange, Green, Blue) */}
        <g transform="translate(10, 8)">
          <path d="M0 32 L10 0 L24 0 L14 32 Z" fill="#F36F21" />
          <path d="M16 32 L26 0 L40 0 L30 32 Z" fill="#009A44" />
          <path d="M32 32 L42 0 L56 0 L46 32 Z" fill="#0054A6" />
        </g>
        {/* FPT Text */}
        <text
          x="75"
          y="33"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="26"
          fill="#0054A6"
          letterSpacing="-0.02em"
        >
          FPT
        </text>
        <text
          x="130"
          y="33"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
          fontSize="14"
          fill="#475569"
        >
          Software
        </text>
      </svg>
    );
  }

  // 4. Samsung R&D
  if (normalized.includes('samsung')) {
    return (
      <svg
        height={height}
        viewBox="0 0 220 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Samsung Logo"
        style={{ maxWidth: '100%', height: 'auto', maxHeight: height }}
      >
        {/* Samsung Oval Badge */}
        <ellipse cx="75" cy="25" rx="70" ry="20" transform="rotate(-10 75 25)" fill="#034EA2" />
        <text
          x="20"
          y="31"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="18"
          fill="#FFFFFF"
          letterSpacing="0.08em"
        >
          SAMSUNG
        </text>
        <text
          x="152"
          y="31"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="13"
          fill="#034EA2"
        >
          R&amp;D
        </text>
      </svg>
    );
  }

  // 5. MISA Joint Stock Co.
  if (normalized.includes('misa')) {
    return (
      <svg
        height={height}
        viewBox="0 0 160 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="MISA Logo"
        style={{ maxWidth: '100%', height: 'auto', maxHeight: height }}
      >
        {/* MISA Triangles logo */}
        <path d="M12 35 L24 10 L36 35 Z" fill="#00529C" />
        <path d="M26 35 L38 10 L50 35 Z" fill="#FFC20E" />
        <text
          x="58"
          y="34"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="28"
          fill="#00529C"
          letterSpacing="0.04em"
        >
          MISA
        </text>
      </svg>
    );
  }

  // 6. Học viện PTIT
  if (normalized.includes('ptit') || normalized.includes('bưu chính')) {
    return (
      <svg
        height={height}
        viewBox="0 0 200 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="PTIT Logo"
        style={{ maxWidth: '100%', height: 'auto', maxHeight: height }}
      >
        {/* PTIT Shield Emblem */}
        <g transform="translate(8, 5)">
          <path d="M20 2 L38 10 V24 C38 33 20 38 20 38 C20 38 2 33 2 24 V10 Z" fill="#173B66" />
          <path d="M20 6 L33 12 V22 C33 29 20 33 20 33 C20 33 7 29 7 22 V12 Z" fill="#D9262E" />
          <text
            x="20"
            y="24"
            fontFamily="sans-serif"
            fontWeight="900"
            fontSize="10"
            fill="#FFFFFF"
            textAnchor="middle"
          >
            PTIT
          </text>
        </g>
        {/* PTIT Text */}
        <text
          x="54"
          y="28"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="22"
          fill="#173B66"
          letterSpacing="0.02em"
        >
          PTIT
        </text>
        <text
          x="54"
          y="41"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="9.5"
          fill="#D9262E"
          letterSpacing="0.04em"
        >
          HỌC VIỆN CÔNG NGHỆ BCVT
        </text>
      </svg>
    );
  }

  // Fallback: Clean styled text mark
  return (
    <Typography
      sx={{
        fontSize: '1.25rem',
        fontWeight: 800,
        color: '#173B66',
        letterSpacing: '-0.02em',
      }}
    >
      {name}
    </Typography>
  );
};

export const PartnerLogo = ({ name, logoUrl, height = 44 }: PartnerLogoProps) => {
  if (logoUrl) {
    return (
      <Box
        component="img"
        src={logoUrl}
        alt={`${name} Logo`}
        loading="lazy"
        decoding="async"
        sx={{
          height: '100%',
          maxHeight: height,
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    );
  }

  return <BrandSvgLogo name={name} height={height} />;
};

export default PartnerLogo;
