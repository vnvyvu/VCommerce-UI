import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';
import { createContext, useReducer } from 'react';

export const RegisterContext=createContext();

const initialData={
    gender: {
        value: 'Mr'
    }, 
    name: {
        value: '', 
        helperText: ''
    }, 
    email: {
        value: '', 
        helperText: ''
    }, 
    password: {
        value: '', 
        helperText: ''
    }, 
    repassword: {
        value: '', 
        helperText: ''
    }
}

function reducer(data, action) {
    switch (action.key) {
        case "registerData/update":
            /*
            * Remember: Must return new object (in other memory address) 
            * Because if not, components will not be rerender
            */
            return cloneDeep(merge(data, action.value));
        default:
            return data;
    }
}

export function RegisterProvider({children}) {
    const [data, dispatch]=useReducer(reducer, initialData);
    return (
        <RegisterContext.Provider value={{data, dispatch}}>
            {children}
        </RegisterContext.Provider>
    );
}

export function createActionUpdate(field, value, helperText){
    return {
        key: "registerData/update", 
        value: {
            [field]: { value, helperText }
        }
    };
}
