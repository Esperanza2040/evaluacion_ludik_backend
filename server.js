// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); 

const app = express();
const port = 3001;

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Middleware para manejar JSON
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',      // Cambia si tu base de datos está en otro host
    user: 'root',           // Cambia a tu usuario de MySQL
    password: 'root1234',   // Cambia a tu contraseña de MySQL
    database: 'task_test'   // Nombre de la base de datos
  });
  
  // Conectar a la base de datos MySQL
  db.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.stack);
      return;
    }
    console.log('Conectado a la base de datos MySQL');
  });

// Endpoints CRUD

// CREATE: Crear un nuevo item
app.post('/items', (req, res) => {
  const { title, description, status } = req.body;
  const query = 'INSERT INTO items (title, description, status) VALUES (?, ?, ?)';
  
  db.query(query, [title, description, status], (err, result) => {
    if (err) {
      console.error('Error al insertar item:', err);
      return res.status(500).send('Error al crear el item');
    }
    res.status(201).json({ id: result.insertId, title, description, status });
  });
}); 
  
  // READ: Obtener todos los items
  app.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
      if (err) {
        console.error('Error al obtener items:', err);
        return res.status(500).send('Error al obtener los items');
      }
      res.status(200).json(results);
    });
  });
  
  // READ: Obtener un item por su ID
  app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM items WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Error al obtener el item:', err);
        return res.status(500).send('Error al obtener el item');
      }
      if (results.length === 0) {
        return res.status(404).send('Item no encontrado');
      }
      res.status(200).json(results[0]);
    });
  });
  
  // UPDATE: Actualizar un item por su ID
  app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    db.query('UPDATE items SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id], (err, result) => {
      if (err) {
        console.error('Error al actualizar el item:', err);
        return res.status(500).send('Error al actualizar el item');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Item no encontrado');
      }
      res.status(200).json({ id, title, description, status });
    });
  });
  
  // DELETE: Eliminar un item por su ID
  app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM items WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar el item:', err);
        return res.status(500).send('Error al eliminar el item');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Item no encontrado');
      }
      res.status(200).send('Item eliminado');
    });
  });
  
  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });