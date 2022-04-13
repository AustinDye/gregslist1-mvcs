import { ProxyState } from "../AppState.js"
import { House } from "../Models/House.js"
import { sandboxApi } from "./AxiosServices.js"

class HouseService {

  async getAllHouses(x = {}) {
    const response = await sandboxApi.get('houses', {x})
    console.log(response.data)
    const houses = response.data.map(h => new House(h))
    ProxyState.houses = houses
  }

  async addHouse(formData) {
    const response = await sandboxApi.post('houses', formData)
    const newHouse = new House(response.data)
    ProxyState.houses = [newHouse, ...ProxyState.houses]
  }

  async editHouse(formData){
    const response = await sandboxApi.put('houses/' + formData.id, formData)
    const house = new House(response.data)
    const index = ProxyState.cars.findIndex(h => h.id == house.id )

    ProxyState.houses.splice(index, 1, house)
    ProxyState.houses = ProxyState.houses
  }

  async removeHouse(id){
    const results = sandboxApi.delete('house/' + id)
    ProxyState.houses = ProxyState.houses.filter(h => h.id !== id)
  }

}

export const houseService = new HouseService()