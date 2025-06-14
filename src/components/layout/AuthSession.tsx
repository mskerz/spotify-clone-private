
"use client";

import { checkUserSession } from "@/providers/redux/slice/action/auth";
import { AppDispatch } from "@/providers/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
    children: React.ReactNode
}

function AuthSessionProvider({ children }: Props) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(checkUserSession());
    }, [dispatch]);


    return <>{children}</>
    
 
}
export default AuthSessionProvider