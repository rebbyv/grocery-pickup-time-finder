const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
  try {
    var browser = await puppeteer.launch({ headless: false})

    var page = await browser.newPage();

    await page.goto('https://heb.com');

    await page.waitForSelector('button.details.curbside-icon');
    await page.click('button.details.curbside-icon');

    await page.waitForSelector('button.change-store-button');
    await page.click('button.change-store-button');

    await page.waitForSelector('input#change-store-input')
    await page.focus('input#change-store-input')
    await page.keyboard.type('78734')
    await page.click('button.btn.search__submit.btn-primary.btn-primary--blue')

    await page.waitForSelector('li.store');
    await page.click('button.btn.store__select-button.btn-primary.btn-primary--blue')

    await page.waitForSelector('span.picker-time__range', {visible: true});

    var times = await page.evaluate(() => {
      var date = document.querySelector('button.picker-day__button.picker-day__button--selected.day-selected');
      var pickupTimes = document.querySelectorAll('span.picker-time__range');
      var dateTimes = [];
      for (let i = 0; i < pickupTimes.length; i++) {
        dateTimes[i] = {
          date: date.innerText.trim(),
          time: pickupTimes[i].innerText.trim()
        }
      }
      return dateTimes;
    })

    await browser.close();

    fs.writeFile('pickupTimes.json', JSON.stringify(times), (err) => {
      if (err) throw err;
    })
    console.log('browser closed')

  } catch (err) {
    console.log(error(err));
    await browser.close();
    console.log(error('Browser Closed'))
  }
})();