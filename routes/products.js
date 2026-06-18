const express = require("express");

const router = express.Router();

const database = require("../database");

router.get("/", function (request, response) {
    database.all("SELECT * FROM products", function (error, rows) {
        if (error) {
            return response.status(500).send("Database error");
        }

        response.status(200).json(rows);
    });
});

router.post("/", function (request, response) {
    if (!request.body.name || request.body.price === undefined) {
        return response.status(400).send("Name and price are required");
    }

    const sql = `
        INSERT INTO products (name, price)
        VALUES (?, ?)
    `;

    const values = [
        request.body.name,
        request.body.price
    ];

    database.run(sql, values, function (error) {
        if (error) {
            return response.status(500).send("Database error");
        }

        const newProduct = {
            id: this.lastID,
            name: request.body.name,
            price: request.body.price
        };

        response.status(201).json(newProduct);
    });
});

router.get("/:id", function (request, response) {
    const id = Number(request.params.id);

    const sql = `
        SELECT * FROM products
        WHERE id = ?
    `;

    database.get(sql, [id], function (error, row) {
        if (error) {
            return response.status(500).send("Database error");
        }

        if (!row) {
            return response.status(404).send("Product not found");
        }

        response.status(200).json(row);
    });
});

router.put("/:id", function (request, response) {
    const id = Number(request.params.id);

    if (!request.body.name || request.body.price === undefined) {
        return response.status(400).send("Name and price are required");
    }

    const sql = `
        UPDATE products
        SET name = ?, price = ?
        WHERE id = ?
    `;

    const values = [
        request.body.name,
        request.body.price,
        id
    ];

    database.run(sql, values, function (error) {
        if (error) {
            return response.status(500).send("Database error");
        }

        if (this.changes === 0) {
            return response.status(404).send("Product not found");
        }

        const updatedProduct = {
            id: id,
            name: request.body.name,
            price: request.body.price
        };

        response.status(200).json(updatedProduct);
    });
});

router.delete("/:id", function (request, response) {
    const id = Number(request.params.id);

    const sql = `
        DELETE FROM products
        WHERE id = ?
    `;

    database.run(sql, [id], function (error) {
        if (error) {
            return response.status(500).send("Database error");
        }

        if (this.changes === 0) {
            return response.status(404).send("Product not found");
        }

        response.status(200).send("Product deleted");
    });
});

module.exports = router;