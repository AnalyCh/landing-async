const URL = 'https://pokeapi.co/api/v2/pokemon';
const options = {
    method: 'GET',
    // headers: { // solo si es necesario

    // }
};

const content = null || document.getElementById('content');

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = response.json();
    return data;
}

(async () => {
    try {
        const pokemonArray = await fetchData(`${URL}?limit=10`)
        const infoPokemon = [];
        for (let pokemon of pokemonArray.results) {
            infoPokemon.push(await fetchData(pokemon.url));
        }
            let view = `
        ${infoPokemon.map((pokemon) => {
                return `
            <div class="group relative">
          <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="front-pokemon" class="w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${pokemon.name}
            </h3>
          </div>
          </div>
          `
            }
            // ).slice(0, 4).join('')
            ).join('')
                }`;
            content.innerHTML = view; // igual a la vista que creamos. El arreglo paso a html
    } catch (err) {
        console.error(err);
        alert('La información no está disponible');
    }
})();