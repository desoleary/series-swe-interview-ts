import { Item, GildedRose } from '@/gilded-rose';

interface GildedRoseSpecItemArgs {
  item: Item
  expectedSellIn: number
  expectedQuality: number
  numberOfDays?: number
}

const assertThatGildedRoseItemValid = (args: GildedRoseSpecItemArgs): void => {
  const {item, expectedSellIn, expectedQuality, numberOfDays = 2} = args

  const gildedRose = new GildedRose([item]);
  let updatedItems: Array<Item> = [];

  [...Array(numberOfDays)].forEach(() => {
    updatedItems = gildedRose.updateQuality();
  })

  const actualItem = updatedItems[0]

  expect(actualItem.name, `expected item name '${item.name}', got: '${actualItem.name}'`).toBe(item.name)
  expect(actualItem.sellIn, `expected item sellIn '${expectedSellIn}', got: '${actualItem.sellIn}'`).toBe(expectedSellIn)
  expect(actualItem.quality, `expected item quality '${expectedQuality}', got: '${actualItem.quality}'`).toBe(expectedQuality)
}

describe('Gilded Rose', () => {
  describe('#updateQuality', () => {
    [
      {name: "+5 Dexterity Vest", sellIn: 10, quality: 20, expectedSellIn: 8, expectedQuality: 18},
      {name: "Elixir of the Mongoose", sellIn: 5, quality: 7, expectedSellIn: 3, expectedQuality: 5},
      {name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80, expectedSellIn: 0, expectedQuality: 80},
      {name: "Sulfuras, Hand of Ragnaros", sellIn: -1, quality: 80, expectedSellIn: -1, expectedQuality: 80},
      {name: "Aged Brie", sellIn: 2, quality: 0, expectedSellIn: 0, expectedQuality: 2},
      {name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 15, quality: 20, expectedSellIn: 13, expectedQuality: 22},
      {name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 49, expectedSellIn: 8, expectedQuality: 50},
      {name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 49, expectedSellIn: 3, expectedQuality: 50},
      {name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 2, quality: 20, expectedSellIn: 0, expectedQuality: 26},
      {name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 0, quality: 20, expectedSellIn: -2, expectedQuality: 0},
      {name: "Conjured Mana Cake", sellIn: 3, quality: 6, expectedSellIn: 1, expectedQuality: 2}


    ].forEach(({
                                                                                                              name,
                                                                                                              sellIn,
                                                                                                              quality,
                                                                                                              expectedSellIn,
                                                                                                              expectedQuality}) => {
      it(`${name} with sellIn: ${sellIn} and quantity: ${quality} returns correct quality`, () => {
        const item = new Item(name, sellIn, quality)
        assertThatGildedRoseItemValid({item, expectedSellIn, expectedQuality})
      });
    })
  })
});
