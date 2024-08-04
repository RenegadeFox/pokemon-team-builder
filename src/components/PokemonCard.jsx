import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../css/PokemonCard.css";

function PokemonCard({ pokemon, action, actionLabel }) {
  const buttonVariant =
    actionLabel === "Remove from Team" ? "danger" : "primary";

  const sprites = pokemon?.sprites;
  const idealSprite = sprites?.other
    ? sprites?.other?.home?.front_default
    : sprites?.front_default;
  const spriteToUse = idealSprite || sprites?.front_default;

  return (
    <Card className="mb-3">
      <Card.Img className="pokemon-img pt-2" variant="top" src={spriteToUse} />
      <Card.Body className="text-center">
        <Card.Title>{pokemon.name}</Card.Title>
        <Button variant={buttonVariant} onClick={() => action(pokemon)}>
          {actionLabel}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
