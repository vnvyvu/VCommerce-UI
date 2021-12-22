import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';
import { createContext, useReducer } from 'react';
export const LoginContext=createContext();

const initialData={
    email: {
        value: '', 
        helperText: ''
    }, 
    password: {
        value: '', 
        helperText: ''
    }, 
    remember: { 
        value: false
    }
}

function reducer(data, action) {
    switch (action.key) {
        case 'loginData/update':
            return cloneDeep(merge(data, action.value));
        default:
            return data;
    }
}

export function LoginProvider({children}) {
    const [data, dispatch] = useReducer(reducer, initialData);
    return (
        <LoginContext.Provider value={{data, dispatch}}>
            {children}
        </LoginContext.Provider>
    );
}

export function createActionUpdate(field, value, helperText){
    return {
        key: 'loginData/update', 
        value: {
            [field]: {value, helperText}
        }
    }
}