const { contentSeed } = require("./contents.seeder");
const { eventSeed } = require("./event.seeder.");
const { nationalitySeed } = require("./nationality.seeder");
const { orderDataSeed } = require("./orderData.seeder.");
const { pageSeed } = require("./pages.seeder");
const { purchasableSeed } = require("./purchasable.seeder");
const { subTypeSeed } = require("./purchasableSubType.seeder");
const { typeSeed } = require("./purchasableType.seeder.");
const { userSeed } = require("./userseeder");

async function main() {
    await userSeed()
    await nationalitySeed()
    await eventSeed()
    await typeSeed()
    await subTypeSeed()
    await purchasableSeed()
    await orderDataSeed()
    await pageSeed()
    await contentSeed()
}

main()