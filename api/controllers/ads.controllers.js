
const httpsStatus = require('http-status-codes');
const cheerio = require('cheerio')
const puppeteer = require('puppeteer');
const fs = require('fs')


const testScrap = async (req, res, next) => {
    try {
        console.log(req.body)
        const { url } = req.body
        const html = await run(url)

        const $ = cheerio.load(html);

        const imageTag = $('img._7jys');
        // console.log('image tag ', imageTag)
        if (imageTag["0"]) {
            console.log(Object.keys(imageTag))

            console.log('if image url', imageTag["0"].attribs.src)
            res.status(httpsStatus.OK).json({
                image: imageTag["0"].attribs.src
            })

        } else {
            const videoTag = $('video')

            console.log('else image url', videoTag["0"].attribs.poster)
            res.status(httpsStatus.OK).json({
                image: videoTag["0"].attribs.poster
            })
        }


    } catch (error) {
        console.log('error in test scrap ', error);
        res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({
            error: 'internal server error'
        })
    }
}

const run = async (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                ],
            });
            const page = await browser.newPage();
            await page.setRequestInterception(true)
            page.on('request', (req) => {
                if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font') {
                    req.abort();
                }
                else {
                    req.continue();
                }
            });
            const html = await page.goto(url, { waitUntil: 'load', timeout: 0 }).then(function () {
                return page.content();
            });

            browser.close();
            return resolve(html);
        } catch (error) {
            return reject(error);
        }
    })

}
module.exports = {
    testScrap
}