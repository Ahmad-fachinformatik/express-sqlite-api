const sqlite3 = require("sqlite3").verbose();

const database = new sqlite3.Database("database.sqlite", function (error) {
    if (error) {
        console.log("Database connection error");
        console.log(error.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

database.run(`
    CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        city TEXT NOT NULL
    )
`, function (error) {
    if (error) {
        console.log("Error creating customers table");
        console.log(error.message);
    } else {
        console.log("Customers table is ready");
    }
});

database.run(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL
    )
`, function (error) {
    if (error) {
        console.log("Error creating products table");
        console.log(error.message);
    } else {
        console.log("Products table is ready");
    }
});

module.exports = database;