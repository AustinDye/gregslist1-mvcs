import { ProxyState } from "../AppState.js"
import { Car } from "../Models/Car.js"

class CarsService {
  addCar(formData) {
    const newCar = new Car(formData)
    // REVIEW Immutable State
    ProxyState.cars = [newCar, ...ProxyState.cars]
  }
}

export const carsService = new CarsService()