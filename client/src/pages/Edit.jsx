import { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const Edit = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({
    title: "",
    description: "",
    cover: "" 
  });

  useEffect(() => {
    const fetchbook = async () => {
      try{
        const response = await axios.get(`http://localhost:3000/books/${id}`);
        setBook(response.data);
      } catch(err){
        console.log(err);
      }
    };

    fetchbook();
  }, [id]);

  const handleChange = (e) => {
    setBook(prev=>({ ...prev, [e.target.name]: e.target.value }))
  };

  const handleClick = async e => {
    e.preventDefault();

    try{
      await axios.put("http://localhost:3000/books/"+ id, book);
      // navigate(-1);
      navigate("/");

    }catch(err){
      console.log(err);
    }
  };


  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <form className="form gap-2 d-flex flex-column justify-content-center">
        <h1 className="mb-5 page-title">Edit</h1>

        <div className="row mb-3">
            <label htmlFor="title" className="form-label text-start">Book Title</label>
            <input type="text" className="form-control" id="title" placeholder="what's in a name?" onChange={handleChange} name="title" value={book.title}></input> 
        </div>
        
        <div className="row mb-3 ">
          <label htmlFor="description" className="form-label text-start">Description</label>
          <textarea className="form-control" id="description" placeholder="tell us about it" onChange={handleChange} name="description" value={book.description}></textarea>
        </div>

        <div className="row mb-3">
          <label htmlFor="cover" className="form-label text-start">Cover</label>
          <input type="text" className="form-control" id="cover" placeholder="image url" onChange={handleChange} name="cover" value={book.cover}></input>
        </div>

        <div className="row mb-3 ">
          <button type="submit" className="done-btn btn text-white btn-outline-secondary fs-5" onClick={handleClick}>Done</button>
        </div>

      </form>  
    </div>
  )
}

export default Edit