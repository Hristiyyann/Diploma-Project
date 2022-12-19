import React, { createContext, useState, useContext } from 'react';

const ErrorContext = createContext();

function useShowError() 
{
    return useContext(ErrorContext);
}

function ShowErrorProvider({children})
{
    const [serverError, setServerError] = useState(null);
    
    return(
        <ErrorContext.Provider value = {{serverError, setServerError}}>
            {children}
        </ErrorContext.Provider>
    )
};

export { ShowErrorProvider, useShowError };