import React, {  useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import FieldModal from '../Components/FieldModal';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import getForm from '../Common/getForm';
function CreateForm({params}) {
    const form = useMemo(()=>{
        return getForm();
      },[sessionStorage])
  const {id} = useParams();
  const [formData, setFormData] = useState({});
  const [show,setShow] = useState(false);
  const navigate = useNavigate()
  const valuesToShow = [
    "label",
    "field",
  ]
  useEffect(()=>{
    if(id){
        setFormData({"formFields":form[id]?.formFields, "formName":form[id]?.formName})
    }
  },[id]);

  const handleModalClose = () =>{
    setShow(false);
  }
  const handleSubmit=  (data, isEdit)=>{
    let form = formData;
    if(!form.formFields){
        form.formFields = [];
    }
    let isValid = true;
    form.formFields.filter((fd)=>{
        if(!isEdit && (fd.label?.toLowerCase() === data.label?.toLowerCase())){
            isValid = false;
        }
    });
    
    if(!isValid){
        toast.error("Label already exists!",
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
            }
        )
    }else{
        data.label = data.required?.toLowerCase() === "yes" ? (data.label).concat("*"): data.label;
        if(isEdit){
            const fields = form.formFields?.map((nf)=>{
                let obj = nf;
                if(nf.fieldName === isEdit.fieldName){
                    obj = data;
                }
                return obj;
            }) ?? [];
            setFormData({...formData, "formFields":[...fields]})
        }else{

            const splitLabel = data.label.split(" ");
            data.fieldName = splitLabel.join("").toLowerCase();
            form.formFields.push(data);
            setFormData({...form});
        }
        toast.success("Form fields updated!");
        handleModalClose();
    }
  }

  const handleDeleteField = (idx) =>{
    let form = formData;
    form.formFields?.splice(idx,1)
    setFormData({...form})
  }

  const onSave = async() =>{
    let newForm = form ?? {};
    const splitName = formData.formName?.trim()?.toLowerCase()?.split(" ");
    const formName = splitName.join("-");
    newForm[id ?? formName?.toString()] = {
        ...formData
    }
    sessionStorage.setItem("userForms" ,JSON.stringify(newForm))
    navigate("/");
  }

  return (
    <div>
        <input 
            type="text" 
            onChange={(e)=>{ setFormData({...formData, "formName":e.target.value})}}  
            defaultValue={formData?.formName} placeholder='Type the form name here' 
            required 
            className='hidden-input heading ' 
            style={{fontWeight:"500"}}
        />
        {
            formData?.formFields?.map((fD,index)=>{
                return(
                    <div className='card' style={{flexDirection:"row",justifyContent:"space-between"}}>
                        {
                            valuesToShow.map((v)=>{
                                return(
                                    <div>{fD?.[v]}</div>
                                )
                            })
                        }
                        <div className='center'>
                            <button className='btn btn-primary' onClick={()=>{setShow(index)}}>Edit</button>
                            <button className='btn btn-danger' style={{marginLeft:"10px"}} onClick={()=>{handleDeleteField(index)}}>Delete</button>
                        </div>
                    </div>
                )
            })
        }
        <div className='d-flex' style={{marginTop:"20px"}}>
            <div className='input-card' style={{cursor:"pointer"}} onClick={()=>{setShow(true);}}>+ Add Input Field</div>
        </div>
        <div style={{display:"flex",justifyContent:"end",marginTop:"40px"}}>
            <button className='btn btn-primary' onClick={(e)=>{e.preventDefault(); e.stopPropagation(); navigate("/")}}>Go back</button>
            <button className='btn btn-secondary' 
                disabled={(formData?.formFields?.length > 0 && formData?.formName)?false:true}
                style={{background:(formData?.formFields?.length > 0 && formData?.formName)?"":"rgb(187 190 191)",marginLeft:"10px"}}
                onClick={()=>{onSave()}}
            >Save
            </button>
        </div>
        {show !== false && <FieldModal handleModalClose={handleModalClose} data={formData?.formFields?.[show] ?? false} handleSubmit={handleSubmit} formData={formData?.formFields ?? []} />}
    </div>
  )
}

export default CreateForm