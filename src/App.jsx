import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Hero from "./pages/Hero/Hero";
import About from "./pages/About/About";
import Project from "./pages/Project/Project";
import Journey from "./pages/Journey/Journey";
import Contact from "./pages/Contact/Contact";
import SystemSettings from "./components/SystemSettings";
import AdminLoginModal from "./components/AdminLoginModal";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { fetchPortfolioFromCloud, savePortfolioToCloud, checkAdminSession, logoutAdmin } from "./services/portfolioDb";

const themeColors = ["#EEEEEE", "#00DAE3", "#36EE8E", "#FFE238", "#FF3E65", "#A18DFF"];

function App() {
  const [activePage, setActivePage] = useState("Home"); // "Home" | "About" | "Projects" | "Journey" | "Contact" | "Admin"
  const [designMode, setDesignMode] = useState("Particles"); // "Particles" | "CRT" | "Globe" | "Orbit"
  const [activeTheme, setActiveTheme] = useState(0);
  const [performanceTier, setPerformanceTier] = useState("HIGH");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [portraitSrc, setPortraitSrc] = useState(`${import.meta.env.BASE_URL}priyanshu-portrait.png`);
  const [localTime, setLocalTime] = useState("");
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("is_admin_authenticated") === "true";
  });
  const [cmsState, setCmsState] = useState(() => {
    const saved = localStorage.getItem("portfolio_cms_state");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });
  const cornerClickRef = useRef(0);
  const cornerTimerRef = useRef(null);

  // Initial fetch from Neon DB Cloud & verify server admin session
  useEffect(() => {
    fetchPortfolioFromCloud().then((cloudData) => {
      if (cloudData) {
        setCmsState(cloudData);
      }
    });

    // Check secure HTTP-only / bearer token session from server
    checkAdminSession().then((res) => {
      if (res && res.authenticated) {
        setIsAdminLoggedIn(true);
      } else {
        setIsAdminLoggedIn(false);
      }
    });
  }, []);

  const handleCornerKatiharClick = () => {
    cornerClickRef.current += 1;
    if (!cornerTimerRef.current) {
      cornerTimerRef.current = setTimeout(() => {
        cornerClickRef.current = 0;
        cornerTimerRef.current = null;
      }, 4000);
    }
    if (cornerClickRef.current >= 5) {
      clearTimeout(cornerTimerRef.current);
      cornerTimerRef.current = null;
      cornerClickRef.current = 0;
      setAdminModalOpen(true);
    }
  };

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit"
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash === "admin") {
        if (isAdminLoggedIn) {
          setActivePage("Admin");
        } else {
          // Do not pop up modal on reload; clear hash to home
          setActivePage("Home");
          window.history.replaceState(null, "", window.location.pathname);
        }
      }
      else if (hash === "about") setActivePage("About");
      else if (hash === "projects" || hash === "project") setActivePage("Projects");
      else if (hash === "journey" || hash === "serv" || hash === "services") setActivePage("Journey");
      else if (hash === "contact") setActivePage("Contact");
      else setActivePage("Home");
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [isAdminLoggedIn]);

  const handlePageChange = (page) => {
    setActivePage(page);
    window.location.hash = page.toLowerCase();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentAccent = themeColors[activeTheme] || "#EEEEEE";

  useEffect(() => {
    document.documentElement.style.setProperty("--ink", currentAccent);
  }, [currentAccent]);

  return (
    <div className={`experience ${activePage === "Home" ? "home" : "interior"}`}>
      {activePage !== "Admin" && (
        <Header
          activePage={activePage}
          onSelectPage={handlePageChange}
          designMode={designMode}
          onSelectDesignMode={setDesignMode}
          reduced={reducedMotion}
          cmsData={cmsState}
        />
      )}

      {/* Global Corner Elements on Interior Pages */}
      {activePage !== "Home" && activePage !== "Admin" && (
        <>
          <header className="page-title">
            <small>
              <a href="#home" onClick={() => handlePageChange("Home")}>
                HOME
              </a>
              {"　/　"}
              {activePage.toUpperCase()}
            </small>
            <h1>{activePage.toUpperCase()}</h1>
          </header>

          {activePage !== "Contact" && (
            <aside className="corner-contact">
              Wanna Say Hello?
              <a href="mailto:priyanshugse@gmail.com">priyanshugse@gmail.com</a>
              Local Time
              <strong
                onClick={handleCornerKatiharClick}
                style={{ cursor: "pointer", userSelect: "none" }}
                title="Katihar Local Time"
              >
                Katihar {localTime}
              </strong>
            </aside>
          )}
        </>
      )}

      {/* Floating System Configuration Settings Tab & Drawer */}
      {activePage !== "Admin" && (
        <SystemSettings
          activeTheme={activeTheme}
          onSelectTheme={setActiveTheme}
          performanceTier={performanceTier}
          onSelectTier={setPerformanceTier}
          reducedMotion={reducedMotion}
          onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
          onChangePortrait={(newUrl) => setPortraitSrc(newUrl)}
        />
      )}

      {/* Exclusive Page View */}
      <main className="site-view-main">
        {activePage === "Home" && (
          <Hero
            designMode={designMode}
            onSelectDesignMode={setDesignMode}
            portraitSrc={portraitSrc}
            accent={currentAccent}
            tier={performanceTier}
            reducedMotion={reducedMotion}
            onNavigate={setActivePage}
            onAdminTrigger={() => setAdminModalOpen(true)}
            cmsData={cmsState}
          />
        )}

        {activePage === "About" && <About cmsData={cmsState} />}

        {activePage === "Projects" && (
          <Project
            reduced={reducedMotion}
            cmsData={cmsState}
            isAdminLoggedIn={isAdminLoggedIn}
            onUpdateProjects={(updatedProjects) => {
              const newState = { ...(cmsState || {}), projects: updatedProjects };
              setCmsState(newState);
              savePortfolioToCloud(newState);
            }}
          />
        )}

        {activePage === "Journey" && <Journey cmsData={cmsState} />}

        {activePage === "Contact" && <Contact />}

        {activePage === "Admin" && (
          <AdminDashboard
            onLogout={() => {
              logoutAdmin();
              setIsAdminLoggedIn(false);
              handlePageChange("Home");
            }}
            onExitToPortfolio={() => handlePageChange("Home")}
            onSaveState={(newState) => {
              setCmsState(newState);
              savePortfolioToCloud(newState);
            }}
          />
        )}
      </main>

      {/* Hidden Glassmorphic Admin Login Modal */}
      <AdminLoginModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          setActivePage("Admin");
          window.location.hash = "admin";
          setAdminModalOpen(false);
        }}
      />
    </div>
  );
}

export default App;
