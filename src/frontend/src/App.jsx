import React, { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [favs, setFavs] = useState([]);

  // URL de tu backend (en Sandbox suele ser localhost:3001 si es Nodebox)
  const API_URL = "http://localhost:3001/api";

  const handleSearch = async () => {
    const res = await fetch(`${API_URL}/pokemon/${search}`);
    const data = await res.json();
    setPokemon(data);
  };

  const addFavorite = async () => {
    const res = await fetch(`${API_URL}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon),
    });
    const updatedFavs = await res.json();
    setFavs(updatedFavs);
  };

  return (
    <div style={{ padding: "20px" }}>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Buscar</button>

      {pokemon && (
        <div>
          <h3>{pokemon.name}</h3>
          <img src={pokemon.image} />
          <button onClick={addFavorite}>❤️ Guardar</button>
        </div>
      )}

      <h4>Favoritos en DB:</h4>
      {favs.map((f) => (
        <p key={f.id}>{f.name}</p>
      ))}
    </div>
  );
}

export default App;
