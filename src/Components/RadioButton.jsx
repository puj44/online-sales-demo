import React from 'react'

function RadioButton({field,onRadioChange,isChecked}) {
  return (
    <div className='checkbox'>
    { (field.options.split(",")).map((opt,idx)=>{
        return(

            <div className='checkbox-field'>
                <input 
                onChange={(e)=>{onRadioChange(field.fieldName,opt)}} 
                type="radio" 
                id={field.fieldName} 
                name={field.fieldName} 
                value={opt} 
                checked={isChecked(field.fieldName,opt, "radio")}  />
                <label for={field.fieldName}>{opt}</label>
            </div>
        )
    })}
</div>
  )
}

export default RadioButton