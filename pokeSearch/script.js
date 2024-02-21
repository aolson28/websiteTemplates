const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokeName = document.getElementById("pokemon-name");
const pokeId = document.getElementById("pokemon-id");
const pokeWeight = document.getElementById("weight");
const pokeHeight = document.getElementById("height");
const pokeTypes = document.getElementById("types");
const pokeHP = document.getElementById("hp");
const pokeAttack = document.getElementById("attack");
const pokeDefense = document.getElementById("defense");
const pokeSpecialAttack = document.getElementById("special-attack");
const pokeSpecialDefense = document.getElementById("special-defense");
const pokeSpeed = document.getElementById("speed");
const pokeCardContainer = document.getElementById("card-container");
const pokeStatsContainer = document.getElementById("statscontainer");
const spriteContainer = document.getElementById("sprite-container");
var pokeDataArr = [];
var currentPokeData = {};

const clearCard = () => {
  pokeName.innerHTML = "";
  pokeId.innerHTML = "";
  pokeWeight.innerHTML = "";
  pokeHeight.innerHTML = "";
  pokeTypes.innerHTML = "";
  pokeHP.innerHTML = "";
  pokeAttack.innerHTML = "";
  pokeDefense.innerHTML = "";
  pokeSpecialAttack.innerHTML = "";
  pokeSpecialDefense.innerHTML = "";
  pokeSpeed.innerHTML = "";
};

const renderCardAndStats = () => {
  pokeName.innerHTML = currentPokeData.name;
  pokeId.innerHTML = currentPokeData.id;
  pokeWeight.innerHTML = currentPokeData.weight;
  pokeHeight.innerHTML = currentPokeData.height;
  spriteContainer.innerHTML = `<img id="sprite" src="${currentPokeData.sprites.front_default}" >`;
  pokeTypes.innerHTML = renderTypes();
  pokeHP.innerHTML = currentPokeData.stats[0].base_stat;
  pokeAttack.innerHTML = currentPokeData.stats[1].base_stat;
  pokeDefense.innerHTML = currentPokeData.stats[2].base_stat;
  pokeSpecialAttack.innerHTML = currentPokeData.stats[3].base_stat;  pokeSpecialDefense.innerHTML = currentPokeData.stats[4].base_stat;
  pokeSpeed.innerHTML = currentPokeData.stats[5].base_stat;
};

const getPokemonData = (id) => {
  fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${id}`)
  .then((res) => res.json())
  .then((data) => {
    currentPokeData = data;
    renderCardAndStats();
  })
  .catch((err) => {
   console.log(err);
  });
};

const getPokemonDataArr = () => {
  fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon')
  .then((res) => res.json())
  .then((data) => {
    pokeDataArr = data.results;
  })
  .catch((err) => {
   console.log(err);
  });
};

getPokemonDataArr();

const handleSearch = (text) => {
  const result = pokeDataArr.filter((pokemon) => pokemon.name === text.toLowerCase())[0];
  if (result) {
    getPokemonData(result.id);
  } else {
    const result2 = pokeDataArr.filter((pokemon) => pokemon.id === parseInt(text))[0];
      console.log(result2);
      if (result2) {
        getPokemonData(parseInt(text));
      } else {
        notFoundAlert();
      }
  }
};

const renderTypes = () => {
  return currentPokeData.types.map((typeItem) => {
    return `<p>${typeItem.type.name}</p>`
  }).join("");
};


searchButton.addEventListener("click", (e) => {
  if (searchInput.value) {
    handleSearch(searchInput.value);
  } else {
    notFoundAlert();
  }
});

//searchInput.addEventListener("input", clearCard);

const notFoundAlert = () => {
  alert("Pokémon not found");
}