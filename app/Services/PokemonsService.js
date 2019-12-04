import Store from "../store.js";
import Pokemon from "../Models/Pokemon.js";
import PokemonsFound from "../Models/PokemonsFound.js";

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
  }

  async searchAsync() {
    let res = await _pokemonApi.get("pokemon")
    let results = res.data.results.map(p => new PokemonsFound(p))
    Store.commit("pokemonsFound", results)
    console.log(results);
  }

  async getInfoAsync(name) {
    let res = await _pokemonApi.get("pokemon/" + name)
    let results = [new Pokemon(res.data)]
    Store.commit("pokemons", results)
    console.log(Store.State);

  }
}

const service = new PokemonsService();
export default service;
