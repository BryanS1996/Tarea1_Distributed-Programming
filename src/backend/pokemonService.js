const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors()); // Permite que el frontend se conecte
app.use(express.json());

let favorites = []; // Nuestra "Base de datos" temporal

// Ruta para buscar un pokemon (puente con PokéAPI)
app.get("/api/pokemon/:name", async (req, res) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${req.params.name.toLowerCase()}`
    );
    const data = await response.json();
    res.json({
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
    });
  } catch (error) {
    res.status(404).json({ message: "No encontrado" });
  }
});

// Rutas para los favoritos
app.get("/api/favorites", (req, res) => res.json(favorites));
app.post("/api/favorites", (req, res) => {
  favorites.push(req.body);
  res.json(favorites);
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
