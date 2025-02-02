const sdk = require("@defillama/sdk");
const { calculateUniTvl } = require("../helper/calculateUniTvl.js");
const { staking, stakingPricedLP } = require('../helper/staking')


const factory = '0x7cFB780010e9C861e03bCbC7AC12E013137D47A5'
const mmfToken = '0x22a31bD4cB694433B6de19e0aCC2899E553e9481'
const masterChef = '0xa2B417088D63400d211A4D5EB3C4C5363f834764'


async function polyTvl(timestamp, block, chainBlocks) {
  return calculateUniTvl(
    (addr) => `polygon:${addr}`,
    chainBlocks.polygon,
    "polygon",
    factory,
    0,
    true
  );
}

module.exports = {
  timetravel: true,
  methodology: 'TVL accounts for the liquidity on all AMM pools, using the TVL chart on https://polymm.finance as the source. Staking accounts for the MMF locked in MasterChef (0xa2B417088D63400d211A4D5EB3C4C5363f834764)',
  polygon: {
    staking: staking(masterChef, mmfToken, 'polygon'),
    tvl: polyTvl,
  },
}