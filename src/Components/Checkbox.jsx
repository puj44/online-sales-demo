import React from 'react'

function Checkbox({field,onCheckboxChange,isChecked}) {
  return (
    <div className='checkbox'>
        { (field.options.split(",")).map((opt,idx)=>{
            return(

                <div className='checkbox-field'>
                    <input onChange={(e)=>{onCheckboxChange(e,field.fieldName,opt)}} 
                    type="checkbox" 
                    id={field.fieldName} 
                    name={field.fieldName} 
                    value={opt} checked={isChecked(field.fieldName,opt)}  />
                    <label for={field.fieldName}>{opt}</label>
                </div>
            )
        })}
    </div>
  )
}

export default Checkbox
