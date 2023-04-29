import Pokemon from "../models/Pokemon";

/**
 * Renders a list of Pokemon items.
 *
 * Props:
 * - pokemon: An array of Pokemon objects to be rendered in the list.
 *
 * Example usage:
 * ```tsx
 * <PokemonList pokemon={pokemon} />
 * ```
 */
export default function PokemonList({
  pokemon,
}: {
  pokemon: Array<Pokemon>;
}): JSX.Element {
  return (
    <div>
      {pokemon.map((p) => {
        if (p === null || p === undefined) {
          return null;
        }

        return <div key={p.name}>{`${p.name}`}</div>;
      })}
    </div>
  );
}
