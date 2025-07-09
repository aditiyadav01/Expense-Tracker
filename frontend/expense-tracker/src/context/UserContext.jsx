import React,{createContext,useState} from "react";

export const UserContext = createContext();

const UserProvider = ({children})=>{
    const [user,setUSer] = useState(null);
    //function to uppdate user data

    const updateUser = (userData)=>{
        setUSer(userData);
    };

    //function to clear user data (e.g. , pn logout)

    const clearUser = ()=>{
        setUSer(null);
    };

    return (
        <UserContext.Provider
        value={{
            user,
            updateUser,
            clearUser,
        }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;