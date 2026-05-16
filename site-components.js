const NAV_ITEMS = [
  { key: "home", label: "Home", href: "./index.html" },
  { key: "support", label: "Support Us", href: "./support.html" },
  { key: "get-involved", label: "Get Involved", href: "./getinvolved.html" },
  { key: "year-groups", label: "Year Groups", href: "./connect.html" },
];

const BRAND_LOGO =
  "./assets/images/branding/parli-people-logo.jpg";

function detectCurrentPage() {
  const fileName = window.location.pathname.split("/").pop() || "index.html";

  switch (fileName) {
    case "":
    case "index.html":
      return "home";
    case "support.html":
      return "support";
    case "getinvolved.html":
      return "get-involved";
    case "connect.html":
      return "year-groups";
    default:
      return "";
  }
}

function renderNavLinks(currentPage, mobile = false) {
  return NAV_ITEMS.map(({ key, label, href }) => {
    const isActive = key === currentPage;
    const activeClass = isActive ? "active" : "";
    const mobileClass = mobile ? " mobile-link" : "";
    const ariaCurrent = isActive ? ' aria-current="page"' : "";

    return `<a class="nav-link${mobileClass} ${activeClass}" href="${href}"${ariaCurrent}>${label}</a>`;
  }).join("");
}

class ParliSiteHeader extends HTMLElement {
  connectedCallback() {
    const currentPage = this.getAttribute("current-page") || detectCurrentPage();
    const shadowRoot = this.shadowRoot || this.attachShadow({ mode: "open" });

    shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          contain: layout;
          view-transition-name: site-header;
        }

        * {
          box-sizing: border-box;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #fdf9eb;
          box-shadow: 0 1px 4px rgba(28, 28, 20, 0.08);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .bar {
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #32005b;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.2;
        }

        .brand-logo {
          width: auto;
          height: 48px;
          border-radius: 4px;
          object-fit: contain;
        }

        .desktop-nav,
        .desktop-actions {
          display: none;
        }

        .desktop-nav {
          align-items: center;
          gap: 32px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .nav-link {
          display: inline-flex;
          align-items: center;
          border-bottom: 2px solid transparent;
          color: #4c4452;
          font-family: "Work Sans", sans-serif;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.5;
          padding: 4px 0;
          transition: color 160ms ease, border-color 160ms ease, background-color 160ms ease;
        }

        .nav-link:hover,
        .nav-link:focus-visible,
        .action-link:hover,
        .action-link:focus-visible,
        .footer-link:hover,
        .footer-link:focus-visible {
          color: #32005b;
        }

        .nav-link:focus-visible,
        .action-link:focus-visible,
        .action-button:focus-visible,
        .mobile-toggle:focus-visible,
        .footer-link:focus-visible {
          outline: 2px solid #4f008c;
          outline-offset: 3px;
        }

        .nav-link.active {
          border-bottom-color: #ffc703;
          color: #32005b;
          font-weight: 700;
        }

        .desktop-actions {
          align-items: center;
          gap: 16px;
          white-space: nowrap;
        }

        .action-link,
        .action-button,
        .mobile-action {
          font-family: "Work Sans", sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
        }

        .action-link {
          color: #32005b;
        }

        .action-button,
        .mobile-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 12px;
          background: #4f008c;
          color: #ffffff;
          padding: 10px 20px;
          transition: transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
        }

        .action-button:hover,
        .action-button:focus-visible,
        .mobile-action:hover,
        .mobile-action:focus-visible {
          background: #32005b;
          box-shadow: 0 10px 24px rgba(50, 0, 91, 0.16);
          transform: translateY(-1px);
        }

        .material-symbols-outlined {
          font-family: "Material Symbols Outlined";
          font-weight: normal;
          font-style: normal;
          font-size: 20px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: "liga";
          -webkit-font-smoothing: antialiased;
        }

        .mobile-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: 0;
          border-radius: 12px;
          background: transparent;
          color: #32005b;
          cursor: pointer;
        }

        .mobile-panel {
          display: grid;
          gap: 12px;
          padding: 0 16px 16px;
          border-top: 1px solid rgba(206, 194, 212, 0.7);
        }

        .mobile-panel[hidden] {
          display: none;
        }

        .mobile-links {
          display: grid;
          gap: 4px;
          padding-top: 16px;
        }

        .mobile-link {
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 16px;
        }

        .mobile-link.active {
          background: #f2eee0;
        }

        .mobile-actions {
          display: grid;
          gap: 12px;
          padding-top: 4px;
        }

        @media (min-width: 768px) {
          .container {
            padding: 0 48px;
          }

          .desktop-nav,
          .desktop-actions {
            display: flex;
          }

          .mobile-toggle,
          .mobile-panel {
            display: none;
          }
        }
      </style>
      <header>
        <div class="container">
          <div class="bar">
            <a class="brand" href="./index.html" aria-label="Parli People home">
              <img class="brand-logo" src="${BRAND_LOGO}" alt="Parli People PTA logo" loading="eager" fetchpriority="high" decoding="async">
              <span>Parli People</span>
            </a>
            <nav class="desktop-nav" aria-label="Primary">
              ${renderNavLinks(currentPage)}
            </nav>
            <div class="desktop-actions">
              <a class="action-link" href="./support.html">Donate Now</a>
              <a class="action-button" href="./getinvolved.html#signup">
                <span>Join the Committee</span>
                <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
              </a>
            </div>
            <button class="mobile-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Toggle navigation">
              <span class="material-symbols-outlined" aria-hidden="true">menu</span>
            </button>
          </div>
        </div>
        <div class="mobile-panel" id="mobile-menu" hidden>
          <nav class="mobile-links" aria-label="Mobile primary">
            ${renderNavLinks(currentPage, true)}
          </nav>
          <div class="mobile-actions">
            <a class="action-link" href="./support.html">Donate Now</a>
            <a class="mobile-action" href="./getinvolved.html#signup">Join the Committee</a>
          </div>
        </div>
      </header>
    `;

    const toggle = shadowRoot.querySelector(".mobile-toggle");
    const panel = shadowRoot.querySelector(".mobile-panel");

    if (toggle && panel) {
      toggle.addEventListener("click", () => {
        const isExpanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!isExpanded));
        panel.hidden = isExpanded;
      });
    }
  }
}

class ParliSiteFooter extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.shadowRoot || this.attachShadow({ mode: "open" });

    shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          contain: layout;
          view-transition-name: site-footer;
        }

        * {
          box-sizing: border-box;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        footer {
          background: #f2eee0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 16px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          justify-content: space-between;
        }

        .brand {
          display: grid;
          gap: 16px;
          max-width: 380px;
        }

        .brand-name {
          color: #32005b;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.2;
        }

        .description,
        .copyright,
        .footer-link {
          color: #1c1c14;
          font-family: "Work Sans", sans-serif;
          font-size: 16px;
          line-height: 1.5;
        }

        .copyright,
        .footer-link {
          color: #4c4452;
        }

        .footer-link:hover,
        .footer-link:focus-visible {
          color: #32005b;
        }

        .footer-link:focus-visible {
          outline: 2px solid #4f008c;
          outline-offset: 3px;
        }

        .links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .columns {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .container {
            padding: 48px;
            flex-direction: row;
          }

          .columns {
            flex-direction: row;
            gap: 48px;
          }
        }
      </style>
      <footer>
        <div class="container">
          <div class="brand">
            <div class="brand-name">Parli People</div>
            <p class="description">Active community engagement for our school.</p>
            <p class="copyright">© 2024 Parli People PTA. All rights reserved. Registered Charity.</p>
          </div>
          <div class="columns">
            <div class="links">
              <a class="footer-link" href="mailto:info@parli-people.org">Contact: info@parli-people.org</a>
              <a class="footer-link" href="#">Privacy Policy</a>
            </div>
            <div class="links">
              <a class="footer-link" href="#">Terms of Use</a>
              <a class="footer-link" href="#">Volunteer Handbook</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("parli-site-header", ParliSiteHeader);
customElements.define("parli-site-footer", ParliSiteFooter);