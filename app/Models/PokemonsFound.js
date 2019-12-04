export default class PokemonsFound {
  constructor(data) {
    this.name = data.name
    this.url = data.url
  }

  get Template() {
    return `
    <li class="list-group-item d-flex justify-content-between align-items-center" onclick="app.pokemonsController.getInfoAsync('${this.name}')">
      ${this.name}
      <span class="badge badge-primary badge-pill">Catch</span>
    </li>
      `
  }
}