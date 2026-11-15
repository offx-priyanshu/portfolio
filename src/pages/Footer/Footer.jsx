import "./Footer.css";
import { FaGithub, FaLinkedin, FaInstagram, FaArrowUp } from "react-icons/fa";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand / Copyright */}
        <div className="footer-left">
          <div className="footer-logo">
            <span className="logo-text">Priyanshu</span>
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} Priyanshu. Shaders, Three.js & Motion. All Rights Reserved.
          </p>
        </div>

        {/* Social Links */}
        <div className="footer-social-links">
          <a
            href="https://github.com/offx-priyanshu"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="footer-social-btn"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/priyanshu-kumar-ai/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="footer-social-btn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/offx.vipulll/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram Profile"
            className="footer-social-btn"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Back to Top */}
        <div className="footer-right">
          <button
            onClick={scrollToTop}
            className="back-to-top-btn"
            aria-label="Scroll back to top"
          >
            <span>[TOP]</span>
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
