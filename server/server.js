import express from "express";
import mysql2, { createConnection } from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()
const db = mysql2.createConnection({
	host: "localhost",
	user: "root",
	password: process.env.password,
	database: "test",
});
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
	res.json("hey its working");
});

app.get("/books", (req, res) => {
	let query = "SELECT * FROM book";
	db.query(query, (err, data) => {
		if (err) {
			return res.json(err);
		}
		return res.json(data);
	});
});

app.post("/books", (req, res) => {
	let query = "INSERT INTO book (`title`, `descr`, `cover`) VALUES (?)";

	let values = [req.body.title, req.body.descr, req.body.cover];

	db.query(query, [values], (err, data) => {
		if (err) {
			return res.json(err);
		}
		return res.json(data);
	});
});

app.delete("/books/:id", (req, res) => {
	let query = "DELETE FROM book WHERE id = ?";
	let id = req.params.id;
	console.log('first',id)
	db.query(query, [id], (err, data) => {
		if (err) {
			return res.json(err);
		}
		return res.json(data);
	});
});

app.put("/books/:id", (req, res) => {
	let query = "UPDATE book SET `title` = ?, `descr`= ?, `cover` = ? WHERE id = ?";
	let id = req.params.id;
	let values = [req.body.title, req.body.descr, req.body.cover];
	console.log('first',id)
	db.query(query, [...values,id], (err, data) => {
		if (err) {
			return res.json(err);
		}
		return res.json(data);
	});
});

const port = 5000;
app.listen(port, () => {
	console.log("listening on port " + port);
});
