export default class PokemonsFound {
  constructor(data) {
    this.name = data.name
    this.url = data.url
  }

  get Template() {
    return `
    <li class="list-group-item text-center" onclick="app.pokemonsController.getInfoAsync('${this.name}')">
      ${this.name}
    </li>
      `
  }

}