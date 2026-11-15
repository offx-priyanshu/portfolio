import "./SystemSettings.css";
import { useState, useRef, useEffect } from "react";
import { sounds } from "../utils/sound";

const themes = [
  { name: "Silver", color: "#EEEEEE" },
  { name: "Cyan", color: "#00DAE3" },
  { name: "Green", color: "#36EE8E" },
  { name: "Yellow", color: "#FFE238" },
  { name: "Red", color: "#FF3E65" },
  { name: "Violet", color: "#A18DFF" }
];

export default function SystemSettings({
  activeTheme = 0,
  onSelectTheme,
  performanceTier = "HIGH",
  onSelectTier,
  reducedMotion = false,
  onToggleReducedMotion,
  onChangePortrait
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [audioEngineOn, setAudioEngineOn] = useState(sounds.isPlaying);
  const [selectedTrack, setSelectedTrack] = useState(sounds.currentTrack);
  const panelRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsub = sounds.subscribe((isPlaying) => {
      setAudioEngineOn(isPlaying);
    });
    return unsub;
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && onChangePortrait) {
      const url = URL.createObjectURL(file);
      onChangePortrait(url);
      setIsOpen(false);
    }
  };

  return (
    <div className="settings-host" ref={panelRef}>
      {/* Right Edge Sun / Cog Gear Trigger Tab */}
      <button
        className="settings-tab"
        aria-label="System settings"
        aria-expanded={isOpen}
        onClick={() => {
          sounds.playTick();
          setIsOpen(!isOpen);
        }}
        title="Open System Global Config"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </button>

      {/* Floating System Configuration Drawer */}
      {isOpen && (
        <aside className="settings-panel">
          <header>
            <strong>SYSTEM</strong>
            <small>GLOBAL CONFIG</small>
          </header>

          {/* [01] Core Theme Swatches */}
          <small className="panel-sublabel">[01] CORE THEME</small>
          <div className="swatches">
            {themes.map((th, idx) => (
              <button
                key={th.name}
                aria-label={th.name}
                aria-pressed={activeTheme === idx}
                style={{ color: th.color }}
                onClick={() => {
                  sounds.playTick();
                  onSelectTheme(idx);
                }}
              >
                ●
              </button>
            ))}
          </div>

          {/* [02] Audio Engine Switcher */}
          <small className="panel-sublabel audio-sublabel">
            <span>[02] AUDIO ENGINE</span>
            <button
              onClick={() => {
                const next = !audioEngineOn;
                setAudioEngineOn(next);
                sounds.enabled = next;
                if (next) {
                  sounds.playTrack(selectedTrack);
                } else {
                  sounds.stopTrack();
                }
              }}
            >
              {audioEngineOn ? "ON" : "OFF"}
            </button>
          </small>

          <button
            className="track"
            aria-pressed={selectedTrack === "apple" && audioEngineOn}
            onClick={() => {
              setSelectedTrack("apple");
              setAudioEngineOn(true);
              sounds.enabled = true;
              sounds.playTrack("apple");
            }}
          >
            <div className="track-name">Apple iPhone X Tone</div>
            <small>WHATSAPP MESSAGE / BELL</small>
          </button>

          <button
            className="track"
            aria-pressed={selectedTrack === "akon" && audioEngineOn}
            onClick={() => {
              setSelectedTrack("akon");
              setAudioEngineOn(true);
              sounds.enabled = true;
              sounds.playTrack("akon");
            }}
          >
            <div className="track-name">Akon SMS Tone</div>
            <small>CLASSIC SMS / HIP-HOP</small>
          </button>

          {/* [03] Performance Tier */}
          <small className="panel-sublabel">[03] PERFORMANCE TIER</small>
          <div className="tiers">
            {["HIGH", "MED", "SAVER"].map((t) => (
              <button
                key={t}
                aria-pressed={performanceTier === t}
                onClick={() => {
                  sounds.playTick();
                  onSelectTier(t);
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Utilities: Reduced Motion & Change Portrait */}
          <div className="utilities">
            <button
              aria-pressed={reducedMotion}
              onClick={() => {
                sounds.playTick();
                onToggleReducedMotion();
              }}
            >
              Reduced motion {reducedMotion ? "on" : "off"}
            </button>

            <button
              onClick={() => {
                sounds.playTick();
                fileInputRef.current?.click();
              }}
            >
              Change portrait ↗
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </div>
        </aside>
      )}
    </div>
  );
}

