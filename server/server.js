const express=require('express')
const mysql=require('mysql')
const cors=require('cors')
const app=express();
const corsOptions={
    origin:'*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    Credentials: true,
    OptionSuccessStatus:'204',
}
app.use(cors(corsOptions))
const port=3001
app.use(express.json())
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mylibrary',
});
  
connection.connect();
app.get('/books', (req, res) => {
    connection.query('SELECT * FROM mybooks', (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error connecting to database');
        } else {
            res.json(results);
        }
    });
});
app.post('/api/bookdata', (req, res) => {
    const {title,author,subject,publish_date} = req.body;
    const query = "INSERT INTO mybooks (title,author,subject,publish_date) VALUES (?, ?, ?, ?)";
    connection.query(query, [title,author,subject,publish_date], (error, result) => {
        if (error) {
            console.error("Error adding employee:", error);
            res.status(500).json({ error: "Failed to add employee" });
        } else {
            console.log("Book added successfully");
            res.status(200).json({ message: "Employee added successfully" });
        }
    });
});
// DELETE endpoint to delete a book by ID
app.delete('/api/bookdata/:id', (req, res) => {
    const bookId = req.params.id;
  
    const sql = 'DELETE FROM mybooks WHERE id = ?';
    connection.query(sql, [bookId], (err, result) => {
      if (err) {
        console.error('Error deleting book:', err);
        res.status(500).json({ message: 'Failed to delete book' });
        return;
      }
      if (result.affectedRows === 0) {
        // If no rows were affected, it means the book with the given ID was not found
        res.status(404).json({ message: 'Book not found' });
        return;
      }
      console.log('Book deleted successfully');
      res.status(200).json({ message: 'Book deleted successfully' });
    });
  });
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  