import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  userLogin,
  userSignup,
  fetchProfile,
  updateProfile,
  refreshToken,
  logoutUser,
  changePassword,
  resendVerificationCode,
  verifyEmail,
} from "@utils/api/user";
import { showToast } from "@components/common/toast";
import { handleGlobalErrors as handleErrors } from "@utils/function/message-utils";

const getStoredTokens = () => {
  const tokenJson = localStorage.getItem("token");
  return tokenJson ? JSON.parse(tokenJson) : null;
};

const storeTokens = (tokens) => {
  localStorage.setItem("token", JSON.stringify(tokens));
};

const clearTokens = () => {
  localStorage.removeItem("token");
};

export const login = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await userLogin(credentials);
      storeTokens(response?.data);
      showToast("Logged in successfully", "info");
      return response.data;
    } catch (error) {
      handleErrors(error.response?.data, "Login failed");
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      await userSignup(userData);
      showToast("Account created successfully", "info");
    } catch (error) {
      handleErrors(error.response?.data, "Signup failed");
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchProfile();
      return res.data;
    } catch (error) {
      handleErrors(error.response?.data, "Failed to fetch profile");
      return rejectWithValue(error.response?.data || "Failed to fetch profile");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await updateProfile(profileData);
      showToast("Profile update successfull");
      return response.data;
    } catch (error) {
      handleErrors(error.response?.data, "Profile update failed");
      return rejectWithValue(error.response?.data || "Profile update failed");
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "user/refreshToken",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const tokens = getStoredTokens();
      if (!tokens?.refresh) throw new Error("No refresh token available");
      const data = await refreshToken({ refresh: tokens.refresh });
      storeTokens({ access: data.access, refresh: tokens.refresh });
      return data;
    } catch (error) {
      clearTokens();
      handleErrors(error.response?.data, "Token refresh failed");
      return rejectWithValue(error.response?.data || "Token refresh failed");
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const tokens = getStoredTokens();
      if (tokens?.refresh) {
        await logoutUser({ refresh_token: tokens.refresh });
      }
      clearTokens();
      showToast("Logout out succesfully", "info");
      return null;
    } catch (error) {
      handleErrors(error.response?.data, "Logout failed");
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  "user/changePassword",
  async (
    {
      oldPassword: old_password,
      newPassword: new_password,
      confirmNewPassword: confirm_new_password,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await changePassword({
        confirm_new_password,
        old_password,
        new_password,
      });
      showToast("Password changed successfully");
      return res.data;
    } catch (error) {
      handleErrors(error.response?.data, "Password change failed");
      return rejectWithValue(error.response?.data || "Password change failed");
    }
  }
);

export const initEmailVerification = createAsyncThunk(
  "user/verifyEmail",
  async ({ email, code }, { rejectWithValue }) => {
    if (!email || !code) {
      showToast("Email & verification code requried", "error");
      return;
    }
    try {
      const response = await verifyEmail({ email, code });
      showToast("Email verified successfully. You can login now!");
      return response.data;
    } catch (error) {
      handleErrors(
        error.response?.data,
        "Unable to verify email against the code."
      );
      return rejectWithValue(
        error.response?.data || "Unable to verify email against the code."
      );
    }
  }
);

export const initResendVerificationCode = createAsyncThunk(
  "user/resendVerificationCode",
  async (email, { rejectWithValue }) => {
    try {
      const response = await resendVerificationCode(email);
      showToast("Verification code resent successfully");
      return response.data;
    } catch (error) {
      handleErrors(error.response?.data, "Unable to send verification code");
      return rejectWithValue(
        error.response?.data || "Unable to send verification code"
      );
    }
  }
);

const initialState = {
  user: null,
  accessToken: getStoredTokens()?.access || null,
  refreshToken: getStoredTokens()?.refresh || null,
  loading: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...action.payload?.data?.user,
          image: action.payload?.data?.image,
        };
      })
      .addCase(getProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(changeUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changeUserPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(initResendVerificationCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(initResendVerificationCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(initResendVerificationCode.rejected, (state) => {
        state.loading = false;
      })
      .addCase(initEmailVerification.pending, (state) => {
        state.loading = true;
      })
      .addCase(initEmailVerification.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(initEmailVerification.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
