const puppeteer = require('puppeteer');

class CustomPage {
    constructor(page) {
        this.page = page;
    }

    static async build() {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });
        const page = await browser.newPage();
        const customPage = new CustomPage(page);

        return new Proxy(customPage, {
            get: function (target, property) {
                return target[property] || browser[property] || page[property];
            }
        })
    }

    async login() {
        await this.page.type('.input-group input[type="email"]', 'abc@gmail.com');
        await this.page.type('.input-group input[type="password"]', 'abc');
        await this.page.click('.form-group button');
        await this.page.waitFor('#nav-item-logout');
    }
}



module.exports = CustomPage;