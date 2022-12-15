import React, { createContext, useState, useContext } from 'react';

const ErrorContext = createContext();

function useShowError() 
{
    return useContext(ErrorContext);
}

function ShowErrorProvider({children})
{
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    
    return(
        <ErrorContext.Provider value = {{hasError, setHasError, message: errorMessage, setErrorMessage}}>
            {children}
        </ErrorContext.Provider>
    )
};

export { ShowErrorProvider, useShowError };