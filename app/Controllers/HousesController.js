import { ProxyState } from "../AppState.js";
import { getHouseForm } from "../components/HouseForm.js";
import { houseService } from "../Services/HouseSevice.js";
import { Pop } from "../Utils/Pop.js";




function _drawHouses() {
  let houseCardsTemplate = ''

  ProxyState.houses.forEach(house => houseCardsTemplate += house.CardTemplate)
  document.getElementById('listings').innerHTML = `
    <div class="row houses">
      ${houseCardsTemplate}
    </div>
  `

  document.getElementById('listing-modal-form-slot').innerHTML = getHouseForm()
  document.getElementById('add-listing-modal-label').innerText = 'Add House 🏠'
}

export class HousesController {
  //  Do I want to do anything on page load?
  constructor() {
    ProxyState.on('houses', _drawHouses)
    _drawHouses()
  }

  addHouse() {
    
    try {
      event.preventDefault()
      /**@type {HTMLFormElement} */
      // @ts-ignore
      const formElem = event.target
      const formData = {
        bed: formElem.bed.value,
        bath: formElem.bath.value,
        size: formElem.size.value,
        img: formElem.img.value,
        price: formElem.price.value,
        description: formElem.description.value,
      
      }
      houseService.addHouse(formData)
      console.log({ formData })
      formElem.reset()

      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance(document.getElementById('add-listing-modal')).hide()

    } catch (error) {
      console.error('[ADD_HOUSE_FORM_ERROR]', error)
      Pop.toast(error.message, 'error on house')
    }
  }

  drawHouses() {
    _drawHouses()
   
    // @ts-ignore
     bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('sidenav')).hide()
  }
}