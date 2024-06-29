import React, { useState } from 'react'
import {Form,Card,Button} from 'react-bootstrap';
import axios from'axios'; 
import {toast} from 'react-toast'
import ItemsList from '../Items/ItemsList';

const Home = () => {
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [disable,setDisable]=useState(false);
    
    const submitHandler=async(e)=>{
        e.preventDefault();
        setDisable(true);
        try {
            console.log(process.env.REACT_APP_API)
            await axios.post(`${process.env.REACT_APP_API}/todo/create`,{
                title,description
            })
            setTitle('');
            setDescription('');
            toast.success('Task Added Successfully');
            setDisable(false)
        } catch (error) {
            setTitle('');
            setDescription(''); 
            toast.error('Something went wrong')
            console.log(error)
            setDisable(false);
        }
    }
  return (
    <>
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
       <Button type='submit' className='primary' disabled={disable}>Add</Button>
    </Form>
    </Card>
   <ItemsList/>
    </>
  )
}

export default Home
