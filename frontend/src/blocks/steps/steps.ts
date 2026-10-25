import type { StepsBlock } from "../../types";
import { sectionHead } from "../../ui";
import "./steps.css";

export function steps({
  anchor,
  title,
  subtitle,
  items = [],
}: StepsBlock): string {
  return `
  <section class="section" id="${anchor ?? ""}">
    <div class="container">
      ${sectionHead(title, subtitle)}
      <ol class="steps__list">
        ${items
          .map(
            (item, i) => `
        <li class="step">
          <span class="step__num">${i + 1}</span>
          <h3 class="card__title">${item.title}</h3>
          <p class="card__text">${item.text ?? ""}</p>
        </li>`,
          )
          .join("")}
      </ol>
    </div>
  </section>`;
}
