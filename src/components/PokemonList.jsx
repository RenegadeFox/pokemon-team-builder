import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PokemonCard from "./PokemonCard";

function PokemonList({ pokemonList, addToTeam }) {
  return (
    <Container>
      <Row>
        {(pokemonList || []).map((pokemon) => (
          <Col key={pokemon.id} sm={6} md={4} lg={3}>
            <PokemonCard
              pokemon={pokemon}
              action={addToTeam}
              actionLabel="Add to team"
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PokemonList;
