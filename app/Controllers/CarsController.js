import { ProxyState } from "../AppState.js";
import { getCarform } from "../components/CarForm.js";
import { carsService } from "../Services/CarsService.js";
import { Pop } from "../Utils/Pop.js";

function _drawCars() {
  let carsCardsTemplate = ''

  ProxyState.cars.forEach(car => carsCardsTemplate += car.CardTemplate)

  document.getElementById('listings').innerHTML = `
    <div class="row cars">
      ${carsCardsTemplate}
    </div>
  `

  document.getElementById('listing-modal-form-slot').innerHTML = getCarform()
  document.getElementById('add-listing-modal-label').innerText = 'Add Car 🚗'
}
async function _getAllCars(){
  try{
    await carsService.getAllCars()
  }catch(error) {
    console.error(error)
    Pop.toast(error.message, 'error')
  }
}
export class CarsController {
  constructor() {
    ProxyState.on('cars', _drawCars)
    _getAllCars()
  }

  async handleSubmit(id) {
    try {
      event.preventDefault()
      /**@type {HTMLFormElement} */
      // @ts-ignore
      const formElem = event.target
      const formData = {
        make: formElem.make.value,
        model: formElem.model.value,
        price: formElem.price.value,
        color: formElem.color.value,
        description: formElem.description.value,
        imgUrl: formElem.imgUrl.value,
        year: formElem.year.value,
      }
      if (id == 'undefined'){
      await carsService.addCar(formData)
      } else {
        formData.id = id
        await carsService.editCar(formData)
      }

      formElem.reset()
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance(document.getElementById('add-listing-modal')).hide()

    } catch (error) {
      console.error('[ADD_CAR_FORM_ERROR]', error)
      Pop.toast(error.message, 'error')
    }
  }

  drawCars() {
    _drawCars()
    // @ts-ignore
    bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('sidenav')).hide()
  }

  openEditor(id) {
    let car = ProxyState.cars.find(c => c.id == id)
    if (!car) {
      Pop.toast("invalid Id", "error")
      return
    }
    document.getElementById('listing-modal-form-slot').innerHTML = getCarform(car)
    // @ts-ignore
    bootstrap.Modal.getOrCreateInstance(document.getElementById('add-listing-modal')).show()
  }

  async removeCar(id) {
    try {
      if (await Pop.confirm())  { 
         await carsService.removeCar(id)
      }
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, "error")
    }
  }
}