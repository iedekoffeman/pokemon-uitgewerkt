import axios from "axios";
import React, {useState, useEffect} from "react";

export default function PokemonCard(props) {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {

        async function fetchPokemon() {
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${props.nameOfPokemon}`
            );
            setPokemon(response.data);
        }

        fetchPokemon();
    }, [props.next, props.previous, props.nameOfPokemon]);

    return (
        <div>
            {pokemon ? (
                <div>
                    <h1>{pokemon.name}</h1>
                    <div>
                        {pokemon.abilities.map((ability) => {
                            console.log(ability); // { ability: { name: "stomp" }}
                            return <p>{ability.ability.name}</p>;
                        })}
                    </div>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                </div>
            ) : (
                <h3>Loading</h3>
            )}
        </div>
    );
}