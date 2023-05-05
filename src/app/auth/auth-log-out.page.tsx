import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ============== Redux ==============
import { logOutUser } from "./store/auth.actions";
import { useAppDispatch } from "hooks/redux";

export default function AuthLogOutPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logOutUser())
      .then(({ meta }) => {
        if (meta.requestStatus !== "rejected") {
          navigate('/', { replace: true });
        }
      });
  }, [])

  return(<></>);
}