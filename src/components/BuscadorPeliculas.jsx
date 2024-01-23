import { useState } from "react";

const BuscadorPeliculas = () => {
  const [busqueda, setBusqueda] = useState("");
  const [peliculas, setPeliculas] = useState([]);
  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "ae048293167f5c96bd93bfb1947f3fbb";

  const handleInputChange = (e) => {
    if (e.target.value === "") setPeliculas([]);
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPeliculas();
  };

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${busqueda}&api_key=${API_KEY}`
      );
      const data = await response.json();
      setPeliculas(data.results);
    } catch (error) {
      console.error("Ha ocurrido un problema: ", error);
    }
  };

  return (
    <div className="container">
      <div className="title">Buscador de películas</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Introduzca película"
          value={busqueda}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
      <div className="movie-list">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
              alt={pelicula.title}
            />
            <h2>{pelicula.title}</h2>
            <p>{pelicula.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuscadorPeliculas;
