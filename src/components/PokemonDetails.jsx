import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  const sprites = pokemon.sprites;
  const spriteToUse =
    sprites?.other?.home?.front_default || sprites?.front_default;

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Image src={spriteToUse} fluid />
        </Col>
        <Col md={8}>
          <h1>{pokemon.name}</h1>
          <p>
            <strong>Height:</strong> {pokemon.height}
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight}
          </p>
          <p>
            <strong>Base Experience:</strong> {pokemon.base_experience}
          </p>
          <p>
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </p>
          <p>
            <strong>Types:</strong>{" "}
            {pokemon.types.map((type) => type.type.name).join(", ")}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default PokemonDetails;
