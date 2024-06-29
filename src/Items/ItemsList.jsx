import React, { useEffect, useState } from 'react'
import './items.css';
import axios from 'axios';
import { toast } from 'react-toast';
import { useNavigate } from 'react-router-dom';

const ItemsList = () => {

    const [alltask,setAlltasks]=useState([]);
    
   useEffect(()=>{
    fetch(`${process.env.REACT_APP_API}/todo/get`)
    .then(response => response.json())
    .then(data => setAlltasks(data.items));
   },[alltask])

  return (
    <>
      <div className="container">
       <div className='card' style={{width: '40rem'}}>
          <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Todo item</th>
              <th>Actions</th>
            </tr>   
          </thead>
          <tbody>
            {alltask.map((val)=>(
                <Items id={val._id} title={val.title} description={val.description} time={val.createdAt} status={val.status} key={val._id}/>
            ))}
          </tbody>
        </table>
          </div>
      </div>

    </>
  )
}


const Items=({id,title,description,time,status})=>{
  const navigate=useNavigate();
  const deleteHandler=async(id)=>{
    const response=await axios.delete(`${process.env.REACT_APP_API}/todo/delete/${id}`)
    toast.success(response.data.message);
}
const updateStatusHandler=async(id,status)=>{
   const response= await axios.put(`${process.env.REACT_APP_API}/todo/updateStatus/${id}`,{
        status
    })
    if(!response.data.status)
        toast.success('marked as complete')
    else
        toast.success('marked as uncomplete')
}
    return (
      <>
         <tr ng-repeat="task in tasks">
  <td >
    <h4>Task :- {title}</h4>
    <p>Details :-  {description}</p>
    <p>Time :-  {time.slice(0,10)}</p>
  </td>
  <td >
    <button className="btn btn-danger m-2" onClick={()=>{
      deleteHandler(id) 
    }}>
      Delete
    </button>
    <button className="btn btn-success m-2" onClick={()=>{
       navigate(`/${id}`);
    }}>
      Edit
    </button>
    <input type="checkbox" size={40} className='m-3' checked={status} onChange={()=>{
       updateStatusHandler(id,status);
    }}/>
  </td>
</tr>
      </>
    )
 }

export default ItemsList