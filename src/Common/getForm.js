export default function getForm() {
    const form = sessionStorage.getItem("userForms") ?? null;
    let decodedForm = null;
    if(form && form !== ''){
       decodedForm = JSON.parse(form);
    }
    return decodedForm;
}