import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PokemonCard from "./PokemonCard";

function PokemonTeam({ team, removeFromTeam }) {
  return (
    <Container>
      <Row>
        {(team || []).map((pokemon) => (
          <Col key={pokemon.id} sm={6} md={6}>
            <PokemonCard
              pokemon={pokemon}
              action={removeFromTeam}
              actionLabel="Remove from Team"
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PokemonTeam;
