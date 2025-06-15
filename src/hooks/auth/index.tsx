import { authActions } from "@/providers/redux/slice/action";
import { useRedux } from "../redux"


function useAuth() {
    const { dispatch, useSelector}  = useRedux();
    const  auth = useSelector((state) => state.auth);
    
      
    const handleSignOut = () => {
        dispatch(authActions.signOutUser());
    }

    return {auth, handleSignOut}

}

export default useAuth