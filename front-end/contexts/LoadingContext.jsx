import React, { createContext, useState, useEffect, useContext } from 'react';

const LoadingContext = createContext();

function useLoading() 
{
    return useContext(LoadingContext);
}

function LoadingContextProvider({children})
{
    const [isLoading, setLoading] = useState(false);

    return(
        <LoadingContext.Provider value = {{isLoading, setLoading}}>
            {children}
        </LoadingContext.Provider>
    )
};

export {LoadingContextProvider, useLoading};