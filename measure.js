const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log("--- Live Webinar ---");
  await page.goto('http://localhost:3000/live-webinar', { waitUntil: 'networkidle2' });
  
  const webinarHero = await page.evaluate(() => {
    const hero = document.querySelector('#top .vvv-webinar-container');
    if (!hero) return null;
    const rect = hero.getBoundingClientRect();
    const children = Array.from(hero.children).map(c => {
      const r = c.getBoundingClientRect();
      return { tag: c.tagName, className: c.className, x: r.x, y: r.y, width: r.width, height: r.height };
    });
    return { container: { width: rect.width, height: rect.height }, children };
  });
  console.log(JSON.stringify(webinarHero, null, 2));

  console.log("--- 1:1 Session ---");
  await page.goto('http://localhost:3000/one-on-one-sessions', { waitUntil: 'networkidle2' });
  
  const oneOnOneHero = await page.evaluate(() => {
    const hero = document.querySelector('#top .vvv-container');
    if (!hero) return null;
    const rect = hero.getBoundingClientRect();
    const children = Array.from(hero.children).map(c => {
      const r = c.getBoundingClientRect();
      return { tag: c.tagName, className: c.className, x: r.x, y: r.y, width: r.width, height: r.height };
    });
    return { container: { width: rect.width, height: rect.height }, children };
  });
  console.log(JSON.stringify(oneOnOneHero, null, 2));

  await browser.close();
})();
