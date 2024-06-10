const puppeteer = require('puppeteer');
const fs = require('fs').promises;
require('dotenv').config();

const { AUTO_URL } = process.env;

async function init() {
    let browser;
    try {
        // Initialize Puppeteer with a specified window size
        browser = await puppeteer.launch({
            headless: true,
            args: ['--start-maximized']  // this will open the browser in maximized mode
        });
        const pages = await browser.pages();
        const page = pages[0]; // Use the default page opened by Puppeteer

        // Set the viewport size to be fully open
        await page.setViewport({ width: 1920, height: 1080 });

        await page.goto(AUTO_URL, { waitUntil: 'networkidle2' });

        await handlePageTitle(page);
    
        return page;
    } catch (error) {
        console.error('Error during automation', error);
    } finally {
        // Close the Puppeteer browser session
        if (browser) {
            // await browser.close();
        }
    }
}

async function handlePageTitle(page) {
    // Get the page title
    let title = await page.title();
    console.log(`Page title is: ${title}`);

}

// Delay function
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

// Export the init function
module.exports = {
    init,
    handlePageTitle,
    delay
};