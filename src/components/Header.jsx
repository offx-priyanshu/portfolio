import "./Header.css";
import { useState, useRef, useEffect } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { sounds } from "../utils/sound";

const SCRAMBLE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/+#";

// Cyber Text Scramble effect on hover/focus matching Nikhil's reference ye({text, reduced})
function TextScramble({ text, reduced = false }) {
  const spanRef = useRef(null);

  useEffect(() => {
    const el = spanRef.current;
    const parent = el?.closest("a, button");
    if (!el || !parent || reduced) return;

    let animId = 0;

    function scramble() {
      cancelAnimationFrame(animId);
      const start = performance.now();
      let lastStep = -1;

      function step(now) {
        const stepIndex = Math.floor((now - start) / 34);
        if (stepIndex !== lastStep) {
          const resolvedCount = Math.max(0, stepIndex - 2);
          el.textContent = [...text]
            .map((char, i) => {
              if (i < resolvedCount || char === " ") return char;
              return SCRAMBLE_CHARS[(i * 13 + stepIndex * 7) % SCRAMBLE_CHARS.length];
            })
            .join("");
          lastStep = stepIndex;
        }

        if (stepIndex < text.length + 2) {
          animId = requestAnimationFrame(step);
        }
      }

      animId = requestAnimationFrame(step);
    }

    parent.addEventListener("pointerenter", scramble);
    parent.addEventListener("focus", scramble);

    return () => {
      cancelAnimationFrame(animId);
      if (el) el.textContent = text;
      parent.removeEventListener("pointerenter", scramble);
      parent.removeEventListener("focus", scramble);
    };
  }, [text, reduced]);

  return (
    <span>
      <span className="sr-only" style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>
        {text}
      </span>
      <span ref={spanRef} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}

const navSections = [
  { id: "contact", num: "5", label: "Contact" },
  { id: "journey", num: "4", label: "Journey" },
  { id: "projects", num: "3", label: "Projects" },
  { id: "about", num: "2", label: "About" }
];

const designModes = [
  { id: "Particles", num: "01", label: "Home Particles" },
  { id: "CRT", num: "02", label: "Home CRT" },
  { id: "Globe", num: "03", label: "Home Globe" },
  { id: "Orbit", num: "04", label: "Home Orbit" }
];

function Header({
  activePage = "Home",
  onSelectPage,
  designMode,
  onSelectDesignMode,
  reduced = false,
  cmsData
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundWave, setSoundWave] = useState(sounds.isPlaying);
  const wavePathRef = useRef(null);
  const navBoxRef = useRef(null);

  useEffect(() => {
    const unsub = sounds.subscribe((isPlaying) => {
      setSoundWave(isPlaying);
    });
    return unsub;
  }, []);

  // Real-time dynamic sine wave synthesizer animation when audio is playing
  useEffect(() => {
    if (!soundWave || reduced) {
      if (wavePathRef.current) {
        wavePathRef.current.setAttribute("d", "M0 12h40");
      }
      return;
    }

    let animId = 0;
    function renderWave() {
      const audioEl = sounds.audioElement;
      const t = (audioEl ? audioEl.currentTime : performance.now() / 1000) * (sounds.currentTrack === "akon" ? 10.4 : 7.8);
      let d = "";
      for (let x = 0; x <= 40; x += 2) {
        const envelope = Math.sin((Math.PI * x) / 40) ** 2;
        const y = 12 + envelope * (Math.sin(x * 0.48 + t) * 7.5 + Math.sin(x * 0.79 - t * 0.6) * 3.2);
        d += (x === 0 ? "M" : "L") + x + " " + y.toFixed(2);
      }
      if (wavePathRef.current) {
        wavePathRef.current.setAttribute("d", d);
      }
      animId = requestAnimationFrame(renderWave);
    }

    const currentPath = wavePathRef.current;
    animId = requestAnimationFrame(renderWave);
    return () => {
      cancelAnimationFrame(animId);
      if (currentPath) {
        currentPath.setAttribute("d", "M0 12h40");
      }
    };
  }, [soundWave, reduced]);

  const getPageNum = (page) => {
    switch (page) {
      case "Home": return "1";
      case "About": return "2";
      case "Projects": return "3";
      case "Journey": return "4";
      case "Contact": return "5";
      default: return "1";
    }
  };

  const activeNum = getPageNum(activePage);

  // Close menu on click outside or Escape
  useEffect(() => {
    if (!menuOpen) return;
    function handlePointer(e) {
      if (navBoxRef.current && !navBoxRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Top Left Wordmark */}
      <button
        className="wordmark"
        onClick={() => {
          sounds.playTick();
          onSelectPage("Home");
        }}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        Priyanshu
      </button>

      {/* Backdrop when menu is open */}
      {menuOpen && (
        <div
          className="menu-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Dock Header Component */}
      <div className="dock">
        {/* Wave visual toggle */}
        <button
          className={`wave ${soundWave ? "playing" : ""}`}
          onClick={() => {
            sounds.toggle();
          }}
          aria-pressed={soundWave}
          title={soundWave ? "Click to Stop Audio" : "Click to Play Audio"}
        >
          <svg width="38" height="25" viewBox="0 0 40 25" aria-hidden="true">
            <path
              ref={wavePathRef}
              className="wave-line"
              d={soundWave ? "M0 12h8l4-5 5 14 5-18 5 13 5-4h8" : "M0 12h40"}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </button>

        {/* Navigation Dropdown Box */}
        <div className="nav-box" ref={navBoxRef}>
          <button
            className="nav-trigger"
            onClick={() => {
              sounds.playTick();
              setMenuOpen(!menuOpen);
            }}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <small>[{activeNum}]</small>
            <span>{activePage.toUpperCase()}</span>
            <i>
              <em></em>
            </i>
          </button>

          {/* Nikhil Exact Accordion Menu Reveal */}
          <div
            className={`menu-reveal ${menuOpen ? "is-open" : ""}`}
            aria-hidden={!menuOpen}
          >
            <div className="menu-clip">
              <nav className="nav-panel">
                <h2>Menu</h2>
                <small>Navigation</small>

                {/* 1. Main Navigation Links in Reverse Order [5] down to [2] */}
                <div className="menu-links">
                  {navSections.map((sec) => {
                    const targetPageName =
                      sec.id === "contact" ? "Contact" :
                      sec.id === "journey" ? "Journey" :
                      sec.id === "projects" ? "Projects" : "About";

                    return (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          sounds.playTick();
                          onSelectPage(targetPageName);
                          setMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        aria-current={activePage === targetPageName ? "page" : undefined}
                      >
                        <small>[{sec.num}]</small>
                        <TextScramble text={sec.label} reduced={reduced} />
                        <b>●</b>
                      </a>
                    );
                  })}
                </div>

                {/* 2. Designs Header */}
                <small>
                  Designs <b>04</b>
                </small>

                {/* 3. Four Home Design Modes */}
                <div className="modes">
                  {designModes.map((mode) => (
                    <button
                      key={mode.id}
                      aria-pressed={designMode === mode.id && activePage === "Home"}
                      onClick={() => {
                        sounds.playMode();
                        onSelectDesignMode(mode.id);
                        if (activePage !== "Home") {
                          onSelectPage("Home");
                        }
                        setMenuOpen(false);
                      }}
                    >
                      <small>{mode.num}</small>{" "}
                      <TextScramble text={mode.label} reduced={reduced} />
                    </button>
                  ))}
                </div>

                {/* 4. Curriculum Vitae Row */}
                <div style={{ borderTop: "1px solid var(--rule)", marginTop: "14px", paddingTop: "12px" }}>
                  <a
                    href={cmsData?.resumeUrl || `${import.meta.env.BASE_URL}priyanshu-resume.pdf`}
                    download={cmsData?.resumeFileName || "Priyanshu_Resume.pdf"}
                    className="resume-btn"
                    style={{ width: "100%", justifyContent: "space-between" }}
                    onClick={() => sounds.playTick()}
                  >
                    <span>
                      <TextScramble text="Curriculum Vitae" reduced={reduced} />
                    </span>
                    <b>PDF ↗</b>
                  </a>
                </div>

                {/* 5. Four Bottom Social Icons */}
                <div className="socials">
                  <a
                    href="https://github.com/offx-priyanshu"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Profile"
                    onClick={() => sounds.playTick()}
                  >
                    <FaGithub size={17} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/priyanshu-kumar-ai/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn Profile"
                    onClick={() => sounds.playTick()}
                  >
                    <FaLinkedin size={17} />
                  </a>
                  <a
                    href="https://www.instagram.com/offx.vipulll/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram Profile"
                    onClick={() => sounds.playTick()}
                  >
                    <FaInstagram size={17} />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube Channel"
                    onClick={() => sounds.playTick()}
                  >
                    <FaYoutube size={17} />
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
