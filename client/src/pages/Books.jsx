import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router'

const Books = () => {
  const [books, setBooks] = useState([]);

  let noCover = 'https://www.nypl.org/scout/_next/image?url=https%3A%2F%2Fdrupal.nypl.org%2Fsites-drupal%2Fdefault%2Ffiles%2Fstyles%2Fmax_width_960%2Fpublic%2Fblogs%2FsJ3CT4V.gif%3Fitok%3D0SCQuwls&w=3840&q=90';

  useEffect(()=>{
    const fetchAllBooks = async ()=>{
      try{
        const response = await axios.get("http://localhost:3000/books");
        console.log(response);
        setBooks(response.data);

      } catch(err){
        console.log(err);
      }
    }

    fetchAllBooks();
  }, []);

  return (
    <div className="container-fluid">
      <h1>Books I've Read</h1>
      <div className="d-flex justify-content-end my-3">
          <button type="button" className="btn btn-outline-info fw-bold">
            <Link className="text-decoration-none link-dark" to="/add">Add new book</Link>
          </button>
      </div>
        <div class="container books text-center d-flex justify-content-between ">
          <div className="row pb-3 gy-5">

            {books.map(book=>(
              <div className="col-xl-3 col-md-4 col-sm-6 col-12" key={book.id}>
                <div className="card d-block mx-auto h-100" >
                  {book.cover && <img src={book.cover} alt="" className="card-img-top w-50" />}
                  {!book.cover && <img src={noCover} alt="" className="card-img-top w-50" />}
                  
                  <div class="card-body">
                    <h2 className="card-title">{book.title}</h2>
                    <p className="card-text">{book.description}</p>
                  </div>  
                </div>    
              </div>
            ))}    

          </div>
        </div>
      </div>
  )
}

export default Books;