import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../css/PokemonCard.css";

function PokemonCard({ pokemon, action, isRemoving = false, viewDetails }) {
  const buttonIcon = isRemoving ? "bi-trash" : "bi-plus";
  const buttonVariant = isRemoving ? "danger" : "primary";

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
        <div className="d-flex justify-content-around">
          <Button variant={buttonVariant} onClick={() => action(pokemon)}>
            <i className={`bi ${buttonIcon}`}></i>
          </Button>
          <Button
            variant="info"
            onClick={() => {
              viewDetails(pokemon);
            }}>
            <i className="bi bi-info-circle"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
