const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () => Array(151).fill().map((_, index) => fetch(getPokemonUrl(index + 1)).then(resp => resp.json()))

const generateHTML = pokemons => pokemons.reduce((ac, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name);

    ac += `
        <li class="card ${elementTypes[0]}">
            <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"/>
         <h2 class"card-title">#${id} - ${name}</h2> 
            <p class"card-subtitle">${elementTypes.join(' | ')}</p>
        </li>
        `
    return ac;
}, '');


const insertPokemonIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]');

    ul.innerHTML = pokemons;
  
}

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonIntoPage);
