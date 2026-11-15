import { useState, useEffect } from "react";
import "./AdminDashboard.css";
import initialProjectsData from "../../data/initialProjects.json";
import initialAboutData from "../../data/initialAboutData.json";
import { savePortfolioToCloud, uploadPortfolioFile } from "../../services/portfolioDb";
import {
  FaUserShield,
  FaUserTie,
  FaBrain,
  FaProjectDiagram,
  FaGraduationCap,
  FaEnvelopeOpenText,
  FaRoute,
  FaSignOutAlt,
  FaArrowLeft,
  FaSave,
  FaCheckCircle,
  FaPlus,
  FaTrash,
  FaImage,
  FaUpload,
  FaBookOpen,
  FaExternalLinkAlt,
  FaChevronDown,
  FaChevronUp,
  FaFilePdf,
  FaDownload,
  FaCogs,
  FaSpinner
} from "react-icons/fa";

const adminTabs = [
  { id: "profile", label: "Profile Management", icon: FaUserTie },
  { id: "about", label: "About Section Management", icon: FaBrain },
  { id: "projects", label: "Projects Fleet Management", icon: FaProjectDiagram },
  { id: "journey", label: "Journey & Experience", icon: FaRoute },
  { id: "education", label: "Education & GPAs", icon: FaGraduationCap },
  { id: "stats", label: "Developer Stats Panel", icon: FaProjectDiagram },
  { id: "settings", label: "Portfolio & SEO Settings", icon: FaCogs },
  { id: "contact", label: "Contact Details", icon: FaEnvelopeOpenText }
];

const DEFAULT_PORTFOLIO_STATE = {
  profile: {
    name: "Priyanshu Kumar",
    displayName: "Priyanshu Kumar",
    email: "priyanshugse@gmail.com",
    phone: "9060956707",
    location: "Katihar, Bihar, India",
    role: "Aspiring Data Scientist",
    degree: "B.Tech CSE (AI & ML)",
    university: "Sandip University",
    academicYear: "3rd Year",
    tagline: "TURNING DATA INTO INTELLIGENCE",
    specialization: "AI & Machine Learning",
    careerObjective: "To become a skilled Data Scientist capable of transforming complex data into meaningful insights and building intelligent, data-driven solutions.",
    socials: [
      { id: "soc_1", platform: "GitHub", url: "https://github.com/offx-priyanshu" },
      { id: "soc_2", platform: "LinkedIn", url: "https://www.linkedin.com/in/priyanshu-kumar-ai/" },
      { id: "soc_3", platform: "Instagram", url: "https://www.instagram.com/offx.vipulll/" },
      { id: "soc_4", platform: "YouTube", url: "https://youtube.com" }
    ],
    semesters: [
      { sem: "Semester 1", gpa: "9.00" },
      { sem: "Semester 2", gpa: "8.26" },
      { sem: "Semester 3", gpa: "8.35" },
      { sem: "Semester 4", gpa: "8.73" }
    ]
  },
  hero: {
    headingLine1: "TURNING DATA",
    headingLine2: "INTO INTELLIGENCE",
    subtitle: "[ DATA SCIENCE · AI / ML · GENAI ]",
    introText: "Hi, I'm Priyanshu Kumar, a B.Tech CSE (AI & ML) student passionate about Data Science, Machine Learning, and Generative AI. I enjoy analyzing data, building intelligent applications, and transforming ideas into practical solutions."
  },
  about: {
    intro: initialAboutData.intro,
    sections: initialAboutData.sections,
    principles: initialAboutData.principles,
    dossierSummary: initialAboutData.dossierSummary,
    technicalSkills: initialAboutData.technicalSkills,
    experiences: initialAboutData.experiences,
    achievements: initialAboutData.achievements,
    certifications: initialAboutData.certifications
  },
  statistics: [
    { id: "stat_1", label: "VERIFIED_PROJECTS", value: "4" },
    { id: "stat_2", label: "SKILLS_MAPPED", value: "30+" },
    { id: "stat_3", label: "ROLE", value: "ASPIRING DATA SCIENTIST" },
    { id: "stat_4", label: "INTERNSHIPS", value: "2 COMPLETED" },
    { id: "stat_5", label: "FOCUS", value: "AI / ML & GENAI" },
    { id: "stat_6", label: "ACHIEVEMENT", value: "TOP 3 CHECKMATE" },
    { id: "stat_7", label: "AVAILABILITY", value: "OPEN FOR OPPORTUNITIES" },
    { id: "stat_8", label: "BASED IN", value: "KATIHAR, BIHAR, INDIA" }
  ],
  journey: [
    {
      id: "j_1",
      num: "01",
      date: "2024 — PRESENT",
      title: "B.TECH IN COMPUTER SCIENCE & ENGINEERING (AI & ML)",
      issuer: "Sandip University, Madhubani, Bihar, India",
      desc: "Enrolled in third year of B.Tech CSE specializing in Artificial Intelligence and Machine Learning. Building rigorous mathematical, algorithmic, and statistical foundations while maintaining consistent academic distinction (Sem 1: 9.00, Sem 2: 8.26, Sem 3: 8.35, Sem 4: 8.73).",
      tags: ["ACADEMIC EXCELLENCE", "DATA STRUCTURES", "ALGORITHMS", "DBMS", "STATISTICS"]
    },
    {
      id: "j_2",
      num: "02",
      date: "LEADERSHIP ROLE",
      title: "CLASS REPRESENTATIVE & TEAM LEAD",
      issuer: "Department of CSE (AI & ML), Sandip University",
      desc: "Elected Class Representative. Leading project teams, coordinating departmental activities, organizing student technical initiatives, and facilitating peer mentoring.",
      tags: ["STUDENT LEADERSHIP", "TEAM COORDINATION", "COMMUNICATION", "PROJECT MANAGEMENT"]
    },
    {
      id: "j_3",
      num: "03",
      date: "3-MONTH CRT JOURNEY",
      title: "TOP 3 IN CHECKMATE — DORMIQ (SMARTHOSTEL AI)",
      issuer: "Team Impact Crew — CRT Project Exhibition",
      desc: "Spearheaded technical development for DORMIQ (SmartHostel AI) with Team Impact Crew during an intensive three-month CRT journey. Successfully pitched and secured a TOP 3 position in the competitive CHECKMATE grand finale.",
      tags: ["TOP 3 CHECKMATE", "TEAM IMPACT CREW", "AI AUTOMATION", "SYSTEM DESIGN"]
    },
    {
      id: "j_4",
      num: "04",
      date: "05 MAY 2026 — 05 JUNE 2026",
      title: "DATA SCIENCE INTERN",
      issuer: "Cognifyz Technologies",
      desc: "Gained real-world industry experience as a Data Science Intern. Performed data preprocessing, exploratory data analysis (EDA), pattern discovery, and built data-driven solutions using Python and Pandas.",
      tags: ["DATA SCIENCE", "PYTHON", "PANDAS", "EDA", "DATA ANALYTICS"]
    },
    {
      id: "j_5",
      num: "05",
      date: "01 JUNE 2026 — 30 JUNE 2026",
      title: "ARTIFICIAL INTELLIGENCE INTERN",
      issuer: "Career Foresight (C-DAC ATC), Patna",
      desc: "Completed an offline summer internship focused on Artificial Intelligence fundamentals, supervised/unsupervised machine learning workflows, AI model development, and cross-functional technical project activities.",
      tags: ["ARTIFICIAL INTELLIGENCE", "MACHINE LEARNING", "MODEL WORKFLOWS", "TEAM COLLABORATION"]
    },
    {
      id: "j_6",
      num: "06",
      date: "CONTINUOUS LEARNING",
      title: "CERTIFICATIONS & ADVANCED AI SPECIALIZATION",
      issuer: "Oracle University • DeepLearning.AI • MongoDB • Microsoft",
      desc: "Earned industry credentials including Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate, DeepLearning.AI Machine Learning Specialization, MongoDB AI Agents & GenAI Apps, and Kaggle Python Coder.",
      tags: ["ORACLE CLOUD AI", "DEEPLEARNING.AI", "AI AGENTS", "GENAI", "RAG"]
    }
  ],
  projects: initialProjectsData
};

export default function AdminDashboard({ onLogout, onExitToPortfolio, onSaveState }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("portfolio_cms_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Normalize about object to contain all new structures if missing
        const existingAbout = parsed.about || {};
        const normalizedAbout = {
          intro: existingAbout.intro || initialAboutData.intro,
          sections: {
            whoIAm: existingAbout.whoIAm || existingAbout.sections?.whoIAm || initialAboutData.sections.whoIAm,
            technicalInterests: existingAbout.technicalInterests || existingAbout.sections?.technicalInterests || initialAboutData.sections.technicalInterests,
            leadership: existingAbout.leadership || existingAbout.sections?.leadership || initialAboutData.sections.leadership,
            careerGoals: existingAbout.careerGoals || existingAbout.sections?.careerGoals || initialAboutData.sections.careerGoals
          },
          principles: existingAbout.principles || initialAboutData.principles,
          dossierSummary: existingAbout.dossierSummary || initialAboutData.dossierSummary,
          technicalSkills: existingAbout.technicalSkills || initialAboutData.technicalSkills,
          experiences: existingAbout.experiences || initialAboutData.experiences,
          achievements: existingAbout.achievements || initialAboutData.achievements,
          certifications: existingAbout.certifications || initialAboutData.certifications
        };

        return {
          ...DEFAULT_PORTFOLIO_STATE,
          ...parsed,
          profile: { ...DEFAULT_PORTFOLIO_STATE.profile, ...(parsed.profile || {}) },
          hero: { ...DEFAULT_PORTFOLIO_STATE.hero, ...(parsed.hero || {}) },
          about: normalizedAbout,
          statistics: parsed.statistics || DEFAULT_PORTFOLIO_STATE.statistics,
          journey: parsed.journey || DEFAULT_PORTFOLIO_STATE.journey,
          projects: parsed.projects && parsed.projects.length > 0 ? parsed.projects : initialProjectsData
        };
      } catch {
        return DEFAULT_PORTFOLIO_STATE;
      }
    }
    return DEFAULT_PORTFOLIO_STATE;
  });
  const handleSave = async () => {
    setSaveLoading(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      localStorage.setItem("portfolio_cms_state", JSON.stringify(data));
      const res = await savePortfolioToCloud(data);
      if (res && res.success === false) {
        setSaveError(res.error || "Failed to sync to cloud database.");
      } else {
        if (onSaveState) {
          onSaveState(data);
        }
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      }
    } catch (err) {
      setSaveError(err.message || "Failed to save portfolio state.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG, JPG, WebP).");
      return;
    }

    setUploadingImage(true);
    try {
      const uploadRes = await uploadPortfolioFile(file, "profile");
      if (uploadRes && uploadRes.url) {
        const updated = {
          ...data,
          profile: {
            ...(data.profile || {}),
            image: uploadRes.url
          }
        };
        setData(updated);
        localStorage.setItem("portfolio_cms_state", JSON.stringify(updated));
        if (onSaveState) onSaveState(updated);
      }
    } catch (err) {
      alert("Image upload error: " + (err.message || "Could not upload image"));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddStat = () => {
    const newStat = {
      id: `stat_${Date.now()}`,
      label: "NEW_STAT",
      value: "100%"
    };
    setData((prev) => ({
      ...prev,
      statistics: [...(prev.statistics || []), newStat]
    }));
  };

  const handleDeleteStat = (id) => {
    setData((prev) => ({
      ...prev,
      statistics: prev.statistics.filter((s) => s.id !== id)
    }));
  };

  const handleAddSocial = () => {
    const newSoc = {
      id: `soc_${Date.now()}`,
      platform: "Custom Link",
      url: "https://"
    };
    setData((prev) => ({
      ...prev,
      profile: {
        ...(prev.profile || {}),
        socials: [...(prev.profile?.socials || []), newSoc]
      }
    }));
  };

  const handleDeleteSocial = (id) => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...(prev.profile || {}),
        socials: (prev.profile?.socials || []).filter((s) => s.id !== id)
      }
    }));
  };

  const handleAddSemester = () => {
    const currentCount = data.profile?.semesters?.length || 0;
    const newSem = {
      sem: `Semester ${currentCount + 1}`,
      gpa: ""
    };
    setData((prev) => ({
      ...prev,
      profile: {
        ...(prev.profile || {}),
        semesters: [...(prev.profile?.semesters || []), newSem]
      }
    }));
  };

  const handleDeleteSemester = (index) => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...(prev.profile || {}),
        semesters: (prev.profile?.semesters || []).filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddJourney = () => {
    const count = data.journey?.length || 0;
    const newMilestone = {
      id: `j_${Date.now()}`,
      num: String(count + 1).padStart(2, "0"),
      date: "NEW MILESTONE",
      title: "",
      issuer: "",
      desc: ""
    };
    setData((prev) => ({
      ...prev,
      journey: [...(prev.journey || []), newMilestone]
    }));
  };

  const handleDeleteJourney = (id) => {
    setData((prev) => ({
      ...prev,
      journey: (prev.journey || []).filter((j) => j.id !== id)
    }));
  };

  const handleAddTagToJourney = (journeyIdx) => {
    const newJourney = [...(data.journey || [])];
    const currentTags = Array.isArray(newJourney[journeyIdx].tags) ? [...newJourney[journeyIdx].tags] : [];
    currentTags.push("NEW TAG");
    newJourney[journeyIdx] = {
      ...newJourney[journeyIdx],
      tags: currentTags
    };
    const updatedState = { ...data, journey: newJourney };
    setData(updatedState);
    localStorage.setItem("portfolio_cms_state", JSON.stringify(updatedState));
    if (onSaveState) onSaveState(updatedState);
  };

  const handleDeleteTagFromJourney = (journeyIdx, tagIdx) => {
    const newJourney = [...(data.journey || [])];
    const currentTags = Array.isArray(newJourney[journeyIdx].tags) ? [...newJourney[journeyIdx].tags] : [];
    currentTags.splice(tagIdx, 1);
    newJourney[journeyIdx] = {
      ...newJourney[journeyIdx],
      tags: currentTags
    };
    const updatedState = { ...data, journey: newJourney };
    setData(updatedState);
    localStorage.setItem("portfolio_cms_state", JSON.stringify(updatedState));
    if (onSaveState) onSaveState(updatedState);
  };

  const handleTagChangeInJourney = (journeyIdx, tagIdx, newValue) => {
    const newJourney = [...(data.journey || [])];
    const currentTags = Array.isArray(newJourney[journeyIdx].tags) ? [...newJourney[journeyIdx].tags] : [];
    currentTags[tagIdx] = newValue;
    newJourney[journeyIdx] = {
      ...newJourney[journeyIdx],
      tags: currentTags
    };
    const updatedState = { ...data, journey: newJourney };
    setData(updatedState);
    localStorage.setItem("portfolio_cms_state", JSON.stringify(updatedState));
    if (onSaveState) onSaveState(updatedState);
  };

  // Projects Fleet Handlers
  const handleAddProject = () => {
    const count = data.projects?.length || 0;
    const newProj = {
      id: String(count + 1).padStart(2, "0"),
      title: "NEW AI PROJECT",
      filterCategory: "AI/ML",
      category: "AI/ML · NEW PROJECT",
      tagline: "Innovative Artificial Intelligence Application",
      desc: "Brief summary of what this project achieves and the problem it solves.",
      tech: ["Python", "Machine Learning"],
      github: "https://github.com/offx-priyanshu",
      demo: "https://github.com/offx-priyanshu",
      img: "imgRoadVision"
    };
    const updated = {
      ...data,
      projects: [...(data.projects || []), newProj]
    };
    setData(updated);
    localStorage.setItem("portfolio_cms_state", JSON.stringify(updated));
    if (onSaveState) onSaveState(updated);
  };

  const handleDeleteProject = (projId) => {
    const updated = {
      ...data,
      projects: (data.projects || []).filter((p) => p.id !== projId)
    };
    setData(updated);
    localStorage.setItem("portfolio_cms_state", JSON.stringify(updated));
    if (onSaveState) onSaveState(updated);
  };

  const handleResumePdfUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF document (.pdf)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("PDF file size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result;
      if (base64Data) {
        const updated = {
          ...data,
          resumeUrl: base64Data,
          resumeFileName: file.name
        };
        setData(updated);
        localStorage.setItem("portfolio_cms_state", JSON.stringify(updated));
        if (onSaveState) onSaveState(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProjectField = (projIdx, field, val) => {
    const newProjects = [...(data.projects || [])];
    newProjects[projIdx] = {
      ...newProjects[projIdx],
      [field]: val
    };
    const updated = { ...data, projects: newProjects };
    setData(updated);
    localStorage.setItem("portfolio_cms_state", JSON.stringify(updated));
    if (onSaveState) onSaveState(updated);
  };

  const handleProjectImageUpload = (projIdx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 3MB max for base64 storage
    if (file.size > 3 * 1024 * 1024) {
      alert("Image size should be less than 3MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result;
      if (base64Data) {
        handleUpdateProjectField(projIdx, "img", base64Data);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddTechToProject = (projIdx) => {
    const newProjects = [...(data.projects || [])];
    const techList = Array.isArray(newProjects[projIdx].tech) ? [...newProjects[projIdx].tech] : [];
    techList.push("NEW TECH");
    newProjects[projIdx] = { ...newProjects[projIdx], tech: techList };
    const updated = { ...data, projects: newProjects };
    setData(updated);
    localStorage.setItem("portfolio_cms_state", JSON.stringify(updated));
    if (onSaveState) onSaveState(updated);
  };

  const handleDeleteTechFromProject = (projIdx, techIdx) => {
    const newProjects = [...(data.projects || [])];
    const techList = Array.isArray(newProjects[projIdx].tech) ? [...newProjects[projIdx].tech] : [];
    techList.splice(techIdx, 1);
    newProjects[projIdx] = { ...newProjects[projIdx], tech: techList };
    const updated = { ...data, projects: newProjects };
    setData(updated);
    localStorage.setItem("portfolio_cms_state", JSON.stringify(updated));
    if (onSaveState) onSaveState(updated);
  };

  const handleTechChangeInProject = (projIdx, techIdx, val) => {
    const newProjects = [...(data.projects || [])];
    const techList = Array.isArray(newProjects[projIdx].tech) ? [...newProjects[projIdx].tech] : [];
    techList[techIdx] = val;
    newProjects[projIdx] = { ...newProjects[projIdx], tech: techList };
    const updated = { ...data, projects: newProjects };
    setData(updated);
    localStorage.setItem("portfolio_cms_state", JSON.stringify(updated));
    if (onSaveState) onSaveState(updated);
  };

  const handleAddFeatureToProject = (projIdx) => {
    const newProjects = [...(data.projects || [])];
    const featList = Array.isArray(newProjects[projIdx].keyFeatures) ? [...newProjects[projIdx].keyFeatures] : [];
    featList.push("New Key Feature / Capability");
    newProjects[projIdx] = { ...newProjects[projIdx], keyFeatures: featList };
    const updated = { ...data, projects: newProjects };
    setData(updated);
    localStorage.setItem("portfolio_cms_state", JSON.stringify(updated));
    if (onSaveState) onSaveState(updated);
  };

  const handleDeleteFeatureFromProject = (projIdx, featIdx) => {
    const newProjects = [...(data.projects || [])];
    const featList = Array.isArray(newProjects[projIdx].keyFeatures) ? [...newProjects[projIdx].keyFeatures] : [];
    featList.splice(featIdx, 1);
    newProjects[projIdx] = { ...newProjects[projIdx], keyFeatures: featList };
    const updated = { ...data, projects: newProjects };
    setData(updated);
    localStorage.setItem("portfolio_cms_state", JSON.stringify(updated));
    if (onSaveState) onSaveState(updated);
  };

  const handleFeatureChangeInProject = (projIdx, featIdx, val) => {
    const newProjects = [...(data.projects || [])];
    const featList = Array.isArray(newProjects[projIdx].keyFeatures) ? [...newProjects[projIdx].keyFeatures] : [];
    featList[featIdx] = val;
    newProjects[projIdx] = { ...newProjects[projIdx], keyFeatures: featList };
    const updated = { ...data, projects: newProjects };
    setData(updated);
    localStorage.setItem("portfolio_cms_state", JSON.stringify(updated));
    if (onSaveState) onSaveState(updated);
  };

  const [expandedCaseStudy, setExpandedCaseStudy] = useState(null);
  const [previewCaseModal, setPreviewCaseModal] = useState(null);

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-icon">
            <FaUserShield size={20} />
          </div>
          <div>
            <h3>Admin Portal</h3>
            <p>Portfolio Settings</p>
          </div>
        </div>

        <nav className="admin-nav-list">
          {adminTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`admin-nav-item ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-btn-back" onClick={onExitToPortfolio}>
            <FaArrowLeft />
            <span>Return to Portfolio</span>
          </button>
          <button className="admin-btn-logout" onClick={onLogout}>
            <FaSignOutAlt />
            <span>Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="admin-main-panel">
        <header className="admin-top-bar">
          <div>
            <h2>{adminTabs.find((t) => t.id === activeTab)?.label || "Settings"}</h2>
            <p>Direct CMS control over portfolio assets and live data</p>
          </div>
          <div className="admin-top-actions">
            <div className="admin-status-pill">
              <span className="dot"></span>
              <span>Admin Active</span>
            </div>
          </div>
        </header>

        <section className="admin-content-body">
          {saveSuccess && (
            <div className="admin-save-alert success">
              <FaCheckCircle size={16} />
              <span>All changes saved and synchronized with your live portfolio!</span>
            </div>
          )}

          {saveError && (
            <div className="admin-save-alert error" style={{ background: "rgba(239, 68, 68, 0.2)", border: "1px solid #ef4444", color: "#fca5a5" }}>
              <span>{saveError}</span>
            </div>
          )}

          {/* 0. Profile Management */}
          {activeTab === "profile" && (
            <div className="cms-card">
              <div className="cms-card-header">
                <h4><FaUserTie /> [0] Profile & Core Identity Management</h4>
                <p>Customize your personal identity, roles, hero typography, profile image, and official resume</p>
              </div>

              {/* Profile Image & Resume Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                {/* Profile Image Management */}
                <div style={{ padding: "16px", background: "#0a0a14", border: "1px solid rgba(139, 92, 246, 0.25)", borderRadius: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}>
                      <FaImage color="#c4b5fd" /> PROFILE IMAGE / AVATAR
                    </span>
                    <label style={{ background: "#7c3aed", color: "#fff", padding: "4px 10px", borderRadius: "5px", fontSize: "11px", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                      <FaUpload size={10} />
                      <span>{uploadingImage ? "Uploading..." : "Upload New Image"}</span>
                      <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleProfileImageUpload} disabled={uploadingImage} />
                    </label>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <div style={{ width: "80px", height: "80px", borderRadius: "10px", overflow: "hidden", border: "2px solid rgba(139, 92, 246, 0.4)", background: "#000", flexShrink: 0 }}>
                      <img
                        src={data.profile?.image || `${import.meta.env.BASE_URL}priyanshu-enhanced.jpg`}
                        alt="Profile Preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: "11px", color: "#888", display: "block", marginBottom: "4px" }}>Image Direct URL / Path</label>
                      <input
                        type="text"
                        value={data.profile?.image || ""}
                        onChange={(e) => setData({ ...data, profile: { ...(data.profile || {}), image: e.target.value } })}
                        placeholder="https://... or /priyanshu-enhanced.jpg"
                        style={{ width: "100%", background: "#080811", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "5px", padding: "6px 10px", color: "#fff", fontSize: "12px" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Resume / CV Document */}
                <div style={{ padding: "16px", background: "#0a0a14", border: "1px solid rgba(139, 92, 246, 0.25)", borderRadius: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}>
                      <FaFilePdf color="#ec4899" /> OFFICIAL RESUME (PDF)
                    </span>
                    <label style={{ background: "linear-gradient(135deg, #ec4899, #be185d)", color: "#fff", padding: "4px 10px", borderRadius: "5px", fontSize: "11px", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                      <FaUpload size={10} />
                      <span>Upload PDF</span>
                      <input type="file" accept="application/pdf" style={{ display: "none" }} onChange={handleResumePdfUpload} />
                    </label>
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", color: "#888", display: "block", marginBottom: "4px" }}>Resume File Name / URL</label>
                    <input
                      type="text"
                      value={data.resumeUrl && !data.resumeUrl.startsWith("data:") ? data.resumeUrl : (data.resumeFileName || "priyanshu-resume.pdf")}
                      onChange={(e) => setData({ ...data, resumeUrl: e.target.value, resumeFileName: e.target.value.split("/").pop() || "Resume.pdf" })}
                      placeholder="Resume URL or file name"
                      style={{ width: "100%", background: "#080811", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "5px", padding: "6px 10px", color: "#fff", fontSize: "12px" }}
                    />
                  </div>
                </div>
              </div>

              {/* Core Identity Fields */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                <div className="admin-field" style={{ margin: 0 }}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={data.profile?.name || ""}
                    onChange={(e) => setData({ ...data, profile: { ...(data.profile || {}), name: e.target.value } })}
                    placeholder="Priyanshu Kumar"
                  />
                </div>
                <div className="admin-field" style={{ margin: 0 }}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={data.profile?.email || ""}
                    onChange={(e) => setData({ ...data, profile: { ...(data.profile || {}), email: e.target.value } })}
                    placeholder="priyanshugse@gmail.com"
                  />
                </div>
                <div className="admin-field" style={{ margin: 0 }}>
                  <label>Contact Number</label>
                  <input
                    type="text"
                    value={data.profile?.phone || ""}
                    onChange={(e) => setData({ ...data, profile: { ...(data.profile || {}), phone: e.target.value } })}
                    placeholder="9060956707"
                  />
                </div>
                <div className="admin-field" style={{ margin: 0 }}>
                  <label>Location / City</label>
                  <input
                    type="text"
                    value={data.profile?.location || ""}
                    onChange={(e) => setData({ ...data, profile: { ...(data.profile || {}), location: e.target.value } })}
                    placeholder="Katihar, Bihar, India"
                  />
                </div>
                <div className="admin-field" style={{ margin: 0 }}>
                  <label>Professional Tagline / Role</label>
                  <input
                    type="text"
                    value={data.profile?.role || ""}
                    onChange={(e) => setData({ ...data, profile: { ...(data.profile || {}), role: e.target.value } })}
                    placeholder="Aspiring Data Scientist"
                  />
                </div>
                <div className="admin-field" style={{ margin: 0 }}>
                  <label>Academic Degree & University</label>
                  <input
                    type="text"
                    value={data.profile?.degree || ""}
                    onChange={(e) => setData({ ...data, profile: { ...(data.profile || {}), degree: e.target.value } })}
                    placeholder="B.Tech CSE (AI & ML) - Sandip University"
                  />
                </div>
              </div>

              {/* Hero Typography & Supporting Introduction */}
              <div style={{ marginTop: "16px", padding: "16px", background: "#0a0a14", border: "1px solid rgba(139, 92, 246, 0.2)", borderRadius: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#c4b5fd", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
                  HERO HEADINGS & INTRODUCTORY PARAGRAPH
                </span>
                <div className="admin-grid-2" style={{ marginBottom: "12px" }}>
                  <div className="admin-field" style={{ margin: 0 }}>
                    <label>Hero Heading Line 1</label>
                    <input
                      type="text"
                      value={data.hero?.headingLine1 || ""}
                      onChange={(e) => setData({ ...data, hero: { ...(data.hero || {}), headingLine1: e.target.value } })}
                      placeholder="TURNING DATA"
                    />
                  </div>
                  <div className="admin-field" style={{ margin: 0 }}>
                    <label>Hero Heading Line 2</label>
                    <input
                      type="text"
                      value={data.hero?.headingLine2 || ""}
                      onChange={(e) => setData({ ...data, hero: { ...(data.hero || {}), headingLine2: e.target.value } })}
                      placeholder="INTO INTELLIGENCE"
                    />
                  </div>
                </div>
                <div className="admin-field">
                  <label>Hero Subtitle Badge</label>
                  <input
                    type="text"
                    value={data.hero?.subtitle || ""}
                    onChange={(e) => setData({ ...data, hero: { ...(data.hero || {}), subtitle: e.target.value } })}
                    placeholder="[ DATA SCIENCE · AI / ML · GENAI ]"
                  />
                </div>
                <div className="admin-field">
                  <label>Supporting Introduction Paragraph</label>
                  <textarea
                    rows={4}
                    value={data.hero?.introText || ""}
                    onChange={(e) => setData({ ...data, hero: { ...(data.hero || {}), introText: e.target.value } })}
                    placeholder="Hi, I'm Priyanshu Kumar, a B.Tech CSE (AI & ML) student..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* 1. About Section Management */}
          {activeTab === "about" && (
            <div className="cms-card">
              <div className="cms-card-header">
                <h4><FaBrain /> [1] About Section Management</h4>
                <p>Customize all bio narratives, principles, dossier skills, achievements & certifications</p>
              </div>

              {/* Sub-section 0: Official Resume PDF Upload */}
              <div style={{ marginBottom: "16px", padding: "14px 16px", background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(16, 185, 129, 0.05))", border: "1px solid rgba(139, 92, 246, 0.35)", borderRadius: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <FaFilePdf size={16} color="#ec4899" />
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff", letterSpacing: "0.5px" }}>
                      OFFICIAL RESUME / CV DOCUMENT (PDF)
                    </span>
                    <span style={{ fontSize: "10px", background: "rgba(139, 92, 246, 0.25)", color: "#c4b5fd", padding: "2px 8px", borderRadius: "12px" }}>
                      Live Download Sync
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <label
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                        color: "#fff",
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "5px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      <FaUpload size={10} />
                      <span>Upload New PDF</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        style={{ display: "none" }}
                        onChange={handleResumePdfUpload}
                      />
                    </label>

                    {data.resumeUrl && (
                      <a
                        href={data.resumeUrl}
                        download={data.resumeFileName || "Priyanshu_Resume.pdf"}
                        style={{
                          background: "rgba(16, 185, 129, 0.2)",
                          border: "1px solid #10b981",
                          color: "#34d399",
                          fontSize: "11px",
                          fontWeight: 600,
                          padding: "5px 12px",
                          borderRadius: "6px",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px"
                        }}
                      >
                        <FaDownload size={10} />
                        <span>Test Download</span>
                      </a>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="text"
                    value={data.resumeUrl && !data.resumeUrl.startsWith("data:") ? data.resumeUrl : (data.resumeFileName ? `Uploaded File: ${data.resumeFileName}` : "")}
                    onChange={(e) => {
                      const updated = {
                        ...data,
                        resumeUrl: e.target.value,
                        resumeFileName: e.target.value.split("/").pop() || "Resume.pdf"
                      };
                      setData(updated);
                      localStorage.setItem("portfolio_cms_state", JSON.stringify(updated));
                      if (onSaveState) onSaveState(updated);
                    }}
                    placeholder="Upload a PDF above or paste direct PDF link (https://...)"
                    style={{
                      flex: 1,
                      background: "#080811",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "6px",
                      padding: "7px 12px",
                      color: "#fff",
                      fontSize: "12px"
                    }}
                  />
                  {data.resumeUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = {
                          ...data,
                          resumeUrl: null,
                          resumeFileName: null
                        };
                        setData(updated);
                        localStorage.setItem("portfolio_cms_state", JSON.stringify(updated));
                        if (onSaveState) onSaveState(updated);
                      }}
                      style={{
                        background: "rgba(239, 68, 68, 0.15)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        color: "#fca5a5",
                        borderRadius: "6px",
                        padding: "6px 12px",
                        fontSize: "11px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                      title="Reset to default resume"
                    >
                      <FaTrash size={10} />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Sub-section A: Intro Header & Taglines */}
              <div style={{ marginBottom: "16px", padding: "14px", background: "#0a0a14", border: "1px solid rgba(139, 92, 246, 0.2)", borderRadius: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#c4b5fd", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
                  01. INTRODUCTION & HERO HEADER
                </span>
                <div className="admin-field">
                  <label>Kicker / Subtitle</label>
                  <input
                    type="text"
                    value={data.about?.intro?.kicker || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        about: {
                          ...data.about,
                          intro: { ...(data.about?.intro || {}), kicker: e.target.value }
                        }
                      })
                    }
                    placeholder="e.g. Aspiring Data Scientist | AI & Machine Learning | Generative AI"
                  />
                </div>
                <div className="admin-grid-2">
                  <div className="admin-field" style={{ margin: 0 }}>
                    <label>Main Title Line 1</label>
                    <input
                      type="text"
                      value={data.about?.intro?.headingLine1 || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          about: {
                            ...data.about,
                            intro: { ...(data.about?.intro || {}), headingLine1: e.target.value }
                          }
                        })
                      }
                      placeholder="TURNING DATA"
                    />
                  </div>
                  <div className="admin-field" style={{ margin: 0 }}>
                    <label>Main Title Line 2</label>
                    <input
                      type="text"
                      value={data.about?.intro?.headingLine2 || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          about: {
                            ...data.about,
                            intro: { ...(data.about?.intro || {}), headingLine2: e.target.value }
                          }
                        })
                      }
                      placeholder="INTO INTELLIGENCE"
                    />
                  </div>
                </div>
                <div className="admin-field" style={{ marginTop: "10px" }}>
                  <label>Introductory Paragraph (Prose)</label>
                  <textarea
                    rows={2}
                    value={data.about?.intro?.prose || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        about: {
                          ...data.about,
                          intro: { ...(data.about?.intro || {}), prose: e.target.value }
                        }
                      })
                    }
                    placeholder="Hi, I'm Priyanshu Kumar..."
                  />
                </div>
              </div>

              {/* Sub-section B: Editorial Bio Pillars */}
              <div style={{ marginBottom: "16px", padding: "14px", background: "#0a0a14", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#a78bfa", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
                  EDITORIAL PILLARS & NARRATIVES
                </span>

                <div className="admin-field">
                  <label>[ Who I Am ]</label>
                  <textarea
                    rows={3}
                    value={data.about?.sections?.whoIAm ?? (data.about?.whoIAm || "")}
                    onChange={(e) =>
                      setData({
                        ...data,
                        about: {
                          ...data.about,
                          whoIAm: e.target.value,
                          sections: { ...(data.about?.sections || {}), whoIAm: e.target.value }
                        }
                      })
                    }
                  />
                </div>

                <div className="admin-field">
                  <label>[ Technical Interests ]</label>
                  <textarea
                    rows={3}
                    value={data.about?.sections?.technicalInterests ?? (data.about?.technicalInterests || "")}
                    onChange={(e) =>
                      setData({
                        ...data,
                        about: {
                          ...data.about,
                          technicalInterests: e.target.value,
                          sections: { ...(data.about?.sections || {}), technicalInterests: e.target.value }
                        }
                      })
                    }
                  />
                </div>

                <div className="admin-field">
                  <label>[ Leadership & Collaboration ]</label>
                  <textarea
                    rows={3}
                    value={data.about?.sections?.leadership ?? (data.about?.leadership || "")}
                    onChange={(e) =>
                      setData({
                        ...data,
                        about: {
                          ...data.about,
                          leadership: e.target.value,
                          sections: { ...(data.about?.sections || {}), leadership: e.target.value }
                        }
                      })
                    }
                  />
                </div>

                <div className="admin-field">
                  <label>[ Career Goals ]</label>
                  <textarea
                    rows={3}
                    value={data.about?.sections?.careerGoals ?? (data.about?.careerGoals || "")}
                    onChange={(e) =>
                      setData({
                        ...data,
                        about: {
                          ...data.about,
                          careerGoals: e.target.value,
                          sections: { ...(data.about?.sections || {}), careerGoals: e.target.value }
                        }
                      })
                    }
                  />
                </div>
              </div>

              {/* Sub-section C: 02 How I Work Principles */}
              <div style={{ marginBottom: "16px", padding: "14px", background: "#0a0a14", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#a78bfa", letterSpacing: "1px", textTransform: "uppercase" }}>
                    02. HOW I WORK PRINCIPLES ({(data.about?.principles || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const principles = [...(data.about?.principles || [])];
                      principles.push({
                        id: `pr_${Date.now()}`,
                        title: "New Principle",
                        desc: "Explain the philosophy or technical principle..."
                      });
                      setData({ ...data, about: { ...data.about, principles } });
                    }}
                    style={{
                      background: "rgba(139, 92, 246, 0.2)",
                      border: "1px dashed #8b5cf6",
                      color: "#c4b5fd",
                      fontSize: "11px",
                      padding: "4px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}
                  >
                    <FaPlus size={10} />
                    <span>Add Principle</span>
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {(data.about?.principles || []).map((pr, pIdx) => (
                    <div
                      key={pr.id || pIdx}
                      style={{
                        background: "#080811",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        borderRadius: "6px",
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                        <span style={{ fontSize: "11px", color: "#8b5cf6", fontWeight: 700 }}>
                          0{pIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={pr.title || ""}
                          onChange={(e) => {
                            const principles = [...(data.about?.principles || [])];
                            principles[pIdx] = { ...principles[pIdx], title: e.target.value };
                            setData({ ...data, about: { ...data.about, principles } });
                          }}
                          placeholder="Principle Title (e.g. Build by hand)"
                          style={{
                            flex: 1,
                            background: "#0d0d1a",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            color: "#fff",
                            fontSize: "12px",
                            fontWeight: 700
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const principles = [...(data.about?.principles || [])];
                            principles.splice(pIdx, 1);
                            setData({ ...data, about: { ...data.about, principles } });
                          }}
                          style={{
                            background: "rgba(239, 68, 68, 0.15)",
                            border: "none",
                            color: "#fca5a5",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            cursor: "pointer"
                          }}
                        >
                          <FaTrash size={10} />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={pr.desc || ""}
                        onChange={(e) => {
                          const principles = [...(data.about?.principles || [])];
                          principles[pIdx] = { ...principles[pIdx], desc: e.target.value };
                          setData({ ...data, about: { ...data.about, principles } });
                        }}
                        placeholder="Description..."
                        style={{
                          width: "100%",
                          background: "#0d0d1a",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "4px",
                          padding: "6px 8px",
                          color: "#ccc",
                          fontSize: "12px",
                          resize: "vertical"
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-section D: 03 Verified Dossier Candidate Summary */}
              <div style={{ marginBottom: "16px", padding: "14px", background: "#0a0a14", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#a78bfa", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
                  03. DOSSIER CANDIDATE PROFILE SUMMARY
                </span>
                <div className="admin-field" style={{ margin: 0 }}>
                  <label>Curriculum Vitae / Dossier Bio Paragraph</label>
                  <textarea
                    rows={3}
                    value={data.about?.dossierSummary || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        about: { ...data.about, dossierSummary: e.target.value }
                      })
                    }
                    placeholder="Summary paragraph inside verified candidate dossier..."
                    style={{ width: "100%", resize: "vertical" }}
                  />
                </div>
              </div>

              {/* Sub-section E: Technical Skills Matrix Categories & Pills */}
              <div style={{ marginBottom: "16px", padding: "14px", background: "#0a0a14", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#a78bfa", letterSpacing: "1px", textTransform: "uppercase" }}>
                    TECHNICAL SKILLS MATRIX ({(data.about?.technicalSkills || []).length} Categories)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const techSkills = [...(data.about?.technicalSkills || [])];
                      techSkills.push({
                        id: `ts_${Date.now()}`,
                        category: "NEW SKILL DOMAIN",
                        items: ["Skill 1", "Skill 2"]
                      });
                      setData({ ...data, about: { ...data.about, technicalSkills: techSkills } });
                    }}
                    style={{
                      background: "rgba(139, 92, 246, 0.2)",
                      border: "1px dashed #8b5cf6",
                      color: "#c4b5fd",
                      fontSize: "11px",
                      padding: "4px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}
                  >
                    <FaPlus size={10} />
                    <span>Add Category</span>
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {(data.about?.technicalSkills || []).map((cat, cIdx) => (
                    <div
                      key={cat.id || cIdx}
                      style={{
                        background: "#080811",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "8px",
                        padding: "10px 12px"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                        <input
                          type="text"
                          value={cat.category}
                          onChange={(e) => {
                            const techSkills = [...(data.about?.technicalSkills || [])];
                            techSkills[cIdx] = { ...techSkills[cIdx], category: e.target.value.toUpperCase() };
                            setData({ ...data, about: { ...data.about, technicalSkills: techSkills } });
                          }}
                          placeholder="CATEGORY NAME"
                          style={{
                            background: "#0d0d1a",
                            border: "1px solid rgba(139, 92, 246, 0.3)",
                            borderRadius: "5px",
                            padding: "4px 8px",
                            color: "#c4b5fd",
                            fontSize: "11.5px",
                            fontWeight: 700,
                            letterSpacing: "0.5px"
                          }}
                        />
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <button
                            type="button"
                            onClick={() => {
                              const techSkills = [...(data.about?.technicalSkills || [])];
                              const items = Array.isArray(techSkills[cIdx].items) ? [...techSkills[cIdx].items] : [];
                              items.push("New Skill");
                              techSkills[cIdx] = { ...techSkills[cIdx], items };
                              setData({ ...data, about: { ...data.about, technicalSkills: techSkills } });
                            }}
                            style={{
                              background: "rgba(139, 92, 246, 0.2)",
                              border: "none",
                              color: "#ddd6fe",
                              fontSize: "10.5px",
                              padding: "3px 8px",
                              borderRadius: "4px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px"
                            }}
                          >
                            <FaPlus size={8} />
                            <span>Add Skill</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const techSkills = [...(data.about?.technicalSkills || [])];
                              techSkills.splice(cIdx, 1);
                              setData({ ...data, about: { ...data.about, technicalSkills: techSkills } });
                            }}
                            style={{
                              background: "rgba(239, 68, 68, 0.15)",
                              border: "none",
                              color: "#fca5a5",
                              borderRadius: "4px",
                              padding: "4px 6px",
                              cursor: "pointer"
                            }}
                            title="Delete Category"
                          >
                            <FaTrash size={10} />
                          </button>
                        </div>
                      </div>

                      {/* Individual Skill Pills */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {(Array.isArray(cat.items) ? cat.items : []).map((skill, sIdx) => (
                          <div
                            key={sIdx}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              background: "#0d0d1a",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              padding: "3px 6px 3px 8px",
                              borderRadius: "5px"
                            }}
                          >
                            <input
                              type="text"
                              value={skill}
                              onChange={(e) => {
                                const techSkills = [...(data.about?.technicalSkills || [])];
                                const items = [...techSkills[cIdx].items];
                                items[sIdx] = e.target.value;
                                techSkills[cIdx] = { ...techSkills[cIdx], items };
                                setData({ ...data, about: { ...data.about, technicalSkills: techSkills } });
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#fff",
                                fontSize: "11px",
                                width: `${Math.max(50, skill.length * 8)}px`,
                                padding: "1px"
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const techSkills = [...(data.about?.technicalSkills || [])];
                                const items = [...techSkills[cIdx].items];
                                items.splice(sIdx, 1);
                                techSkills[cIdx] = { ...techSkills[cIdx], items };
                                setData({ ...data, about: { ...data.about, technicalSkills: techSkills } });
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#fca5a5",
                                cursor: "pointer",
                                padding: "1px"
                              }}
                            >
                              <FaTrash size={8} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-section F: Achievements & Leadership Highlights */}
              <div style={{ marginBottom: "16px", padding: "14px", background: "#0a0a14", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#a78bfa", letterSpacing: "1px", textTransform: "uppercase" }}>
                    ACHIEVEMENTS & LEADERSHIP HIGHLIGHTS ({(data.about?.achievements || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const achs = [...(data.about?.achievements || [])];
                      achs.push({
                        id: `ach_${Date.now()}`,
                        badge: "NEW ACHIEVEMENT",
                        title: "Achievement Title",
                        project: "Project / Department",
                        team: "Team / Location",
                        desc: "Details and impact of the achievement..."
                      });
                      setData({ ...data, about: { ...data.about, achievements: achs } });
                    }}
                    style={{
                      background: "rgba(139, 92, 246, 0.2)",
                      border: "1px dashed #8b5cf6",
                      color: "#c4b5fd",
                      fontSize: "11px",
                      padding: "4px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}
                  >
                    <FaPlus size={10} />
                    <span>Add Highlight</span>
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {(data.about?.achievements || []).map((ach, aIdx) => (
                    <div
                      key={ach.id || aIdx}
                      style={{
                        background: "#080811",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        borderRadius: "8px",
                        padding: "10px 12px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                        <div style={{ display: "flex", gap: "8px", flex: 1 }}>
                          <input
                            type="text"
                            value={ach.badge}
                            onChange={(e) => {
                              const achs = [...(data.about?.achievements || [])];
                              achs[aIdx] = { ...achs[aIdx], badge: e.target.value.toUpperCase() };
                              setData({ ...data, about: { ...data.about, achievements: achs } });
                            }}
                            placeholder="BADGE (e.g. TOP 3 FINALIST)"
                            style={{
                              background: "#0d0d1a",
                              border: "1px solid rgba(139, 92, 246, 0.3)",
                              borderRadius: "4px",
                              padding: "4px 8px",
                              color: "#c4b5fd",
                              fontSize: "11px",
                              fontWeight: 700,
                              width: "160px"
                            }}
                          />
                          <input
                            type="text"
                            value={ach.title}
                            onChange={(e) => {
                              const achs = [...(data.about?.achievements || [])];
                              achs[aIdx] = { ...achs[aIdx], title: e.target.value };
                              setData({ ...data, about: { ...data.about, achievements: achs } });
                            }}
                            placeholder="Title..."
                            style={{
                              flex: 1,
                              background: "#0d0d1a",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              borderRadius: "4px",
                              padding: "4px 8px",
                              color: "#fff",
                              fontSize: "12px",
                              fontWeight: 700
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const achs = [...(data.about?.achievements || [])];
                            achs.splice(aIdx, 1);
                            setData({ ...data, about: { ...data.about, achievements: achs } });
                          }}
                          style={{
                            background: "rgba(239, 68, 68, 0.15)",
                            border: "none",
                            color: "#fca5a5",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            cursor: "pointer"
                          }}
                        >
                          <FaTrash size={10} />
                        </button>
                      </div>

                      <div className="admin-grid-2" style={{ gap: "8px" }}>
                        <input
                          type="text"
                          value={ach.project}
                          onChange={(e) => {
                            const achs = [...(data.about?.achievements || [])];
                            achs[aIdx] = { ...achs[aIdx], project: e.target.value };
                            setData({ ...data, about: { ...data.about, achievements: achs } });
                          }}
                          placeholder="Project / Scope (e.g. DORMIQ)"
                          style={{
                            background: "#0d0d1a",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: "4px",
                            padding: "5px 8px",
                            color: "#ddd",
                            fontSize: "11.5px"
                          }}
                        />
                        <input
                          type="text"
                          value={ach.team}
                          onChange={(e) => {
                            const achs = [...(data.about?.achievements || [])];
                            achs[aIdx] = { ...achs[aIdx], team: e.target.value };
                            setData({ ...data, about: { ...data.about, achievements: achs } });
                          }}
                          placeholder="Team / Context (e.g. Team Impact Crew)"
                          style={{
                            background: "#0d0d1a",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: "4px",
                            padding: "5px 8px",
                            color: "#ddd",
                            fontSize: "11.5px"
                          }}
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={ach.desc}
                        onChange={(e) => {
                          const achs = [...(data.about?.achievements || [])];
                          achs[aIdx] = { ...achs[aIdx], desc: e.target.value };
                          setData({ ...data, about: { ...data.about, achievements: achs } });
                        }}
                        placeholder="Description..."
                        style={{
                          width: "100%",
                          background: "#0d0d1a",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "4px",
                          padding: "6px 8px",
                          color: "#bbb",
                          fontSize: "12px",
                          resize: "vertical"
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-section G: Certifications & Verified Credentials */}
              <div style={{ marginBottom: "16px", padding: "14px", background: "#0a0a14", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#a78bfa", letterSpacing: "1px", textTransform: "uppercase" }}>
                    CERTIFICATIONS & VERIFIED CREDENTIALS ({(data.about?.certifications || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const certs = [...(data.about?.certifications || [])];
                      certs.push({
                        id: `cert_${Date.now()}`,
                        title: "Certification Title",
                        issuer: "Issuing Organization",
                        topics: "Key Skills, Topics & Specializations"
                      });
                      setData({ ...data, about: { ...data.about, certifications: certs } });
                    }}
                    style={{
                      background: "rgba(139, 92, 246, 0.2)",
                      border: "1px dashed #8b5cf6",
                      color: "#c4b5fd",
                      fontSize: "11px",
                      padding: "4px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}
                  >
                    <FaPlus size={10} />
                    <span>Add Certification</span>
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {(data.about?.certifications || []).map((c, cIdx) => (
                    <div
                      key={c.id || cIdx}
                      style={{
                        background: "#080811",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        borderRadius: "8px",
                        padding: "10px 12px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                        <input
                          type="text"
                          value={c.title}
                          onChange={(e) => {
                            const certs = [...(data.about?.certifications || [])];
                            certs[cIdx] = { ...certs[cIdx], title: e.target.value };
                            setData({ ...data, about: { ...data.about, certifications: certs } });
                          }}
                          placeholder="Certificate Title..."
                          style={{
                            flex: 1,
                            background: "#0d0d1a",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            color: "#fff",
                            fontSize: "12px",
                            fontWeight: 700
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const certs = [...(data.about?.certifications || [])];
                            certs.splice(cIdx, 1);
                            setData({ ...data, about: { ...data.about, certifications: certs } });
                          }}
                          style={{
                            background: "rgba(239, 68, 68, 0.15)",
                            border: "none",
                            color: "#fca5a5",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            cursor: "pointer"
                          }}
                        >
                          <FaTrash size={10} />
                        </button>
                      </div>

                      <div className="admin-grid-2" style={{ gap: "8px" }}>
                        <input
                          type="text"
                          value={c.issuer}
                          onChange={(e) => {
                            const certs = [...(data.about?.certifications || [])];
                            certs[cIdx] = { ...certs[cIdx], issuer: e.target.value };
                            setData({ ...data, about: { ...data.about, certifications: certs } });
                          }}
                          placeholder="Issuer (e.g. Oracle University, Coursera)"
                          style={{
                            background: "#0d0d1a",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: "4px",
                            padding: "5px 8px",
                            color: "#ddd",
                            fontSize: "11.5px"
                          }}
                        />
                        <input
                          type="text"
                          value={c.topics}
                          onChange={(e) => {
                            const certs = [...(data.about?.certifications || [])];
                            certs[cIdx] = { ...certs[cIdx], topics: e.target.value };
                            setData({ ...data, about: { ...data.about, certifications: certs } });
                          }}
                          placeholder="Topics / Highlights..."
                          style={{
                            background: "#0d0d1a",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: "4px",
                            padding: "5px 8px",
                            color: "#bbb",
                            fontSize: "11.5px"
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. Projects Fleet Management */}
          {activeTab === "projects" && (
            <div className="cms-card">
              <div className="cms-card-header">
                <h4><FaProjectDiagram /> [3] Projects Fleet ({(data.projects || []).length} AI/ML Projects)</h4>
                <p>Add, edit, delete, or modify interactive projects and tech stacks</p>
              </div>

              <div className="stats-manager-list" style={{ gap: "14px" }}>
                {(data.projects || []).map((proj, pIdx) => (
                  <div
                    key={proj.id || pIdx}
                    style={{
                      background: "#090912",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "10px",
                      padding: "14px 16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "11px", color: "#a78bfa", fontWeight: 700 }}>
                          PROJECT #{proj.id || String(pIdx + 1).padStart(2, "0")}
                        </span>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => handleUpdateProjectField(pIdx, "title", e.target.value)}
                          placeholder="Project Title"
                          style={{
                            background: "#0d0d1a",
                            border: "1px solid rgba(139, 92, 246, 0.3)",
                            borderRadius: "6px",
                            padding: "4px 8px",
                            color: "#fff",
                            fontSize: "13px",
                            fontWeight: 700
                          }}
                        />
                      </div>
                      <button
                        className="stat-del-btn"
                        onClick={() => handleDeleteProject(proj.id)}
                        title="Delete Project"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>

                    <div className="admin-grid-2" style={{ gap: "8px" }}>
                      <div className="admin-field" style={{ margin: 0 }}>
                        <label style={{ fontSize: "11px" }}>CATEGORY / SUITE</label>
                        <input
                          type="text"
                          value={proj.category || ""}
                          onChange={(e) => handleUpdateProjectField(pIdx, "category", e.target.value)}
                          placeholder="e.g. COMPUTER VISION & AUTONOMOUS DRIVING"
                        />
                      </div>
                      <div className="admin-field" style={{ margin: 0 }}>
                        <label style={{ fontSize: "11px" }}>FILTER CATEGORY</label>
                        <select
                          value={proj.filterCategory || "AI/ML"}
                          onChange={(e) => handleUpdateProjectField(pIdx, "filterCategory", e.target.value)}
                          style={{
                            background: "#0d0d1a",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "6px",
                            padding: "6px 10px",
                            color: "#fff",
                            fontSize: "12.5px"
                          }}
                        >
                          <option value="AI/ML">AI/ML</option>
                          <option value="Computer Vision">Computer Vision</option>
                          <option value="Deep Learning">Deep Learning</option>
                          <option value="Generative AI">Generative AI</option>
                        </select>
                      </div>
                    </div>

                    {/* Project Image Preview & Upload Option */}
                    <div style={{ marginTop: "4px", padding: "10px 12px", background: "#0d0d1a", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                        <label style={{ fontSize: "11px", color: "#a78bfa", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                          <FaImage /> PROJECT COVER / DASHBOARD IMAGE
                        </label>
                        <label
                          style={{
                            background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                            color: "#fff",
                            fontSize: "11px",
                            padding: "4px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            fontWeight: 600
                          }}
                        >
                          <FaUpload size={10} />
                          <span>Upload New Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleProjectImageUpload(pIdx, e)}
                          />
                        </label>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        {proj.img && proj.img.startsWith("data:image") ? (
                          <img
                            src={proj.img}
                            alt={proj.title}
                            style={{ width: "80px", height: "48px", objectFit: "cover", borderRadius: "6px", border: "1px solid rgba(139, 92, 246, 0.4)" }}
                          />
                        ) : (
                          <div style={{ width: "80px", height: "48px", background: "#151528", borderRadius: "6px", border: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#8b5cf6" }}>
                            Default Img
                          </div>
                        )}
                        <input
                          type="text"
                          value={proj.img && !proj.img.startsWith("data:image") ? proj.img : (proj.img ? "[Custom Uploaded Image]" : "")}
                          onChange={(e) => handleUpdateProjectField(pIdx, "img", e.target.value)}
                          placeholder="Or enter Image URL (https://...)"
                          style={{
                            flex: 1,
                            background: "#080811",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "6px",
                            padding: "6px 10px",
                            color: "#fff",
                            fontSize: "12px"
                          }}
                        />
                      </div>
                    </div>

                    <div className="admin-field" style={{ margin: 0 }}>
                      <label style={{ fontSize: "11px" }}>PROJECT SUMMARY / DESCRIPTION</label>
                      <textarea
                        rows={2}
                        value={proj.desc || ""}
                        onChange={(e) => handleUpdateProjectField(pIdx, "desc", e.target.value)}
                        placeholder="Brief description that appears on the project card..."
                        style={{ width: "100%", resize: "vertical" }}
                      />
                    </div>

                    {/* Tech Badges / Skills Column */}
                    <div style={{ marginTop: "4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <label style={{ fontSize: "11px", color: "#a78bfa", fontWeight: 700, margin: 0 }}>
                          TECH STACK BADGES ({Array.isArray(proj.tech) ? proj.tech.length : 0})
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddTechToProject(pIdx)}
                          style={{
                            background: "rgba(139, 92, 246, 0.2)",
                            border: "1px dashed #8b5cf6",
                            color: "#c4b5fd",
                            fontSize: "11px",
                            padding: "3px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                        >
                          <FaPlus size={9} />
                          <span>Add Tech</span>
                        </button>
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {(Array.isArray(proj.tech) ? proj.tech : []).map((t, tIdx) => (
                          <div
                            key={tIdx}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              background: "#0d0d18",
                              border: "1px solid rgba(255, 255, 255, 0.08)",
                              padding: "3px 6px 3px 8px",
                              borderRadius: "6px"
                            }}
                          >
                            <input
                              type="text"
                              value={t}
                              onChange={(e) => handleTechChangeInProject(pIdx, tIdx, e.target.value)}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#fff",
                                fontSize: "11px",
                                width: `${Math.max(60, t.length * 8)}px`,
                                padding: "2px"
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteTechFromProject(pIdx, tIdx)}
                              style={{
                                background: "rgba(239, 68, 68, 0.15)",
                                border: "none",
                                color: "#fca5a5",
                                borderRadius: "3px",
                                cursor: "pointer",
                                width: "18px",
                                height: "18px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                              }}
                              title="Delete this Tech Badge"
                            >
                              <FaTrash size={9} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Case Study Editor Accordion & Live Preview */}
                    <div style={{ marginTop: "8px", border: "1px solid rgba(139, 92, 246, 0.25)", borderRadius: "8px", background: "rgba(139, 92, 246, 0.04)", overflow: "hidden" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 14px",
                          background: "rgba(139, 92, 246, 0.1)",
                          cursor: "pointer",
                          userSelect: "none"
                        }}
                        onClick={() => setExpandedCaseStudy(expandedCaseStudy === pIdx ? null : pIdx)}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <FaBookOpen color="#c4b5fd" size={13} />
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#e9d5ff", letterSpacing: "0.5px" }}>
                            PROJECT CASE STUDY SETTINGS
                          </span>
                          <span style={{ fontSize: "10px", background: "rgba(139, 92, 246, 0.3)", color: "#ddd6fe", padding: "2px 7px", borderRadius: "12px" }}>
                            Full Details & Key Features
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewCaseModal(proj);
                            }}
                            style={{
                              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                              border: "none",
                              color: "#fff",
                              fontSize: "11px",
                              fontWeight: 600,
                              padding: "4px 10px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px"
                            }}
                            title="Click to preview the live Case Study modal"
                          >
                            <FaExternalLinkAlt size={10} />
                            <span>Preview Case Study</span>
                          </button>
                          {expandedCaseStudy === pIdx ? <FaChevronUp size={12} color="#c4b5fd" /> : <FaChevronDown size={12} color="#c4b5fd" />}
                        </div>
                      </div>

                      {expandedCaseStudy === pIdx && (
                        <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "10px", background: "#080811" }}>
                          <div className="admin-field" style={{ margin: 0 }}>
                            <label style={{ fontSize: "11px", color: "#a78bfa" }}>CASE STUDY TAGLINE / SUBTITLE</label>
                            <input
                              type="text"
                              value={proj.tagline || ""}
                              onChange={(e) => handleUpdateProjectField(pIdx, "tagline", e.target.value)}
                              placeholder="e.g. Real-Time AI Road Monitoring, Lane & Obstacle Detection"
                            />
                          </div>

                          <div className="admin-field" style={{ margin: 0 }}>
                            <label style={{ fontSize: "11px", color: "#a78bfa" }}>DETAILED CASE STUDY OVERVIEW (LONG DESCRIPTION)</label>
                            <textarea
                              rows={3}
                              value={proj.longDesc || ""}
                              onChange={(e) => handleUpdateProjectField(pIdx, "longDesc", e.target.value)}
                              placeholder="Comprehensive breakdown of the project architecture, training methodology, and execution..."
                              style={{ width: "100%", resize: "vertical" }}
                            />
                          </div>

                          <div className="admin-field" style={{ margin: 0 }}>
                            <label style={{ fontSize: "11px", color: "#a78bfa" }}>PROBLEM STATEMENT</label>
                            <textarea
                              rows={2}
                              value={proj.problemStatement || ""}
                              onChange={(e) => handleUpdateProjectField(pIdx, "problemStatement", e.target.value)}
                              placeholder="What real-world problem or challenge does this project solve?"
                              style={{ width: "100%", resize: "vertical" }}
                            />
                          </div>

                          {/* Key Features List */}
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                              <label style={{ fontSize: "11px", color: "#a78bfa", fontWeight: 700, margin: 0 }}>
                                KEY FEATURES ({(Array.isArray(proj.keyFeatures) ? proj.keyFeatures.length : 0)})
                              </label>
                              <button
                                type="button"
                                onClick={() => handleAddFeatureToProject(pIdx)}
                                style={{
                                  background: "rgba(139, 92, 246, 0.2)",
                                  border: "1px dashed #8b5cf6",
                                  color: "#c4b5fd",
                                  fontSize: "11px",
                                  padding: "3px 10px",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px"
                                }}
                              >
                                <FaPlus size={9} />
                                <span>Add Feature</span>
                              </button>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                              {(Array.isArray(proj.keyFeatures) ? proj.keyFeatures : []).map((feat, fIdx) => (
                                <div
                                  key={fIdx}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    background: "#0c0c16",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    padding: "6px 10px",
                                    borderRadius: "6px"
                                  }}
                                >
                                  <span style={{ fontSize: "11px", color: "#8b5cf6", fontWeight: 700 }}>
                                    #{fIdx + 1}
                                  </span>
                                  <input
                                    type="text"
                                    value={feat}
                                    onChange={(e) => handleFeatureChangeInProject(pIdx, fIdx, e.target.value)}
                                    placeholder="Enter feature capability..."
                                    style={{
                                      flex: 1,
                                      background: "none",
                                      border: "none",
                                      color: "#fff",
                                      fontSize: "12px",
                                      padding: "2px 0"
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteFeatureFromProject(pIdx, fIdx)}
                                    style={{
                                      background: "rgba(239, 68, 68, 0.15)",
                                      border: "none",
                                      color: "#fca5a5",
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                      padding: "4px 8px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center"
                                    }}
                                    title="Delete this Feature"
                                  >
                                    <FaTrash size={10} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="admin-field" style={{ margin: 0 }}>
                            <label style={{ fontSize: "11px", color: "#a78bfa" }}>MY CONTRIBUTION / ROLE</label>
                            <textarea
                              rows={2}
                              value={proj.myContribution || ""}
                              onChange={(e) => handleUpdateProjectField(pIdx, "myContribution", e.target.value)}
                              placeholder="Specific roles, mathematical models built, pipelines designed..."
                              style={{ width: "100%", resize: "vertical" }}
                            />
                          </div>

                          <div className="admin-grid-2" style={{ gap: "8px" }}>
                            <div className="admin-field" style={{ margin: 0 }}>
                              <label style={{ fontSize: "11px", color: "#a78bfa" }}>GITHUB / REPO URL</label>
                              <input
                                type="text"
                                value={proj.github || ""}
                                onChange={(e) => handleUpdateProjectField(pIdx, "github", e.target.value)}
                                placeholder="https://github.com/..."
                              />
                            </div>
                            <div className="admin-field" style={{ margin: 0 }}>
                              <label style={{ fontSize: "11px", color: "#a78bfa" }}>LIVE DEMO / DASHBOARD URL</label>
                              <input
                                type="text"
                                value={proj.demo || ""}
                                onChange={(e) => handleUpdateProjectField(pIdx, "demo", e.target.value)}
                                placeholder="https://..."
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button className="stat-add-btn" onClick={handleAddProject} style={{ marginTop: "14px" }}>
                <FaPlus size={11} />
                <span>Add New Project</span>
              </button>
            </div>
          )}

          {/* 5. Journey Tab */}
          {activeTab === "journey" && (
            <div className="cms-card">
              <div className="cms-card-header">
                <h4><FaRoute /> [4] Journey & Experience Timeline</h4>
                <p>Add & manage career milestones, internships & education history</p>
              </div>

              <div className="stats-manager-list" style={{ gap: "12px" }}>
                {(data.journey || []).map((item, idx) => (
                  <div
                    key={item.id || idx}
                    style={{
                      background: "#090912",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "10px",
                      padding: "12px 14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                      <span style={{ fontSize: "11px", color: "#a78bfa", fontWeight: 700 }}>
                        MILESTONE #{idx + 1}
                      </span>
                      <button
                        className="stat-del-btn"
                        onClick={() => handleDeleteJourney(item.id)}
                        title="Delete Milestone"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>

                    <div className="admin-grid-2" style={{ gap: "8px" }}>
                      <div className="admin-field" style={{ margin: 0 }}>
                        <label style={{ fontSize: "11px" }}>ROLE / TITLE</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const newJourney = [...(data.journey || [])];
                            newJourney[idx].title = e.target.value;
                            setData({ ...data, journey: newJourney });
                          }}
                          placeholder="e.g. DATA SCIENCE INTERN"
                        />
                      </div>
                      <div className="admin-field" style={{ margin: 0 }}>
                        <label style={{ fontSize: "11px" }}>ORGANIZATION / ISSUER</label>
                        <input
                          type="text"
                          value={item.issuer}
                          onChange={(e) => {
                            const newJourney = [...(data.journey || [])];
                            newJourney[idx].issuer = e.target.value;
                            setData({ ...data, journey: newJourney });
                          }}
                          placeholder="e.g. Cognifyz Technologies"
                        />
                      </div>
                    </div>

                    <div className="admin-field" style={{ margin: 0 }}>
                      <label style={{ fontSize: "11px" }}>TIMELINE / DATES</label>
                      <input
                        type="text"
                        value={item.date}
                        onChange={(e) => {
                          const newJourney = [...(data.journey || [])];
                          newJourney[idx].date = e.target.value;
                          setData({ ...data, journey: newJourney });
                        }}
                        placeholder="e.g. 05 MAY 2026 — 05 JUNE 2026"
                      />
                    </div>

                    <div className="admin-field" style={{ margin: 0, marginTop: "4px" }}>
                      <label style={{ fontSize: "11px" }}>SUMMARY / DESCRIPTION</label>
                      <textarea
                        rows={3}
                        value={item.desc}
                        onChange={(e) => {
                          const newJourney = [...(data.journey || [])];
                          newJourney[idx].desc = e.target.value;
                          setData({ ...data, journey: newJourney });
                        }}
                        placeholder="Brief details about what you achieved..."
                        style={{ width: "100%", resize: "vertical" }}
                      />
                    </div>

                    {/* Individual Tag Columns with Delete & Add Button */}
                    <div style={{ margin: 0, marginTop: "6px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <label style={{ fontSize: "11px", color: "#a78bfa", fontWeight: 700, margin: 0 }}>
                          SKILL TAGS / PILLS ({Array.isArray(item.tags) ? item.tags.length : 0})
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddTagToJourney(idx)}
                          style={{
                            background: "rgba(139, 92, 246, 0.2)",
                            border: "1px dashed #8b5cf6",
                            color: "#c4b5fd",
                            fontSize: "11px",
                            padding: "3px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                        >
                          <FaPlus size={9} />
                          <span>Add Tag</span>
                        </button>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {(Array.isArray(item.tags) ? item.tags : []).map((tag, tagIdx) => (
                          <div
                            key={tagIdx}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "24px 1fr 30px",
                              alignItems: "center",
                              gap: "8px",
                              background: "#0d0d18",
                              border: "1px solid rgba(255, 255, 255, 0.08)",
                              padding: "4px 8px",
                              borderRadius: "6px"
                            }}
                          >
                            <span style={{ fontSize: "10px", color: "#64748b", fontWeight: 700 }}>
                              #{tagIdx + 1}
                            </span>
                            <input
                              type="text"
                              value={tag}
                              onChange={(e) => handleTagChangeInJourney(idx, tagIdx, e.target.value)}
                              style={{
                                padding: "4px 8px",
                                background: "#080811",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "4px",
                                color: "#fff",
                                fontSize: "12px"
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteTagFromJourney(idx, tagIdx)}
                              style={{
                                background: "rgba(239, 68, 68, 0.15)",
                                border: "1px solid rgba(239, 68, 68, 0.3)",
                                color: "#fca5a5",
                                borderRadius: "4px",
                                cursor: "pointer",
                                width: "26px",
                                height: "26px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                              }}
                              title="Delete this Tag"
                            >
                              <FaTrash size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="stat-add-btn" onClick={handleAddJourney} style={{ marginTop: "14px" }}>
                <FaPlus size={11} />
                <span>Add Milestone / Experience</span>
              </button>
            </div>
          )}

          {/* 6. Education Tab */}
          {activeTab === "education" && (
            <div className="cms-card">
              <div className="cms-card-header">
                <h4><FaGraduationCap /> Academic Semester GPAs</h4>
                <p>Manage semesters & SGPA records</p>
              </div>

              <div className="stats-manager-list">
                {(data.profile?.semesters || []).map((sem, idx) => (
                  <div key={idx} className="stat-item-row">
                    <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700 }}>
                      #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={sem.sem}
                      onChange={(e) => {
                        const newSems = [...(data.profile?.semesters || [])];
                        newSems[idx].sem = e.target.value;
                        setData({
                          ...data,
                          profile: { ...data.profile, semesters: newSems }
                        });
                      }}
                      placeholder="e.g. Semester 5"
                    />
                    <input
                      type="text"
                      value={sem.gpa}
                      onChange={(e) => {
                        const newSems = [...(data.profile?.semesters || [])];
                        newSems[idx].gpa = e.target.value;
                        setData({
                          ...data,
                          profile: { ...data.profile, semesters: newSems }
                        });
                      }}
                      placeholder="GPA (e.g. 9.10)"
                    />
                    <button
                      className="stat-del-btn"
                      onClick={() => handleDeleteSemester(idx)}
                      title="Delete Semester"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>

              <button className="stat-add-btn" onClick={handleAddSemester}>
                <FaPlus size={11} />
                <span>Add Semester GPA</span>
              </button>
            </div>
          )}

          {/* 7. Developer Stats Tab & Hero Copy */}
          {activeTab === "stats" && (
            <>
              {/* Hero Section Typography & Copy */}
              <div className="cms-card">
                <div className="cms-card-header">
                  <h4><FaBrain /> 2. Hero Section Typography & Copy</h4>
                  <p>Customize hero headlines, badges, and introductory tagline</p>
                </div>
                <div className="admin-grid-2">
                  <div className="admin-field">
                    <label>Heading Line 1</label>
                    <input
                      type="text"
                      value={data.hero?.headingLine1 || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          hero: { ...data.hero, headingLine1: e.target.value }
                        })
                      }
                      placeholder="TURNING DATA"
                    />
                  </div>
                  <div className="admin-field">
                    <label>Heading Line 2</label>
                    <input
                      type="text"
                      value={data.hero?.headingLine2 || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          hero: { ...data.hero, headingLine2: e.target.value }
                        })
                      }
                      placeholder="INTO INTELLIGENCE"
                    />
                  </div>
                </div>

                <div className="admin-field">
                  <label>Hero Subtitle Badge</label>
                  <input
                    type="text"
                    value={data.hero?.subtitle || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        hero: { ...data.hero, subtitle: e.target.value }
                      })
                    }
                    placeholder="[ DATA SCIENCE · AI / ML · GENAI ]"
                  />
                </div>

                <div className="admin-field">
                  <label>Introductory Paragraph</label>
                  <textarea
                    rows={3}
                    value={data.hero?.introText || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        hero: { ...data.hero, introText: e.target.value }
                      })
                    }
                    placeholder="Hi, I'm Priyanshu Kumar..."
                  />
                </div>
              </div>

              {/* Developer Statistics Panel (HUD) */}
              <div className="cms-card">
                <div className="cms-card-header">
                  <h4><FaProjectDiagram /> Developer Statistics Panel (HUD)</h4>
                  <p>Manage HUD numbers on Home Page</p>
                </div>

                <div className="stats-manager-list">
                  {data.statistics?.map((stat, idx) => (
                    <div key={stat.id || idx} className="stat-item-row">
                      <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700 }}>
                        #{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...data.statistics];
                          newStats[idx].label = e.target.value;
                          setData({ ...data, statistics: newStats });
                        }}
                        placeholder="LABEL"
                      />
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...data.statistics];
                          newStats[idx].value = e.target.value;
                          setData({ ...data, statistics: newStats });
                        }}
                        placeholder="VALUE"
                      />
                      <button
                        className="stat-del-btn"
                        onClick={() => handleDeleteStat(stat.id)}
                        title="Delete Statistic"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>

                <button className="stat-add-btn" onClick={handleAddStat}>
                  <FaPlus size={11} />
                  <span>Add Statistic</span>
                </button>
              </div>
            </>
          )}

          {/* 8. Contact Tab */}
          {activeTab === "contact" && (
            <>
              <div className="cms-card">
                <div className="cms-card-header">
                  <h4><FaEnvelopeOpenText /> [5] Contact & Location Details</h4>
                </div>
                <div className="admin-grid-2">
                  <div className="admin-field">
                    <label>Public Email</label>
                    <input
                      type="email"
                      value={data.profile?.email || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          profile: { ...data.profile, email: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={data.profile?.phone || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          profile: { ...data.profile, phone: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label>Location Base</label>
                    <input
                      type="text"
                      value={data.profile?.location || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          profile: { ...data.profile, location: e.target.value }
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Social Profiles & Links Management */}
              <div className="cms-card">
                <div className="cms-card-header">
                  <h4><FaEnvelopeOpenText /> Social Profiles & Network Links</h4>
                  <p>Add, edit or delete social networks</p>
                </div>

                <div className="stats-manager-list">
                  {(data.profile?.socials || []).map((soc, idx) => (
                    <div key={soc.id || idx} className="stat-item-row">
                      <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700 }}>
                        #{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={soc.platform}
                        onChange={(e) => {
                          const newSocs = [...(data.profile?.socials || [])];
                          newSocs[idx].platform = e.target.value;
                          setData({
                            ...data,
                            profile: { ...data.profile, socials: newSocs }
                          });
                        }}
                        placeholder="PLATFORM (e.g. GitHub)"
                      />
                      <input
                        type="text"
                        value={soc.url}
                        onChange={(e) => {
                          const newSocs = [...(data.profile?.socials || [])];
                          newSocs[idx].url = e.target.value;
                          setData({
                            ...data,
                            profile: { ...data.profile, socials: newSocs }
                          });
                        }}
                        placeholder="URL (https://...)"
                      />
                      <button
                        className="stat-del-btn"
                        onClick={() => handleDeleteSocial(soc.id)}
                        title="Delete Social Link"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>

                <button className="stat-add-btn" onClick={handleAddSocial}>
                  <FaPlus size={11} />
                  <span>Add Social Link</span>
                </button>
              </div>
            </>
          )}

          {/* 7. Portfolio & SEO Settings */}
          {activeTab === "settings" && (
            <div className="cms-card">
              <div className="cms-card-header">
                <h4><FaCogs /> [7] Portfolio Settings, SEO & Visibility Controls</h4>
                <p>Configure website metadata, search optimization, theme preferences, and public visibility</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div className="admin-field" style={{ margin: 0 }}>
                  <label>Website Title</label>
                  <input
                    type="text"
                    value={data.settings?.siteTitle || "Priyanshu Kumar — Portfolio"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: { ...(data.settings || {}), siteTitle: e.target.value }
                      })
                    }
                    placeholder="Priyanshu Kumar — Data Scientist & AI/ML Engineer"
                  />
                </div>
                <div className="admin-field" style={{ margin: 0 }}>
                  <label>SEO Keywords (Comma-separated)</label>
                  <input
                    type="text"
                    value={data.settings?.seoKeywords || "Data Science, Machine Learning, AI, Python, Deep Learning, GenAI"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: { ...(data.settings || {}), seoKeywords: e.target.value }
                      })
                    }
                    placeholder="Data Science, Machine Learning, AI, Deep Learning"
                  />
                </div>
              </div>

              <div className="admin-field">
                <label>SEO Meta Description</label>
                <textarea
                  rows={3}
                  value={data.settings?.seoDescription || "Personal 3D interactive portfolio of Priyanshu Kumar specializing in AI, Machine Learning, and Data Science."}
                  onChange={(e) =>
                    setData({
                      ...data,
                      settings: { ...(data.settings || {}), seoDescription: e.target.value }
                    })
                  }
                  placeholder="Meta description for search engines and social cards..."
                />
              </div>

              {/* Visibility & Security Switches */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "20px" }}>
                <div style={{ padding: "14px", background: "#0a0a14", border: "1px solid rgba(139, 92, 246, 0.2)", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong style={{ display: "block", color: "#fff", fontSize: "13px" }}>Public Portfolio Visibility</strong>
                      <span style={{ fontSize: "11px", color: "#888" }}>Allow search crawlers & public visitors</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={data.settings?.isPublic !== false}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...(data.settings || {}), isPublic: e.target.checked }
                        })
                      }
                      style={{ width: "18px", height: "18px", accentColor: "#7c3aed", cursor: "pointer" }}
                    />
                  </div>
                </div>

                <div style={{ padding: "14px", background: "#0a0a14", border: "1px solid rgba(139, 92, 246, 0.2)", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong style={{ display: "block", color: "#fff", fontSize: "13px" }}>Contact Info Visibility</strong>
                      <span style={{ fontSize: "11px", color: "#888" }}>Display phone & direct email on about page</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={data.settings?.showContactInfo !== false}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...(data.settings || {}), showContactInfo: e.target.checked }
                        })
                      }
                      style={{ width: "18px", height: "18px", accentColor: "#7c3aed", cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Sticky Action Footer */}
        <footer className="admin-action-bar">
          <button className="btn-cms-save" onClick={handleSave} disabled={saveLoading}>
            {saveLoading ? <FaSpinner className="spin-icon" /> : <FaSave />}
            <span>{saveLoading ? "Saving to Cloud Database..." : "Save Changes"}</span>
          </button>
        </footer>
      </main>

      {/* In-Admin Case Study Live Preview Modal */}
      {previewCaseModal && (
        <div
          className="case-modal-backdrop"
          onClick={() => setPreviewCaseModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
        >
          <div
            className="case-dialog"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0c0c16",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              borderRadius: "14px",
              maxWidth: "760px",
              width: "100%",
              maxHeight: "88vh",
              overflowY: "auto",
              padding: "28px",
              position: "relative",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(139, 92, 246, 0.2)"
            }}
          >
            <button
              onClick={() => setPreviewCaseModal(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "none",
                color: "#e2e8f0",
                fontSize: "13px",
                fontWeight: 600,
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Close ×
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span style={{ fontSize: "11px", fontFamily: "monospace", letterSpacing: "1px", color: "#a78bfa", textTransform: "uppercase" }}>
                PROJECT CASE STUDY PREVIEW
              </span>
              <span style={{ fontSize: "10px", background: "rgba(16, 185, 129, 0.2)", color: "#34d399", padding: "1px 6px", borderRadius: "4px" }}>
                Live In-Admin Sync
              </span>
            </div>

            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>
              {previewCaseModal.title}
            </h2>
            <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 16px" }}>
              {previewCaseModal.tagline || previewCaseModal.category}
            </p>

            {previewCaseModal.img && (
              <div style={{ borderRadius: "10px", overflow: "hidden", marginBottom: "16px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                <img
                  src={previewCaseModal.img}
                  alt={previewCaseModal.title}
                  style={{ width: "100%", maxHeight: "300px", objectFit: "cover", display: "block" }}
                />
              </div>
            )}

            <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: 1.6, margin: "0 0 16px" }}>
              {previewCaseModal.longDesc || previewCaseModal.desc}
            </p>

            {previewCaseModal.problemStatement && (
              <div style={{ marginBottom: "16px", background: "rgba(255, 255, 255, 0.03)", borderLeft: "3px solid #8b5cf6", padding: "10px 14px", borderRadius: "0 6px 6px 0" }}>
                <strong style={{ display: "block", fontSize: "11px", color: "#c4b5fd", fontFamily: "monospace", textTransform: "uppercase" }}>
                  Problem Statement:
                </strong>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#94a3b8", lineHeight: "1.5" }}>
                  {previewCaseModal.problemStatement}
                </p>
              </div>
            )}

            {previewCaseModal.keyFeatures && previewCaseModal.keyFeatures.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                <strong style={{ display: "block", fontSize: "11px", color: "#c4b5fd", fontFamily: "monospace", textTransform: "uppercase", marginBottom: "8px" }}>
                  Key Features:
                </strong>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#cbd5e1", lineHeight: "1.6" }}>
                  {previewCaseModal.keyFeatures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {previewCaseModal.myContribution && (
              <div style={{ marginBottom: "16px", background: "#06060c", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", padding: "12px 14px" }}>
                <strong style={{ display: "block", fontSize: "11px", color: "#c4b5fd", fontFamily: "monospace", textTransform: "uppercase" }}>
                  My Contribution:
                </strong>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#94a3b8", lineHeight: "1.5" }}>
                  {previewCaseModal.myContribution}
                </p>
              </div>
            )}

            {Array.isArray(previewCaseModal.tech) && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                {previewCaseModal.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      background: "rgba(139, 92, 246, 0.15)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      color: "#c4b5fd",
                      fontSize: "11px",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontFamily: "monospace"
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              {previewCaseModal.demo && (
                <a
                  href={previewCaseModal.demo}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: 600,
                    textDecoration: "none"
                  }}
                >
                  Live Demo ↗
                </a>
              )}
              {previewCaseModal.github && (
                <a
                  href={previewCaseModal.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "#e2e8f0",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: 500,
                    textDecoration: "none"
                  }}
                >
                  Source Repository
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
