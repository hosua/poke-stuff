#!/bin/python3

import os
import json
import requests

DATA_DIR = "../data/"
ABILITY_FILE = "abilities.json"
POKEMON_FILE = "pokemon.json"

def get_pokemon_list ():
    result = []
    url = "https://pokeapi.co/api/v2/pokemon?limit=100000"
    r = requests.get(url)
    data = r.json()
    for pkmn in data["results"]:
        result.append(pkmn["name"])
    return result

def get_all_pokemon_data (pkmn_list):
    result = dict()
    for pkmn in pkmn_list:
        # print(f"doing {pkmn}")
        url = f"https://pokeapi.co/api/v2/pokemon/{pkmn}"
        r = requests.get(url)
        data = r.json()
        result[pkmn] = data
    return result

def get_all_ability_data():
    result = dict()
    for i in range(1, 308):
        url = f"https://pokeapi.co/api/v2/ability/{i}"
        r = requests.get(url)
        data = r.json()
        print(f"getting ability {i} ({data["name"]})")
        result[data["name"]] = [
            entry["effect"]
            for entry in data["effect_entries"]
                if entry["language"]["name"] == "en"
        ][0] if any(entry["language"]["name"] == "en" for entry in data["effect_entries"]) else ""
    return result

if __name__ == "__main__":
    try:
        os.rmdir(DATA_DIR)
    except: 
        pass
    os.makedirs(DATA_DIR)
        
    ability_map = get_all_ability_data()
    with open(f"{DATA_DIR}/{ABILITY_FILE}", "w") as file:
        json.dump(ability_map, file, indent=2)


