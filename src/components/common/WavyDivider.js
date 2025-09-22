// common/WavyDivider.js
export default function WavyDivider({ className = "", flip = false }) {
  return (
    <div className={`${className} overflow-hidden leading-[0]`}>
      <svg
        className={`w-full h-24 ${flip ? "rotate-180" : ""}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="currentcolor" fill-opacity="1" d="M0,224L30,202.7C60,181,120,139,180,117.3C240,96,300,96,360,122.7C420,149,480,203,540,224C600,245,660,235,720,218.7C780,203,840,181,900,176C960,171,1020,181,1080,208C1140,235,1200,277,1260,272C1320,267,1380,213,1410,186.7L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"/>
      </svg>
    </div>
  );
}
