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
                        </div>
                    )
                })
        }
    </div>
  )
}

export default Home