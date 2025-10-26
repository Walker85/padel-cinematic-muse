interface LogoProps {
  isDarkMode: boolean;
  className?: string;
}

export const Logo = ({ isDarkMode, className = "" }: LogoProps) => {
  // On light backgrounds: all champagne (#D6C2A8)
  // On dark backgrounds: white fills become #FFFFFF, champagne stays #D6C2A8
  const primaryFill = isDarkMode ? "#FFFFFF" : "#D6C2A8";
  const accentFill = "#D6C2A8"; // Always champagne
  
  return (
    <svg
      viewBox="0 0 1600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Padel Ready"
    >
      {/* R - Primary structure */}
      <path
        d="M50 350L180 0H280L150 350H50Z"
        fill={primaryFill}
      />
      <path
        d="M180 0H320V100C320 140 300 160 260 170L320 350H220L175 185H160V350H100V0H180ZM160 50V135H260C280 135 290 125 290 105V80C290 60 280 50 260 50H160Z"
        fill={accentFill}
      />
      
      {/* E - Primary structure */}
      <path
        d="M340 0H540V60H400V140H520V200H400V290H540V350H340V0Z"
        fill={primaryFill}
      />
      
      {/* A - Primary with accent cutout */}
      <path
        d="M560 350L650 0H750L840 350H775L760 280H640L625 350H560Z"
        fill={primaryFill}
      />
      <path
        d="M660 220H740L700 60L660 220Z"
        fill={accentFill}
      />
      
      {/* D - Primary with accent cutout */}
      <path
        d="M860 0H1000C1080 0 1140 60 1140 150V200C1140 290 1080 350 1000 350H860V0Z"
        fill={primaryFill}
      />
      <path
        d="M920 60V290H1000C1040 290 1070 260 1070 220V130C1070 90 1040 60 1000 60H920Z"
        fill={accentFill}
      />
      
      {/* Y - Primary structure */}
      <path
        d="M1160 0H1230L1300 160L1370 0H1440L1335 220V350H1265V220L1160 0Z"
        fill={primaryFill}
      />
      
      {/* Decorative slash accent */}
      <path
        d="M1460 0L1600 350H1530L1390 0H1460Z"
        fill={accentFill}
      />
    </svg>
  );
};
