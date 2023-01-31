export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  static get AGED_BRIE() { return "Aged Brie" }
  static get BACKSTAGE_PASSES() { return "Backstage passes to a TAFKAL80ETC concert" }
  static get SULFURAS() { return "Sulfuras, Hand of Ragnaros" }
  static get CONJURED() { return "Conjured Mana Cake" }
  static get LEGENDARY_ITEM_STATIC_QUALITY() { return 80 }
  static get LEGENDARY_ITEMS() { return [this.SULFURAS] }
  static get CONJURED_ITEMS() { return [this.CONJURED] }

  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      const originalItem = new Item(item.name, item.sellIn, item.quality)

      if (GildedRose.LEGENDARY_ITEMS.includes(item.name)) {
        item.quality = GildedRose.LEGENDARY_ITEM_STATIC_QUALITY
        continue
      }

      if (item.name != GildedRose.AGED_BRIE && item.name != GildedRose.BACKSTAGE_PASSES) {
        if (item.quality > 0) {
          if (item.name != GildedRose.SULFURAS) {
            item.quality = item.quality - 1
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
          if (item.name == GildedRose.BACKSTAGE_PASSES) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
          }
        }
      }
      if (item.name != GildedRose.SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != GildedRose.AGED_BRIE) {
          if (item.name != GildedRose.BACKSTAGE_PASSES) {
            if (item.quality > 0) {
              if (item.name != GildedRose.SULFURAS) {
                item.quality = item.quality - 1
              }
            }
          } else {
            item.quality = item.quality - item.quality
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1
          }
        }
      }

      if (GildedRose.CONJURED_ITEMS.includes(item.name)) {
        const qualityDelta = Math.max( originalItem.quality - item.quality, 0 )
        item.quality = item.quality - qualityDelta
      }
    }

    return this.items;
  }
}
