import siteData from "../data/site.json";
import { ArrowUp, GitHubIcon, InstagramIcon, LinkedInIcon, Mail, TwitterIcon } from "./icons";

export function SiteFooter() {
  const { brand, navigation, socials } = siteData;

  const renderSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "github":
        return <GitHubIcon size={14} />;
      case "linkedin":
        return <LinkedInIcon size={14} />;
      case "instagram":
        return <InstagramIcon size={14} />;
      case "twitter":
        return <TwitterIcon size={14} />;
      case "mail":
        return <Mail size={14} />;
      default:
        return null;
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <a className="brand footer-brand" href="#home" aria-label="Back to top">
            <span>{brand.monogramFirst}</span>
            <span>{brand.monogramSecond}</span>
          </a>
          <span>{brand.copyright}</span>
        </div>

        {socials && socials.length > 0 && (
          <div className="footer-socials" aria-label="Social profiles">
            {socials.map((s) => (
              <a
                key={s.id || s.name}
                href={s.url}
                target={s.url.startsWith("http") ? "_blank" : undefined}
                rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.name}
                className="footer-social-link"
              >
                {renderSocialIcon(s.icon)}
              </a>
            ))}
          </div>
        )}

        <nav className="footer-nav" aria-label="Footer navigation">
          {navigation.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className="back-top" href="#home" aria-label="Back to top">
            <ArrowUp size={15} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
