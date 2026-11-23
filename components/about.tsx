import aboutData from "../data/about.json";
import siteData from "../data/site.json";
import { ArrowRight, Code, Mail, MapPin, Rocket, Users, Zap } from "./icons";

export function About() {
  const { kicker, title, titleBreak, description, ctaButton, traits } = aboutData;
  const { brand } = siteData;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "zap":
        return <Zap size={17} />;
      case "code":
        return <Code size={17} />;
      case "users":
        return <Users size={17} />;
      case "rocket":
        return <Rocket size={17} />;
      default:
        return <Zap size={17} />;
    }
  };

  return (
    <section className="about-section" id="about">
      <div className="container about-grid">
        <div className="about-copy">
          <p className="section-kicker">{kicker}</p>
          <h2 className="section-title">
            {title}
            <br />
            {titleBreak}
          </h2>
          <p className="section-copy">{description}</p>

          <div className="contact-meta">
            <span className="meta-item">
              <MapPin size={15} aria-hidden="true" />
              <span>{brand.location}</span>
            </span>
            <a className="meta-item" href={`mailto:${brand.email}`}>
              <Mail size={15} aria-hidden="true" />
              <span>{brand.email}</span>
            </a>
            <span className="meta-item">
              <span className="available-dot" aria-hidden="true" />
              <span>{brand.availability}</span>
            </span>
          </div>

          <a className="btn btn-outline about-button" href={ctaButton.href}>
            <span>{ctaButton.label}</span>
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>

        <div className="traits-panel" aria-label="Professional Traits">
          {traits.map((trait) => (
            <article key={trait.id} className="trait">
              <span className="trait-icon" aria-hidden="true">
                {renderIcon(trait.icon)}
              </span>
              <h3>{trait.title}</h3>
              <p>{trait.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
