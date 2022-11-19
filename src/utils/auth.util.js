export const getTokenStorage = () => {
  const token = localStorage.getItem("accessToken");
  // if (!token) return;
  // const accessToken = JSON.parse(token.auth).accessToken;
  return token;
};
