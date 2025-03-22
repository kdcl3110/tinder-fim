import api from "./api";

const login = async (username) => {
  return api.post("/auth/signin", { username }).then((response) => {
    return response.data;
  });
};

const logout = () => {
  // localStorage.removeItem("@Auth:token");
  localStorage.removeItem("user");
  return "true";
};

const authService = {
  login,
  logout,
};
export default authService;
