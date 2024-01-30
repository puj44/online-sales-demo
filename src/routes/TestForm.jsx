import React, {  useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import getForm from '../Common/getForm';
import Checkbox from '../Components/Checkbox';
import RadioButton from '../Components/RadioButton';
import CheckErrors from '../Common/CheckErrors';
function TestForm() {
    const form = useMemo(()=>{
        return getForm();
    },[sessionStorage])
    const navigate = useNavigate()
  const {id} = useParams();
  const formRef = useRef();
  const [values, setValues] = useState({});
  const currentForm = useMemo(()=>{
    return form?.[id];
  },[id])

  const onChangeForm = ({id,val}, ) =>{
    if(id){
        setValues({...values, [id]:val});
    }
  }

  const isChecked = (field, val, type) =>{
    if(type === "radio")
        return values[field] === val
    else
        return values?.[field]?.length > 0 ? values[field].filter((v)=> v === val)?.[0] ?? false : false
  }

  const onCheckboxChange = (e,field,val) =>{
    let data = values?.[field] && values[field]?.length > 0 ? values[field] : [];
    if(!e.target.checked){
        data = data.filter((d)=> val !== d);
    }else{
        data.push(val);
    }
    setValues({...values,[field]:data})
  }
  const onRadioChange = (field,val) =>{
    setValues({...values,[field]:val})
  }

  const onSubmit = async() =>{
    const isValid = await CheckErrors(currentForm?.formFields, values, true);
    if(Array.isArray(isValid) && isValid?.length > 0){
        toast.error(
            <ul>
                {
                    isValid.map((err)=>{
                        return(
                            <li>{err}</li>
                        )
                    })
                }
            </ul>
            ,
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
            }
        )
        
    }else{
        toast.success(
            "Form has been successfully submitted!"
        );
        navigate("/");
    }
  }

  return (
    <div className='card' style={{padding:"5px 50px 30px 50px"}}>
        <div className='heading'>{currentForm?.formName}</div>
        <div style={{marginTop:"30px"}}>
            <form 
                ref={formRef} 
                onSubmit={(e)=>{e.preventDefault(); e.stopPropagation(); onSubmit()}}  
                onChange=
                {(e)=>{ 
                    (e?.target?.type !== "radio" && e?.target?.type !== "checkbox") && onChangeForm({id:e?.target?.id,val: e.target?.type === "file" ? e.target.files[0]:e?.target?.value});
                }} >
                {
                    currentForm?.formFields?.map((fd,idx)=>{
                        const fieldName = fd.field?.toLowerCase();
                        return(
                            ((fd.display_if_value && (fd.display_if_value.toLowerCase() === values?.[fd.display_if_name]?.toLowerCase())) || !fd.display_if_value) ?
                            <>
                            
                                <div className='field' style={{display:"flex",flexDirection:"column"}}>
                                    <label >{fd.label}</label>
                                    {
                                       
                                        fieldName === "input" || fieldName === 'file' ?
                                            <input
                                                type={fieldName === 'file' ? 'file':fd.type ?? "text"}
                                                placeholder={fd.label}
                                                name={fd.fieldName}
                                                required={fd.required.toLowerCase() === "yes" ? true : false}
                                                min={fd.min ?? ""}
                                                max={fd.max ?? ""}
                                                accept={
                                                    fd.file_type === "image" ? "image/*" : 
                                                    fd.file_type === "video" ? "video/mp4,video/x-m4v,video/*" : 
                                                    fd.file_type === "audio" ? ".mp3,audio/*" :
                                                    fd.file_type === "excel" ? ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel":
                                                    fd.file_type === "document" ? ".pdf, text/plain, .doc, .docx,.ppt, .pptx"
                                                    :""
                                                }
                                                id={fd.fieldName.trim()}
                                            />
                                        : fieldName === "dropdown" ?
                                            <select  id={fd.fieldName.trim()} name={fd.fieldName}
                                                required={fd.required.toLowerCase() === "yes" ? true : false}
                                            >
                                                <option selected disabled>{`${fd.label}`}</option>
                                                {
                                                    (fd.options.split(",")).map((opt)=>{
                                                        return(
                                                            <option value={opt}>{opt}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        : fieldName === "checkbox"?
                                            <Checkbox field={fd} onCheckboxChange={onCheckboxChange} isChecked={isChecked} />
                                        : fieldName === "radiobutton"?
                                           <RadioButton field={fd} onRadioChange={onRadioChange} isChecked={isChecked} />
                                        : fieldName === "textarea"?
                                            <textarea name={fd.fieldName} id={fd.fieldName}></textarea>
                                        :""
                                    }
                                </div>
                            </>:""
                        )
                    })
                }                

                <div className='center' style={{marginTop:"30px"}}>
                    <button className='btn btn-primary' onClick={(e)=>{e.preventDefault(); e.stopPropagation(); navigate("/")}}>Go back</button>
                    <input type="submit" style={{marginLeft:"20px"}}  className='btn btn-secondary' value="Submit" />
                </div>
            </form>
        </div>
    </div>
  )
}

export default TestForm