export default class Pokemon {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.img = data.img || data.sprites.front_default
        this.weight = data.weight
        this.height = data.height
        this.types = data.types
    }

    get Template() {
        return `
        <div class="card mx-auto text-center mt-5" style="max-width: 25rem;">
            <img src="${this.img}"
                class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${this.name.toUpperCase()}</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Weight: ${this.weight}</li>
                    <li class="list-group-item">Height: ${this.height}</li>
                    <li class="list-group-item">Types: ${this.types[0].type.name}, ${this.types[1].type.name}</li>
                </ul>
                <a href="#" class="btn btn-primary mt-2">Go somewhere</a>
            </div>
        </div>
        `
    }
}