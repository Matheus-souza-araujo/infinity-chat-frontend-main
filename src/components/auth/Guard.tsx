import { useEffect } from "react";
import excludedRoutes from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import { snackVar } from "../../constants/snack";
import { authenticatedVar } from "../../constants/authenticate";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/error";
import { usePath } from "../../hooks/usePath";

interface GuardProps {
  children: JSX.Element;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user, error } = useGetMe();
  const { path } = usePath() ;

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    if (error?.networkError) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  }, [error]);

  return (
    <>
      {excludedRoutes.includes(path)
        ? children
        : user && children}
    </>
  );
};

export default Guard;