import "./Journey.css";

const journeyData = [
  {
    num: "01",
    date: "2024 — PRESENT",
    title: "B.TECH IN COMPUTER SCIENCE & ENGINEERING (AI & ML)",
    issuer: "Sandip University, Madhubani, Bihar, India",
    desc: "Enrolled in third year of B.Tech CSE specializing in Artificial Intelligence and Machine Learning. Building rigorous mathematical, algorithmic, and statistical foundations while maintaining consistent academic distinction (Sem 1: 9.00, Sem 2: 8.26, Sem 3: 8.35, Sem 4: 8.73).",
    tags: [
      "ACADEMIC EXCELLENCE",
      "DATA STRUCTURES",
      "ALGORITHMS",
      "DBMS",
      "STATISTICS"
    ]
  },
  {
    num: "02",
    date: "LEADERSHIP ROLE",
    title: "CLASS REPRESENTATIVE & TEAM LEAD",
    issuer: "Department of CSE (AI & ML), Sandip University",
    desc: "Elected Class Representative. Leading project teams, coordinating departmental activities, organizing student technical initiatives, and facilitating peer mentoring.",
    tags: [
      "STUDENT LEADERSHIP",
      "TEAM COORDINATION",
      "COMMUNICATION",
      "PROJECT MANAGEMENT"
    ]
  },
  {
    num: "03",
    date: "3-MONTH CRT JOURNEY",
    title: "TOP 3 IN CHECKMATE — DORMIQ (SMARTHOSTEL AI)",
    issuer: "Team Impact Crew — CRT Project Exhibition",
    desc: "Spearheaded technical development for DORMIQ (SmartHostel AI) with Team Impact Crew during an intensive three-month CRT journey. Successfully pitched and secured a TOP 3 position in the competitive CHECKMATE grand finale.",
    tags: [
      "TOP 3 CHECKMATE",
      "TEAM IMPACT CREW",
      "AI AUTOMATION",
      "SYSTEM DESIGN"
    ]
  },
  {
    num: "04",
    date: "05 MAY 2026 — 05 JUNE 2026",
    title: "DATA SCIENCE INTERN",
    issuer: "Cognifyz Technologies",
    desc: "Gained real-world industry experience as a Data Science Intern. Performed data preprocessing, exploratory data analysis (EDA), pattern discovery, and built data-driven solutions using Python and Pandas.",
    tags: [
      "DATA SCIENCE",
      "PYTHON",
      "PANDAS",
      "EDA",
      "DATA ANALYTICS"
    ]
  },
  {
    num: "05",
    date: "01 JUNE 2026 — 30 JUNE 2026",
    title: "ARTIFICIAL INTELLIGENCE INTERN",
    issuer: "Career Foresight (C-DAC ATC), Patna",
    desc: "Completed an offline summer internship focused on Artificial Intelligence fundamentals, supervised/unsupervised machine learning workflows, AI model development, and cross-functional technical project activities.",
    tags: [
      "ARTIFICIAL INTELLIGENCE",
      "MACHINE LEARNING",
      "MODEL WORKFLOWS",
      "TEAM COLLABORATION"
    ]
  },
  {
    num: "06",
    date: "CONTINUOUS LEARNING",
    title: "CERTIFICATIONS & ADVANCED AI SPECIALIZATION",
    issuer: "Oracle University • DeepLearning.AI • MongoDB • Microsoft",
    desc: "Earned industry credentials including Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate, DeepLearning.AI Machine Learning Specialization, MongoDB AI Agents & GenAI Apps, and Kaggle Python Coder.",
    tags: [
      "ORACLE CLOUD AI",
      "DEEPLEARNING.AI",
      "AI AGENTS",
      "GENAI",
      "RAG"
    ]
  }
];

export default function Journey({ cmsData }) {
  // Directly read from localStorage if present so it immediately reflects updates
  const items = (() => {
    if (cmsData?.journey && cmsData.journey.length > 0) return cmsData.journey;
    try {
      const saved = localStorage.getItem("portfolio_cms_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.journey && parsed.journey.length > 0) return parsed.journey;
      }
    } catch {
      // fallback
    }
    return journeyData;
  })();

  return (
    <article className="inner journey-page">
      <small className="eyebrow">CHRONOLOGICAL PROFESSIONAL MILESTONES</small>
      <h2 className="journey-heading">MY JOURNEY</h2>

      <div className="timeline">
        {items.map((item, index) => (
          <section key={item.id || item.title || index} className="timeline-item">
            <div className="timeline-left">
              <small className="timeline-meta">
                {item.num || String(index + 1).padStart(2, "0")} / {item.date}
              </small>
              <h3 className="timeline-title">{item.title}</h3>
              <b className="timeline-issuer">{item.issuer}</b>
            </div>

            <div className="timeline-right">
              <p className="timeline-desc">{item.desc}</p>
              {item.tags && item.tags.length > 0 && (
                <div className="tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
