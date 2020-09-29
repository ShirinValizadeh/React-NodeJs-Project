const dataModule = require('./mongooseDataModule')
const puppeteer = require('puppeteer')

//**********************CHECK CONNECT TO DATA BASE******** */
test('should connect to data base', () => {
    // we need return because of promis
  return dataModule.connect().then(()=>{
        expect(1).toBe(1)
    }).catch(error=>{
        expect(1).toBe(2)
    })
})



//*********************************** */
//1
test('should not register user with empty email and password', () => {
    return dataModule.registerUser('' , '').then(()=>{
        expect(1).toBe(2)
    }).catch(error=>{
        expect(1).toBe(1)
    })
})

//2
test('should not register user with empty email ', () => {
    return dataModule.registerUser('' , '123456').then(()=>{
        expect(1).toBe(2)
    }).catch(error=>{
        expect(1).toBe(1)
    })
})
//3
test('should not register user with empty  password', () => {
    return dataModule.registerUser('shirin@va.com' , '').then(()=>{
        expect(1).toBe(2)
    }).catch(error=>{
        expect(1).toBe(1)
    })
})
//4
test('should  register user with right email and right password', () => {
    return dataModule.registerUser('sh@va.com' , '123456').then(()=>{
        expect(1).toBe(1)
    }).catch(error=>{
        expect(1).toBe(2)
    })
})


test('should open the website', async() => {
    const browser = await(puppeteer.launch({
        headless:false,
        slowMo:200,
        args:['--window-size=1920,1080']
    }))
    const page= await browser.newPage()
    await page.goto('http://localhost:5000/login')
   // await page.click('a[href^="/login"]')
   await page.click('input[placeholder^="Enter User Name"]')
   await page.type('input[placeholder^="Enter User Name"]' , 'shirin@yahoo.com')
   await page.click('input[placeholder^="Password"]')
   await page.type('input[placeholder^="Password"]' , '12345')
   await page.click('button.black')
   await page.waitForTimeout(2000)
  const textResult = await page.url()
 // console.log(textResult);
  expect(textResult).toBe('http://localhost:5000/admin')
},80000)

