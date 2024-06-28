import React, { useEffect, useState } from 'react'
import './items.css';
import axios from 'axios';
import { toast } from 'react-toast';
import { useNavigate } from 'react-router-dom';
const ItemsList = () => {

    const [alltask,setAlltasks]=useState([]);
    const [check,setcheck]=useState(false);
    const navigate=useNavigate();
    var d;
   
    const deleteHandler=async(id)=>{
        const response=await axios.delete(`http://localhost:5000/todo/delete/${id}`)
        toast.success(response.data.message);
    }
    const updateStatusHandler=async(id,status)=>{
       const response= await axios.put(`http://localhost:5000/todo/updateStatus/${id}`,{
            status
        })
        if(!response.data.status)
            toast.success('marked as complete')
        else
            toast.success('marked as uncomplete')
    }
   useEffect(()=>{
    fetch('http://localhost:5000/todo/get')
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
                <tr ng-repeat="task in tasks">
                <td >
                  <h4>Task :- {val.title}</h4>
                  <p>Details :-  {val.description}</p>
                  <p>Time :-  {val.createdAt.slice(0,10)}</p>
                </td>
                <td >
                  <button className="btn btn-danger m-2" onClick={()=>{
                    deleteHandler(val._id)
                  }}>
                    Delete
                  </button>
                  <button className="btn btn-success m-2" onClick={()=>{
                     navigate(`/${val._id}`);
                  }}>
                    Edit
                  </button>
                  <input type="checkbox" size={40} className='m-3' checked={val.status} onChange={()=>{
                     updateStatusHandler(val._id,val.status);
                  }}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
      </div>

    </>
  )
}

export default ItemsList