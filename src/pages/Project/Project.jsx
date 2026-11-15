import "./Project.css";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { sounds } from "../../utils/sound";
import ProjectDashboardModal from "../../components/ProjectDashboardModal";
import {
  FaEdit,
  FaSave,
  FaPlus,
  FaTrash,
  FaImage,
  FaUpload,
  FaCheckCircle,
  FaTimes
} from "react-icons/fa";

import imgRoadVision from "../../assets/images/dash_roadvision.jpg";
import imgPathWeaver from "../../assets/images/dash_pathweaver.jpg";
import imgAquaVision from "../../assets/images/dash_aquavision.jpg";
import imgModelForge from "../../assets/images/dash_modelforge.jpg";
import imgDocuMind from "../../assets/images/dash_documind.jpg";
import imgDormiq from "../../assets/images/dash_dormiq.jpg";
import imgSpam from "../../assets/images/dash_spam.jpg";
import imgSangam from "../../assets/images/dash_sangam.jpg";
import imgUniShield from "../../assets/images/dash_unishield.jpg";

const allProjects = [
  {
    id: "01",
    title: "ROADVISION AI",
    filterCategory: "Computer Vision",
    category: "COMPUTER VISION & AUTONOMOUS DRIVING",
    tagline: "Real-Time AI Road Monitoring, Lane & Obstacle Detection",
    desc: "An AI-powered road monitoring system that detects lane markings, vehicles, and obstacles using real-time computer vision to improve road safety.",
    longDesc: "RoadVision AI is an edge-optimized computer vision system for real-time lane tracking, vehicle localization, and obstacle classification. Utilizes YOLOv8 and PyTorch to deliver low-latency telemetry and automated visual hazard alerts for enhanced driver assistance and collision avoidance.",
    problemStatement: "Poor road visibility, driver distraction, and delayed obstacle detection lead to severe vehicular collisions. Conventional sensor hardware is expensive and prone to calibration drifts.",
    keyFeatures: [
      "Real-time Lane Detection & Boundary Mapping",
      "Vehicle and Obstacle Detection with High FPS Inference",
      "Continuous Road Condition & Traffic Monitoring",
      "Visual Warning System with Collision Distance Alerts"
    ],
    myContribution: "Architected model inference pipeline using YOLOv8, integrated OpenCV vision feeds, and deployed a lightweight FastAPI inference service.",
    tech: ["Python", "OpenCV", "YOLOv8", "PyTorch", "FastAPI"],
    img: imgRoadVision,
    demo: "https://github.com/offx-priyanshu",
    github: "https://github.com/offx-priyanshu"
  },
  {
    id: "02",
    title: "PATHWEAVER AI",
    filterCategory: "AI/ML",
    category: "REINFORCEMENT LEARNING & ROBOTICS",
    tagline: "Multi-Agent Intelligent Dynamic Path-Planning Simulation",
    desc: "An intelligent multi-agent path-planning simulation where multiple AI agents navigate dynamic environments, avoid collisions, and find optimal routes.",
    longDesc: "PathWeaver AI models multi-agent navigation in dense, moving environments through deep reinforcement learning. Powered by Gymnasium and Stable-Baselines3 with custom PyGame spatial visualization, agents learn cooperative collision avoidance and shortest path convergence.",
    problemStatement: "Traditional static pathfinders (A*, Dijkstra) fail in real-time robotics when multiple dynamic entities cross trajectories under unexpected obstacles.",
    keyFeatures: [
      "Multi-Agent Dynamic Navigation & Swarm Coordination",
      "Intelligent Reinforcement-Learned Path Planning",
      "Proactive Collision Avoidance in Real-Time",
      "Dynamic Simulation Playground with Obstacle Injection",
      "Performance Visualization & Convergence Analytics"
    ],
    myContribution: "Implemented custom Gymnasium reward functions, trained PPO/DQN policies with Stable-Baselines3, and designed real-time PyGame rendering.",
    tech: ["Python", "Gymnasium", "Stable-Baselines3", "PyGame", "Reinforcement Learning"],
    img: imgPathWeaver,
    demo: "https://github.com/offx-priyanshu",
    github: "https://github.com/offx-priyanshu"
  },
  {
    id: "03",
    title: "AQUAVISION AI",
    filterCategory: "Deep Learning",
    category: "DEEP LEARNING & IMAGE ENHANCEMENT",
    tagline: "Underwater & Low-Light Neural Image Restoration",
    desc: "An AI-based underwater and low-light image enhancement solution that improves image clarity, reduces noise, corrects colors, and enhances visibility using deep learning.",
    longDesc: "AquaVision AI counters optical attenuation, haze, and blue-green color casts in aquatic and low-light imagery. Utilizes specialized deep CNN and U-Net autoencoder architectures to denoise, rebalance chrominance, and restore structural sharpness with instant side-by-side verification.",
    problemStatement: "Underwater surveillance and robotic exploration suffer from severe wavelength scattering, color loss, and sensor noise, rendering raw video feeds unusable.",
    keyFeatures: [
      "Underwater Image Restoration & Haze Elimination",
      "Low-Light Contrast & Luminance Improvement",
      "Deep Learning Noise Reduction (U-Net Denoising)",
      "Chrominance & Wavelength Color Correction",
      "Interactive Before / After Comparison Slider"
    ],
    myContribution: "Trained U-Net neural network weights on paired degraded datasets, built OpenCV preprocessing filters, and implemented an interactive Streamlit UI.",
    tech: ["Python", "PyTorch", "CNN", "U-Net", "OpenCV", "Streamlit"],
    img: imgAquaVision,
    demo: "https://github.com/offx-priyanshu",
    github: "https://github.com/offx-priyanshu"
  },
  {
    id: "04",
    title: "MODELFORGE AI",
    filterCategory: "AI/ML",
    category: "MACHINE LEARNING & MLOPS",
    tagline: "End-to-End Automated Machine Learning & MLOps Pipeline",
    desc: "An end-to-end automated machine learning platform that processes datasets, performs feature engineering, trains multiple ML models, compares performance, and tracks experiments.",
    longDesc: "ModelForge AI streamlines the entire ML lifecycle from raw CSV ingestion to model registry. Automates data imputation, encoding, feature scaling, model benchmarking across algorithms (RandomForest, XGBoost, LightGBM), and tracks hyperparameter experiments using MLflow and DVC.",
    problemStatement: "Data science teams waste weeks writing repetitive boilerplate code for preprocessing, hyperparameter sweeps, model evaluation, and artifact tracking.",
    keyFeatures: [
      "Instant Dataset Upload & Schema Inference",
      "Automated Data Preprocessing & Missing Value Imputation",
      "Intelligent Feature Engineering & Selection",
      "Automated Parallel Model Training & Hyperparameter Tuning",
      "Comprehensive Model Performance Comparison (ROC, AUC, F1)",
      "Full Experiment Tracking with MLflow & DVC Versioning"
    ],
    myContribution: "Designed AutoML orchestration pipelines using Scikit-learn and XGBoost, integrated MLflow experiment metrics logging, and built FastAPI service endpoints.",
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "MLflow", "DVC", "FastAPI"],
    img: imgModelForge,
    demo: "https://github.com/offx-priyanshu",
    github: "https://github.com/offx-priyanshu"
  },
  {
    id: "05",
    title: "DOCUMIND AI",
    filterCategory: "Generative AI",
    category: "GENERATIVE AI, LLM & RAG",
    tagline: "Context-Aware Intelligent Document Knowledge Assistant",
    desc: "An intelligent AI document assistant that allows users to upload PDFs and documents, ask natural-language questions, and receive context-aware answers based on document content.",
    longDesc: "DocuMind AI enables conversational intelligence over complex enterprise documents. Integrates LangChain, LlamaIndex, and FAISS/ChromaDB vector embeddings to perform semantic chunking, dense retrieval, and cited contextual response generation with zero hallucination.",
    problemStatement: "Organizations are overwhelmed by hundreds of multi-page technical manuals and reports, making manual search for critical facts tedious and error-prone.",
    keyFeatures: [
      "Multi-Format PDF & Document Parsing & Chunking",
      "High-Accuracy Text Extraction & Layout Preservation",
      "Dense Semantic Vector Search (FAISS & ChromaDB)",
      "AI-Powered Natural Language Question Answering",
      "Context-Aware Synthesis via LLM Prompt Engineering",
      "Source Citation & Grounded Page Reference Answers"
    ],
    myContribution: "Built document ingestion & chunking workflows with LangChain, implemented vector index retrieval with FAISS, and deployed a dual FastAPI/Streamlit assistant.",
    tech: ["Python", "LangChain", "LlamaIndex", "LLM", "FAISS", "ChromaDB", "FastAPI", "Streamlit"],
    img: imgDocuMind,
    demo: "https://github.com/offx-priyanshu",
    github: "https://github.com/offx-priyanshu"
  },
  {
    id: "06",
    title: "DORMIQ (SmartHostel AI)",
    filterCategory: "AI/ML",
    category: "AI & SMART HOSTEL · TOP 3 CHECKMATE",
    tagline: "Intelligent Smart Hostel Management & Incident Triage Platform",
    desc: "An intelligent hostel management platform built during an intensive three-month CRT journey with Team Impact Crew, securing TOP 3 position in CHECKMATE. Features AI-driven complaint resolution, student management, room allocation, and automated reporting.",
    longDesc: "DORMIQ bridges administrative inefficiencies in collegiate residential halls. Developed with Team Impact Crew during our three-month CRT journey, securing TOP 3 in CHECKMATE. My contributions encompassed system architecture, data models, complaint ticket automation, and AI integration for fast administrative triage.",
    problemStatement: "Hostel administrations suffer from chaotic manual records, delayed complaint resolution, and zero real-time visibility into student occupancy and maintenance requests.",
    keyFeatures: [
      "AI-Powered Complaint Resolution & Severity Triage",
      "Real-Time Student Check-in / Check-out Management",
      "Automated Room Allocation & Inventory Tracking",
      "Administrative Dashboard with Escalation Analytics",
      "Secure Role-Based Student & Warden Access"
    ],
    myContribution: "Class Representative & Project Lead in Team Impact Crew: orchestrated core database design, implemented AI complaint routing workflows, and led end-to-end presentation securing TOP 3 in CHECKMATE.",
    tech: ["Python", "React.js", "AI Automation", "PostgreSQL", "REST APIs"],
    img: imgDormiq,
    demo: "https://github.com/offx-priyanshu",
    github: "https://github.com/offx-priyanshu"
  },
  {
    id: "07",
    title: "SMS Spam Detection ML App",
    filterCategory: "AI/ML",
    category: "MACHINE LEARNING · NLP CLASSIFICATION",
    tagline: "Real-Time NLP Spam Classifier with 98% Precision",
    desc: "A production machine learning application that classifies SMS messages as spam or ham using TF-IDF vectorization and Multinomial Naive Bayes. Achieved verified performance: 97% Accuracy, 98% Precision, and 81% Recall.",
    longDesc: "Engineered an end-to-end Machine Learning pipeline for SMS filtering. Cleaned and preprocessed unstructured text using NLP techniques (tokenization, stop-word removal, stemming/lemmatization), vectorized textual data via TF-IDF, and trained a Multinomial Naive Bayes model optimizing for minimal false positives.",
    problemStatement: "Mobile users are bombarded with deceptive spam messages and phishing attempts. Traditional rule-based filters fail against evolving obfuscations.",
    keyFeatures: [
      "Text Preprocessing Pipeline (Tokenization, Stopwords, Stemming)",
      "TF-IDF Feature Extraction with N-gram Support",
      "Multinomial Naive Bayes Classification Model",
      "Verified Model Metrics: 97% Accuracy, 98% Precision, 81% Recall",
      "Interactive Real-Time Inference Interface"
    ],
    myContribution: "Conducted Exploratory Data Analysis, performed text cleaning and vectorization experiments, trained and evaluated multiple classifiers, and built the real-time inference web UI.",
    tech: ["Python", "Scikit-learn", "NLTK", "Pandas", "Streamlit"],
    img: imgSpam,
    demo: "https://github.com/offx-priyanshu",
    github: "https://github.com/offx-priyanshu"
  },
  {
    id: "08",
    title: "SANGAM Restaurant Suite",
    filterCategory: "AI/ML",
    category: "ENTERPRISE ERP · INVENTORY & POS",
    tagline: "Comprehensive Multi-Terminal Restaurant Management System",
    desc: "An end-to-end restaurant administration system supporting inventory management, live menu configuration, real-time POS billing, sales analytics, and staff access controls.",
    longDesc: "SANGAM provides commercial kitchens and dining establishments with a unified operational command center. Connects tableside orders to kitchen displays while maintaining accurate real-time inventory deductions.",
    problemStatement: "Fragmented billing, inventory shrinkage, and lack of daily sales reporting create severe operational leakages for restaurant operators.",
    keyFeatures: [
      "Point-of-Sale (POS) Fast Terminal with Bill Generation",
      "Dynamic Menu & Category Catalog Management",
      "Real-Time Raw Ingredient Inventory Depletion Tracking",
      "Daily / Monthly Revenue Analytics & Sales Breakdown",
      "Role-Based Access Control for Cashiers, Waitstaff & Managers"
    ],
    myContribution: "Architected relational schema, designed API routes for POS transactions, and built analytics visualization modules for daily revenue reports.",
    tech: ["Python", "Flask", "MySQL", "React.js", "Chart.js"],
    img: imgSangam,
    demo: "https://github.com/offx-priyanshu",
    github: "https://github.com/offx-priyanshu"
  },
  {
    id: "09",
    title: "UniShield Security & AI",
    filterCategory: "Computer Vision",
    category: "CAMPUS SAFETY · COMPUTER VISION",
    tagline: "Automated Campus Verification & Safety Guard",
    desc: "Campus incident monitoring and student safety system integrating automated surveillance notifications, gate security verification, and digital audit trails.",
    longDesc: "UniShield extends smart campus safety infrastructure by integrating automated visitor check-in, emergency alert broadcasts, and incident logging with automated escalation paths.",
    problemStatement: "Campus safety relies heavily on manual security registers that cannot provide real-time status during unauthorized entry or emergency situations.",
    keyFeatures: [
      "Digital Visitor & Student ID Verification",
      "Automated Incident Alert Dispatches",
      "Cryptographic Security Logs and Timestamps",
      "Multi-Role Security Guard & Administration Portals"
    ],
    myContribution: "Implemented authentication flows, notification service routing, and administrative monitoring dashboards.",
    tech: ["Python", "FastAPI", "MongoDB", "React.js", "Docker"],
    img: imgUniShield,
    demo: "https://github.com/offx-priyanshu",
    github: "https://github.com/offx-priyanshu"
  }
];

const categoryFilters = [
  "ALL",
  "AI/ML",
  "Computer Vision",
  "Deep Learning",
  "Generative AI"
];

// Custom hook porting Nikhil's exact 3D cylinder reel scroll physics
function useReelPhysics(itemCount, reducedMotion) {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);
  const currRef = useRef(0);
  const targetRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const snapToRef = useRef(() => {});

  const scrollTo = useCallback((idx) => {
    snapToRef.current(idx);
  }, []);

  useEffect(() => {
    const stage = containerRef.current;
    if (!stage) return;

    let animId = 0;
    let lastTime = 0;
    let rowHeight = 1;
    let isDragging = false;
    let startY = 0;
    let dragCurrent = 0;
    let lastY = 0;
    let dragTime = 0;
    let velocity = 0;
    let snapTimeout;

    // Modulo wrap for infinite circular reel
    const wrap = (val) => ((val % itemCount) + itemCount) % itemCount;

    function renderReel() {
      const s = currRef.current;
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        const diff = wrap(i - s + itemCount / 2) - itemCount / 2;
        row.style.setProperty("--offset", (diff * rowHeight).toFixed(2) + "px");
        row.style.setProperty("--bend", (reducedMotion ? 0 : -diff * 6).toFixed(2) + "deg");
        row.style.setProperty("--depth", (reducedMotion ? 0 : -Math.abs(diff) * 16).toFixed(2) + "px");
        row.style.opacity = String(Math.max(0.12, 1 - Math.abs(diff) * 0.43));
        row.style.visibility = Math.abs(diff) > 1.95 ? "hidden" : "visible";
      });
      setActiveIndex(wrap(Math.round(s)));
    }

    function step(now) {
      const dt = Math.min(40, now - lastTime || 16);
      lastTime = now;
      const diff = targetRef.current - currRef.current;

      if (reducedMotion || Math.abs(diff) < 0.001) {
        currRef.current = targetRef.current;
      } else {
        // Momentum damping matching reference: 34ms while dragging, 100ms on coasting
        currRef.current += diff * (1 - Math.exp(-dt / (isDragging ? 34 : 100)));
      }

      renderReel();
      animId = currRef.current === targetRef.current ? 0 : requestAnimationFrame(step);
    }

    function startLoop() {
      if (!animId) {
        lastTime = performance.now();
        animId = requestAnimationFrame(step);
      }
    }

    function snap() {
      clearTimeout(snapTimeout);
      targetRef.current = Math.round(targetRef.current);
      startLoop();
    }

    snapToRef.current = (idx) => {
      clearTimeout(snapTimeout);
      const curr = currRef.current;
      targetRef.current = curr + wrap(idx - curr + itemCount / 2) - itemCount / 2;
      startLoop();
    };

    function onWheel(e) {
      if (e.ctrlKey || !e.deltaY) return;
      e.preventDefault();
      const mult = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? rowHeight : 1;
      targetRef.current += Math.max(-1.6, Math.min(1.6, (e.deltaY * mult) / rowHeight));
      startLoop();
      clearTimeout(snapTimeout);
      snapTimeout = setTimeout(snap, 150);
    }

    function onPointerDown(e) {
      if (e.button !== 0 || e.target.closest("button, a")) return;
      clearTimeout(snapTimeout);
      isDragging = true;
      startY = lastY = e.clientY;
      dragCurrent = currRef.current;
      dragTime = e.timeStamp;
      velocity = 0;
      stage.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const dt = Math.max(10, e.timeStamp - dragTime);
      velocity = 0.4 * velocity + 0.6 * (lastY - e.clientY) / dt;
      lastY = e.clientY;
      dragTime = e.timeStamp;
      targetRef.current = dragCurrent + (startY - e.clientY) / rowHeight;
      startLoop();
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      if (e.timeStamp - dragTime < 100 && !reducedMotion) {
        targetRef.current += Math.max(-2, Math.min(2, (velocity * 160) / rowHeight));
      }
      snap();
    }

    function onKeyDown(e) {
      if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      const rounded = Math.round(targetRef.current);
      if (e.key === "Home") scrollTo(0);
      else if (e.key === "End") scrollTo(itemCount - 1);
      else {
        const delta = ["ArrowDown", "PageDown"].includes(e.key) ? 1 : -1;
        scrollTo(rounded + delta);
      }
    }

    function updateSize() {
      rowHeight = rowsRef.current[0]?.offsetHeight || 1;
      renderReel();
    }

    const observer = new ResizeObserver(updateSize);
    observer.observe(stage);
    updateSize();

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    stage.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(snapTimeout);
      cancelAnimationFrame(animId);
      observer.disconnect();
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      stage.removeEventListener("keydown", onKeyDown);
    };
  }, [itemCount, reducedMotion, scrollTo]);

  return { containerRef, rowsRef, activeIndex, scrollTo };
}

const imgMap = {
  imgRoadVision,
  imgPathWeaver,
  imgAquaVision,
  imgModelForge,
  imgDocuMind,
  imgDormiq,
  imgSpam,
  imgSangam,
  imgUniShield
};

export default function Project({ reduced = false, cmsData, isAdminLoggedIn = false, onUpdateProjects }) {
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeDashboard, setActiveDashboard] = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL");

  // In-modal edit state for Case Study
  const [isEditingCase, setIsEditingCase] = useState(false);
  const [caseDraft, setCaseDraft] = useState(null);
  const [caseSaveNotice, setCaseSaveNotice] = useState(false);

  const effectiveProjects = useMemo(() => {
    let source = allProjects;
    if (cmsData?.projects && cmsData.projects.length > 0) {
      source = cmsData.projects;
    } else {
      try {
        const saved = localStorage.getItem("portfolio_cms_state");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.projects && parsed.projects.length > 0) {
            source = parsed.projects;
          }
        }
      } catch {
        // fallback
      }
    }
    // Map image assets appropriately
    return source.map((p, idx) => {
      const defaultImg = allProjects[idx % allProjects.length]?.img || imgRoadVision;
      let finalImg = p.img;
      if (typeof finalImg === "string" && imgMap[finalImg]) {
        finalImg = imgMap[finalImg];
      } else if (!finalImg) {
        finalImg = defaultImg;
      }
      return {
        ...allProjects[idx % allProjects.length],
        ...p,
        img: finalImg,
        tech: Array.isArray(p.tech) ? p.tech : (p.tech ? [p.tech] : [])
      };
    });
  }, [cmsData]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") return effectiveProjects;
    return effectiveProjects.filter((p) => p.filterCategory === activeFilter);
  }, [activeFilter, effectiveProjects]);

  const total = filteredProjects.length;

  const { containerRef, rowsRef, activeIndex, scrollTo } = useReelPhysics(total, reduced);

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0] || allProjects[0];

  const handleOpenCaseStudy = (project) => {
    sounds.playTick();
    setSelectedCase(project);
    setCaseDraft({ ...project });
    setIsEditingCase(false);
    setCaseSaveNotice(false);
  };

  const handleSaveCaseStudyDraft = () => {
    if (!caseDraft) return;
    const currentList = [...effectiveProjects];
    const targetIdx = currentList.findIndex((p) => p.id === caseDraft.id);
    if (targetIdx !== -1) {
      currentList[targetIdx] = { ...currentList[targetIdx], ...caseDraft };
    } else {
      currentList.push(caseDraft);
    }

    if (onUpdateProjects) {
      onUpdateProjects(currentList);
    } else {
      try {
        const saved = localStorage.getItem("portfolio_cms_state");
        const parsed = saved ? JSON.parse(saved) : {};
        parsed.projects = currentList;
        localStorage.setItem("portfolio_cms_state", JSON.stringify(parsed));
      } catch (err) {
        console.error(err);
      }
    }

    setSelectedCase(caseDraft);
    setIsEditingCase(false);
    setCaseSaveNotice(true);
    setTimeout(() => setCaseSaveNotice(false), 3000);
  };

  const handleCaseImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image is larger than 2MB. Please select an image under 2MB for optimal performance.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result;
      if (typeof base64 === "string") {
        setCaseDraft((prev) => ({ ...prev, img: base64 }));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <article className="project-page">
      {/* Category Filter Bar */}
      <nav className="project-filters" aria-label="Project Categories">
        {categoryFilters.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeFilter === cat ? "is-active" : ""}`}
            onClick={() => {
              sounds.playTick();
              setActiveFilter(cat);
              scrollTo(0);
            }}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Left Vertical Index Bar */}
      <nav className="project-index" aria-label="Project index">
        <small>INDEX</small>
        {filteredProjects.map((p, idx) => (
          <button
            key={p.id}
            aria-current={activeIndex === idx}
            onClick={() => {
              sounds.playTick();
              scrollTo(idx);
            }}
          >
            {p.id}
          </button>
        ))}
      </nav>

      {/* Central 3D Perspective Reel Stage */}
      <div
        className="reel-stage"
        ref={containerRef}
        tabIndex={0}
        aria-label="Interactive 3D Projects Showcase"
      >
        <div className="project-roll">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className="work-row"
              ref={(el) => (rowsRef.current[idx] = el)}
              onClick={() => {
                if (activeIndex !== idx) {
                  sounds.playTick();
                  scrollTo(idx);
                }
              }}
            >
              <div className="work-thumb-box">
                <img src={project.img} alt={project.title} />
              </div>

              <div className="work-content">
                <small className="work-category">{project.category}</small>
                <h3 className="work-title">{project.title}</h3>
                <p className="work-desc">{project.desc}</p>

                <div className="work-meta">
                  <div className="tags">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-badge">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="work-actions">
                    <button
                      className="work-link view-dash-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playTick();
                        setActiveDashboard(project);
                      }}
                    >
                      DASHBOARD ↗
                    </button>
                    <button
                      className="work-link view-case-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCaseStudy(project);
                      }}
                    >
                      CASE STUDY ↗
                    </button>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="work-link live-btn"
                    >
                      Source ↗
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Right Vertical Project Counter */}
      <aside className="project-counter">
        <strong>{activeProject.id}</strong>
        <hr />
        <span className="counter-title">{activeProject.title}</span>
      </aside>

      {/* Case Study Modal Dialog */}
      {selectedCase && (
        <div className="case-modal-backdrop" onClick={() => setSelectedCase(null)}>
          <div className="case-dialog" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <small className="case-eyebrow" style={{ margin: 0 }}>PROJECT CASE STUDY</small>
                {isAdminLoggedIn && (
                  <span style={{ fontSize: "10px", background: "rgba(139, 92, 246, 0.25)", color: "#c4b5fd", padding: "2px 6px", borderRadius: "4px", border: "1px solid rgba(139, 92, 246, 0.4)" }}>
                    ADMIN MODE
                  </span>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {isAdminLoggedIn && (
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playTick();
                      setIsEditingCase(!isEditingCase);
                    }}
                    style={{
                      background: isEditingCase ? "linear-gradient(135deg, #ec4899, #8b5cf6)" : "rgba(139, 92, 246, 0.2)",
                      border: "1px solid rgba(139, 92, 246, 0.4)",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "5px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}
                  >
                    <FaEdit size={11} />
                    <span>{isEditingCase ? "Cancel Editing" : "Edit Case Study"}</span>
                  </button>
                )}

                <button
                  className="case-close-btn"
                  onClick={() => setSelectedCase(null)}
                  aria-label="Close Case Study"
                  style={{ position: "static", transform: "none" }}
                >
                  Close ×
                </button>
              </div>
            </div>

            {caseSaveNotice && (
              <div style={{ marginBottom: "12px", padding: "8px 12px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10b981", borderRadius: "6px", color: "#34d399", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                <FaCheckCircle size={13} />
                <span>Case study updated & synced successfully!</span>
              </div>
            )}

            {isEditingCase && caseDraft ? (
              /* Inline Case Study CMS Editor */
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#a78bfa", fontWeight: 700, marginBottom: "4px" }}>
                    PROJECT TITLE
                  </label>
                  <input
                    type="text"
                    value={caseDraft.title || ""}
                    onChange={(e) => setCaseDraft({ ...caseDraft, title: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#080811",
                      border: "1px solid rgba(139, 92, 246, 0.4)",
                      borderRadius: "6px",
                      padding: "8px 12px",
                      color: "#fff",
                      fontSize: "18px",
                      fontWeight: 700
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#a78bfa", fontWeight: 700, marginBottom: "4px" }}>
                    TAGLINE / SUBTITLE
                  </label>
                  <input
                    type="text"
                    value={caseDraft.tagline || ""}
                    onChange={(e) => setCaseDraft({ ...caseDraft, tagline: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#080811",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "6px",
                      padding: "7px 10px",
                      color: "#fff",
                      fontSize: "12px"
                    }}
                  />
                </div>

                {/* Image Edit & Upload */}
                <div style={{ padding: "10px 12px", background: "#080811", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ fontSize: "11px", color: "#a78bfa", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "5px" }}>
                      <FaImage /> PROJECT COVER IMAGE
                    </label>
                    <label
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                        color: "#fff",
                        fontSize: "10.5px",
                        padding: "3px 8px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        fontWeight: 600
                      }}
                    >
                      <FaUpload size={10} />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleCaseImageUpload}
                      />
                    </label>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {caseDraft.img && (
                      <img
                        src={caseDraft.img}
                        alt="Preview"
                        style={{ width: "80px", height: "45px", objectFit: "cover", borderRadius: "5px", border: "1px solid rgba(139, 92, 246, 0.3)" }}
                      />
                    )}
                    <input
                      type="text"
                      value={caseDraft.img && !caseDraft.img.startsWith("data:image") ? caseDraft.img : (caseDraft.img ? "[Custom Uploaded Image]" : "")}
                      onChange={(e) => setCaseDraft({ ...caseDraft, img: e.target.value })}
                      placeholder="Or enter image URL (https://...)"
                      style={{
                        flex: 1,
                        background: "#05050a",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "5px",
                        padding: "6px 10px",
                        color: "#fff",
                        fontSize: "11.5px"
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#a78bfa", fontWeight: 700, marginBottom: "4px" }}>
                    DETAILED OVERVIEW / LONG DESCRIPTION
                  </label>
                  <textarea
                    rows={3}
                    value={caseDraft.longDesc || ""}
                    onChange={(e) => setCaseDraft({ ...caseDraft, longDesc: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#080811",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "6px",
                      padding: "8px 10px",
                      color: "#fff",
                      fontSize: "12.5px",
                      lineHeight: "1.5",
                      resize: "vertical"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#a78bfa", fontWeight: 700, marginBottom: "4px" }}>
                    PROBLEM STATEMENT
                  </label>
                  <textarea
                    rows={2}
                    value={caseDraft.problemStatement || ""}
                    onChange={(e) => setCaseDraft({ ...caseDraft, problemStatement: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#080811",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "6px",
                      padding: "8px 10px",
                      color: "#fff",
                      fontSize: "12.5px",
                      lineHeight: "1.5",
                      resize: "vertical"
                    }}
                  />
                </div>

                {/* Key Features List */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <label style={{ fontSize: "11px", color: "#a78bfa", fontWeight: 700, margin: 0 }}>
                      KEY FEATURES ({(Array.isArray(caseDraft.keyFeatures) ? caseDraft.keyFeatures.length : 0)})
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const feats = Array.isArray(caseDraft.keyFeatures) ? [...caseDraft.keyFeatures] : [];
                        feats.push("New Key Feature");
                        setCaseDraft({ ...caseDraft, keyFeatures: feats });
                      }}
                      style={{
                        background: "rgba(139, 92, 246, 0.2)",
                        border: "1px dashed #8b5cf6",
                        color: "#c4b5fd",
                        fontSize: "10.5px",
                        padding: "3px 8px",
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
                    {(Array.isArray(caseDraft.keyFeatures) ? caseDraft.keyFeatures : []).map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          background: "#080811",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          padding: "5px 8px",
                          borderRadius: "5px"
                        }}
                      >
                        <span style={{ fontSize: "11px", color: "#8b5cf6", fontWeight: 700 }}>#{fIdx + 1}</span>
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => {
                            const feats = [...caseDraft.keyFeatures];
                            feats[fIdx] = e.target.value;
                            setCaseDraft({ ...caseDraft, keyFeatures: feats });
                          }}
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
                          onClick={() => {
                            const feats = [...caseDraft.keyFeatures];
                            feats.splice(fIdx, 1);
                            setCaseDraft({ ...caseDraft, keyFeatures: feats });
                          }}
                          style={{
                            background: "rgba(239, 68, 68, 0.15)",
                            border: "none",
                            color: "#fca5a5",
                            borderRadius: "4px",
                            cursor: "pointer",
                            padding: "4px 6px"
                          }}
                          title="Delete Feature"
                        >
                          <FaTrash size={9} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#a78bfa", fontWeight: 700, marginBottom: "4px" }}>
                    MY CONTRIBUTION
                  </label>
                  <textarea
                    rows={2}
                    value={caseDraft.myContribution || ""}
                    onChange={(e) => setCaseDraft({ ...caseDraft, myContribution: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#080811",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "6px",
                      padding: "8px 10px",
                      color: "#fff",
                      fontSize: "12.5px",
                      lineHeight: "1.5",
                      resize: "vertical"
                    }}
                  />
                </div>

                {/* Tech Stack Edit */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <label style={{ fontSize: "11px", color: "#a78bfa", fontWeight: 700, margin: 0 }}>
                      TECH STACK ({(Array.isArray(caseDraft.tech) ? caseDraft.tech.length : 0)})
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const tList = Array.isArray(caseDraft.tech) ? [...caseDraft.tech] : [];
                        tList.push("NEW TECH");
                        setCaseDraft({ ...caseDraft, tech: tList });
                      }}
                      style={{
                        background: "rgba(139, 92, 246, 0.2)",
                        border: "1px dashed #8b5cf6",
                        color: "#c4b5fd",
                        fontSize: "10.5px",
                        padding: "3px 8px",
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
                    {(Array.isArray(caseDraft.tech) ? caseDraft.tech : []).map((t, tIdx) => (
                      <div
                        key={tIdx}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          background: "#0c0c16",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          padding: "3px 6px 3px 8px",
                          borderRadius: "4px"
                        }}
                      >
                        <input
                          type="text"
                          value={t}
                          onChange={(e) => {
                            const tList = [...caseDraft.tech];
                            tList[tIdx] = e.target.value;
                            setCaseDraft({ ...caseDraft, tech: tList });
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#fff",
                            fontSize: "11px",
                            width: `${Math.max(50, t.length * 8)}px`,
                            padding: "1px"
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const tList = [...caseDraft.tech];
                            tList.splice(tIdx, 1);
                            setCaseDraft({ ...caseDraft, tech: tList });
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#fca5a5",
                            cursor: "pointer",
                            padding: "1px"
                          }}
                        >
                          <FaTimes size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", color: "#a78bfa", fontWeight: 700, marginBottom: "4px" }}>
                      GITHUB / SOURCE URL
                    </label>
                    <input
                      type="text"
                      value={caseDraft.github || ""}
                      onChange={(e) => setCaseDraft({ ...caseDraft, github: e.target.value })}
                      style={{
                        width: "100%",
                        background: "#080811",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "6px",
                        padding: "7px 10px",
                        color: "#fff",
                        fontSize: "12px"
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", color: "#a78bfa", fontWeight: 700, marginBottom: "4px" }}>
                      LIVE DEMO / DASHBOARD URL
                    </label>
                    <input
                      type="text"
                      value={caseDraft.demo || ""}
                      onChange={(e) => setCaseDraft({ ...caseDraft, demo: e.target.value })}
                      style={{
                        width: "100%",
                        background: "#080811",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "6px",
                        padding: "7px 10px",
                        color: "#fff",
                        fontSize: "12px"
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "8px", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                  <button
                    type="button"
                    onClick={handleSaveCaseStudyDraft}
                    style={{
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      border: "none",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "8px 18px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <FaSave size={12} />
                    <span>Save Changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCaseDraft({ ...selectedCase });
                      setIsEditingCase(false);
                    }}
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#cbd5e1",
                      fontSize: "12px",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Normal Viewing Mode */
              <>
                <h2 className="case-title">{selectedCase.title}</h2>
                <p className="case-tagline">{selectedCase.tagline}</p>

                <div className="case-img-box">
                  <img src={selectedCase.img} alt={selectedCase.title} />
                </div>

                <p className="case-description">{selectedCase.longDesc}</p>

                {selectedCase.problemStatement && (
                  <div style={{ marginTop: "16px", background: "rgba(255, 255, 255, 0.02)", borderLeft: "2px solid #555", padding: "10px 14px" }}>
                    <strong style={{ display: "block", fontSize: "11px", color: "var(--ink)", fontFamily: "var(--mono)", textTransform: "uppercase" }}>
                      Problem Statement:
                    </strong>
                    <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#bbb", lineHeight: "1.5" }}>
                      {selectedCase.problemStatement}
                    </p>
                  </div>
                )}

                {selectedCase.keyFeatures && (
                  <div style={{ marginTop: "16px" }}>
                    <strong style={{ display: "block", fontSize: "11px", color: "var(--ink)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Key Features:
                    </strong>
                    <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#bbb", lineHeight: "1.6" }}>
                      {selectedCase.keyFeatures.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedCase.myContribution && (
                  <div style={{ marginTop: "16px", background: "#0a0a0a", border: "1px solid #222", borderRadius: "4px", padding: "10px 14px" }}>
                    <strong style={{ display: "block", fontSize: "11px", color: "var(--ink)", fontFamily: "var(--mono)", textTransform: "uppercase" }}>
                      My Contribution:
                    </strong>
                    <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#aaa", lineHeight: "1.5" }}>
                      {selectedCase.myContribution}
                    </p>
                  </div>
                )}

                <div className="case-tech-tags" style={{ marginTop: "16px" }}>
                  {selectedCase.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <div className="case-actions">
                  <button
                    className="case-action-btn primary"
                    onClick={() => {
                      sounds.playTick();
                      const proj = selectedCase;
                      setSelectedCase(null);
                      setActiveDashboard(proj);
                    }}
                  >
                    Open Live Dashboard ↗
                  </button>
                  <a
                    href={selectedCase.github}
                    target="_blank"
                    rel="noreferrer"
                    className="case-action-btn secondary"
                  >
                    Source Repository
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Full-Screen Interactive Project Dashboard Modal */}
      {activeDashboard && (
        <ProjectDashboardModal
          project={activeDashboard}
          onClose={() => setActiveDashboard(null)}
        />
      )}
    </article>
  );
}
