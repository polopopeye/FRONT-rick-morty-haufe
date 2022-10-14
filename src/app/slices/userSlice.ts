import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import type { RootState } from '../../app/store';

import constants from '../constants';

const initialState: any = {
  jwtToken: [],
  favourites: {},
  favouriteShouldUpdate: true,
  pending: false,
  error: false,
};

export const login = createAsyncThunk(
  'user/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    const { email, password } = data;

    return axios
      .post(constants.baseApiUrl + 'login', {
        email,
        password,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  }
);

const loginReducer = {
  [login.pending.toString()]: (state: any) => {
    state.pending = true;
  },
  [login.fulfilled.toString()]: (state: any, response: { payload: any }) => {
    const { payload } = response;
    state.pending = false;
    state.jwtToken = payload;
  },
  [login.rejected.toString()]: (state: any) => {
    state.pending = false;
    state.error = true;
  },
};

export const register = createAsyncThunk(
  'user/register',
  async (
    data: { name: string; email: string; password: string; birthDate: string },
    { rejectWithValue }
  ) => {
    const { name, email, password, birthDate } = data;

    return axios
      .post(constants.api.user, {
        name,
        email,
        password,
        birthDate,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      });
  }
);

const registerReducer = {
  [register.pending.toString()]: (state: any) => {
    state.pending = true;
  },
  [register.fulfilled.toString()]: (state: any, response: { payload: any }) => {
    const { payload } = response;
    state.pending = false;
    state.jwtToken = payload;
  },
  [register.rejected.toString()]: (state: any) => {
    state.pending = false;
    state.error = true;
  },
};

export const userFavourites = createAsyncThunk(
  'user/favourites',
  async (data: { userId: string }, { rejectWithValue }) => {
    const { userId } = data;

    return axios
      .post(
        constants.api.favourite + 'user',
        {
          userId,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      });
  }
);

const userFavouritesReducer = {
  [userFavourites.pending.toString()]: (state: any) => {
    state.pending = true;
  },
  [userFavourites.fulfilled.toString()]: (
    state: any,
    response: { payload: any }
  ) => {
    const { payload } = response;
    state.pending = false;
    state.favourites = payload;
  },
  [userFavourites.rejected.toString()]: (state: any) => {
    state.pending = false;
    state.error = true;
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    favouriteShouldUpdate: (state, action) => {
      state.favouriteShouldUpdate = action.payload;
    },
  },
  extraReducers: {
    ...loginReducer,
    ...registerReducer,
    ...userFavouritesReducer,
  },
});

export const App = (storeState: RootState) => storeState.user;
