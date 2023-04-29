import axios from "axios";
import Pokemon from "../models/Pokemon";

/**
 * Fetches Pokemon data from the PokeAPI based on a provided URL.
 *
 * Args:
 * - currentUrl: The URL to fetch Pokemon data from.
 * - setNextUrl: A function that should be called with the URL for the next page of results.
 * - setPrevUrl: A function that should be called with the URL for the previous page of results.
 *
 * Returns:
 * A Promise that resolves with a tuple containing a function to cancel the request and an array of Pokemon objects from the PokeAPI.
 *
 * Example usage:
 * ```ts
 * const cancelTokenSource = axios.CancelToken.source();
 * const pokemonList = await get(cancelTokenSource.cancel, 'https://pokeapi.co/api/v2/pokemon', setNextUrl, setPrevUrl);
 * ```
 */
export default async function get(
  currentUrl: string,
  setNextUrl: (value: string) => void,
  setPrevUrl: (value: string) => void
): Promise<[() => void, Pokemon[]]> {
  let cancel = () => { /* This empty function body is intentional */ };

  const response = await axios.get(currentUrl, {
    cancelToken: new axios.CancelToken((c) => (cancel = c)),
  });

  const result: Array<Pokemon> = [];

  if (response.status === 200) {
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);

    response.data.results.map((poke: { name: string; url: string }) => {
      const pokemon = new Pokemon(poke.name, poke.url);
      result.push(pokemon);
    });
  }

  return [cancel, result];
}