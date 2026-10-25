import { icon } from "../icons";
import type { Settings } from "../types";

export function footer({ siteName, menu, footer }: Settings): string {
  const year = new Date().getFullYear();
  const extra = footer.text ? ` ${footer.text}` : "";

  return `
  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__brand">
        <a class="header__logo" href="/"><span class="header__mark">${icon("bus", 20)}</span>${siteName}</a>
        ${footer.description ? `<p>${footer.description}</p>` : ""}
      </div>
      <nav class="footer__nav" aria-label="Навігація у футері">
        ${menu.map(({ label, link }) => `<a href="${link}">${label}</a>`).join("")}
      </nav>
    </div>
    <div class="container footer__bottom">© ${year} ${siteName}. ${footer.text}</div>
  </footer>`;
}
