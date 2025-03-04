import api from "..";

export const userLogin = (credentials) => api.post("users/login/", credentials);
export const userSignup = (userData) => {
  api.post("users/register/", userData);
};
export const fetchProfile = () => api.get("users/profile/");
export const updateProfile = (profileData) =>
  api.put("users/profile/", profileData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const refreshToken = async (refreshToken) => {
  const response = await api.post("users/refresh/", { refresh: refreshToken });
  return response.data;
};

export const logoutUser = async (payload) => {
  await api.post("users/logout/", payload);
};

export const changePassword = (passwordData) =>
  api.put("users/change-password/", passwordData);

export const verifyEmail = ({ email, code: verification_code }) =>
  api.post("users/verify-email/", { email, verification_code });

export const resendVerificationCode = (email) =>
  api.post("users/resend-verification-code/", { email });
