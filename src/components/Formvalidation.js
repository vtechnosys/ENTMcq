import React,{useState} from "react";

import { validName } from './Regex.js';


function Formvalidation() {
  const initialstate ={
    name:'',
  }
    const [formData,SetFormdata] =useState(initialstate);
    const [formerror,Setformerror]=useState(null);
    const {name} = formData;
     const onSubmit = (e) =>{
      e.preventDefault();
      // console.log('Form Submitted');
    //  const patt='/^[a-zA-Z ]*/';
     const n=formData.name;
     console.log(validName.test(n));
      if(!validName.test(n))
      {
          let error={
            field_id:'name',
            message:'Enter Only Char',
          };
          Setformerror(error);
      }
      else
      {
        let error={
          field_id:'name',
          message:'ok',
        };
        Setformerror(error);
      }
      
     }

     const onChange= (e) =>{
      SetFormdata({
        ...formData,
        [e.target.name]:e.target.value
      })
      
     }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" name="name" value={name} onChange={onChange}/><br/>
                {formerror && formerror.field_id==='name' ? <p>{formerror.message}</p> : null}
               <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default Formvalidation;
