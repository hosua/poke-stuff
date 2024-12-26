import { Pokedex } from "pokeapi-js-wrapper";

export const PokeAPI = new Pokedex({ cacheImages: true });
export const upperCaseFirstChar = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getPokemonList = async (count = 10) =>
  await PokeAPI.getPokemonsList(count);
