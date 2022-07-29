const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
app.use(express.json());

app.post('/scrape', async function (req, res) {
    const browser = await puppeteer.launch({
        bindAddress: "0.0.0.0",
        args: [
            "--headless",
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--remote-debugging-port=9222",
            "--remote-debugging-address=0.0.0.0"
        ]
    });
    const page = await browser.newPage();
    await page.goto(req.body.url, {
        waitUntil: "networkidle2"
    });
    let linkTexts = req.body.elements.map(async ({ selector }) => {
        return await page.$$eval(selector,
            elements => elements.map(item => item.textContent));
    })
    let results = await Promise.all(linkTexts);

    await browser.close();
    return res.send(results);

});

app.listen(process.env.PORT || 4000, () => {
    console.log('Express server listening');
});