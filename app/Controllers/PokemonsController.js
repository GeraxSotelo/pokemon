import PokemonsService from "../Services/PokemonsService.js";
import store from "../store.js";

//Private
function _drawPokemonsFound() {
  let template = ''
  store.State.pokemonsFound.forEach(p => template += p.Template)
  document.querySelector("#pokemon-list").innerHTML = template
}

function _drawPokemon() {
  let template = ''
  store.State.pokemons.forEach(p => template += p.Template)
  document.querySelector("#pokemon").innerHTML = template
}

//Public
export default class PokemonsController {
  constructor() {
    store.subscribe("pokemonsFound", _drawPokemonsFound);
    store.subscribe("pokemons", _drawPokemon)
  }

  async searchAsync() {
    try {
      await PokemonsService.searchAsync()
    } catch (err) {
      console.log(err);
    }
  }

  async getInfoAsync(name) {
    try {
      await PokemonsService.getInfoAsync(name)
    } catch (err) {
      console.log(err);
    }
  }
}
