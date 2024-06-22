import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.service";
import { logout } from "../../store/auth.slice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return <button onClick={logoutHandler}>LogoutBtn</button>;
}

export default LogoutBtn;
