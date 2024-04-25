const { contentSeed } = require("./contents.seeder");
const { nationalitySeed } = require("./nationality.seeder");
const { orderDataSeed } = require("./orderData.seeder.");
const { pageSeed } = require("./pages.seeder");
const { userSeed } = require("./userseeder");

async function main() {
    await userSeed()
    await nationalitySeed()
    await orderDataSeed()
    await pageSeed()
    await contentSeed()
}

main()