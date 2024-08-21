import { createSlice } from '@reduxjs/toolkit';
import { fetchMultiplePokemonById } from './thunk';
import { size } from './thunk';

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    data: [],
    loading: false,
    placeholders: 0, // 로딩 중인 상태에서 빈 카드의 수를 추적
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMultiplePokemonById.pending, (state) => {
        state.loading = true;
        state.placeholders += size; // 새로운 페이지에 대해 빈 카드 추가
      })
      .addCase(fetchMultiplePokemonById.rejected, (state) => {
        state.loading = false;
        state.placeholders -= size; // 실패 시, 빈 카드 수를 줄임
      })
      .addCase(fetchMultiplePokemonById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(...action.payload);
        state.placeholders = Math.max(state.placeholders - size, 0);
      });
  },
});
