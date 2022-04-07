

export function getHouseForm() {
  return `<form onsubmit="app.housesController.addHouse()">
  <div class="mb-3 d-flex justify-content-between">
    <div>
      <label for="bed" class="form-label">Bed</label>
      <input type="text" class="form-control" name="bed" id="bed" aria-describedby="bed"
        placeholder="Bed..." required>
    </div>
    <div>
      <label for="bath" class="form-label">Bath</label>
      <input type="text" class="form-control" name="bath" id="bath" aria-describedby="bath"
        placeholder="Bath..." required>
    </div>
  </div>
  <div class="mb-3 d-flex justify-content-between">
    <div>
      <label for="size" class="form-label">sq ft</label>
      <input type="number" class="form-control" name="size" id="size" aria-describedby="size"
        placeholder="Sq Footage..." min="100" max="10000" required>
    </div>

    <div>
      <label for="price" class="form-label">Price</label>
      <input type="number" class="form-control" name="price" id="price" aria-describedby="price"
        placeholder="Price..." min='1' required>
    </div>
  </div>
  <div class="mb-3">
    <div>
      <label for="img" class="form-label">Image Url</label>
      <input type="url" class="form-control" name="img" id="img" aria-describedby="img"
        placeholder="Image Url..." required>
    </div>
  </div>
  <div class="mb-3">
    <div>
      <label for="description" class="form-label">Description</label>
      <textarea type="text" class="form-control" name="description" id="description"
        aria-describedby="description" placeholder="Description..." min="5" max="250" required> </textarea>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="submit" class="btn btn-primary">Create</button>
  </div>
</form>`
}