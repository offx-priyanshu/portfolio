import "./Contact.css";
import { useState } from "react";
import { sounds } from "../../utils/sound";

const projectTypes = [
  "WEBSITE",
  "WEB APP",
  "E-COMMERCE",
  "3D / WEBGL",
  "OTHER"
];

const budgetOptions = [
  "UNDER ₹50K",
  "₹50K–₹2L",
  "₹2L+",
  "LET’S DISCUSS"
];

function Contact() {
  const [selectedType, setSelectedType] = useState("WEBSITE");
  const [selectedBudget, setSelectedBudget] = useState("UNDER ₹50K");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [draftOpened, setDraftOpened] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    sounds.playMode();

    const recipient = "priyanshugse@gmail.com";
    const subject = encodeURIComponent(`${selectedType} inquiry from ${name}`);
    const body = encodeURIComponent(
      `${message}\n\nProject Type: ${selectedType}\nBudget: ${selectedBudget}\nFrom: ${name} <${email}>`
    );

    setDraftOpened(true);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <article className="inner contact-page">
      <small className="eyebrow">[ TRANSMISSION_FORM ]</small>
      <h2 className="contact-heading">SEND A MESSAGE</h2>
      <p className="contact-lead">
        Tell me about your project — what you want to build, your timeline, and anything else I should know.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Row 1: Name and Email */}
        <div className="contact-pair">
          <label>
            <span className="field-label">01 YOUR NAME</span>
            <input
              required
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setDraftOpened(false);
              }}
            />
          </label>

          <label>
            <span className="field-label">02 EMAIL ADDRESS</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              placeholder="jane@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setDraftOpened(false);
              }}
            />
          </label>
        </div>

        {/* Row 2: 03 Project Type */}
        <fieldset className="contact-fieldset">
          <legend className="field-label">03 PROJECT TYPE</legend>
          <div className="choice-group">
            {projectTypes.map((type, idx) => (
              <label key={type} className="choice">
                <input
                  type="radio"
                  name="projectType"
                  value={type}
                  checked={selectedType === type}
                  onChange={() => {
                    sounds.playTick();
                    setSelectedType(type);
                    setDraftOpened(false);
                  }}
                />
                <span>
                  <small>0x0{idx}</small> {type}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Row 3: 04 Budget */}
        <fieldset className="contact-fieldset">
          <legend className="field-label">04 BUDGET</legend>
          <div className="choice-group">
            {budgetOptions.map((budget, idx) => (
              <label key={budget} className="choice">
                <input
                  type="radio"
                  name="budget"
                  value={budget}
                  checked={selectedBudget === budget}
                  onChange={() => {
                    sounds.playTick();
                    setSelectedBudget(budget);
                    setDraftOpened(false);
                  }}
                />
                <span>
                  <small>0x0{idx}</small> {budget}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Row 4: 05 Your Message */}
        <label className="message-label">
          <span className="field-label">05 YOUR MESSAGE</span>
          <textarea
            required
            name="message"
            rows="5"
            placeholder="What are you working on?"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setDraftOpened(false);
            }}
          ></textarea>
        </label>

        {/* Action Button */}
        <button type="submit" className="send">
          OPEN EMAIL DRAFT ↗
        </button>

        <p className="draft-note" role="status">
          {draftOpened
            ? "Continue in your email app. You can also write directly to priyanshugse@gmail.com."
            : "Opens your email app with the details filled in."}
        </p>
      </form>
    </article>
  );
}

export default Contact;
