import { test, expect } from '@playwright/test';

test('should take a Full Page screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://mitesh411.github.io/MyResume/');
    await page.screenshot({ path: 'screenshot/fullpage.png', fullPage: true });
    await page.close();


})

test('Capture Screenshot of an Element', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page
        .locator('#dropdown')
        .screenshot({ path: 'screenshot/element.png' });
    await page.close();

})


//Automatic Screen Capture on Test Failure

// test('Automatically Capture Screenshot when Test Fails', async ({ page }) => {
//     await page.goto('https://the-internet.herokuapp.com/login');
//     await expect(page.locator('#username')).toBeVisible({ timeout: 2000 });
//     await page.fill('#username', 'tomsmith1');
//     await page.fill('#password', 'SuperSecretPassword!');
//     await page.click('button[type="submit"]');
//     await expect(page.locator('div#flash')).toContainText('You logged into a secure area!');
// })


test('Verify the Title of My Resume Website', async({page}) =>{
    await page.goto('https://mitesh411.github.io/MyResume/');
    const title = await page.title();
    expect(title).toBe('Mitesh Dandade - MyResume');
    await page.close();

})

