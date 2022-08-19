import React, { useState } from "react";
import { useEffect } from "react";

import MovieCard from "./component/MovieCard";

import './App.css';
import SearchIcon from './search.svg';

//451a7a58

const API_URL = 'http://www.omdbapi.com?apikey=451a7a58';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('the batman');
    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        searchMovies("the batman");  
    }, []);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
    
        setMovies(data.Search);
    };


    return(
        <div className="app">
            <h1>MOVIESMAG</h1>
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e)=> setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={()=> searchMovies(searchTerm)}
                />
            </div>
            {movies?.length ? (movies.length > 0
                ?(
                    <div className="container">
                        {movies.map((movie)=>(
                            <MovieCard movie={movie} key={movie.imdbID}/>
                        ))}
                        
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>
                ))
                :( <div className="empty">
                    <h2>No Movies Found</h2>
                </div>)
            }
            
        </div>
    );
}

export default App;