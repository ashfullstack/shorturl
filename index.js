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

// Home Route (Render form for URL shortening)
// app.get("/", (req, res) => {
//   const query = "SELECT * FROM urls ORDER BY created_at DESC LIMIT 10";
//   db.query(query, (err, results) => {
//     if (err) return res.status(500).send("Database error.");
//     res.render("index", { urls: results });
//   });

// });




app.get("/", (req, res) => {
    const query = "SELECT * FROM urls ORDER BY created_at DESC LIMIT 10";
    db.query(query, (err, results) => {
      if (err) return res.status(500).send("Database error.");
      res.render("new", { shortUrl: null, urls: results,error: null,shortUrl: null, });
    });
  });




// Shorten URL
// app.post("/shorten", (req, res) => {
//   const originalUrl = req.body.originalUrl;
//   if (!originalUrl) return res.redirect("/");

//   const shortUrl = shortid.generate();
//   const query = "INSERT INTO urls (original_url, short_url) VALUES (?, ?)";
//   db.query(query, [originalUrl, shortUrl], (err) => {
//     if (err) return res.status(500).send("Database error.");
//     res.redirect("/");
//   });
// });

// app.post("/shorten", (req, res) => {
//     const originalUrl = req.body.originalUrl;
//     const customShortUrl = req.body.customShortUrl.trim();
  
//     if (!originalUrl) return res.redirect("/");
  
//     // Validate user-provided short URL or generate one
//     const shortUrl = customShortUrl || shortid.generate();
  
//     // Check if the custom short URL already exists
//     const queryCheck = "SELECT * FROM urls WHERE short_url = ?";
//     db.query(queryCheck, [shortUrl], (err, results) => {
//       if (err) return res.status(500).send("Database error.");
//       if (results.length > 0) {
//         return res.send("The preferred short URL is already taken. Please choose another.");
//       }
  
//       // Insert the new short URL
//       const queryInsert = "INSERT INTO urls (original_url, short_url) VALUES (?, ?)";
//       db.query(queryInsert, [originalUrl, shortUrl], (err) => {
//         if (err) return res.status(500).send("Database error.");
//         res.redirect("/");
//       });
//     });
//   });





// app.post("/shorten", (req, res) => {
//     const originalUrl = req.body.originalUrl;
//     const customShortUrl = req.body.customShortUrl.trim();
  
//     if (!originalUrl) return res.redirect("/");
  
//     const shortUrl = customShortUrl || shortid.generate();
  
//     const queryCheck = "SELECT * FROM urls WHERE short_url = ?";
//     db.query(queryCheck, [shortUrl], (err, results) => {
//       if (err) return res.status(500).send("Database error.");
//       if (results.length > 0) {
//         return res.send("The preferred short URL is already taken. Please choose another.");
//       }
  
//       const queryInsert = "INSERT INTO urls (original_url, short_url) VALUES (?, ?)";
//       db.query(queryInsert, [originalUrl, shortUrl], (err) => {
//         if (err) return res.status(500).send("Database error.");
//         res.render("index", { shortUrl, urls: [] });
//       });
//     });
//   });


// Use environment variable for production, fallback to localhost during development
// const baseUrl = process.env.BASE_URL || "http://localhost:3000";

// app.post("/shorten", (req, res) => {
//   const originalUrl = req.body.originalUrl;
//   const customShortUrl = req.body.customShortUrl.trim();

//   if (!originalUrl) return res.redirect("/");

//   const shortUrl = customShortUrl || shortid.generate();

//   // Check for conflicts and store in the database
//   const queryCheck = "SELECT * FROM urls WHERE short_url = ?";
//   db.query(queryCheck, [shortUrl], (err, results) => {
//     if (err) return res.status(500).send("Database error.");
//     if (results.length > 0) {
//       return res.send("The preferred short URL is already taken. Please choose another.");
//     }

//     // Save to database
//     const queryInsert = "INSERT INTO urls (original_url, short_url) VALUES (?, ?)";
//     db.query(queryInsert, [originalUrl, shortUrl], (err) => {
//       if (err) return res.status(500).send("Database error.");

//       // Render form with full short URL
//       res.render("index", { shortUrl: `${baseUrl}/${shortUrl}`, urls: [] });
//     });
//   });
// });

  
  
  

// app.get("/:shortUrl", (req, res) => {
//   const shortUrl = req.params.shortUrl;

//   // Look up the original URL from the database
//   const query = "SELECT original_url FROM urls WHERE short_url = ?";
//   db.query(query, [shortUrl], (err, results) => {
//     if (err) return res.status(500).send("Database error.");
//     if (results.length === 0) return res.status(404).send("Short URL not found.");

//     // Redirect to the original URL
//     res.redirect(results[0].original_url);
//   });
// });






// Dynamically set the base URL
// const baseUrl = process.env.BASE_URL || "http://localhost:3000";


// app.post("/shorten", (req, res) => {
//   const originalUrl = req.body.originalUrl;
//   const customShortUrl = req.body.customShortUrl.trim();

//   if (!originalUrl) return res.redirect("/");

//   const shortUrl = customShortUrl || shortid.generate();

//   const queryCheck = "SELECT * FROM urls WHERE short_url = ?";
//   db.query(queryCheck, [shortUrl], (err, results) => {
//     if (err) return res.status(500).send("Database error.");
//     {

    

//     const queryInsert = "INSERT INTO urls (original_url, short_url) VALUES (?, ?)";
//     db.query(queryInsert, [originalUrl, shortUrl], (err) => {
//       if (err) return res.status(500).send("Database error.");

//       res.render("index", { shortUrl: `${baseUrl}/${shortUrl}`, urls: [] });
//     });
//   }
//   });
// });











// app.get("/:shortUrl", (req, res) => {
//   const shortUrl = req.params.shortUrl;

//   // Look up the original URL from the database
//   const query = "SELECT original_url FROM urls WHERE short_url = ?";
//   db.query(query, [shortUrl], (err, results) => {
//     if (err) return res.status(500).send("Database error.");
//     if (results.length === 0) return res.status(404).send("Short URL not found.");

//     // Redirect to the original URL
//     res.redirect(results[0].original_url);
//   });
// });



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








// app.post("/shorten", (req, res) => {
//   const originalUrl = req.body.originalUrl;
//   const customShortUrl = req.body.customShortUrl.trim();

//   if (!originalUrl) return res.redirect("/");

//   let shortUrl = customShortUrl || shortid.generate();

//   const queryCheck = "SELECT * FROM urls WHERE short_url = ?";
//   db.query(queryCheck, [shortUrl], (err, results) => {
//     if (err) {
//       console.error("Error during SELECT query:", err.message);
//       return res.status(500).send("Database error.");
//     }

   
//     if (results.length > 0) {
//       shortUrl = shortid.generate();
//       console.log("Custom short URL taken. Generated new short URL:", shortUrl);
//     }

   
//     const queryInsert = "INSERT INTO urls (original_url, short_url) VALUES (?, ?)";
//     db.query(queryInsert, [originalUrl, shortUrl], (err) => {
//       if (err) {
//         console.error("Error during INSERT query:", err.message);
//         return res.status(500).send("Database error.");
//       }

//       res.render("index", { shortUrl: `${baseUrl}/${shortUrl}`, urls: [], error: null });
//     });
//   });
// });




const baseUrl = "https://shorturl-b9s8.onrender.com"; // Base URL for short links

// app.post("/shorten", (req, res) => {
//   const originalUrl = req.body.originalUrl;
//   const customShortUrl = req.body.customShortUrl.trim();

//   if (!originalUrl) return res.redirect("/");

  
//   let shortUrl = customShortUrl || shortid.generate();

//   const queryCheck = "SELECT * FROM urls WHERE short_url = ?";
//   db.query(queryCheck, [shortUrl], (err, results) => {
//     if (err) {
//       console.error("Database SELECT error:", err.message);
//       return res.status(500).send("Database error.");
//     }

    
//     if (results.length > 0) {
//       return res.render("new", {
//         shortUrl: null,
//         error: `The short URL "${shortUrl}" is already taken. Please choose a different one.`,
//       });
//     }

   
//     const queryInsert = "INSERT INTO urls (original_url, short_url) VALUES (?, ?)";
//     db.query(queryInsert, [originalUrl, shortUrl], (err) => {
//       if (err) {
//         console.error("Database INSERT error:", err.message);
//         return res.status(500).send("Database error.");
//       }

      
//       const fullShortUrl = `${baseUrl}/${shortUrl}`;
//       res.render("new", { shortUrl: fullShortUrl, error: null });
//     });
//   });
// });





















// app.post("/shorten", (req, res) => {
//   const originalUrl = req.body.originalUrl;
//   const customShortUrl = req.body.customShortUrl.trim();

//   if (!originalUrl) {
//     return res.render("new", {
//       shortUrl: null,
//       error: "Please enter a valid original URL.",
//     });
//   }

//   if (!customShortUrl) {
//     return res.render("new", {
//       shortUrl: null,
//       error: "Short URL text is required.",
//     });
//   }

  
//   const queryCheckCustom = "SELECT * FROM urls WHERE short_url = ?";
//   db.query(queryCheckCustom, [customShortUrl], (err, results) => {
//     if (err) {
//       console.error("Database SELECT error:", err.message);
//       return res.render("new", {
//         shortUrl: null,
//         error: "Database error. Please try again later.",
//       });
//     }

//     if (results.length > 0) {
      
//       return res.render("new", {
//         shortUrl: null,
//         error: `The short URL "${customShortUrl}" is already taken. Please choose a different one.`,
//       });
//     }

    
//     const queryInsert = "INSERT INTO urls (original_url, short_url) VALUES (?, ?)";
//     db.query(queryInsert, [originalUrl, customShortUrl], (err) => {
//       if (err) {
//         console.error("Database INSERT error:", err.message);
//         return res.render("new", {
//           shortUrl: null,
//           error: "Database error. Please try again later.",
//         });
//       }

     
//       const fullShortUrl = `${baseUrl}/${customShortUrl}`;
//       res.render("new", {
//         shortUrl: fullShortUrl,
//         error: null,
//       });
//     });
//   });
// });










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
        return res.render("/", {
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
