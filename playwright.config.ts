import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    use: {
        baseURL: process.env.BASE_URL ?? 'https://the-internet.herokuapp.com',
        trace: 'on-first-retry',
        colorScheme: 'dark',
    },
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: 'html',
    timeout: 90000,
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] },
        // },
    ],
});
