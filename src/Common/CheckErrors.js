

async function CheckErrors(json, data, checkEvery) {
  let errors = [];
  json.filter((d)=>{
    const value = data?.[d.fieldName] 
    if((d.show && !d.notRequired) || d.required?.toLowerCase() === "yes"){
        if(!value){
            errors.push(`${d.label} is Required`);
        }
    }
   if(checkEvery){
      if((d.min || d.min === 0) && (value || value === 0)){
       (d.field === "textarea" ? value.length < d.min : value < d.min) && errors.push(`${d.label} must be greater than ${d.min}`);
      }
      if(d.max && (value || value === 0)){
        (d.field === "textarea" ? value.length > d.max: value > d.max) && errors.push(`${d.label} must be less than ${d.max}`);
      }
      if(d.file_size && value){
        (value?.size / 1024 > (parseFloat(d.file_size) )) && errors.push(`${d.label} file size limit exceeded ${d.file_size} KB`)
      }
      
    }
  });
  return errors;
}

export default CheckErrors