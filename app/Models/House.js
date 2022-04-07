import { generateId } from "../Utils/generateId.js"



export class House{
    constructor({ id = generateId(), bed, bath, size, img, price, description }){
       
        this.id = id
        this.bed = bed
        this.bath = bath
        this.size = size
        this.img = img
        this.price = price 
        this.description = description

    }
    get CardTemplate() {
        return `
        <div class="car col-md-4 p-4">
          <div class="bg-white shadow rounded">
            <img class="w-100 rounded-top" src="${this.img}">
            <div class="p-3">
              <p class="text-center uppercase"><b>${this.bed} - ${this.bath} - ${this.size}</b></p>
              <p class="m-0">${this.description}</p>
            </div>
            <div class="p-3 d-flex justify-content-between align-items-center">
              <p class="m-0">$${this.price}</p>
              <div class="d-flex align-items-center">
                <p class="m-0">Color:</p>
                <div class="color-box border border-dark"></div>
              </div>
              <i class="mdi mdi-delete selectable" onclick="app.carsController.removeCar('${this.id}')"></i>
            </div>
          </div>
        </div>`
      }
    
}