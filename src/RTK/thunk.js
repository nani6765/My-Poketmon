import { createAsyncThunk } from '@reduxjs/toolkit';

export const size = 20;

export const fetchMultiplePokemonById = createAsyncThunk(
  'pokemon/fetchMultiplePokemonById',
  async (page) => {
    const prevData = (page - 1) * size;
    const startToIndex = prevData > 0 ? prevData : 0;
    const numberArray = Array.from(
      { length: size },
      (_, i) => i + 1 + startToIndex
    );

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

    const startTime = Date.now();

    // 모든 API 호출 병렬로 처리
    const results = await Promise.all(numberArray.map((el) => fetchAPI(el)));

    const endTime = Date.now();
    const duration = endTime - startTime;

    // 최소 로딩 시간(예: 1000ms) 보장
    if (duration < 1000) {
      await new Promise((resolve) => setTimeout(resolve, 1000 - duration));
    }

    return results;
  }
);
