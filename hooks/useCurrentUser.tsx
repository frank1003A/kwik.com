import React, { useState, useEffect } from "react";
import user from "../model/user";
import { useSelector } from "../src/redux/store";
import { updateUser } from "../src/redux/currentUser";
import { useAppDispatch } from "../src/redux/hooks";
import { RootState } from "../src/redux/store";
import { useSession } from "next-auth/react";
import useGetter from "./useGetter";

const useCurrentUser = () => {
  const { data: session, status } = useSession()
  const { data, isLoading, isError } = useGetter(`/api/admin/user/?user_id=${session?.user?.id}`)
  const [user, setCurrentUser] = useState<user>({});

  useEffect(() => {
    if (data !== undefined && status === "authenticated") setCurrentUser(data);
    if (isError) console.log(isError);
  },[data, status, isError, user])

  return { user, setCurrentUser, isLoading, isError, status, session };
};

export default useCurrentUser;
