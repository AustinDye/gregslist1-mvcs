import { ProxyState } from "../AppState.js"
import { Car } from "../Models/Car.js"
import { sandboxApi } from "./AxiosServices.js"

class CarsService {

  async getAllCars(x = {}) {
    const response = await sandboxApi.get('cars', {x})
    console.log(response.data)
    const cars = response.data.map(c => new Car(c))
    ProxyState.cars = cars
  }

  async addCar(formData) {
    const response = await sandboxApi.post('cars', formData)
    const newCar = new Car(response.Data)
    ProxyState.cars = [newCar, ...ProxyState.cars]
  }

  async editCar(formData){
    const res = await sandboxApi.put('cars/' + formData.id, formData)
    const car = new Car(res.data)
    const index = ProxyState.cars.findIndex(c => c.id == car.id)
    
    ProxyState.cars.splice(index, 1, car)
    ProxyState.cars = ProxyState.cars

  }

  async removeCar(id){
    const results = sandboxApi.delete('cars/' + id)
    ProxyState.cars= ProxyState.cars.filter(c => c.id !== id)
  }
}

export const carsService = new CarsService()