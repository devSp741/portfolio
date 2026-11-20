import skillsData from "../data/skills.json";
import {
  Code,
  Server,
  Terminal,
  Globe,
  Zap,
  Rocket,
  Check,
  CheckCircle,
  PhpIcon,
  LaravelIcon,
  CodeigniterIcon,
  NodeIcon,
  MysqlIcon,
  ReactIcon,
  NextjsIcon,
  JsIcon,
  JqueryIcon,
  TailwindIcon,
  BootstrapIcon,
  HtmlIcon,
  CssIcon,
  LinuxIcon,
  ApacheIcon,
  NginxIcon,
  CpanelIcon,
  GitIcon,
  GitHubIcon,
  VscodeIcon,
  PostmanIcon,
  Sparkles,
} from "./icons";

// Helper to render authentic brand or category icons
function renderTechIcon(iconKey: string, size = 15) {
  switch (iconKey.toLowerCase()) {
    case "php":
      return <PhpIcon size={size} />;
    case "laravel":
      return <LaravelIcon size={size} />;
    case "codeigniter":
      return <CodeigniterIcon size={size} />;
    case "node":
    case "nodejs":
      return <NodeIcon size={size} />;
    case "mysql":
      return <MysqlIcon size={size} />;
    case "react":
      return <ReactIcon size={size} />;
    case "nextjs":
    case "next":
      return <NextjsIcon size={size} />;
    case "javascript":
    case "js":
      return <JsIcon size={size} />;
    case "jquery":
      return <JqueryIcon size={size} />;
    case "tailwind":
    case "tailwindcss":
      return <TailwindIcon size={size} />;
    case "bootstrap":
      return <BootstrapIcon size={size} />;
    case "html5":
    case "html":
      return <HtmlIcon size={size} />;
    case "css3":
    case "css":
      return <CssIcon size={size} />;
    case "linux":
      return <LinuxIcon size={size} />;
    case "apache":
      return <ApacheIcon size={size} />;
    case "nginx":
      return <NginxIcon size={size} />;
    case "cpanel":
      return <CpanelIcon size={size} />;
    case "git":
      return <GitIcon size={size} />;
    case "github":
      return <GitHubIcon size={size} />;
    case "vscode":
      return <VscodeIcon size={size} />;
    case "postman":
      return <PostmanIcon size={size} />;
    case "server":
      return <Server size={size} />;
    case "terminal":
      return <Terminal size={size} />;
    case "globe":
      return <Globe size={size} />;
    case "code":
      return <Code size={size} />;
    case "zap":
      return <Zap size={size} />;
    case "rocket":
      return <Rocket size={size} />;
    case "check":
      return <Check size={size} />;
    case "check-circle":
      return <CheckCircle size={size} />;
    default:
      return <Code size={size} />;
  }
}

export function Skills() {
  const { kicker, title, description, note, coreStack, stackGroups, footnote } = skillsData;

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <div className="skills-heading">
          <div className="skills-heading-copy">
            <p className="section-kicker">{kicker}</p>
            <h2 className="section-title">{title}</h2>
            <p className="section-copy">{description}</p>
          </div>
          <div className="skills-note">
            <span className="note-dot" aria-hidden="true" />
            <span>{note}</span>
          </div>
        </div>

        <div className="skills-layout">
          <article className="core-stack">
            <div className="card-topline">
              <span className="eyebrow-small">{coreStack.toplineIndex}</span>
              <span className="core-label">
                <Server size={14} aria-hidden="true" />
                <span>{coreStack.toplineBadge}</span>
              </span>
            </div>
            <h3>{coreStack.title}</h3>
            <p className="core-intro">{coreStack.intro}</p>

            <div className="core-list">
              {coreStack.items.map((item) => (
                <div key={item.name} className="core-item">
                  <span className="core-mark" aria-hidden="true">
                    {renderTechIcon(item.icon, 18)}
                  </span>
                  <span className="core-info">
                    <strong>{item.name}</strong>
                    <small>{item.detail}</small>
                  </span>
                  <span className="core-type">{item.type}</span>
                </div>
              ))}
            </div>
          </article>

          <div className="stack-groups">
            {stackGroups.map((group) => (
              <article key={group.id} className="stack-card">
                <div className="stack-card-head">
                  <span className="stack-card-icon" aria-hidden="true">
                    {renderTechIcon(group.icon, 16)}
                  </span>
                  <h3>{group.title}</h3>
                </div>
                <p>{group.description}</p>
                <div className="tag-list">
                  {group.skills.map((skill) => (
                    <span key={skill.name} className="tag">
                      <span className="tag-icon" aria-hidden="true">
                        {renderTechIcon(skill.icon, 13)}
                      </span>
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="stack-footnote">
          <Sparkles size={13} className="footnote-icon" aria-hidden="true" />
          <span>{footnote}</span>
        </div>
      </div>
    </section>
  );
}
