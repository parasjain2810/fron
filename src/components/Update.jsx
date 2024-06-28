import React, { useState } from 'react'
import {Form,Card,Button} from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toast';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const navigate=useNavigate()
    const params=useParams();

    
    const submitHandler=async(e)=>{
        e.preventDefault();
        const id=params.id;
        try {
            await axios.put(`${process.env.REACT}/todo/update/${id}`,{
                title,description
            })
            setTitle('');
            setDescription('');
            toast.success('Task Updated Successfully');
            navigate('/');
            
        } catch (error) {
            setTitle('');
            setDescription(''); 
            toast.error('Something went wrong')
            console.log(error)
        }
    }
  return (
    <Card style={{ width: '25rem', margin: '10px auto'}}>
    <Form className='p-4' onSubmit={submitHandler}>
      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="enter the task" name='title' value={title} onChange={(i)=>{
            setTitle(i.target.value)
        }} required/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control as="textarea" rows={2} placeholder='enter the description' name='description' value={description} onChange={(i)=>{
            setDescription(i.target.value)
        }} required/>
      </Form.Group>
       <Button type='submit' className='primary'>Update</Button>
    </Form>
    </Card>
  )
}

export default Update
