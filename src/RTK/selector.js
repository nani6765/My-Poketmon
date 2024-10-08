import { createSelector } from '@reduxjs/toolkit';

export const selectPokemonById = (pokemonId) =>
  createSelector(
    (state) => state.pokemon.data,
    (pokemon) => {
      if (!pokemon) return undefined;
      return pokemon.find((el) => el.id === pokemonId);
    }
  );
