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

async function _getAllHouses(){
  try {
    await houseService.getAllHouses()
  } catch (error) {
    console.error(error)
    Pop.toast(error.message, 'error')
    
  }
}

export class HousesController {
  constructor() {
    ProxyState.on('houses', _drawHouses)
    _getAllHouses()
  }

  async handleSubmit(id) {
    
    try {
      event.preventDefault()
      /**@type {HTMLFormElement} */
      // @ts-ignore
      const formElem = event.target
      const formData = {
        
        bedrooms: formElem.bedrooms.value,
        bathrooms: formElem.bathrooms.value,
        levels: formElem.levels.value,
        year: formElem.year.value,
        imgUrl: formElem.imgUrl.value,
        price: formElem.price.value,
        description: formElem.description.value,
      
      }
      if(id == 'undefined'){
        await houseService.addHouse(formData)
      }else {
        formData.id = id
        await houseService.editHouse(formData)
      }
      
     
      formElem.reset()
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance(document.getElementById('add-listing-modal')).hide()

    } catch (error) {
      console.error('[ADD_HOUSE_FORM_ERROR]', error)
      Pop.toast(error.message, 'error')
    }
  }

  openEditor(id)  {
    let house = ProxyState.houses.find (h => h.id == id)
    if (!house) {
      Pop.toast("invalid id", "error")
      return
    }
    document.getElementById('listing-modal-form-slot').innerHTML = getHouseForm(house)
    // @ts-ignore
    bootstrap.Modal.getOrCreateInstance(document.getElementById('add-listing-modal')).show()
  }

  drawHouses() {
    _drawHouses()
   
    // @ts-ignore
     bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('sidenav')).hide()
  }

  async removeHouse(id) {
    try{
      if (await Pop.confirm())  {
        await houseService.removeHouse(id)
      } 
    }
      catch (error){
        console.error(error)
        Pop.toast(error.message, "error")
    }
  }
}