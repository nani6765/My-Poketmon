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
        const endTime = Date.now();
        const duration = endTime - action.meta.startTime;

        if (duration < 10000) {
          // 최소 로딩 시간보다 짧은 경우
          setTimeout(() => {
            state.loading = false;
            state.data = [...state.data, ...action.payload];
            state.placeholders = Math.max(state.placeholders - 20, 0); // 빈 카드 수 감소
          }, 10000 - duration);
        } else {
          // 최소 로딩 시간을 넘긴 경우
          state.loading = false;
          state.data = [...state.data, ...action.payload];
          state.placeholders = Math.max(state.placeholders - 20, 0); // 빈 카드 수 감소
        }
      });
  },
});
