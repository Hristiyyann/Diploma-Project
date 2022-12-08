import React, { createContext, useState, useEffect, useContext } from 'react';

const LoadingContext = createContext();

function useLoading() 
{
    return useContext(LoadingContext);
}

function LoadingContextProvider({children})
{
    const [isLoading, setIsLoading] = useState(false);
    
    return(
        <LoadingContext.Provider value = {{isLoading, setIsLoading}}>
            {children}
        </LoadingContext.Provider>
    )
};

export {LoadingContextProvider, useLoading};