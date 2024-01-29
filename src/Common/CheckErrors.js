

async function CheckErrors(json, data, checkEvery) {
  let errors = [];
  json.filter((d)=>{
    if(d.show){
        if(!data?.[d.fieldName]){
            errors.push(`${d.label} is Required`);
        }
    }
  });
  return errors;
}

export default CheckErrors