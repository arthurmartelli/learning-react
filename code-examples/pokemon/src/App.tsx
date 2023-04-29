/**
 * The main React component for the Pokemon application. Fetches data from the PokeAPI and renders a list of Pokemon
 * along with pagination buttons to navigate through the pages.
 */

import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import PokemonList from "./components/PokemonList";
import Pokemon from "./models/Pokemon";
import get_pokemon from "./API/pokemon";

function App() {
  const [pokemon, setPokemon] = useState<Array<Pokemon>>([]);
  const [currentUrl, setCurrentUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [cancel, pokemonList] = await get_pokemon(
          currentUrl,
          setNextUrl,
          setPrevUrl
        );

        setPokemon(pokemonList);
        setLoading(false);

        return () => {
          cancel();
        };
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUrl, setLoading]);

  // render a loading message while the data is being fetched
  if (loading) return <h1>loading...</h1>;

  // render the list of Pokemon and pagination buttons
  return (
    <>
      <h1>Pokemon</h1>
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextUrl ? () => setCurrentUrl(nextUrl) : null}
        gotoPrevPage={prevUrl ? () => setCurrentUrl(prevUrl) : null}
      />
    </>
  );
}

export default App;
