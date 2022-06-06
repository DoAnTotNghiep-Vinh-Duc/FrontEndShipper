import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import userAPI from "../../api/userAPI";

export const signIn = createAsyncThunk(
  "auth/signin-shipper",
  async (payload) => {
    const response = await userAPI.signIn(payload);

    localStorage.setItem("shipper", JSON.stringify(response.data.account));
    Cookies.set("tokenShipper", response.data.accessToken);
    Cookies.set("refreshTokenShipper", response.data.refreshToken);
    return response;
  }
);

const userSlice = createSlice({
  name: "shipper",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("shipper")),
  },
  reducers: {},
  extraReducers: {
    [signIn.fulfilled]: (state, action) => {
      state.currentUser = action.payload.data.account;
    },
  },
});

const { reducer } = userSlice;
export default reducer;
