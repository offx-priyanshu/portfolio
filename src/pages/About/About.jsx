import "./About.css";
import { useState, useMemo } from "react";
import { sounds } from "../../utils/sound";
import initialAboutData from "../../data/initialAboutData.json";

const defaultPrinciplesList = [
  ["Build by hand", "Start with a small working interface. Extract a component once a second screen needs it."],
  ["Measure the work", "Trace the slow request from the browser to the database before changing the query."],
  ["Give motion a job", "Use movement to show which project is in focus and where the next one begins."],
  ["Design for a phone", "Check controls, reading order, and load time on the screen a visitor actually uses."],
  ["Leave a clear trail", "Give functions plain names and keep the reason for each technical decision close to the code."]
];

const defaultEducationList = [
  {
    institution: "Sandip University, Madhubani, Bihar, India",
    degree: "Bachelor of Technology (B.Tech)",
    branch: "Computer Science and Engineering (AI & ML)",
    period: "Third Year (Enrolled)",
    location: "Bihar, India",
    semesters: [
      { sem: "Semester 1", gpa: "9.00" },
      { sem: "Semester 2", gpa: "8.26" },
      { sem: "Semester 3", gpa: "8.35" },
      { sem: "Semester 4", gpa: "8.73" }
    ]
  }
];

const defaultTechnicalSkillsList = initialAboutData.technicalSkills;
const defaultExperienceList = initialAboutData.experiences;
const defaultCertList = initialAboutData.certifications;
const defaultAchievementsList = initialAboutData.achievements;

export default function About({ onOpenResume, cmsData }) {
  const [resumeOpen, setResumeOpen] = useState(false);

  // Normalize CMS data with fallbacks
  const aboutData = useMemo(() => {
    let source = cmsData?.about;
    if (!source) {
      try {
        const saved = localStorage.getItem("portfolio_cms_state");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.about) source = parsed.about;
        }
      } catch {
        // ignore
      }
    }

    const intro = {
      kicker: source?.intro?.kicker || "Aspiring Data Scientist | AI & Machine Learning | Generative AI",
      headingLine1: source?.intro?.headingLine1 || "TURNING DATA",
      headingLine2: source?.intro?.headingLine2 || "INTO INTELLIGENCE",
      prose: source?.intro?.prose || "Hi, I'm Priyanshu Kumar, a B.Tech Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning at Sandip University."
    };

    const sections = {
      whoIAm: source?.sections?.whoIAm ?? (source?.whoIAm || initialAboutData.sections.whoIAm),
      technicalInterests: source?.sections?.technicalInterests ?? (source?.technicalInterests || initialAboutData.sections.technicalInterests),
      leadership: source?.sections?.leadership ?? (source?.leadership || initialAboutData.sections.leadership),
      careerGoals: source?.sections?.careerGoals ?? (source?.careerGoals || initialAboutData.sections.careerGoals)
    };

    const rawPrinciples = source?.principles || defaultPrinciplesList;
    const principles = Array.isArray(rawPrinciples)
      ? rawPrinciples.map((p) => {
          if (Array.isArray(p)) return { title: p[0], desc: p[1] };
          return { title: p.title || "", desc: p.desc || "" };
        })
      : [];

    const dossierSummary = source?.dossierSummary || initialAboutData.dossierSummary;
    const technicalSkills = source?.technicalSkills && source.technicalSkills.length > 0 ? source.technicalSkills : defaultTechnicalSkillsList;
    const achievements = source?.achievements && source.achievements.length > 0 ? source.achievements : defaultAchievementsList;
    const certifications = source?.certifications && source.certifications.length > 0 ? source.certifications : defaultCertList;
    const experiences = source?.experiences && source.experiences.length > 0 ? source.experiences : defaultExperienceList;
    const resumeUrl = cmsData?.resumeUrl || source?.resumeUrl || `${import.meta.env.BASE_URL}priyanshu-resume.pdf`;
    const resumeFileName = cmsData?.resumeFileName || source?.resumeFileName || "Priyanshu_Resume.pdf";

    return {
      intro,
      sections,
      principles,
      dossierSummary,
      technicalSkills,
      achievements,
      certifications,
      experiences,
      resumeUrl,
      resumeFileName
    };
  }, [cmsData]);

  const handleOpenResume = () => {
    sounds.playTick();
    if (onOpenResume) {
      onOpenResume();
    } else {
      setResumeOpen(true);
    }
  };

  return (
    <article className="inner about-page">
      {/* 01 Introduction */}
      <div className="intro-grid">
        <div>
          <small className="eyebrow">01  Introduction</small>
          <p className="kicker">{aboutData.intro.kicker}</p>
          <h2>
            {aboutData.intro.headingLine1}
            <br />
            {aboutData.intro.headingLine2}
          </h2>
          <p className="prose">
            {aboutData.intro.prose}
          </p>

          <div className="about-subsections" style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <strong style={{ display: "block", color: "var(--ink)", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
                [ WHO I AM ]
              </strong>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.65", color: "#aaa" }}>
                {aboutData.sections.whoIAm}
              </p>
            </div>

            <div>
              <strong style={{ display: "block", color: "var(--ink)", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
                [ TECHNICAL INTERESTS ]
              </strong>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.65", color: "#aaa" }}>
                {aboutData.sections.technicalInterests}
              </p>
            </div>

            <div>
              <strong style={{ display: "block", color: "var(--ink)", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
                [ LEADERSHIP & COLLABORATION ]
              </strong>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.65", color: "#aaa" }}>
                {aboutData.sections.leadership}
              </p>
            </div>

            <div>
              <strong style={{ display: "block", color: "var(--ink)", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
                [ CAREER GOALS ]
              </strong>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.65", color: "#aaa" }}>
                {aboutData.sections.careerGoals}
              </p>
            </div>
          </div>

          <div className="hero-resume-action" style={{ margin: "24px 0 0 0" }}>
            <button
              onClick={handleOpenResume}
              className="resume-pill"
              aria-label="Open Curriculum Vitae"
            >
              <small>Doc</small>
              <span>Resume / CV</span>
              <b>↗</b>
            </button>
            <a
              href={aboutData.resumeUrl}
              download={aboutData.resumeFileName}
              className="resume-pdf-pill"
              title="Download Official PDF"
            >
              <span>PDF</span>
              <b>↓</b>
            </a>
          </div>
        </div>

        <figure>
          <img
            src={`${import.meta.env.BASE_URL}priyanshu-enhanced.jpg`}
            alt="Priyanshu"
          />
        </figure>
      </div>

      {/* 4-Column Fact Strip */}
      <dl className="fact-strip">
        <div>
          <dt>Based</dt>
          <dd>Katihar, Bihar, India</dd>
        </div>
        <div>
          <dt>Contact</dt>
          <dd>
            <a href="tel:9060956707" style={{ color: "inherit", textDecoration: "none" }}>9060956707</a>
            {" · "}
            <a href="mailto:priyanshugse@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>Email ↗</a>
          </dd>
        </div>
        <div>
          <dt>Education</dt>
          <dd>B.Tech CSE (AI & ML) · Third Year</dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd>DATA SCIENCE • ARTIFICIAL INTELLIGENCE • MACHINE LEARNING • GENERATIVE AI</dd>
        </div>
      </dl>

      {/* 02 How I work */}
      <small className="eyebrow">02  How I work</small>
      <div className="principles">
        {aboutData.principles.map((pr, idx) => (
          <article key={pr.title || idx}>
            <small>0{idx + 1}</small>
            <h3>{pr.title}</h3>
            <p>{pr.desc}</p>
          </article>
        ))}
      </div>

      {/* 03 Curriculum Vitae */}
      <small className="eyebrow" style={{ marginTop: "8svh" }}>
        03  Curriculum Vitae
      </small>

      <div className="resume-dossier">
        <div className="resume-dossier-header">
          <div>
            <small className="eyebrow" style={{ border: "none", padding: 0 }}>
              Verified Candidate Profile
            </small>
            <h3>Priyanshu Kumar</h3>
            <p className="kicker" style={{ margin: "6px 0 0", fontSize: "13px" }}>
              Aspiring Data Scientist • Katihar, Bihar, India • <a href="tel:9060956707" style={{ color: "inherit", textDecoration: "none" }}>9060956707</a> • <a href="mailto:priyanshugse@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>priyanshugse@gmail.com</a>
            </p>
          </div>

          <div className="actions">
            <button
              onClick={handleOpenResume}
              className="resume-btn"
              aria-label="Open full interactive resume"
            >
              <span>Interactive Dossier</span>
              <b>↗</b>
            </button>
            <a
              href={aboutData.resumeUrl}
              download={aboutData.resumeFileName}
              className="resume-btn"
              title="Download Official PDF"
            >
              <span>Download PDF</span>
              <b>↓</b>
            </a>
          </div>
        </div>

        <div className="resume-grid">
          {/* Summary Box */}
          <div className="resume-summary-box">
            <p>
              {aboutData.dossierSummary}
            </p>
          </div>

          {/* Education */}
          <div className="resume-block">
            <h4>Education & Academic Performance</h4>
            {defaultEducationList.map((item) => (
              <div key={item.institution} className="resume-card">
                <header>
                  <h5>{item.institution}</h5>
                  <small>{item.period}</small>
                </header>
                <div className="org">{item.degree} — {item.branch}</div>
                <div className="tags" style={{ margin: "8px 0" }}>
                  <span>{item.location}</span>
                  <span>Enrolled: Third Year</span>
                </div>
                {/* GPA Timeline Matrix */}
                <div style={{ marginTop: "12px", borderTop: "1px solid #222", paddingTop: "10px" }}>
                  <small style={{ display: "block", color: "#888", font: "500 10px var(--mono)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Verified Academic Performance (GPA)
                  </small>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                    {item.semesters.map((s) => (
                      <div key={s.sem} style={{ background: "#111", border: "1px solid #262626", borderRadius: "4px", padding: "6px 8px", textAlign: "center" }}>
                        <span style={{ display: "block", fontSize: "10px", color: "#888", fontFamily: "var(--mono)" }}>{s.sem}</span>
                        <strong style={{ display: "block", fontSize: "14px", color: "var(--ink)", fontFamily: "var(--mono)", marginTop: "2px" }}>{s.gpa}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className="resume-block">
            <h4>Technical Skills</h4>
            <div className="resume-card">
              {aboutData.technicalSkills.map((group, gIdx) => (
                <div key={group.category || gIdx} className="resume-skill-group">
                  <span>{group.category}</span>
                  <div className="tags" style={{ margin: 0 }}>
                    {(Array.isArray(group.items) ? group.items : []).map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="resume-block" style={{ gridColumn: "1 / -1" }}>
            <h4>Professional Experience & Internships</h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "16px"
              }}
            >
              {aboutData.experiences.map((exp, eIdx) => (
                <div key={exp.company || eIdx} className="resume-card">
                  <header>
                    <h5>{exp.company}</h5>
                    <small>{exp.period}</small>
                  </header>
                  <div className="org">
                    {exp.role} · {exp.location}
                  </div>
                  <ul>
                    {(Array.isArray(exp.highlights) ? exp.highlights : []).map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements & Leadership */}
          <div className="resume-block" style={{ gridColumn: "1 / -1" }}>
            <h4>Achievements & Leadership Highlights</h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "14px"
              }}
            >
              {aboutData.achievements.map((ach, aIdx) => (
                <div
                  key={ach.title || aIdx}
                  className="resume-card"
                  style={{
                    border: ach.badge === "TOP 3 FINALIST" ? "1px solid rgba(255, 255, 255, 0.4)" : "1px solid #262626",
                    background: ach.badge === "TOP 3 FINALIST" ? "linear-gradient(180deg, rgba(255, 255, 255, 0.05), #060606)" : "#060606"
                  }}
                >
                  <header>
                    <span
                      style={{
                        display: "inline-block",
                        font: "600 10px var(--mono)",
                        color: "var(--ink)",
                        border: "1px solid var(--ink)",
                        padding: "2px 6px",
                        borderRadius: "3px",
                        letterSpacing: "0.1em"
                      }}
                    >
                      {ach.badge}
                    </span>
                    <small style={{ color: "#aaa" }}>{ach.team}</small>
                  </header>
                  <h5 style={{ margin: "10px 0 2px", fontSize: "15px", color: "#fff" }}>{ach.title}</h5>
                  <div className="org" style={{ fontSize: "12px", color: "var(--ink)", marginBottom: "8px" }}>{ach.project}</div>
                  <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.6", color: "#999" }}>{ach.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Verified Credentials */}
          <div className="resume-block" style={{ gridColumn: "1 / -1" }}>
            <h4>Certifications & Verified Credentials</h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "12px"
              }}
            >
              {aboutData.certifications.map((c, cIdx) => (
                <div key={c.title || cIdx} className="resume-card">
                  <header>
                    <h5>{c.title}</h5>
                    <small>{c.issuer}</small>
                  </header>
                  <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#999" }}>
                    {c.topics}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a className="text-link" href="#journey">
        Explore my journey ↗
      </a>

      {/* Interactive Dossier Modal (Print/View) */}
      {resumeOpen && (
        <div
          className="resume-modal-backdrop"
          onClick={() => setResumeOpen(false)}
        >
          <div
            className="resume-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="resume-modal-close"
              onClick={() => setResumeOpen(false)}
            >
              Close ×
            </button>
            <div className="resume-modal-content">
              <h2>Priyanshu Kumar — Aspiring Data Scientist</h2>
              <p>
                Katihar, Bihar, India • <a href="tel:9060956707" style={{ color: "inherit", textDecoration: "none" }}>9060956707</a> • <a href="mailto:priyanshugse@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>priyanshugse@gmail.com</a>
              </p>
              <hr />
              <h3>Summary</h3>
              <p>
                Third-year Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning at Sandip University. Passionate about Data Science, Machine Learning, Deep Learning, and Generative AI. Experienced in exploratory data analysis, predictive modeling, LLM application architecture, and teamwork leadership (Class Representative, Project Lead, TOP 3 CHECKMATE Finalist).
              </p>
              <h3>Education</h3>
              <p>
                <strong>Sandip University, Madhubani, Bihar, India</strong> — B.Tech Computer Science & Engineering (AI & ML) | Third Year<br />
                <span style={{ fontSize: "12px", color: "#888" }}>Academic Performance: Sem 1: 9.00 | Sem 2: 8.26 | Sem 3: 8.35 | Sem 4: 8.73</span>
              </p>
              <h3>Professional Experience & Internships</h3>
              <p>
                <strong>Cognifyz Technologies</strong> — Data Science Intern (05 May 2026 – 05 June 2026)<br />
                Data analysis, dataset preprocessing, problem-solving, and Python/Pandas analytical workflows.<br /><br />
                <strong>Career Foresight (C-DAC ATC), Patna</strong> — Artificial Intelligence Intern (01 June 2026 – 30 June 2026)<br />
                Artificial Intelligence fundamentals, model training pipelines, project coordination, and team development.
              </p>
              <h3>Key Projects</h3>
              <p>
                <strong>DORMIQ (SmartHostel AI)</strong> — AI-Powered Smart Hostel Management & Complaint Resolution System (TOP 3 CHECKMATE).<br />
                <strong>SMS Spam Detection ML Application</strong> — TF-IDF & Multinomial Naive Bayes model (Accuracy: 97%, Precision: 98%, Recall: 81%).<br />
                <strong>SANGAM Restaurant Management System</strong> — Inventory, Menu, POS, sales tracking & administrative engine.
              </p>
              <h3>Technical Skills</h3>
              <p>
                <strong>Programming:</strong> Python, C, SQL, JavaScript<br />
                <strong>Data Science & ML:</strong> NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, TensorFlow, PyTorch, Deep Learning, CNN, OpenCV, Statistics, EDA<br />
                <strong>Generative AI:</strong> LLMs, Prompt Engineering, RAG, LangChain, AI Agents<br />
                <strong>Backend & DB:</strong> Flask, FastAPI, REST APIs, MySQL, SQLite, PostgreSQL, MongoDB<br />
                <strong>Tools:</strong> Git, GitHub, VS Code, Jupyter Notebook, Google Colab, Streamlit, Postman
              </p>
              <h3>Achievements & Leadership</h3>
              <p>
                • TOP 3 in CHECKMATE (3-Month CRT Journey with Team Impact Crew)<br />
                • Class Representative & Project Lead, Department of CSE (AI & ML)<br />
                • Consistent High Academic Distinction across all semesters
              </p>
              <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <button
                  className="resume-btn"
                  onClick={() => window.print()}
                >
                  Print Dossier ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
