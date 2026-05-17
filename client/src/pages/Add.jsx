import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router';
import axios from 'axios';

const Add = () => {

  const [book, setBook] = useState({
    title: "",
    description: "",
    cover: "" 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook(prev=>({ ...prev, [e.target.name]: e.target.value }))
  };

  const handleClick = async e => {
    e.preventDefault();

    try{
      await axios.post("http://localhost:3000/books", book);
      // navigate(-1);
      navigate("/");

    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <form className="form gap-2 d-flex flex-column justify-content-center">
        <h1 className="mb-5">Add a Book</h1>

        <div className="row mb-3">
            <label for="title" className="form-label text-start">Book Title</label>
            <input type="text" className="form-control" id="title" placeholder="what's in a name?" onChange={handleChange} name="title"></input> 
        </div>
        
        <div className="row mb-3 ">
          <label for="description" className="form-label text-start">Description</label>
          <input type="text" className="form-control" id="description" placeholder="tell us about it" onChange={handleChange}  name="description"></input>
        </div>

        <div className="row mb-3">
          <label for="cover" className="form-label text-start">Cover</label>
          <input type="text" className="form-control" id="cover" placeholder="image url" onChange={handleChange} name="cover"></input>
        </div>

        <div className="row mb-3 ">
          <button type="submit" className="btn btn-info text-bold" onClick={handleClick}>Add +</button>
        </div>

      </form>  
    </div>
  )
}

export default Add