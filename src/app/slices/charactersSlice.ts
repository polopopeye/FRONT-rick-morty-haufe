import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../../app/store';

import constants from '../constants';

const initialState: any = {
  listCharacters: [],
  currentPagination: 1,
  pending: false,
  error: false,
};

export const listCharacters = createAsyncThunk(
  'character/listCharacters',
  async (data: { page: number }, { rejectWithValue }) => {
    const { page } = data;

    return axios
      .get(constants.api.character, {
        headers: {
          'Content-Type': 'application/json',
        },

        withCredentials: true,
        params: {
          page: page,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      });
  }
);

const listCharactersReducer = {
  [listCharacters.pending.toString()]: (state: any) => {
    state.pending = true;
  },
  [listCharacters.fulfilled.toString()]: (
    state: any,
    response: { payload: any }
  ) => {
    const { payload } = response;
    state.pending = false;
    state.listCharacters = payload;
  },
  [listCharacters.rejected.toString()]: (state: any) => {
    state.pending = false;
    state.error = true;
  },
};

export const getCharacterInfo = createAsyncThunk(
  'character/getCharacterInfo',
  async (data: { id: any }, { rejectWithValue }) => {
    const { id } = data;

    return axios
      .get(constants.api.character + id, {
        headers: {
          'Content-Type': 'application/json',
        },

        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      });
  }
);

const getCharacterInfoReducer = {
  [getCharacterInfo.pending.toString()]: (state: any) => {
    state.pending = true;
  },
  [getCharacterInfo.fulfilled.toString()]: (
    state: any,
    response: { payload: any }
  ) => {
    state.pending = false;
  },
  [getCharacterInfo.rejected.toString()]: (state: any) => {
    state.pending = false;
    state.error = true;
  },
};

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCurrentPagination: (state, action) => {
      state.currentPagination = action.payload;
    },
  },
  extraReducers: {
    ...listCharactersReducer,
    ...getCharacterInfoReducer,
  },
});

export const App = (storeState: RootState) => storeState.character;
