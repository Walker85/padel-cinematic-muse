interface LogoProps {
  isDarkMode: boolean;
  className?: string;
}

export const Logo = ({ isDarkMode, className = "" }: LogoProps) => {
  return (
    <svg
      viewBox="0 0 1512 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Padel Ready"
    >
      {/* P */}
      <path
        d="M0 50L200 0V150L100 175C80 180 60 190 60 215V400H0V50Z"
        fill={isDarkMode ? "#FFFFFF" : "#D6C2A8"}
      />
      <path
        d="M100 100L200 75V150L100 175V100Z"
        fill={isDarkMode ? "#D6C2A8" : "#FEFAF3"}
      />
      
      {/* R */}
      <path
        d="M220 0H420V150C420 180 400 195 370 200L420 400H340L295 210H280V400H220V0Z"
        fill={isDarkMode ? "#FFFFFF" : "#D6C2A8"}
      />
      <path
        d="M280 60V150H360C380 150 390 140 390 120V90C390 70 380 60 360 60H280Z"
        fill={isDarkMode ? "#D6C2A8" : "#FEFAF3"}
      />
      
      {/* E */}
      <path
        d="M440 0H640V70H500V150H620V220H500V330H640V400H440V0Z"
        fill={isDarkMode ? "#FFFFFF" : "#D6C2A8"}
      />
      
      {/* A */}
      <path
        d="M660 400L750 0H850L940 400H875L860 320H740L725 400H660Z"
        fill={isDarkMode ? "#FFFFFF" : "#D6C2A8"}
      />
      <path
        d="M760 250H840L800 80L760 250Z"
        fill={isDarkMode ? "#D6C2A8" : "#FEFAF3"}
      />
      
      {/* D */}
      <path
        d="M960 0H1100C1180 0 1240 60 1240 150V250C1240 340 1180 400 1100 400H960V0Z"
        fill={isDarkMode ? "#FFFFFF" : "#D6C2A8"}
      />
      <path
        d="M1020 70V330H1100C1140 330 1170 300 1170 260V140C1170 100 1140 70 1100 70H1020Z"
        fill={isDarkMode ? "#D6C2A8" : "#FEFAF3"}
      />
      
      {/* Y */}
      <path
        d="M1260 0H1330L1400 180L1470 0H1540L1435 250V400H1365V250L1260 0Z"
        fill={isDarkMode ? "#FFFFFF" : "#D6C2A8"}
      />
    </svg>
  );
};
