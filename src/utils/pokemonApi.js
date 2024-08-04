// src/utils/pokemonApi.js
import axios from "axios";

/**
 * Fetches a batch of Pokémon data from the PokéAPI.
 * @param {number} start - The starting index for fetching Pokémon.
 * @param {number} batchSize - The number of Pokémon to fetch in one batch.
 * @returns {Promise<Array>} - A promise that resolves to an array of Pokémon data.
 */
export const fetchPokemon = async (start, batchSize) => {
  const promises = [];
  const maxPokemon = 1302;

  for (let i = start; i < start + batchSize && i <= maxPokemon; i++) {
    promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
  }

  const results = await Promise.all(promises);
  const pokemonData = results.map((result) => result.data);
  return pokemonData;
};

/**
 * Preloads images for the given Pokémon data.
 * @param {Array} pokemonData - An array of Pokémon data.
 */
export const preloadImages = (pokemonData) => {
  pokemonData.forEach((pokemon) => {
    const img = new Image();
    const sprites = pokemon?.sprites;
    const spriteToUse = sprites?.other
      ? sprites?.other?.dream_world?.front_default
      : sprites?.front_default;

    img.src = spriteToUse;
  });
};
