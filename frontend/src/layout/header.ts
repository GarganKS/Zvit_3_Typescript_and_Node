import { icon } from "../icons";
import type { Settings } from "../types";

export function header({ siteName, menu, auth }: Settings): string {
  return `
  <header class="header" id="header">
    <div class="container header__inner">
      <a class="header__logo" href="/"><span class="header__mark">${icon("bus", 20)}</span>${siteName}</a>
      <button class="icon-btn header__burger" type="button" aria-expanded="false" aria-controls="header-panel" aria-label="Меню">
        <span class="when-closed">${icon("menu")}</span><span class="when-open">${icon("x")}</span>
      </button>
      <div class="header__panel" id="header-panel">
        <nav class="header__nav" aria-label="Основна навігація">
          ${menu.map(({ label, link }) => `<a class="header__link" href="${link}">${label}</a>`).join("")}
        </nav>
        <div class="header__actions">
          <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-label="Змінити тему">
            <span class="theme-toggle__sun">${icon("sun")}</span><span class="theme-toggle__moon">${icon("moon")}</span>
          </button>
          <a class="btn btn--ghost btn--sm" href="${auth.loginLink}">${auth.loginText}</a>
          <a class="btn btn--primary btn--sm" href="${auth.registerLink}">${auth.registerText}</a>
        </div>
      </div>
    </div>
  </header>`;
}

/** Гамбургер на мобільних: відкриває/закриває панель, закриває її після кліку по посиланню. */
export function initHeader(): void {
  const root = document.getElementById("header");
  const burger = root?.querySelector<HTMLButtonElement>(".header__burger");
  if (!root || !burger) return;

  const setOpen = (open: boolean): void => {
    root.classList.toggle("header--open", open);
    burger.setAttribute("aria-expanded", String(open));
  };

  burger.addEventListener("click", () =>
    setOpen(!root.classList.contains("header--open")),
  );
  root
    .querySelectorAll(".header__link")
    .forEach((link) => link.addEventListener("click", () => setOpen(false)));
}
