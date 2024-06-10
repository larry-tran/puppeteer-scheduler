const schedule = require('node-schedule');
const puppeteer = require('./puppeteer.service');

const CRON_EXPRESSION = '*/10 * * * *';

const initiate = async () => {
    console.log('Puppeteer initialized');
    const page = await puppeteer.init();
    // Schedule the task to run every 10 minutes
    schedule.scheduleJob(CRON_EXPRESSION, async function () {
        try {
            console.log('Running automation job at', new Date().toLocaleString());
            await page.reload();
            await puppeteer.delay(10000);
            await puppeteer.handlePageTitle(page);
        } catch (error) {
            console.error('Error running automation job:', error);
        }
    });

    console.log('Scheduler started');
}

initiate().catch(error => console.error('Error initializing:', error));