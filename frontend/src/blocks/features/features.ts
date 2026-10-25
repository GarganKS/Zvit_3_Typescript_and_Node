import { icon } from "../../icons";
import type { FeaturesBlock } from "../../types";
import { sectionHead } from "../../ui";
import "./features.css";

export function features({
  anchor,
  title,
  subtitle,
  items = [],
}: FeaturesBlock): string {
  return `
  <section class="section" id="${anchor ?? ""}">
    <div class="container">
      ${sectionHead(title, subtitle)}
      <div class="features__grid">
        ${items
          .map(
            (item) => `
        <article class="card">
          <span class="chip">${icon(item.icon)}</span>
          <h3 class="card__title">${item.title}</h3>
          <p class="card__text">${item.text ?? ""}</p>
        </article>`,
          )
          .join("")}
      </div>
    </div>
  </section>`;
}
