import siteData from "../data/site.json";
import { ArrowUp } from "./icons";

export function SiteFooter() {
  const { brand, navigation } = siteData;

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
