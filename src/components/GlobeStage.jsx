import { useRef, useEffect, useState } from "react";
import "./GlobeStage.css";

const skillsSphereData = [
  { name: "Python", desc: "Core Data Science & Algorithm Engine" },
  { name: "Machine Learning", desc: "Scikit-Learn, Predictive Models & Statistics" },
  { name: "Deep Learning", desc: "TensorFlow & PyTorch Neural Networks" },
  { name: "Generative AI", desc: "Large Language Models & Prompt Engineering" },
  { name: "AI Agents", desc: "Autonomous Systems & Tool Calling" },
  { name: "RAG & LangChain", desc: "Vector Stores & Context-Augmented Systems" },
  { name: "Pandas & NumPy", desc: "High-Performance Data Analysis & Manipulation" },
  { name: "EDA & Viz", desc: "Matplotlib & Seaborn Exploratory Analytics" },
  { name: "SQL", desc: "Relational Schemas, Complex Queries & Joins" },
  { name: "FastAPI / Flask", desc: "High-Throughput ML Model Serving & REST APIs" },
  { name: "PostgreSQL", desc: "Production Relational Database Systems" },
  { name: "MongoDB", desc: "Document & Vector Database Infrastructure" },
  { name: "Streamlit", desc: "Rapid Data Apps & Interactive Dashboards" },
  { name: "Git & GitHub", desc: "Version Control, Team CI/CD & Collaboration" },
  { name: "Docker", desc: "Containerized ML Environments & Deployment" },
  { name: "MLOps", desc: "Model Life Cycle, Pipeline Tracking & Monitoring" }
];

export default function GlobeStage({ orbit = false }) {
  const containerRef = useRef(null);
  const pausedRef = useRef(false);
  const [selectedIdx, setSelectedIdx] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const buttons = Array.from(container.querySelectorAll("button"));
    let animId = 0;
    let angle = 0;
    let lastTime = 0;

    function render(time) {
      if (!pausedRef.current) {
        angle += Math.min(time - lastTime, 40) * 0.00018;
      }
      lastTime = time;

      buttons.forEach((btn, idx) => {
        const phi = 1 - (2 * idx + 1) / buttons.length;
        const normalizedPhi = orbit ? Math.round(phi * 2) / 2 * 0.85 : phi;
        const radius = Math.sqrt(1 - normalizedPhi * normalizedPhi);
        const theta = idx * 2.39996 + angle;
        const depth = Math.sin(theta) * radius;

        const left = 50 + Math.cos(theta) * radius * 40;
        const top = 50 + normalizedPhi * 39 + depth * (orbit ? 12 : 6);
        const opacity = 0.35 + (depth + 1) * 0.32;
        const scale = 0.8 + (depth + 1) * 0.18;
        const zIndex = Math.round((depth + 1) * 10);

        btn.style.left = `${left}%`;
        btn.style.top = `${top}%`;
        btn.style.opacity = String(opacity);
        btn.style.transform = `translate(-50%, -50%) scale(${scale})`;
        btn.style.zIndex = String(zIndex);
      });

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [orbit]);

  return (
    <div
      className="skill-space"
      onPointerEnter={() => (pausedRef.current = true)}
      onPointerLeave={() => (pausedRef.current = false)}
    >
      <div
        ref={containerRef}
        className={`skill-sphere ${orbit ? "orbit" : ""}`}
        aria-label="Interactive Skills Globe"
      >
        {skillsSphereData.map((item, idx) => (
          <button
            key={item.name}
            className={`sphere-tag-btn ${selectedIdx === idx ? "is-selected" : ""}`}
            onClick={() => setSelectedIdx(selectedIdx === idx ? null : idx)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {selectedIdx !== null && (
        <div className="skill-caption">
          <strong>{skillsSphereData[selectedIdx].name}</strong>
          <span>— {skillsSphereData[selectedIdx].desc}</span>
        </div>
      )}
    </div>
  );
}

