import React, {createContext, useState, useEffect, useContext} from 'react';

const PermissionsContext = createContext();

function usePermissions() 
{
    return useContext(PermissionsContext);
}

function PermissionsContextProvider({children})
{
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [roles, setRoles] = useState();

    useEffect(() =>
    {
        setIsLoggedIn(false);
        setRoles(['admin', 'sitter']);
        console.log('e sega minava');
    }, []);

    return(
        <PermissionsContext.Provider value = {{isLoggedIn, setIsLoggedIn, roles}}>
            {children}
        </PermissionsContext.Provider>
    )
};

export {PermissionsContextProvider, usePermissions};