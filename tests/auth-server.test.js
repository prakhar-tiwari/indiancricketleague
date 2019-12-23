jest.setTimeout(90000);

const Page = require('./helpers/page');

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000/login');
});

afterEach(async () => {
    await page.close();
});

describe('authentication', () => {
    test('Email and password are incorrect', async () => {
        await page.type('.input-group input[type="email"]', 'abc@abc.com');
        await page.type('.input-group input[type="password"]', 'abcded');
        await page.click('.form-group button');
        const text = await page.$eval('.form-group button', el => el.innerHTML);
        expect(text).toEqual('Login');
    })

    test('takes user to home screen', async () => {
        await page.type('.input-group input[type="email"]', 'abc@gmail.com');
        await page.type('.input-group input[type="password"]', 'abc');
        await page.click('.form-group button');
        await page.waitFor('.allcolumns a');
        const text = await page.$eval('.allcolumns a', el => el.innerText);
        expect(text).toEqual('Match Summary');
    })
})