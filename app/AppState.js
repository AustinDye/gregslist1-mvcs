import { Car } from "./Models/Car.js"
import { House } from "./Models/House.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  
  /** @type {import('./Models/Car').Car[]} */
  cars = [
    new Car({
      color: 'red',
      description: 'This is my test car',
      img: 'https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/wp-content/uploads/2017/03/1988_Accord_3rd_Generation.jpg?resize=980:*',
      make: 'Honda',
      model: 'Accord',
      mileage: '289000',
      price: 5500,
      year: 1988
    })
  ]
  /** @type {import('./Models/House').House[]} */
  houses = [
    new House({
      bed: 2,
      bath: 2,
      size: 1400,
      img: 'https://i.ytimg.com/vi/gBHauUHNgh0/maxresdefault.jpg',
      price: 340200,
      description: 'This house is bad, please buy it! Rats in all the sinks! My grandma wont move out of the bathroom!'
    })

  ]

}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
