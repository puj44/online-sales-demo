import React, { useEffect, useMemo, useState } from 'react'
import CheckErrors from '../Common/CheckErrors';
import { toast } from 'react-toastify';
function FieldModal({handleSubmit, formData, handleModalClose, data}) {
    const [fieldData, setFieldData] = useState({});
    const selectFields = useMemo(()=>{
        return formData?.length ? formData.filter((d,idx)=> d.field === "dropdown" || d.field === "radiobutton") : []
        
    },[formData])

    useEffect(()=>{
        setFieldData(typeof data === "object" ? {...data} : {})
    },[data])

    const fields = [
      {
          "label":"Label",
          "fieldName":"label",
          "type":"input",
          show:true
      },
      {
          "label":"Field",
          "fieldName":"field",
          "type":"select",
          "options":["Input","TextArea","Dropdown","Checkbox","RadioButton","File"],
          show:true
      },
      {
          "label":"Display When",
          "fieldName":"display_if",
          customField:(onChange,data)=>{
            let options = [];
            selectFields?.filter((opt)=>{ 
                if(opt.fieldName === data.display_if_name){
                    options = opt?.options?.split(",");
                } 
                return opt;
            })
            return <div style={{display:"flex",flexDirection:"row"}}>
                <div>

                <select onChange={(e)=>{onChange(e.target.value,{"fieldName":"display_if_name"})}} value={data?.["display_if_name"] ?? ""}>
                        <option selected>{"None"}</option>
                        {
                            selectFields.map((s,index)=>{
                                return(
                                    <option value={s.label.toString().toLowerCase()}>{s.label}</option>
                                )
                            })
                        }
                    </select>
                </div>
                {
                    (data?.display_if_name && data?.display_if_name?.toLowerCase() !== "none") &&
                    <div style={{marginLeft:"8px"}}>
                        {
                            options?.length > 0 &&
                            <select onChange={(e)=>{onChange(e.target.value,{"fieldName":"display_if_value"})}} value={data?.["display_if_value"] ?? ""}>
                                <option selected>{"None"}</option>
                                {
                                    options.map((s,index)=>{
                                        return(
                                            <option value={s.toString().toLowerCase()}>{s}</option>
                                        )
                                    })
                                }
                            </select>
                        }
                    </div>
                }
            </div>
          },
          show: selectFields?.length 
      },
      {
          "label":"Options(Comma Seperated)",
          "fieldName":"options",
          "type":"input",
          show:fieldData?.field === "dropdown" || fieldData?.field === "checkbox" || fieldData?.field === "radiobutton"
      },
      {
          "label":"Type",
          "fieldName":"type",
          "type":"select",
          "options":["Text","Number","Email"],
          show:fieldData?.field?.toLowerCase() === "input"
      },
      {
          "label":"Min",
          "type":"input",
          "fieldName":"min",
          "inputType":"number",
         
          show: fieldData?.field?.toLowerCase() === "input" && fieldData?.type?.toLowerCase() === "number" 
      },
      {
          "label":"Max",
          "fieldName":"max",
          "type":"input",
          "inputType":"number",
          show: (fieldData?.field?.toLowerCase() === "input" && fieldData?.type?.toLowerCase() === "number") || fieldData?.field?.toLowerCase() === "textarea"
      },
      {
          "label":"Is Required",
          "fieldName":"required",
          "type":"select",
          "options":["Yes","No"],
          show:true
      },
      {
          "label":"Max File Size(In KB)",
          "fieldName":"file_size",
          "type":"input",
          "inputType":"number",
          "defaultValue":20,
          show:fieldData?.field?.toLowerCase() === "file"
      },
      {
          "label":"File Type",
          "fieldName":"file_type",
          "type":"select",
          "options":["png","jpg","xlsx","mp4","pdf"],
          show:fieldData?.field?.toLowerCase() === "file"
      },
      
    ]
  const onChange = (val,field) =>{
    let data = fieldData;
    if(field.fieldName === "field"){
        const label = data?.["label"] ?? "";
        data = {"label":label};
    }
    data[field.fieldName] = field.type === "select"? val?.toString()?.toLowerCase(): val;
    setFieldData({...data});
  }

  const onSubmit = async (e) =>{
    const isValid = await CheckErrors(fields, fieldData, true);
    console.log("here",isValid);
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
        handleSubmit(fieldData)
    }
  }
  return (
    <div className="modal-bg">
        <div className='modal-outer'>
                <div style={{position:"relative",margin:"auto",width:"fit-content",height:"fit-content", background:"#fff"}}>
                    <div  className="close-btn" onClick={()=>{handleModalClose()}}>
                        <img
                            src={"/cross.png"}
                            width={32}
                            height={32}
                            alt={"cross"}
                        />
                    </div>
                    <form className='d-flex'  style={{padding:"50px"}}>
                        {
                            fields.map((d,idx)=>{
                              return(
                                d.show ?
                                    <div className='field' style={{display:"flex",flexDirection:"column"}}>
                                        <label >{d.label}</label>
                                        {
                                            //custom field
                                            d.customField ? d.customField(onChange, fieldData):
                                            //input field
                                            d.type === "input"?
                                                <input value={fieldData?.[d.fieldName] ?? ""} 
                                                    min={1} 
                                                    defaultValue={d.defaultValue ?? ""} 
                                                    type={d.inputType ?? "text"} 
                                                    placeholder={d.label} 
                                                    onChange={(e)=>{onChange(e.target.value,d)}} 
                                                    required 
                                                    name={d.fieldName}
                                                />
                                            //select field
                                            : d.type === "select"?
                                                <select   
                                                    name={d.fieldName} 
                                                    onSelect={(e)=>{onChange(e.target.value,d)}} 
                                                    onChange={(e)=>{onChange(e.target.value,d)}}
                                                    value={fieldData?.[d.fieldName] }
                                                >
                                                    <option selected disabled>{"Select "+d.label}</option>
                                                    {
                                                        d.options.map((o,index)=>{
                                                            return(
                                                                <option value={o.toString().toLowerCase()}>{o}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            
                                            :""
                                        }
                                    </div>
                                :""
                              )
                            })
                        }
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"end",marginTop:"25px"}}>
                            <button onClick={()=>{ handleModalClose()}} className='btn btn-primary'>Close</button>
                            <button  className='btn btn-secondary' onClick={(e)=>{e.stopPropagation(); e.preventDefault(); onSubmit(e)}} style={{marginLeft:"10px"}}>Add</button>
                        </div>
                    </form>
                </div>
        </div>
    </div>
  )
}

export default FieldModal