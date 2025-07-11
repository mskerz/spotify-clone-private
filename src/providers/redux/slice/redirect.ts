import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RedirectState {
  redirectAfterLogin: boolean;
}

const initialState: RedirectState = {
  redirectAfterLogin: false,
};

const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    setRedirectAfterLogin(state, action: PayloadAction<boolean>) {
      state.redirectAfterLogin = action.payload;
    },
    clearRedirectAfterLogin(state) {
      state.redirectAfterLogin = false;
    },
  },
});

export const { setRedirectAfterLogin, clearRedirectAfterLogin } = redirectSlice.actions;
export default redirectSlice.reducer;