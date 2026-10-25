import { cta } from "./blocks/cta/cta";
import { faq } from "./blocks/faq/faq";
import { features } from "./blocks/features/features";
import { hero } from "./blocks/hero/hero";
import { roles } from "./blocks/roles/roles";
import { showcase } from "./blocks/showcase/showcase";
import { steps } from "./blocks/steps/steps";
import type { Block } from "./types";

/** Тут TypeScript сам перевірить, що для кожного типу блока є свій рендерер */
function unknownBlock(block: never): string {
  console.warn(`Невідомий тип блока: ${JSON.stringify(block)}`);
  return "";
}

function renderBlock(block: Block): string {
  switch (block.type) {
    case "hero":
      return hero(block);
    case "steps":
      return steps(block);
    case "features":
      return features(block);
    case "roles":
      return roles(block);
    case "steps":
      return steps(block);
    case "showcase":
      return showcase(block);
    case "faq":
      return faq(block);
    case "cta":
      return cta(block);
    default:
      return unknownBlock(block);
  }
}

export function renderBlocks(blocks: Block[]): string {
  return blocks.map(renderBlock).join("");
}
