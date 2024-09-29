import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useAuth } from "../../context/Auth";
import axios from "axios";

export default function PrivateRoute() {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`/api/v1/auth/user-auth`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : "Spinner";
}
