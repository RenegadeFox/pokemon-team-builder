import React, { useState, useEffect, useRef } from "react";

import { addToTeam, removeFromTeam } from "../utils/teamUtils";
import { fetchPokemon, preloadImages } from "../utils/pokemonApi";
import PokemonList from "../components/PokemonList";
import PokemonTeam from "../components/PokemonTeam";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Spinner } from "react-bootstrap";

function HomePage() {
  const [team, setTeam] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextBatch, setNextBatch] = useState(1);
  const initialLoad = useRef(true); // Ref to control the initial load
  const maxTeamSize = 6;
  const batchSize = 100;

  // Fetch the list of Pokemon from the PokeAPI
  useEffect(() => {
    if (initialLoad.current) {
      loadPokemon();
      initialLoad.current = false;
    }
  }, []);

  const loadPokemon = async () => {
    console.log("Fetching more pokemon...");
    setLoading(true);
    const pokemonData = await fetchPokemon(nextBatch, batchSize);

    // Ensure that the Pokemon data is not duplicated
    const uniquePokemonData = pokemonData.filter((newPokemon) => {
      return !allPokemon.some((existingPokemon) => {
        return existingPokemon.id === newPokemon.id;
      });
    });

    preloadImages(uniquePokemonData);

    setAllPokemon((prev) => [...prev, ...uniquePokemonData]);
    setNextBatch(nextBatch + batchSize);
    setLoading(false);
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
    return !team.some((pokemonInTeam) => pokemonInTeam.id === pokemonInList.id);
  });

  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          <h2>Pokémon List</h2>
          <PokemonList
            pokemonList={filteredPokemonList}
            addToTeam={handleAddToTeam}
          />
          {loading && <Spinner animation="border" />}
          {!loading && nextBatch < 1302 && (
            <Button onClick={loadPokemon} className="mt-3">
              Load More Pokémon
            </Button>
          )}
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
