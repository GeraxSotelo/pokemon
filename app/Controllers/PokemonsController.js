import PokemonsService from "../Services/PokemonsService.js";
import store from "../store.js";

//Private
function _drawPokemonsFound() {
  let template = ''
  store.State.pokemonsFound.forEach(p => template += p.Template)
  document.querySelector("#pokemon-list").innerHTML = template
}

function _drawPokemon() {
  let pokemon = store.State.pokemons
  document.querySelector("#pokemon").innerHTML = pokemon.Template
}

function _drawPokemonOwned() {
  let template = ''
  store.State.pokemonsOwned.forEach(p => template += p.caughtListTemplate)
  document.querySelector("#pokemon-owned").innerHTML = template
}

function _drawSelectedOwnedPokemon() {
  let pokemon = store.State.selectedOwned
  if (pokemon.id) {
    document.querySelector("#pokemon").innerHTML = pokemon.selectedOwnedTemplate
    return
  }
  document.querySelector("#pokemon").innerHTML = ""
}

//Public
export default class PokemonsController {
  constructor() {
    store.subscribe("pokemonsFound", _drawPokemonsFound);
    store.subscribe("pokemons", _drawPokemon)
    store.subscribe("pokemonsOwned", _drawPokemonOwned)
    store.subscribe("selectedOwned", _drawSelectedOwnedPokemon)
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

  catchPokemon(id) {
    PokemonsService.catchPokemon(id)
  }

  showOwnedPokemon(id) {
    PokemonsService.showOwnedPokemon(id)
  }

  async releasePokemonAsync(id) {

    try {
      await Swal.fire({
        title: 'Are you sure?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#00bd56',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Release it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            position: 'center',
            title: 'Released!',
            showConfirmButton: false,
            timer: 450
          })
          PokemonsService.releasePokemonAsync(id)
        }
      })
    } catch (err) {
      console.log(err);
    }

  }
}
