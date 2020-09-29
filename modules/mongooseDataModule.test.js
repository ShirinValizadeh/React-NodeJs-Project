const dataModule = require('./mongooseDataModule')


test('should connect to data base', () => {
  return dataModule.connect().then(()=>{
        expect(1).toBe(1)
    }).catch(error=>{
        expect(1).toBe(2)
    })
})
