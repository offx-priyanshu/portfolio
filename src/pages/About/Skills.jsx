import "./Skills.css";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaNodeJs,
  FaJava,
  FaPython
} from "react-icons/fa";

import {
  SiUnity,
  SiTailwindcss,
  SiFirebase,
  SiMongodb,
  SiExpress,
  SiMysql,
  SiPhp
} from "react-icons/si";

const skillsData = [
  { name: "React", icon: FaReact },
  { name: "JavaScript", icon: FaJs },
  { name: "Three.js", icon: SiUnity },
  { name: "HTML5", icon: FaHtml5 },
  { name: "CSS3", icon: FaCss3Alt },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Python", icon: FaPython },
  { name: "Node.js", icon: FaNodeJs },
  { name: "Express", icon: SiExpress },
  { name: "MySQL", icon: SiMysql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Firebase", icon: SiFirebase },
  { name: "PHP", icon: SiPhp },
  { name: "Java", icon: FaJava },
  { name: "Git", icon: FaGitAlt },
  { name: "GitHub", icon: FaGithub },
  { name: "Figma", icon: FaFigma }
];

function Skills() {
  return (
    <div className="skills-wrapper">
      <div className="skills-header">
        <span className="skills-subtag">[03] Technology Matrix</span>
        <h3 className="skills-heading">Mapped Stack Capabilities</h3>
        <p className="skills-desc">
          Core languages, frameworks, runtime environments, and visual toolkits.
        </p>
      </div>

      {/* Grid of skill badges */}
      <div className="skills-grid">
        {skillsData.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div className="skill-card" key={index}>
              <div className="skill-icon-wrap">
                <Icon className="skill-icon" />
              </div>
              <span className="skill-name">{skill.name}</span>
              <small className="skill-index">0{index + 1}</small>
            </div>
          );
        })}
      </div>

      {/* Continuous Marquee Stream */}
      <div className="skills-marquee-container">
        <div className="marquee-track">
          <div className="marquee-group">
            {skillsData.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div className="marquee-item" key={`m1-${index}`}>
                  <Icon className="marquee-icon" />
                  <span>{skill.name}</span>
                </div>
              );
            })}
          </div>
          <div className="marquee-group" aria-hidden="true">
            {skillsData.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div className="marquee-item" key={`m2-${index}`}>
                  <Icon className="marquee-icon" />
                  <span>{skill.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
