const express = require("express");

const router = express.Router();

const database = require("../database");

function validateProduct(body) {
    if (!body.name || body.name.trim() === "") {
        return "Product name is required";
    }

    if (body.price === undefined) {
        return "Product price is required";
    }

    if (typeof body.price !== "number") {
        return "Product price must be a number";
    }

    if (body.price < 0) {
        return "Product price must be greater than or equal to 0";
    }

    return null;
}

router.get("/", function (request, response) {
    database.all("SELECT * FROM products", function (error, rows) {
        if (error) {
            return response.status(500).send("Database error");
        }

        response.status(200).json(rows);
    });
});

router.post("/", function (request, response) {
    const validationError = validateProduct(request.body);

    if (validationError) {
        return response.status(400).send(validationError);
    }

    const sql = `
        INSERT INTO products (name, price)
        VALUES (?, ?)
    `;

    const values = [
        request.body.name.trim(),
        request.body.price
    ];

    database.run(sql, values, function (error) {
        if (error) {
            return response.status(500).send("Database error");
        }

        const newProduct = {
            id: this.lastID,
            name: request.body.name.trim(),
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

    const validationError = validateProduct(request.body);

    if (validationError) {
        return response.status(400).send(validationError);
    }

    const sql = `
        UPDATE products
        SET name = ?, price = ?
        WHERE id = ?
    `;

    const values = [
        request.body.name.trim(),
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
            name: request.body.name.trim(),
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