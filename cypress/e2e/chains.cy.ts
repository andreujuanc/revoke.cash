// This is a list of chain name + address tuples. The chain name will be selected in the dropdown, and the address
// entered in the input field. These addresses are either my own address or random addresses that I've found to have
// allowances on these chains. Because these addresses were chosen randomly it is possible that some allowances may
// get revoked, causing the tests to fail. In that case we need to replace the address with a new one.
const fixtures = [
  ['Ethereum', '0xe126b3E5d052f1F575828f61fEBA4f4f2603652a'],
  ['Binance Smart Chain', '0xe126b3E5d052f1F575828f61fEBA4f4f2603652a'],
  ['Avalanche', '0xe126b3E5d052f1F575828f61fEBA4f4f2603652a'],
  ['Polygon', '0xe126b3E5d052f1F575828f61fEBA4f4f2603652a'],
  ['Arbitrum', '0xe126b3E5d052f1F575828f61fEBA4f4f2603652a'],
  ['Arbitrum Nova', '0xe126b3E5d052f1F575828f61fEBA4f4f2603652a'],
  ['Optimism', '0xe126b3E5d052f1F575828f61fEBA4f4f2603652a'],
  ['Cronos', '0xB8cAD90CBCb2157d68FD72c43766756cB9bA9B52'],
  ['Fantom', '0xe126b3E5d052f1F575828f61fEBA4f4f2603652a'],
  ['Kava', '0xC7a0407186E949222B4D214C89431a33745e8b8C'],
  ['Gnosis', '0xe126b3E5d052f1F575828f61fEBA4f4f2603652a'],
  ['Canto', '0xc2Dd41A21BC1fE912cc9a6EECd5f62d1c75fdc9F'],
  ['Aurora', '0x1D50A8c3295798fCebdDD0C720BeC4FBEdc3D178'],
  ['Celo', '0xDa9760828175a7684371321b17e11e823Aa5F4C0'],
  ['Moonbeam', '0x8107b00171a02f83D7a17f62941841C29c3ae60F'],
  ['Moonriver', '0x8107b00171a02f83D7a17f62941841C29c3ae60F'],
  ['RSK', '0xe126b3E5d052f1F575828f61fEBA4f4f2603652a'],
  ['Metis', '0x50E92fd1f4A456b6669637635333C6275ada797d'],
  ['Astar', '0xAE545C0d8d4b4645fBA8c895e370529D22F8a71c'],
  ['IoTeX', '0x936f83c34ba628aa08e54bc8f6f9f357a0f65d80'],
  ['Oasis Emerald', '0xe126b3E5d052f1F575828f61fEBA4f4f2603652a'],
  ['Harmony', '0xe126b3E5d052f1F575828f61fEBA4f4f2603652a'],
  ['Dogechain', '0x544b7Bfd815905fF87a0d25b1Fb109931851fdCc'],
  ['Godwoken', '0x8c0f57b0D6a2D0Bfac7fe8fea6a0C4e8DdBbDCB1'],
  ['SmartBCH', '0xe126b3E5d052f1F575828f61fEBA4f4f2603652a'],
  ['Fuse', '0x291AeAB2C6E8b87A65BE9dF26E174F41864191A3'],
  ['Evmos', '0x8d354807f14fd6f006ac959AB4A2A9c13FA5484a'],
  ['Syscoin', '0xc594AE94f7C98d759Ed4c792F5DbFB7285184044'],
  ['Ethereum Classic', '0x8163dB62D6294bA66261644EcCD5FD5269451495'],
  ['BTT Chain', '0x2d850d18B0617077585F1D0Cba043168dc90954D'],
  ['Palm', '0x77564a60d4a1577Ff911B8c24eC5D8a04a71B658'],
  ['Goerli', '0xFCBD25BB345765192fFC2f2E35F1F5348badC3F6'],
  ['Sepolia', '0x4795680d9c1C108Ccd0EEA27dE9AfbC5cae6C54a'],
  ['BSC Testnet', '0x40FE4911704f14f409ebEE40475377720C732803'],
  ['Avalanche Fuji', '0x4D915A2f0a2c94b159b69D36bc26338E0ef8E3F6'],
  ['Polygon Mumbai', '0xBC5C85F774f202232B8E97e42D0B9D46308C94BF'],
  ['Arbitrum Goerli', '0x3383A622FA7a30fC83527d6ce1820af928455EA8'],
  ['Optimism Goerli', '0x3239a95A9262034ca28b9a03133775f716f119f8'],
  ['Cronos Testnet', '0x06B2fAe81d5c71F31e3b5266502a779a0D8fC85f'],
  ['Fantom Testnet', '0x9F3A5A019Bd9eE3504F6AfD5Cf96B920aA83c4AF'],
  ['Kava Testnet', '0x35d8688332F22aFfa5508be93aDF2f550D3aac41'],
  ['Aurora Testnet', '0xdcD7e9e12614979A081e6ccD58d696bDcbE4AF55'],
  ['Celo Alfajores', '0x486FCa950d82e45e8e6863Fac4d22e0Db1359618'],
  ['Moonbase Alpha', '0xF1c70b44f61f5a3AA0658cbF33E16f68534dF9D9'],
  ['RSK Testnet', '0xD5E6bFC7e5d982c1f7bac4d9c7E769beB0A6F626'], // Some weird behavior with this one
  ['Godwoken Testnet', '0xcC0aF0aF911dD40853B8C8DFEE90b32f8D1eCAd6'],
  ['Syscoin Tenenbaum', '0x2FB7aB1E0357D595877209e74a715D0F5816cC29'],
  ['Palm Testnet', '0xB95088fe34848a7ce5f374de164627D54D231249'],
];

describe('Chain Support', () => {
  it('should have a test for every item in the chain selection dropdown menu', () => {
    cy.visit('http://localhost:3000', { timeout: 10_000 });
    cy.get('button.dropdown-toggle').should('exist').click();

    const fixtureChainNames = fixtures.map(([chainName]) => chainName);
    const appChainNames = cy.get('div.dropdown-menu').should('exist').children('a');
    appChainNames.each((chain) => cy.wrap(chain).invoke('text').should('be.oneOf', fixtureChainNames));
  });

  fixtures.forEach(([chainName, fixtureAddress]) => {
    it(`should support ${chainName}`, () => {
      cy.visit('http://localhost:3000', { timeout: 10_000 });

      cy.get('button.dropdown-toggle').should('exist').click();
      cy.contains(chainName).should('exist').click();
      cy.get('input[placeholder*="Enter address"]').type(fixtureAddress);

      cy.get('span.css-18hzn63', { timeout: 45_000 }).should('not.exist'); // Check that the loading spinner is gone
      cy.contains('Revoke', { timeout: 4000 }).should('exist');
    });
  });
});

export {};
