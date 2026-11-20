import capabilitiesData from "../data/capabilities.json";
import { Cpu, Database, Layout } from "./icons";

function CapabilityIcon({ name }: { name: string }) {
  switch (name) {
    case "database":
    case "backend":
      return <Database size={16} aria-hidden="true" />;
    case "frontend":
    case "layout":
      return <Layout size={16} aria-hidden="true" />;
    case "devops":
    case "delivery":
    case "cpu":
      return <Cpu size={16} aria-hidden="true" />;
    default:
      return <Cpu size={16} aria-hidden="true" />;
  }
}

export function Capabilities() {
  const { kicker, title, description, items } = capabilitiesData;

  return (
    <section className="capabilities-section" id="capabilities">
      <div className="container">
        <div className="capabilities-heading">
          <div>
            <p className="section-kicker">{kicker}</p>
            <h2 className="section-title">{title}</h2>
          </div>
          <p className="section-copy">{description}</p>
        </div>

        <div className="capability-grid">
          {items.map((item) => (
            <article key={item.index} className="capability-card" data-index={item.num}>
              <div className="capability-top">
                <span className="capability-icon" aria-hidden="true">
                  <CapabilityIcon name={item.icon} />
                </span>
                <span className="capability-index">{item.index}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="capability-link">{item.tagline}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
