import Store from "../store.js";
import Pokemon from "../Models/Pokemon.js";
import PokemonsFound from "../Models/PokemonsFound.js";
import store from "../store.js";

let _sandboxApi = axios.create(
  {
    baseURL: "https://bcw-sandbox.herokuapp.com/api/geraxsotelo/pokemon"
  }
)

let _pokemonApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2"
})
class PokemonsService {
  constructor() {
    this.getMyPokemon()
  }

  async searchAsync() {
    let res = await _pokemonApi.get("pokemon")
    let results = res.data.results.map(p => new PokemonsFound(p))
    Store.commit("pokemonsFound", results)
    console.log(results);
  }

  async getInfoAsync(name) {
    let res = await _pokemonApi.get("pokemon/" + name)
    let results = new Pokemon(res.data)
    Store.commit("pokemons", results)
    console.log(Store.State);

  }

  getMyPokemon() {
    _sandboxApi.get().then(res => {
      let results = res.data.data.map(rawData => new Pokemon(rawData))
      store.commit("pokemonsOwned", results)
    }).catch(err => {
      console.log(err);
    })
  }

  catchPokemon(id) {
    let pokemon = store.State.pokemons //grab selected pokemon
    _sandboxApi.post("", pokemon).then(res => { //post to sandbox
      let newPokemon = new Pokemon(res.data.data) //grab it back and make an instance
      let pokemonsOwned = [...store.State.pokemonsOwned, newPokemon] //make new array with newPokemon and array already in store
      store.commit("pokemonsOwned", pokemonsOwned) //commit to store array
    }).catch(err => {
      console.log(err);
    })
  }

  showOwnedPokemon(id) {
    let foundPokemon = store.State.pokemonsOwned.find(p => p.id == id)
    store.commit("selectedOwned", foundPokemon)
  }

  async releasePokemonAsync(id) {
    try {
      let res = await _sandboxApi.delete(id)
      let i = store.State.pokemonsOwned.findIndex(p => p.id == id)
      store.State.pokemonsOwned.splice(i, 1)
      store.commit("pokemonsOwned", store.State.pokemonsOwned)
      let selectedOwned = {}
      store.commit("selectedOwned", selectedOwned)
    } catch (err) {
      console.log(err);
    }
  }
}

const service = new PokemonsService();
export default service;
