// src/utils/teamUtils.js

/**
 * Adds a Pokémon to the team if the team has less than the max Pokémon and doesn't already include the Pokémon.
 * @param {Array} team - The current team of Pokémon.
 * @param {Object} newPokemon - The Pokémon to add to the team.
 * @returns {Array} - The updated team of Pokémon.
 */
export const addToTeam = (team, newPokemon, maxTeamSize = 6) => {
  const isInTeam = team.some((p) => p.id === newPokemon.id);
  const isTeamFull = team.length >= maxTeamSize;
  // Check if the team is full or the Pokemon is already in the team
  if (!isTeamFull && !isInTeam) {
    return [...team, newPokemon];
  }

  if (isInTeam) {
    console.log(`"${newPokemon.name}" is already in the team!`);
  }

  if (isTeamFull) {
    console.log("Team is full!");
  }

  // If the team is full or the Pokemon is already in the team, return the original team
  return team;
};

/**
 * Removes a Pokémon from the team.
 * @param {Array} team - The current team of Pokémon.
 * @param {Object} pokemon - The Pokémon to remove from the team.
 * @returns {Array} - The updated team of Pokémon.
 */
export const removeFromTeam = (team, pokemonToRemove) => {
  const updatedTeam = team.filter((pokemonInTeam) => {
    return pokemonInTeam.id !== pokemonToRemove.id;
  });
  return updatedTeam;
};
