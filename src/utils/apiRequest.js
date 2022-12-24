import { signin } from "../stores/slice/authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  const response = await dispatch(signin(user));
  if (signin.fulfilled.match(response)) {
    // console.log(response)
    localStorage.setItem('accessToken', response.payload.accessToken);
    navigate("/home");
  }
};

export const logOut = async () => {
  localStorage.removeItem("accessToken");
  window.location.href = "/sign-in";
};
