import "./Hero.css";
import { useState, useEffect, useRef } from "react";
import ParticlePortrait from "../../components/ParticlePortrait";
import GlobeStage from "../../components/GlobeStage";

export default function Hero({
  designMode = "Particles",
  portraitSrc = `${import.meta.env.BASE_URL}priyanshu-portrait.png`,
  accent = "#EEEEEE",
  tier = "HIGH",
  reducedMotion = false,
  onNavigate,
  onAdminTrigger,
  cmsData
}) {
  const [localTime, setLocalTime] = useState("");
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  const handleKatiharClick = () => {
    clickCountRef.current += 1;

    // Reset after 4 seconds
    if (!clickTimerRef.current) {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
        clickTimerRef.current = null;
      }, 4000);
    }

    // Trigger admin login popup on 5 clicks
    if (clickCountRef.current >= 5) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
      clickCountRef.current = 0;
      if (onAdminTrigger) {
        onAdminTrigger();
      }
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const timeStr = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
      });
      setLocalTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const heroCopy = cmsData?.hero || {
    headingLine1: "TURNING DATA",
    headingLine2: "INTO INTELLIGENCE",
    subtitle: "[ DATA SCIENCE · AI / ML · GENAI ]",
    introText: "Hi, I'm Priyanshu Kumar, a B.Tech CSE (AI & ML) student passionate about Data Science, Machine Learning, and Generative AI. I enjoy analyzing data, building intelligent applications, and transforming ideas into practical solutions."
  };

  const rawStats = cmsData?.statistics || [
    { label: "VERIFIED_PROJECTS", value: "4" },
    { label: "SKILLS_MAPPED", value: "30+" },
    { label: "ROLE", value: "ASPIRING DATA SCIENTIST" },
    { label: "INTERNSHIPS", value: "2 COMPLETED" },
    { label: "FOCUS", value: "AI / ML & GENAI" },
    { label: "ACHIEVEMENT", value: "TOP 3 CHECKMATE" },
    { label: "AVAILABILITY", value: "OPEN FOR OPPORTUNITIES" },
    { label: "BASED IN", value: "KATIHAR, BIHAR, INDIA" }
  ];

  // First 2 stats are the top highlight cards (01, 02)
  const metric1 = rawStats.find(s => s.label?.toUpperCase().includes("PROJECT")) || rawStats[0] || { label: "VERIFIED_PROJECTS", value: "4" };
  const metric2 = rawStats.find(s => s.label?.toUpperCase().includes("SKILL")) || rawStats[1] || { label: "SKILLS_MAPPED", value: "30+" };

  // Remaining stats populate the definition list below the top cards
  const listStats = rawStats.filter(s => s !== metric1 && s !== metric2);

  return (
    <section id="hero" className={`studio-hero mode-${designMode.toLowerCase()}`}>
      {/* Dynamic Visual Stage based on chosen Design Mode */}
      <div className="portrait-stage">
        {designMode === "CRT" ? (
          <div className="crt-photo">
            <img
              src={`${import.meta.env.BASE_URL}priyanshu-crt.png`}
              alt="Priyanshu - CRT Mode"
            />
          </div>
        ) : designMode === "Globe" ? (
          <GlobeStage orbit={false} />
        ) : designMode === "Orbit" ? (
          <GlobeStage orbit={true} />
        ) : (
          /* Default: Particles */
          <ParticlePortrait
            imageSrc={portraitSrc}
            accent={accent}
            tier={tier}
            reducedMotion={reducedMotion}
          />
        )}
      </div>

      {/* Left Frosted Glass Backdrop Half */}
      <div className="glass-half" aria-hidden="true"></div>

      {/* Left: Cyber Editorial Hero Copy */}
      <div className="hero-copy">
        <h1>
          <span className="heading-mask">
            <em>{heroCopy.headingLine1 || "TURNING DATA"}</em>
          </span>
          <span className="title-divider-line" aria-hidden="true"></span>
          <span className="heading-mask solid">
            <em>{heroCopy.headingLine2 || "INTO INTELLIGENCE"}</em>
          </span>
        </h1>

        <div className="hero-tag">
          {heroCopy.subtitle || "[ DATA SCIENCE · AI / ML · GENAI ]"}
        </div>

        <p>
          {heroCopy.introText || "Hi, I'm Priyanshu Kumar, a B.Tech CSE (AI & ML) student passionate about Data Science, Machine Learning, and Generative AI. I enjoy analyzing data, building intelligent applications, and transforming ideas into practical solutions."}
        </p>

        <div className="hero-resume-action">
          <button
            onClick={() => onNavigate && onNavigate("About")}
            className="resume-pill"
            aria-label="Open Curriculum Vitae"
          >
            <small>Doc</small>
            <span>Resume / CV</span>
            <b>↗</b>
          </button>

          <a
            href={cmsData?.resumeUrl || `${import.meta.env.BASE_URL}priyanshu-resume.pdf`}
            download={cmsData?.resumeFileName || "Priyanshu_Resume.pdf"}
            className="resume-pdf-pill"
            title="Download Official PDF"
          >
            <span>PDF</span>
            <b>↓</b>
          </a>
        </div>
      </div>

      {/* Right: HUD Developer Stats */}
      <aside className="hero-stats" aria-label="Developer stats">
        <header>
          <strong>DEVELOPER STATS</strong>
          <span>● ACTIVE</span>
        </header>

        <div className="hero-metrics">
          <div>
            <small>01</small>
            <b>{metric1.value}</b>
            <span>{metric1.label}</span>
            <i></i>
          </div>
          <div>
            <small>02</small>
            <b>{metric2.value}</b>
            <span>{metric2.label}</span>
            <i></i>
          </div>
        </div>

        <dl>
          {listStats.map((stat, idx) => (
            <div key={stat.id || idx}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </aside>

      {/* Right Floating Bottom Contact & Time */}
      <div className="hero-contact">
        <div>
          <span>Wanna Say Hello?</span>
          <a href="mailto:priyanshugse@gmail.com">
            priyanshugse@gmail.com
          </a>
        </div>
        <div>
          <span>Local Time</span>
          <strong
            onClick={handleKatiharClick}
            style={{ cursor: "pointer", userSelect: "none" }}
            title="Katihar Local Time"
          >
            Katihar {localTime}
          </strong>
        </div>
      </div>

      {/* Bottom Ticker Stream */}
      <div className="hero-ticker">
        <div className="ticker-track">
          <div className="ticker-group">
            <span>Availability</span>
            <b>Open for Opportunities</b>
            <i>◆</i>
            <span>Professional Goal</span>
            <b>Aspiring Data Scientist</b>
            <i>◆</i>
            <span>Specialization</span>
            <b>AI & Machine Learning</b>
            <i>◆</i>
            <span>Core Focus</span>
            <b>Generative AI & LLMs</b>
            <i>◆</i>
            <span>Leadership</span>
            <b>Class Representative</b>
            <i>◆</i>
          </div>
          <div className="ticker-group" aria-hidden="true">
            <span>Availability</span>
            <b>Open for Opportunities</b>
            <i>◆</i>
            <span>Professional Goal</span>
            <b>Aspiring Data Scientist</b>
            <i>◆</i>
            <span>Specialization</span>
            <b>AI & Machine Learning</b>
            <i>◆</i>
            <span>Core Focus</span>
            <b>Generative AI & LLMs</b>
            <i>◆</i>
            <span>Leadership</span>
            <b>Class Representative</b>
            <i>◆</i>
          </div>
        </div>
      </div>
    </section>
  );
}
