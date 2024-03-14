import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const setLoading = state => {
  state.isLoading = true;
};

const errorHandler = (state, action) => {
  state.error = action.payload;
  state.isLoading = false;
};

const unsetErrorAndLoading = (state, action) => {
  state.error = null;
  state.isLoading = false;
};

export const contactsSlice = createSlice({
  name: 'contacts',

  initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, setLoading)
      .addCase(fetchContacts.rejected, errorHandler)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
        unsetErrorAndLoading(state);
      })
      .addCase(addContact.pending, setLoading)
      .addCase(addContact.rejected, errorHandler)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
        unsetErrorAndLoading(state);
      })
      .addCase(deleteContact.pending, setLoading)
      .addCase(deleteContact.rejected, errorHandler)
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(({ id }) => id !== payload.id);
        unsetErrorAndLoading(state);
      });
  },
});
export const contactsReducer = contactsSlice.reducer;