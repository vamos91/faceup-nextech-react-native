import React, { createContext, useState } from 'react';
export const NameContext = createContext()

const NameProvider = ({children}) => {
    const [name, setName] = useState('')
    return (
        <NameContext.Provider value={{ name, setName }}>
            {children}
        </NameContext.Provider>
    );
};

export default NameProvider;