import { createContext } from 'react';
const form = sessionStorage.getItem("userForms") ?? null;
let decodedForm = null;
if(form && form !== ''){
   decodedForm = JSON.parse(form);
}
export const FormContext = createContext(decodedForm);