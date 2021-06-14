import axios from "axios";
import React, {useEffect, useState} from "react";
import "./App.css";
import PokemonCard from "./PokemonCard";

function App() {
    const [pokemonnames, setPokemonnames] = useState(null);
    const [next, setNext] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
    const [previous, setPrevious] = useState(null);

    function setNextPrevious(next, previous) {
        setNext(next);
        setPrevious(previous);
    }

    useEffect(() => {

        async function fetchNames() {
            const response = await axios.get(
                `${next}`
            );
            setPokemonnames(response.data);
        }

        fetchNames();

    }, [next, previous]);

    console.log(pokemonnames);

    return (
        <div>
            <button
                onClick={() => {
                    setNextPrevious(pokemonnames.next, pokemonnames.previous)
                }}
                disabled={!previous}
            >
                Vorige
            </button>
            <button
                onClick={() => {
                    setNextPrevious(pokemonnames.next, pokemonnames.previous)

                }}
                disabled={!next}
            >
                Volgende
            </button>
            {pokemonnames ? (
                <div>
                    {pokemonnames.results.map((pokemon) => {
                        return <PokemonCard previous={previous} next={next} nameOfPokemon={pokemon.name}/>;
                    })}
                </div>
            ) : (
                <h3>Pokemons are Loading</h3>
            )}
        </div>
    );
}

export default App;
