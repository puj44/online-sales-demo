import React, { useContext } from 'react'
import { FormContext } from '../Contexts'

function Home() {
  const form = useContext(FormContext);
  
  return (
    <div className='d-flex'>
        <div className="heading">
            Your Forms
        </div>
        {
            form && 
                Object.keys(form).map((f,idx)=>{
                    return(
                        <div className='card'>
                            {f}
                            <div style={{marginTop:"10px"}} className='d-flex'>
                                <a href={"/test-form/"+f} className='btn btn-secondary'>Test</a>
                                <a href={"/edit-form/"+f} className='btn btn-primary' style={{marginLeft:"10px"}} >Edit</a>
                            </div>
                        </div>
                    )
                })
        }
        <div className='card' style={{cursor:"pointer"}}>
            <a href='/create-form' style={{color:"rgb(48, 122, 233)"}}>
            + Create New Form
            </a>
        </div>
    </div>
  )
}

export default Home