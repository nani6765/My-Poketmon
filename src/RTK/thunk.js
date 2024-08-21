import { createAsyncThunk } from '@reduxjs/toolkit';

// maxPokemonId를 받는 이유는 총 몇개의 포켓몬을 불러올지 지정하기 위함입니다.
// 그러니 해당 인자를 사용하여 Promise array를 만들어주는게 Dynamic한 사이트를 만들 수 있을 것 같습니다.
export const fetchMultiplePokemonById = createAsyncThunk(
  'pokemon/fetchMultiplePokemonById',
  async (maxPokemonId) => {
    const numberArray = Array.from({ length: 151 }, (_, i) => i + 1);

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
