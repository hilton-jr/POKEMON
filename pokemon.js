const BASE_URL = "https://pokeapi.co/api/v2/"
let pokemonsContainer = document.querySelector("section")

async function getPokemons() {
    try {
        let response = await fetch(`${BASE_URL}pokemon?limit=151&offset=152`)
        let data = await response.json()

        return data.results
    } catch (e) {
        //throw new Error(e.message)

        console.log(e)
    }
}

async function getPokemon(name) {
    try {
        let response = await fetch(`${BASE_URL}pokemon/${name}`)
        let data = await response.json()

        return data
    } catch (e) {
        //throw new Error(e.message)

        console.log(e)
    }
}

async function showPokemons() {
    pokemonsContainer.innerHTML = ""

    let pokemons = await getPokemons()

    for(let item of pokemons) {
        let pokemon = await getPokemon(item.name)

        pokemonsContainer.innerHTML += `
        <div class="pokemon-cards" id="${pokemon.name}">
            <img src="${pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default}" />
            <span>${pokemon.name}</span>
            <div class="types ${pokemon.name}"></div>
        </div>`

        pokemon.types.forEach(type => {
            let types = document.querySelector(`.${pokemon.name}`)
            let pokemonCard = document.getElementById(pokemon.name)

            pokemonCard.classList.add(type.type.name)
           
            types.innerHTML += `<span class="type ${type.type.name}">${type.type.name}</span>`
         })
     }
}


async function getPokemonPerTypes(type) {
    pokemonsContainer.innerHTML = ""

    try {
        let response = await fetch(`${BASE_URL}type/${type}`)
        let data = await response.json()

        for(let i = 0; i <= 100; i++) {
            let pokemon = await getPokemon(data.pokemon[i].pokemon.name) 
    
            pokemonsContainer.innerHTML += `
                <div class="pokemon-cards">
                    <img src=${pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default ?? pokemon.sprites.front_default} />
                    <span>${pokemon.name}</span>
                    <div class="types ${pokemon.name}"></div>
                </div>`

            pokemon.types.forEach(type => {
                let types = document.querySelector(`.${pokemon.name}`)
                
                types.innerHTML += `<span class="type ${type.type.name}">${type.type.name}</span>`
            })
        }

    } catch(e) {
        console.log(e)
    }
}
  

showPokemons()