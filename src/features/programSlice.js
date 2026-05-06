import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import programService from './programService';

const initialState = {
  programs: [],
  program: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getPrograms = createAsyncThunk('programs/getAll', async (_, thunkAPI) => {
  try {
    return await programService.getPrograms();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getProgram = createAsyncThunk('programs/getOne', async (programId, thunkAPI) => {
  try {
    return await programService.getProgram(programId);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const programSlice = createSlice({
  name: 'program',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPrograms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPrograms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.programs = action.payload;
      })
      .addCase(getPrograms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProgram.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProgram.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.program = action.payload;
      })
      .addCase(getProgram.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = programSlice.actions;
export default programSlice.reducer;