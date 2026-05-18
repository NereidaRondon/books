import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import Edit from '../assets/icons/pen-to-square-solid-full.svg?react';
import Trash from '../assets/icons/trash-can-solid-full.svg?react';


const Books = () => {
  const [books, setBooks] = useState([]);

  let noCover = 'https://www.nypl.org/scout/_next/image?url=https%3A%2F%2Fdrupal.nypl.org%2Fsites-drupal%2Fdefault%2Ffiles%2Fstyles%2Fmax_width_960%2Fpublic%2Fblogs%2FsJ3CT4V.gif%3Fitok%3D0SCQuwls&w=3840&q=90';

  useEffect(()=>{
    const fetchAllBooks = async ()=>{
      try{
        const response = await axios.get("http://localhost:3000/books");
        console.log(response);
        const sortedBooks = [...response.data].sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        setBooks(sortedBooks);

      } catch(err){
        console.log(err);
      }
    }

    fetchAllBooks();
  }, []);

  const handleDelete = async (id)=>{
    try{
      await axios.delete("http://localhost:3000/books/" + id);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));

    }catch(err){
      console.log(err);
    }
  }

 
  return (
    <div className="container-fluid">
      <h1 className="app-title twinkle-star-regular">Lectora</h1>
      <h2 className="inclusive-sans-bold app-subtitle">Book Tracker</h2>
      
      <div className="d-flex justify-content-end">
          <button type="button" className="add-btn btn btn-secondary fw-bold my-2">
            <Link className="text-decoration-none link-light" to="/add">Add +</Link>
          </button>
      </div>


      <h3 className="inclusive-sans d-flex justify-content-start my-5">List of books I've already read...</h3>

        <div className="container books d-flex justify-content-between ">
          <div className="row pb-3 gy-5">

            {books.map(book=>(
              <div className="col-xl-4 col-md-4 col-sm-6 col-12" key={book.id}>
                <div className="book-card card h-100" >
                  {book.cover && <img src={book.cover} alt="" className="d-block mx-auto card-img-top py-3 w-50" />}
                  {!book.cover && <img src={noCover} alt="" className="d-block mx-auto card-img-top py-3 w-50" />}
                  
                  <div className="card-body d-flex flex-column justify-content-between  text-start">
                    <h4 className="card-title book-title">{book.title}</h4>
                    <p className="card-text book-description text-start">{book.description}</p>
                    
                    
                    <div className="d-flex justify-content-end gap-3 mt-1">

                      <button className="edit-btn" type="button" 
                        aria-label={`Edit ${book.title}`}>
                        <Link to={`/edit/${book.id}`}><Edit className="icons" /></Link>
                      </button>

                      <button
                        className="delete-btn" type="button"
                        onClick={() => handleDelete(book.id)}
                        aria-label={`Delete ${book.title}`}>
                          <Trash className="icons " />
                      </button>

                    </div>

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