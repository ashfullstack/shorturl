const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const shortid = require("shortid");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Configure Express to use EJS
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// MySQL Connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});






app.get("/", (req, res) => {
    const query = "SELECT * FROM urls ORDER BY created_at DESC LIMIT 10";
    db.query(query, (err, results) => {
      if (err) return res.status(500).send("Database error.");
      res.render("new", { shortUrl: null, urls: results,error: null,shortUrl: null, });
    });
  });






  
  
  



















app.get("/:shortUrl", (req, res) => {
  const shortUrl = req.params.shortUrl;

  const querySelect = "SELECT * FROM urls WHERE short_url = ?";
  db.query(querySelect, [shortUrl], (err, results) => {
    if (err) {
      console.error("Database SELECT error:", err.message);
      return res.status(500).send("Database error.");
    }

    // If the short URL exists, redirect to the original URL
    if (results.length > 0) {
      return res.redirect(results[0].original_url);
    }

    // If the short URL does not exist, show an error message
    res.status(404).send("Short URL not found.");
  });
});











//const baseUrl = "https://shorturl-b9s8.onrender.com"; // Base URL for short links
const baseUrl = "https://www.urlshortner.sbs"; // Base URL for short links









app.post("/shorten", (req, res) => {
  const originalUrl = req.body.originalUrl.trim();
  const customShortUrl = req.body.customShortUrl.trim();

  // Validate inputs
  if (!originalUrl) {
    return res.render("new", {
      shortUrl: null,
      error: "Please enter a valid original URL.",
    });
  }

  if (!customShortUrl) {
    return res.render("new", {
      shortUrl: null,
      error: "Short URL text is required.",
    });
  }

  // Check if the custom short URL already exists
  const queryCheckCustom = "SELECT * FROM urls WHERE short_url = ?";
  db.query(queryCheckCustom, [customShortUrl], (err, results) => {
    if (err) {
      console.error("Database SELECT error:", err.message);
      return res.render("new", {
        shortUrl: null,
        error: "Database error. Please try again later.",
      });
    }

    if (results.length > 0) {
      // If the custom short URL exists, update its original URL
      const queryUpdate = "UPDATE urls SET original_url = ? WHERE short_url = ?";
      db.query(queryUpdate, [originalUrl, customShortUrl], (err) => {
        if (err) {
          console.error("Database UPDATE error:", err.message);
          return res.render("new", {
            shortUrl: null,
            error: "Database error. Please try again later.",
          });
        }

        const fullShortUrl = `${baseUrl}/${customShortUrl}`;
        return res.render("new", {
          shortUrl: fullShortUrl,
          error: `The short URL text "${customShortUrl}" already existed and has been updated.`,
        });
      });
    } else {
      // If the custom short URL does not exist, insert a new entry
      const queryInsert = "INSERT INTO urls (original_url, short_url) VALUES (?, ?)";
      db.query(queryInsert, [originalUrl, customShortUrl], (err) => {
        if (err) {
          console.error("Database INSERT error:", err.message);
          return res.render("new", {
            shortUrl: null,
            error: "Database error. Please try again later.",
          });
        }

        const fullShortUrl = `${baseUrl}/${customShortUrl}`;
        return res.render("new", {
          shortUrl: fullShortUrl,
          error: null,
        });
      });
    }
  });
});
















// Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.listen(3000)
