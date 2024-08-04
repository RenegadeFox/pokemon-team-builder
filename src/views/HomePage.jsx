import React, { useState, useEffect, useRef } from "react";

import { addToTeam, removeFromTeam } from "../utils/teamUtils";
import { fetchPokemon, preloadImages } from "../utils/pokemonApi";
import PokemonList from "../components/PokemonList";
import PokemonTeam from "../components/PokemonTeam";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

function HomePage() {
  const [team, setTeam] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const initialLoad = useRef(true); // Ref to control the initial load
  const maxTeamSize = 6;
  const batchSize = 100;
  const maxPokemon = 1025;

  // Fetch the list of Pokemon from the PokeAPI
  useEffect(() => {
    if (initialLoad.current) {
      loadAllPokemon();
      // This is so that the initial load only happens once
      initialLoad.current = false;
    }
  }, []);

  // Load all the pokemon, in batches of `batchSize`
  const loadAllPokemon = async (batchStart = 1) => {
    // Stop if all Pokemon are loaded
    if (batchStart > maxPokemon) return;

    setLoading(true);

    const pokemonData = await fetchPokemon(batchStart, batchSize, maxPokemon);

    // Ensure that the Pokemon data is not duplicated
    const uniquePokemonData = pokemonData.filter((newPokemon) => {
      return !allPokemon.some((existingPokemon) => {
        return existingPokemon.id === newPokemon.id;
      });
    });

    // Preload images for the new Pokemon
    preloadImages(uniquePokemonData);

    // Update the list of all Pokemon
    setAllPokemon((prev) => {
      const updatedPokemon = [...prev, ...uniquePokemonData];
      return updatedPokemon;
    });

    setLoading(false);

    // Schedule the next batch of Pokemon to be loaded
    setTimeout(() => {
      loadAllPokemon(batchStart + batchSize);
    }, 100);
  };

  // Handle adding a pokemon to the team
  const handleAddToTeam = (pokemonToAdd) => {
    setTeam(addToTeam(team, pokemonToAdd, maxTeamSize));
  };

  // Handle removing a pokemon from the team
  const handleRemoveFromTeam = (pokemonToRemove) => {
    setTeam(removeFromTeam(team, pokemonToRemove));
  };

  // Filter the list of Pokemon to exclude any that are already in the team
  const filteredPokemonList = allPokemon.filter((pokemonInList) => {
    const isInTeam = team.some(
      (pokemonInTeam) => pokemonInTeam.id === pokemonInList.id
    );
    const isInSearch = pokemonInList.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return !isInTeam && isInSearch;
  });

  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          <h2>Pokémon List</h2>
          <Form.Control
            type="text"
            placeholder="Search Pokémon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
          />
          <PokemonList
            pokemonList={filteredPokemonList}
            addToTeam={handleAddToTeam}
          />
          {loading && <Spinner animation="border" />}
        </Col>

        <Col md={4}>
          <h2>My Pokémon Team</h2>
          <PokemonTeam team={team} removeFromTeam={handleRemoveFromTeam} />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
