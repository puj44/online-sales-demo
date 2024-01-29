import React, { useContext, useEffect, useState } from 'react'
import { FormContext } from '../Contexts';
import { useParams } from 'react-router-dom';
import FieldModal from '../Components/FieldModal';
import { toast } from 'react-toastify';
function CreateForm({params}) {
  const form = useContext(FormContext);
  const {id} = useParams();
  const [formData, setFormData] = useState({});
  const [show,setShow] = useState(false);
  const valuesToShow = [
    "label",
    "field",
    "type",
    "required"
  ]
  useEffect(()=>{
    if(id){
        setFormData({...formData, "formName":form[id]?.formName})
    }
  },[id]);

  const handleModalClose = () =>{
    setShow(false);
  }
  const handleSubmit=(data)=>{
    let form = formData;
    if(!form.formFields){
        form.formFields = [];
    }
    let isValid = true;
    form.formFields.filter((fd)=>{
        if(fd.label?.toLowerCase() === data.label?.toLowerCase()){
            isValid = false;
        }
    });
    if(!isValid){
        toast.error("Label already exists!",
            {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
            }
        )
    }else{
        const splitLabel = data.label.split(" ");
        data.fieldName = splitLabel.join("");
        form.formFields.push(data);
        setFormData({...form});
        handleModalClose();
    }
  }

  const handleDeleteField = (idx) =>{
    let form = formData;
    delete form?.formFields?.[idx];
    setFormData({...form})
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
        {show !== false && <FieldModal handleModalClose={handleModalClose} data={formData?.formFields?.[show] ?? false} handleSubmit={handleSubmit} formData={formData?.formFields ?? []} />}
    </div>
  )
}

export default CreateForm