jest.setTimeout(90000);

const Page = require('./helpers/page');

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000/login');
    await page.login();
});

afterEach(async () => {
    await page.close();
});

describe('When authenticated', () => {
    test('can see the sidebar - Choose Your Team', async () => {
        const text = await page.$eval('.sidenav .heading h6', el => el.innerHTML);
        expect(text).toEqual('Choose Your Team');
    })

    test('can see Welcome text', async () => {
        const text = await page.$eval('.nav-item .about', el => el.innerHTML);
        const partText = text.split(',')[0];
        expect(partText).toEqual('Welcome');
    })

    test('can see Logout button', async () => {
        const text = await page.$eval('.nav-item .logout', el => el.innerHTML);
        expect(text).toEqual('Logout');
    })
})