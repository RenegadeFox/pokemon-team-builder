import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "../components/PokemonList";
import PokemonTeam from "../components/PokemonTeam";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function HomePage() {
  const [team, setTeam] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const maxTeamSize = 6;

  // Fetch the list of Pokemon from the PokeAPI
  useEffect(() => {
    const fetchPokemon = async () => {
      const promises = [];

      // Fetch the first 151 Pokemon
      for (let i = 1; i <= 151; i++) {
        promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
      }

      // Wait for all the promises to resolve
      const results = await Promise.all(promises);
      const pokemonData = results.map((result) => result.data);
      setAllPokemon(pokemonData);
    };

    fetchPokemon();
  }, []);

  // Add a Pokemon to the team
  const addToTeam = (pokemonToAdd) => {
    // Only add the Pokemon if the team has less than 6 Pokemon
    if (
      team.length < maxTeamSize &&
      !team.some((pokemonInTeam) => pokemonInTeam.id === pokemonToAdd.id)
    ) {
      setTeam([...team, pokemonToAdd]);
      console.log("Added to team: ", pokemonToAdd.name);
    }
  };

  // Remove a Pokemon from the team
  const removeFromTeam = (pokemonToRemove) => {
    const updatedTeam = team.filter((pokemonInTeam) => {
      return pokemonInTeam.id !== pokemonToRemove.id;
    });
    setTeam(updatedTeam);
    console.log("Removed from team: ", pokemonToRemove.name);
  };

  // Filter the list of Pokemon to exclude any that are already in the team
  const filteredPokemonList = allPokemon.filter((pokemonInList) => {
    return !team.some((pokemonInTeam) => pokemonInTeam.id === pokemonInList.id);
  });

  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          <h2>Pokémon List</h2>
          <PokemonList
            pokemonList={filteredPokemonList}
            addToTeam={addToTeam}
          />
        </Col>

        <Col md={4}>
          <h2>My Pokémon Team</h2>
          <PokemonTeam team={team} removeFromTeam={removeFromTeam} />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
