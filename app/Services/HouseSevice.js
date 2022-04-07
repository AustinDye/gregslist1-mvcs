import { ProxyState } from "../AppState.js"
import { House } from "../Models/House.js"

class HouseService {
  addHouse(formData) {
    const newHouse = new House(formData)
    ProxyState.houses = [newHouse, ...ProxyState.houses]
  }
}

export const houseService = new HouseService()