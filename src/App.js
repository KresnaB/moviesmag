import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import MovieCard from "./component/MovieCard";

import './App.css';
import SearchIcon from './search.svg';

//451a7a58

const API_URL = 'http://www.omdbapi.com?apikey=451a7a58';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = React.useState(null);

    useEffect(()=>{
        searchMovies(searchTerm);  
    }, []);

    const searchMovies = async (title) => {
        axios.get(`${API_URL}&s=${title}`).then((response)=>{
            if(response.data? setMovies(response.data.Search): setMovies([]))
            setMovies(response.data.Search);
            console.log(response);
        }).catch(error => {
            setError(error);
        });
        console.log(error);
    }


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