import type { ShowcaseBlock } from "../../types";
import { checks, media, sectionHead } from "../../ui";
import "./showcase.css";

export function showcase({
  anchor,
  title,
  subtitle,
  items = [],
}: ShowcaseBlock): string {
  return `
  <section class="section section--band" id="${anchor ?? ""}">
    <div class="container">
      ${sectionHead(title, subtitle)}
      <div class="showcase__list">
        ${items
          .map(
            (item) => `
        <article class="showcase__item">
          <div class="showcase__text">
            ${item.eyebrow ? `<span class="showcase__eyebrow">${item.eyebrow}</span>` : ""}
            <h3 class="showcase__title">${item.title}</h3>
            <p class="card__text">${item.text ?? ""}</p>
            ${checks(item.points)}
          </div>
            ${media(item.image, item.imageDark, "showcase__media", "16 / 11")}
        </article>`,
          )
          .join("")}
      </div>
    </div>
  </section>`;
}
