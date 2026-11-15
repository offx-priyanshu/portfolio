import { useState } from "react";
import "./ProjectDashboardModal.css";
import { sounds } from "../utils/sound";

// Dashboard Data Configurations for all 9 projects matching reference UI
const dashboardConfigs = {
  "ROADVISION AI": {
    theme: "dark",
    icon: "🚗",
    brandColor: "#6366f1",
    subtitle: "Lane • Vehicle • Obstacle Detection",
    tagline: "Real-Time Road Monitoring",
    description: "Lane, vehicle and obstacle detection using AI",
    navItems: [
      { id: "dashboard", label: "Dashboard", active: true },
      { id: "detection", label: "Live Detection" },
      { id: "analytics", label: "Analytics" },
      { id: "dataset", label: "Dataset" },
      { id: "model", label: "Model" },
      { id: "settings", label: "Settings" }
    ],
    stats: [
      { label: "Vehicles", value: "12", icon: "🚙", color: "#6366f1" },
      { label: "Obstacles", value: "1", icon: "⚠️", color: "#f59e0b" },
      { label: "Lane Status", value: "Detected", icon: "🛣️", color: "#10b981" },
      { label: "FPS Rate", value: "58.4", icon: "⚡", color: "#3b82f6" }
    ],
    previewImage: "dash_roadvision.jpg",
    sidebarTitle: "RoadVision AI",
    screenCaption: "Live Vision Pipeline: Highway Cam 04",
    sideCardTitle: "Detection Feed",
    sideItems: [
      { text: "Vehicle detected [Confidence: 0.96]", status: "success", time: "Just now" },
      { text: "Obstacle alert: Cone in Lane 2", status: "danger", time: "12s ago" },
      { text: "Left lane boundary re-calibrated", status: "warning", time: "45s ago" },
      { text: "Speed flow computed: 72 km/h", status: "success", time: "1m ago" }
    ]
  },
  "PATHWEAVER AI": {
    theme: "dark",
    icon: "🔮",
    brandColor: "#10b981",
    subtitle: "Multi-Agent Path Planning • Reinforcement Learning",
    tagline: "Multi-Agent Path Planning Simulation",
    description: "Intelligent navigation with collision avoidance",
    navItems: [
      { id: "dashboard", label: "Dashboard", active: true },
      { id: "simulation", label: "Simulation" },
      { id: "agents", label: "Agents" },
      { id: "environment", label: "Environment" },
      { id: "training", label: "Training" },
      { id: "results", label: "Results" },
      { id: "settings", label: "Settings" }
    ],
    stats: [
      { label: "Agents", value: "3", icon: "🤖", color: "#10b981" },
      { label: "Grid Size", value: "20 × 20", icon: "📐", color: "#6366f1" },
      { label: "Collisions", value: "0", icon: "🛡️", color: "#f59e0b" },
      { label: "Status", value: "Running", icon: "⚡", color: "#3b82f6" }
    ],
    previewImage: "dash_pathweaver.jpg",
    sidebarTitle: "PathWeaver AI",
    screenCaption: "Multi-Agent Path Grid: RL Policy Active",
    sideCardTitle: "Agent Coordination",
    sideItems: [
      { text: "Agent Alpha reached Waypoint 4", status: "success", time: "2s ago" },
      { text: "Dynamic obstacle avoided by Agent Beta", status: "success", time: "8s ago" },
      { text: "Rerouting Gamma via shortest vector", status: "warning", time: "14s ago" },
      { text: "Episode reward converged: +842", status: "success", time: "30s ago" }
    ]
  },
  "AQUAVISION AI": {
    theme: "light",
    icon: "🌊",
    brandColor: "#0284c7",
    subtitle: "Underwater & Low-Light Image Enhancement",
    tagline: "Underwater Image Enhancement",
    description: "AI-based enhancement for clear and color-corrected images",
    navItems: [
      { id: "dashboard", label: "Dashboard", active: true },
      { id: "enhance", label: "Enhance Image" },
      { id: "batch", label: "Batch Processing" },
      { id: "model", label: "Model" },
      { id: "results", label: "Results" },
      { id: "settings", label: "Settings" }
    ],
    stats: [
      { label: "PSNR", value: "32.14 dB", icon: "📊", color: "#0284c7" },
      { label: "SSIM", value: "0.96", icon: "🎯", color: "#10b981" },
      { label: "Enhancement", value: "+42%", icon: "✨", color: "#6366f1" },
      { label: "Color Restoration", value: "+67%", icon: "🎨", color: "#f59e0b" }
    ],
    previewImage: "dash_aquavision.jpg",
    sidebarTitle: "AquaVision AI",
    screenCaption: "Input (Underwater) vs Enhanced (U-Net AI)",
    sideCardTitle: "Spectral Restoration Log",
    sideItems: [
      { text: "Cyan wavelength attenuation removed", status: "success", time: "1s ago" },
      { text: "Contrast ratio expanded from 1:4 to 1:18", status: "success", time: "10s ago" },
      { text: "Low-light denoising completed", status: "success", time: "22s ago" },
      { text: "Neural weight cache synchronized", status: "warning", time: "1m ago" }
    ]
  },
  "MODELFORGE AI": {
    theme: "light",
    icon: "⚙️",
    brandColor: "#4f46e5",
    subtitle: "End-to-End ML Pipeline • Training • Evaluation • Tracking",
    tagline: "ML Pipeline Dashboard",
    description: "Build, train and evaluate ML models efficiently",
    navItems: [
      { id: "dashboard", label: "Dashboard", active: true },
      { id: "projects", label: "Projects" },
      { id: "datasets", label: "Datasets" },
      { id: "experiments", label: "Experiments" },
      { id: "models", label: "Models" },
      { id: "deployment", label: "Deployment" },
      { id: "settings", label: "Settings" }
    ],
    stats: [
      { label: "Datasets", value: "5", icon: "📁", color: "#4f46e5" },
      { label: "Experiments", value: "12", icon: "🧪", color: "#0284c7" },
      { label: "Trained Models", value: "8", icon: "🧠", color: "#f59e0b" },
      { label: "Best Accuracy", value: "97.3%", icon: "🏆", color: "#10b981" }
    ],
    previewImage: "dash_modelforge.jpg",
    sidebarTitle: "ModelForge AI",
    screenCaption: "Automated Experiment Benchmarks (ROC & F1)",
    sideCardTitle: "Recent Experiments",
    sideItems: [
      { text: "exp_012 — XGBoost (97.3% accuracy)", status: "success", time: "Just now" },
      { text: "exp_011 — Random Forest (94.8% accuracy)", status: "success", time: "15m ago" },
      { text: "exp_010 — SVM Classifier (91.2% accuracy)", status: "warning", time: "1h ago" },
      { text: "DVC feature dataset versioned (v2.4)", status: "success", time: "2h ago" }
    ]
  },
  "DOCUMIND AI": {
    theme: "light",
    icon: "📄",
    brandColor: "#2563eb",
    subtitle: "AI Document Assistant • RAG • LLM • Q&A",
    tagline: "AI Document Assistant",
    description: "Upload documents and get intelligent, context-aware answers",
    navItems: [
      { id: "dashboard", label: "Dashboard", active: true },
      { id: "chat", label: "Chat with Docs" },
      { id: "documents", label: "Documents" },
      { id: "knowledge", label: "Knowledge Base" },
      { id: "history", label: "History" },
      { id: "settings", label: "Settings" }
    ],
    stats: [
      { label: "Pages Parsed", value: "18", icon: "📑", color: "#2563eb" },
      { label: "Chunks Indexed", value: "42", icon: "🧩", color: "#6366f1" },
      { label: "FAISS Embeddings", value: "Ready", icon: "✅", color: "#10b981" },
      { label: "Indexed Status", value: "Active", icon: "⚡", color: "#f59e0b" }
    ],
    previewImage: "dash_documind.jpg",
    sidebarTitle: "DocuMind AI",
    screenCaption: "Conversational RAG: Research_Paper.pdf (3.2 MB)",
    sideCardTitle: "Document Insights",
    sideItems: [
      { text: "Query: 'What is the main contribution?'", status: "success", time: "1m ago" },
      { text: "Answer generated with U-Net citations", status: "success", time: "1m ago" },
      { text: "Vector distance threshold: 0.18", status: "warning", time: "5m ago" },
      { text: "Embeddings cached to ChromaDB", status: "success", time: "10m ago" }
    ]
  },
  "DORMIQ (SMARTHOSTEL AI)": {
    theme: "light",
    icon: "🏨",
    brandColor: "#3b82f6",
    subtitle: "Hostel Management • Allotment • Complaints • AI Chatbot",
    tagline: "Hostel Management Dashboard",
    description: "Smart hostel operations with AI automation",
    navItems: [
      { id: "dashboard", label: "Dashboard", active: true },
      { id: "students", label: "Students" },
      { id: "hostels", label: "Hostel & Rooms" },
      { id: "allotment", label: "Allotment" },
      { id: "complaints", label: "Complaints" },
      { id: "leave", label: "Leave Management" },
      { id: "fee", label: "Fee Management" },
      { id: "notices", label: "Notices" },
      { id: "ai", label: "AI Chatbot" },
      { id: "reports", label: "Reports" }
    ],
    stats: [
      { label: "Total Students", value: "1,248", icon: "👥", color: "#3b82f6" },
      { label: "Hostel Blocks", value: "4", icon: "🏢", color: "#6366f1" },
      { label: "Rooms Occupied", value: "320", icon: "🛏️", color: "#10b981" },
      { label: "Complaints", value: "6", icon: "⚠️", color: "#ef4444" }
    ],
    previewImage: "dash_dormiq.jpg",
    sidebarTitle: "DormIQ",
    screenCaption: "Hostel Occupancy (92% Occupied - 294 Occupied / 26 Available)",
    sideCardTitle: "Recent Complaints",
    sideItems: [
      { text: "Water supply issue in Block B (2nd floor)", status: "danger", time: "10m ago" },
      { text: "Room 304 fan maintenance requested", status: "warning", time: "25m ago" },
      { text: "Mess food quality inspection feedback", status: "warning", time: "1h ago" },
      { text: "AI auto-assigned electrician to Room 212", status: "success", time: "2h ago" }
    ]
  },
  "SMS SPAM DETECTION ML APP": {
    theme: "light",
    icon: "💬",
    brandColor: "#6366f1",
    subtitle: "NLP • Text Classification • TF-IDF • Naive Bayes",
    tagline: "SMS Spam Detection",
    description: "Classify SMS messages as Spam or Not Spam using Machine Learning",
    navItems: [
      { id: "dashboard", label: "Dashboard", active: true },
      { id: "detect", label: "Detect SMS" },
      { id: "dataset", label: "Dataset" },
      { id: "model", label: "Model Performance" },
      { id: "about", label: "About" }
    ],
    stats: [
      { label: "Accuracy", value: "97%", icon: "🎯", color: "#3b82f6" },
      { label: "Precision", value: "98%", icon: "🛡️", color: "#10b981" },
      { label: "Recall", value: "81%", icon: "📈", color: "#8b5cf6" },
      { label: "Inference Time", value: "14ms", icon: "⚡", color: "#f59e0b" }
    ],
    previewImage: "dash_spam.jpg",
    sidebarTitle: "SMS Spam Detection",
    screenCaption: "Prediction Engine: 'Congratulations! You've won ₹10,000 voucher...' -> SPAM (98%)",
    sideCardTitle: "Recent Classifications",
    sideItems: [
      { text: "'Claim your lottery prize now' -> SPAM (99%)", status: "danger", time: "Just now" },
      { text: "'Hey, are we still meeting at 5 PM?' -> HAM (99%)", status: "success", time: "3m ago" },
      { text: "'Your bank OTP is 492810' -> HAM (98%)", status: "success", time: "12m ago" },
      { text: "'Urgent: Account locked click here' -> SPAM (97%)", status: "danger", time: "25m ago" }
    ]
  },
  "SANGAM RESTAURANT SUITE": {
    theme: "light",
    icon: "🍴",
    brandColor: "#6366f1",
    subtitle: "Restaurant ERP • Inventory • POS • Sales Analytics",
    tagline: "Restaurant Dashboard",
    description: "Manage sales, inventory, menu and real-time POS",
    navItems: [
      { id: "dashboard", label: "Dashboard", active: true },
      { id: "pos", label: "POS Billing" },
      { id: "menu", label: "Menu Management" },
      { id: "inventory", label: "Inventory" },
      { id: "sales", label: "Sales & Reports" },
      { id: "customers", label: "Customers" },
      { id: "discounts", label: "Discounts" },
      { id: "settings", label: "Settings" }
    ],
    stats: [
      { label: "Today's Sales", value: "₹24,560", icon: "💵", color: "#10b981" },
      { label: "Total Orders", value: "142", icon: "🧾", color: "#3b82f6" },
      { label: "Total Profit", value: "₹8,320", icon: "📈", color: "#8b5cf6" },
      { label: "Low Stock Alert", value: "3 Items", icon: "⚠️", color: "#ef4444" }
    ],
    previewImage: "dash_sangam.jpg",
    sidebarTitle: "SANGAM",
    screenCaption: "Real-Time Revenue Hourly Curve & Kitchen KDS",
    sideCardTitle: "Top Selling Items",
    sideItems: [
      { text: "Veg Biryani (42 orders completed)", status: "success", time: "Today" },
      { text: "Paneer Butter Masala (31 orders completed)", status: "success", time: "Today" },
      { text: "Cold Coffee (27 orders completed)", status: "success", time: "Today" },
      { text: "Butter Naan (18 orders completed)", status: "success", time: "Today" }
    ]
  },
  "UNISHIELD SECURITY & AI": {
    theme: "light",
    icon: "🛡️",
    brandColor: "#3b82f6",
    subtitle: "Campus Safety • AI Surveillance • Gate Verification",
    tagline: "Campus Security Dashboard",
    description: "Real-time monitoring and AI-powered campus safety",
    navItems: [
      { id: "dashboard", label: "Dashboard", active: true },
      { id: "surveillance", label: "Live Surveillance" },
      { id: "gate", label: "Gate Verification" },
      { id: "incidents", label: "Incidents" },
      { id: "alerts", label: "Alerts" },
      { id: "reports", label: "Reports" },
      { id: "users", label: "Users" },
      { id: "settings", label: "Settings" }
    ],
    stats: [
      { label: "Live Cameras", value: "24", icon: "📹", color: "#3b82f6" },
      { label: "Active Alerts", value: "3", icon: "🚨", color: "#f59e0b" },
      { label: "Verifications", value: "1,284", icon: "🆔", color: "#6366f1" },
      { label: "Incidents", value: "12", icon: "⚠️", color: "#ef4444" }
    ],
    previewImage: "dash_unishield.jpg",
    sidebarTitle: "UniShield AI",
    screenCaption: "Main Gate Surveillance: Camera 01 (Live AI Bounding Boxes)",
    sideCardTitle: "Recent Incidents",
    sideItems: [
      { text: "Unauthorized Entry attempt at Gate 3", status: "danger", time: "2m ago" },
      { text: "Suspicious Activity detected near quad", status: "warning", time: "15m ago" },
      { text: "Gate Access Denied for unverified vehicle", status: "danger", time: "32m ago" },
      { text: "Daily security log signed and sealed", status: "success", time: "1h ago" }
    ]
  }
};

export default function ProjectDashboardModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [interactiveCounter, setInteractiveCounter] = useState(0);

  if (!project) return null;

  // Match config key case-insensitively
  const projectKey = Object.keys(dashboardConfigs).find(
    (k) => k.toLowerCase() === project.title.toLowerCase() || project.title.toUpperCase().includes(k)
  ) || "ROADVISION AI";

  const config = dashboardConfigs[projectKey] || dashboardConfigs["ROADVISION AI"];
  const isDark = config.theme === "dark";

  return (
    <div className="dash-backdrop" onClick={onClose}>
      <div className="dash-window" onClick={(e) => e.stopPropagation()}>
        {/* Title Bar */}
        <div className="dash-titlebar">
          <div className="dash-brand">
            <div className="dash-brand-icon" style={{ background: config.brandColor }}>
              {config.icon}
            </div>
            <div>
              <h2>{project.title}</h2>
              <p>{config.subtitle}</p>
            </div>
          </div>

          <div className="dash-controls">
            <span className="dash-badge">● LIVE INTERFACE DEMO</span>
            <button
              className="dash-close-btn"
              onClick={() => {
                sounds.playTick();
                onClose();
              }}
            >
              CLOSE ×
            </button>
          </div>
        </div>

        {/* Body Area */}
        <div className="dash-body">
          {/* Sidebar */}
          <aside className="dash-sidebar">
            <div className="dash-sidebar-header">
              <span style={{ color: config.brandColor, fontSize: "16px" }}>{config.icon}</span>
              <span>{config.sidebarTitle}</span>
            </div>

            {config.navItems.map((item) => (
              <button
                key={item.id}
                className={`dash-nav-item ${activeTab === item.id ? "active" : ""}`}
                style={activeTab === item.id ? { background: config.brandColor } : {}}
                onClick={() => {
                  sounds.playTick();
                  setActiveTab(item.id);
                }}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </aside>

          {/* Main Content Area */}
          <main className={`dash-main ${isDark ? "dark-theme" : ""}`}>
            {/* Main Header with Search and Profile */}
            <div className="dash-main-header">
              <div className="dash-search-box">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input placeholder="Search telemetry, events or records..." />
              </div>

              <div className="dash-user-actions">
                <button className="dash-icon-btn" title="Notifications">🔔</button>
                <button className="dash-icon-btn" title="System Status">⚙️</button>
                <div className="dash-user-avatar" style={{ background: config.brandColor }}>
                  PK
                </div>
              </div>
            </div>

            {/* Headline */}
            <div className="dash-headline">
              <h3>{config.tagline}</h3>
              <p>{config.description}</p>
            </div>

            {/* 4 KPI Metric Cards */}
            <div className="dash-stats-grid">
              {config.stats.map((st, i) => (
                <div key={i} className="dash-stat-card">
                  <div className="dash-stat-icon" style={{ background: `${st.color}15`, color: st.color }}>
                    {st.icon}
                  </div>
                  <div>
                    <small>{st.label}</small>
                    <strong style={{ color: isDark ? "#fff" : "#111" }}>{st.value}</strong>
                  </div>
                </div>
              ))}
            </div>

            {/* 2-Column Core View */}
            <div className="dash-view-columns">
              {/* Left Column: Interactive Feed Screen */}
              <div className="dash-card-box">
                <div className="dash-card-title">
                  <h4>Interactive Screen Preview</h4>
                  <span>● Real-time Stream Active</span>
                </div>

                <div className="dash-screen">
                  <img src={project.img} alt={project.title} />
                  <span className="dash-live-badge">LIVE FEED</span>
                  <div className="dash-screen-caption">{config.screenCaption}</div>
                </div>

                {/* Interactive Simulation Controls */}
                <div className="dash-interactive-bar">
                  <button
                    className="dash-primary-btn"
                    style={{ background: config.brandColor }}
                    onClick={() => {
                      sounds.playTick();
                      setInteractiveCounter((c) => c + 1);
                    }}
                  >
                    Run Simulation Trigger ({interactiveCounter})
                  </button>
                  <button
                    className="dash-sec-btn"
                    onClick={() => {
                      sounds.playTick();
                      setInteractiveCounter(0);
                    }}
                  >
                    Reset Telemetry
                  </button>
                </div>
              </div>

              {/* Right Column: Events & Records List */}
              <div className="dash-card-box">
                <div className="dash-card-title">
                  <h4>{config.sideCardTitle}</h4>
                  <span>View All →</span>
                </div>

                <div className="dash-list">
                  {config.sideItems.map((item, i) => (
                    <div key={i} className={`dash-list-item ${item.status}`}>
                      <div>
                        <span className="dot"></span>
                        <span>{item.text}</span>
                      </div>
                      <small>{item.time}</small>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "18px", borderTop: "1px solid rgba(120,120,120,0.15)", paddingTop: "14px" }}>
                  <small style={{ display: "block", color: "#8a92a6", fontSize: "11px", marginBottom: "8px", textTransform: "uppercase" }}>
                    Verified Technology Stack:
                  </small>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "11px",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          background: isDark ? "#212836" : "#edf2f7",
                          color: isDark ? "#ccd5e4" : "#4a5568",
                          fontWeight: 600
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
