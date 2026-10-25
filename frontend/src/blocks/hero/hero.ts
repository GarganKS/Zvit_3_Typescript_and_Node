import type { HeroBlock } from "../../types";
import { buttons, checks, media } from "../../ui";
import "./hero.css";

export function hero({
  anchor,
  badge,
  title,
  subtitle,
  image,
  imageDark,
  buttons: list,
  highlights,
  imageBadges,
}: HeroBlock): string {
  return `
  <section class="hero" id="${anchor ?? ""}">
    <div class="container hero__grid">
      <div class="hero__content">
        ${badge ? `<span class="badge">${badge}</span>` : ""}
        <h1 class="hero__title">${title}</h1>
        ${subtitle ? `<p class="hero__subtitle">${subtitle}</p>` : ""}
        <div class="hero__actions">${buttons(list)}</div>
        ${checks(highlights)}
      </div>
      <div class="hero__visual">
        ${media(image, imageDark, "hero__media", "5 / 4")}
        ${imageBadges?.topLeft ? `<span class="hero__badge hero__badge--tl">${imageBadges.topLeft}</span>` : ""}
        ${imageBadges?.bottomRight ? `<span class="hero__badge hero__badge--br">${imageBadges.bottomRight}</span>` : ""}
      </div>
    </div>
  </section>`;
}
