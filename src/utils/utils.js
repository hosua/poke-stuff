import { Pokedex } from "pokeapi-js-wrapper";
import abilityMap from "@data/abilities.json";
export const PokeAPI = new Pokedex({ cacheImages: true });
export const upperCaseFirstChar = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getPokemonList = async (count = 10) =>
  await PokeAPI.getPokemonsList(count);

export const getAbilityList = async () => await PokeAPI.getAbilitiesList();

export const getPokemonByName = async (name) =>
  await PokeAPI.getPokemonByName(name);

export const getAbilityByName = async (name) =>
  await PokeAPI.getAbilityByName(name);

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAbilityMap = () => abilityMap;
