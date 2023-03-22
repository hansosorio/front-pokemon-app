import axios from 'axios'

const pokemonImgURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
const pokemonsDataURL = "https://pokeapi.co/api/v2/pokemon";

function formatPokemonsList(results) {
    const listItems = results?.map((pokemon) => {
        const urlComponents = pokemon.url.split("/");
        const id = urlComponents[urlComponents.length - 2];
        const name =
            pokemon.name.charAt(0).toUpperCase() +
            pokemon.name.slice(1).toLowerCase();
        const imgUrl = `${pokemonImgURL}/${id}.png`;
        return {
            ...pokemon,
            id,
            name,
            imgUrl
        };
    });
    return listItems;
}
function formatPokemonDetail(pokemon) {
    const name =
        pokemon.name.charAt(0).toUpperCase() +
        pokemon.name.slice(1).toLowerCase();
    const imgUrl = pokemon.sprites.front_default;
    return {
        ...pokemon,
        name,
        imgUrl
    };
}
export async function fetchPokemons({currentPage, itemsPerPage}) {
    const  url = `${pokemonsDataURL}?limit=${itemsPerPage}&offset=${
        currentPage * itemsPerPage
    }`;
    const response = await axios.get(url)
    if (response?.status === 200) {
        const results = formatPokemonsList(response?.data?.results);
        return { results, count: response?.data?.count || 0 }
    }
    return { results: [], count: 0 };
}

export async function fetchPokemonDetail(name) {
    const url = `${pokemonsDataURL}/${name.toLowerCase()}`;
    const response = await axios.get(url)
    if (response?.status === 200) {
        const result = formatPokemonDetail(response?.data);
        return result;
    }
    return {}
}