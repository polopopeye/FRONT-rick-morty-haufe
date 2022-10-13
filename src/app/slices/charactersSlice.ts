import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import type { RootState } from '../../app/store';

import constants from '../constants';
// import { PuppyInterface } from '../interfaces/puppyInterface';

// export type PuppyState = {
//   data: [any?];
//   pending: boolean;
//   error: boolean;
// };

const initialState: any = {
  listCharacters: [],
  pending: false,
  error: false,
};

export const listCharacters = createAsyncThunk('character', async () => {
  const response = await axios.get(constants.api.character, {
    params: {
      page: 1,
    },
  });
  return response.data;
});

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    // saveHeart: (state, action) => {
    //   const character = state.data.find((character) => character?.id === action.payload);
    //   if (character) {
    //     puppy.heart = puppy.heart ? false : true;
    //   }
    // },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(listCharacters.pending, (state: any) => {
        state.pending = true;
      })
      .addCase(
        listCharacters.fulfilled,
        (state: any, response: { payload: any }) => {
          const { payload } = response;
          state.pending = false;
          state.data = payload;
        }
      )
      .addCase(listCharacters.rejected, (state: any) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const App = (storeState: RootState) => storeState.character;
