import React, { useEffect, useState } from 'react';
import "./index.css"
import { Auth } from './components/auth';
import { db, auth } from "./firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [newMovieOscar, setNewMovieOscar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(""); // Değişken adını düzelt

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: newMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList(); // Listenin güncellenmesi için
    } catch (err) {
      console.log(err);
    }
  };

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle }); // Değişken adını düzelt
      getMovieList(); // Listenin güncellenmesi için
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='App'>
      <Auth />
      <div className="input-container">
        <input
          placeholder='Movie Title...'
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder='Release Date'
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={newMovieOscar}
          onChange={(e) => setNewMovieOscar(e.target.checked)}
        />
        <label>Received An Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div className="movie-container">
        {movieList.map((movie) => (
          <div key={movie.id} className="movie-item">
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input
              placeholder='New title..'
              onChange={(e) => setUpdatedTitle(e.target.value)} // Değişken adını düzelt
            />
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button> {/* Buton adını düzelt */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
