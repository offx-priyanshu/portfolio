import "./Services.css";
import { FaCode, FaPalette, FaLaptopCode } from "react-icons/fa";

const services = [
  {
    num: "01",
    icon: FaCode,
    title: "Frontend Engineering",
    desc: "Developing fast, component-driven reactive web applications with state synchronization, responsive viewports, and clean codebases.",
    features: ["React Lifecycle Architecture", "Modern JavaScript (ES6+)", "Component Design Systems", "API Integration & REST"]
  },
  {
    num: "02",
    icon: FaPalette,
    title: "Creative Tech & UI/UX",
    desc: "Translating brand identities into dark minimal aesthetic user experiences with tight typography, micro-interactions, and layout balance.",
    features: ["WebGL & Three.js Shaders", "Monospace HUD Interfaces", "Figma Design Prototyping", "Dark Mode Architecture"]
  },
  {
    num: "03",
    icon: FaLaptopCode,
    title: "Full-Stack Development",
    desc: "Building end-to-end full-stack applications with robust backend services, data modeling, secure endpoints, and high-uptime hosting.",
    features: ["Node.js / Express Architecture", "MySQL & MongoDB Schemas", "Authentication & Security", "Serverless & Cloud Deploys"]
  }
];

function Services() {
  return (
    <section className="services-section" id="serv">
      <div className="section-header">
        <span className="section-tag">[05] Capabilities</span>
        <h2 className="section-title">Services & Expertise</h2>
        <p className="section-subtitle">
          Engineering capabilities spanning creative frontend, visual architecture, and full-stack systems.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div className="service-card" key={index}>
              <div className="service-header-row">
                <span className="service-index">[{service.num}]</span>
                <div className="service-icon-box">
                  <Icon className="service-icon" />
                </div>
              </div>

              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>

              <ul className="service-feature-list">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex}>
                    <span className="feature-marker">◆</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="service-footer">
                <a href="#contact" className="service-link">
                  <span>Initialize Work</span>
                  <span className="service-arrow">↗</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Services;
