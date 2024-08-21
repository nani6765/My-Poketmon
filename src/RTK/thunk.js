import { createAsyncThunk } from '@reduxjs/toolkit';

const size = 20;

export const fetchMultiplePokemonById = createAsyncThunk(
  'pokemon/fetchMultiplePokemonById',
  async (page) => {
    const prevData = (page - 1) * 20;
    const startToIndex = prevData > 0 ? prevData : 0;
    const numberArray = Array.from(
      { length: size },
      (_, i) => i + 1 + startToIndex
    );
    console.log('numberArray : ', numberArray);

    const fetchAPI = async (pokemonId) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`
      );
      const data = await response.json();

      const pokemonData = {
        id: pokemonId,
        name: data.names.find((el) => el.language.name === 'ko').name,
        description: data.flavor_text_entries.find(
          (el) => el.language.name === 'ko'
        ).flavor_text,
        front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
        back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/.png`,
      };
      return pokemonData;
    };

    return await Promise.all(numberArray.map((el) => fetchAPI(el)));
  }
);
