import { features } from './blocks/features/features'
import { hero } from './blocks/hero/hero'
import type { Block } from './types'

/** Тут TypeScript сам перевірить, що для кожного типу блока є свій рендерер */
function unknownBlock(block: never): string {
  console.warn(`Невідомий тип блока: ${JSON.stringify(block)}`)
  return ''
}

function renderBlock(block: Block): string {
  switch (block.type) {
    case 'hero':
      return hero(block)
    case 'features':
      return features(block)
    default:
      return unknownBlock(block)
  }
}

export function renderBlocks(blocks: Block[]): string {
  return blocks.map(renderBlock).join('')
}
