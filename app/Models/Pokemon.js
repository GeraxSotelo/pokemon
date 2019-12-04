export default class Pokemon {
    constructor(data) {
        this.id = data.id || data._id
        this.name = data.name
        this.img = data.img || data.sprites.front_default
        this.weight = data.weight
        this.height = data.height
        this.types = data.types
    }

    get Template() {
        return `
        <div class="card mx-auto text-center mt-5">
          <div class="wild-pokemon-img">
            <img src="${this.img}"
                class="card-img-top">
          </div>
            <div class="card-body">
                <h5 class="card-title">${this.name.toUpperCase()}</h5>
                <ul class="list-group list-group-flush solway-font">
                    <li class="list-group-item">Weight: ${this.weight}</li>
                    <li class="list-group-item">Height: ${this.height}</li>
                    <li class="list-group-item">Types: ${this.getTypes(this.types)}</li>
                </ul>
                <div class="pokeball-div mt-2">
                    <div class="pokeball closed-pokeball mx-auto" onclick="app.pokemonsController.catchPokemon(${this.id})"></div>
                    <p>Catch</p>
              </div>
            </div>
        </div>
        `
    }

    get caughtListTemplate() {
        return `
        <li class="list-group-item text-center" onclick="app.pokemonsController.showOwnedPokemon('${this.id}')">
          ${this.name}
        </li>
          `
    }

    get selectedOwnedTemplate() {
        return `
        <div class="card mx-auto text-center mt-5">
          <div class="caught-pokemon-img">
            <img src="${this.img}"
                class="card-img-top">
          </div>
            <div class="card-body">
                <h5 class="card-title">${this.name.toUpperCase()}</h5>
                <ul class="list-group list-group-flush solway-font">
                    <li class="list-group-item">Weight: ${this.weight}</li>
                    <li class="list-group-item">Height: ${this.height}</li>
                    <li class="list-group-item">Types: ${this.getTypes(this.types)}</li>
                </ul>
                <div class="pokeball-div mt-2">
                    <div class="pokeball open-pokeball mx-auto" onclick="app.pokemonsController.releasePokemonAsync('${this.id}')">
                    </div>
                    <p>Release</p>
                </div>
            </div>
        </div>
        `
    }

    getTypes(arr) {
        let str = ""
        arr.map(item => {
            //iterate and get type names from objects
            str += item.type.name + ", "
        })
        //remove last comma and space
        return str.trim().slice(0, -1)
    }
}