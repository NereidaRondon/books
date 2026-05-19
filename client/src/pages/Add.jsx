import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router';
import axios from 'axios';

const Add = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    description: "",
    cover: "" 
  });


  const handleChange = (e) => {
    setBook(prev=>({ ...prev, [e.target.name]: e.target.value }))
  };

  const handleClick = async e => {
    e.preventDefault();

    try{
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:3000/books", book, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // navigate(-1);
      navigate("/");

    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <form className="form gap-2 d-flex flex-column justify-content-center">
        <h1 className="mb-5 page-title">Add a Book</h1>

        <div className="row mb-3">
            <label htmlFor="title" className="form-label text-start">Book Title</label>
            <input type="text" className="form-control" id="title" placeholder="what's in a name?" onChange={handleChange} name="title"></input> 
        </div>
        
        <div className="row mb-3 ">
          <label htmlFor="description" className="form-label text-start">Description</label>
          <textarea className="form-control" id="description" placeholder="tell us about it" onChange={handleChange}  name="description"></textarea>
        </div>

        <div className="row mb-3">
          <label htmlFor="cover" className="form-label text-start">Cover</label>
          <input type="text" className="form-control" id="cover" placeholder="image url" onChange={handleChange} name="cover"></input>
        </div>

        <div className="row mb-3 ">
          <button type="submit" className="add-btn btn text-white btn-outline-secondary fs-5" onClick={handleClick}>Add +</button>
        </div>

      </form>  
    </div>
  )
}

export default Add