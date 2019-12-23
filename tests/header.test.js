jest.setTimeout(90000);

const Page = require('./helpers/page');


let page;

beforeEach(async () => {
    page=await Page.build();
    await page.goto('http://localhost:3000');
});

afterEach(async () => {
   await page.close();
});


test('Loader is running in background', async () => {
    const text = await page.$eval('.loader-bg', el => el.innerHTML);
    expect(text).toEqual('<img src="/images/cricket-ball.gif" alt="Loader">');
})

test('Match data is loading correctly', async () => {
    await page.waitFor('.allcolumns a');
    const text = await page.$eval('.allcolumns a', el => el.innerText);
    expect(text).toEqual('Match Summary');
})
