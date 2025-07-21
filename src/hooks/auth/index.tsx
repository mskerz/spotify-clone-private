import { authActions } from "@/providers/redux/slice/action";
import { useRedux } from "../redux"
import { useRouter } from "next/navigation";


function useAuth() {
    const { dispatch, useSelector}  = useRedux();
    const navigate = useRouter();
    const  auth = useSelector((state) => state.auth);
    
      
    const handleSignOut = () => {
        dispatch(authActions.signOutUser());
        
        navigate.push("/");

    }

    return {auth, handleSignOut}

}

export default useAuth