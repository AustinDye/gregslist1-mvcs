



export class House{
    constructor({id, bedrooms, bathrooms, levels, year, price, imgUrl, description}){
       
        this.id = id
        this.bedrooms = bedrooms || ''
        this.bathrooms = bathrooms || ''
        this.levels = levels || ''
        this.year = year || ''
        this.price = price || ''
        this.imgUrl = imgUrl || ''
        this.description = description || ''

    }
    get CardTemplate() {
        return `
        <div class="col-md-4 p-4">
          <div class="card bg-white shadow rounded">
            <img class="w-100 rounded-top" src="${this.imgUrl}">
            <div class="p-3">
              <p class="text-center uppercase"><b> Bed: ${this.bedrooms} Bath: ${this.bathrooms}<br> Floors: ${this.levels}</b></p>
              <p class="m-0">${this.description}</p>
            </div>
            <div class="p-3 d-flex justify-content-between align-items-center">
              <p class="m-0">$${this.price}</p>
              <div class="d-flex align-items-center">
              </div>
              <i class="mdi mdi-delete selectable" onclick="app.carsController.removeCar('${this.id}')"></i>
            </div>
          </div>
        </div>`
      }
    
}