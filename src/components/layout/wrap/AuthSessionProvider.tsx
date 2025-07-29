
"use client";

import { checkUserSession } from "@/providers/redux/slice/action/src/auth";
import { AppDispatch } from "@/providers/redux/store";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
    children: React.ReactNode
}

function AuthSessionProvider({ children }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    

    const checkSession = useCallback(() => {
        dispatch(checkUserSession());
    }, [dispatch]);

    useEffect(() => {
        checkSession();
    }, [checkSession]);


    return <>{children}</>
    
 
}
export default AuthSessionProvider