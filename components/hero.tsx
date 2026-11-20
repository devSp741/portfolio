import Image from "next/image";
import heroData from "../data/hero.json";
import portrait from "../sp.png";
import {
  ArrowRight,
  Download,
  GitIcon,
  LaravelIcon,
  LinuxIcon,
  MysqlIcon,
  NextjsIcon,
  NodeIcon,
  PhpIcon,
  ReactIcon,
  TailwindIcon,
} from "./icons";

export function Hero() {
  const {
    eyebrow,
    statusDot,
    nameFirst,
    nameAccent,
    role,
    description,
    primaryCta,
    secondaryCta,
    heroTechs,
    portraitAlt,
  } = heroData;

  const renderTechIcon = (iconName: string) => {
    switch (iconName) {
      case "nextjs":
        return <NextjsIcon size={16} />;
      case "react":
        return <ReactIcon size={16} />;
      case "node":
        return <NodeIcon size={16} />;
      case "laravel":
        return <LaravelIcon size={16} />;
      case "php":
        return <PhpIcon size={17} />;
      case "mysql":
        return <MysqlIcon size={16} />;
      case "linux":
        return <LinuxIcon size={16} />;
      case "git":
        return <GitIcon size={16} />;
      case "tailwind":
        return <TailwindIcon size={16} />;
      default:
        return null;
    }
  };

  // Duplicate for seamless infinite marquee loop
  const loopTechs = [...heroTechs, ...heroTechs];

  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="eyebrow-pill">
            {statusDot && <span className="status-dot" aria-hidden="true" />}
            <span>{eyebrow}</span>
          </div>

          <h1>
            {nameFirst} <span className="name-accent">{nameAccent}</span>
          </h1>

          <p className="hero-role">{role}</p>

          <p className="hero-description">{description}</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href={primaryCta.href}>
              <span>{primaryCta.label}</span>
              <ArrowRight size={14} aria-hidden="true" />
            </a>

            <a className="btn btn-outline" href={secondaryCta.href}>
              <Download size={14} aria-hidden="true" />
              <span>{secondaryCta.label}</span>
            </a>
          </div>

          {/* Smooth Right-to-Left Infinite Tech Marquee */}
          <div className="hero-tech-ticker" aria-label="Core technologies">
            <div className="hero-tech-track">
              {loopTechs.map((tech, idx) => (
                <span key={`${tech.name}-${idx}`} className="hero-tech-pill">
                  <span className="hero-tech-icon" aria-hidden="true">
                    {renderTechIcon(tech.icon)}
                  </span>
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <Image
          className="hero-portrait"
          src={portrait}
          alt={portraitAlt}
          priority
          sizes="(max-width: 680px) 285px, (max-width: 1200px) 292px, 310px"
        />
      </div>
    </section>
  );
}
