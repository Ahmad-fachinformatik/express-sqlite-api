const express = require("express");

const router = express.Router();

const database = require("../database");

router.get("/", function (request, response) {
    database.all("SELECT * FROM customers", function (error, rows) {
        if (error) {
            return response.status(500).send("Database error");
        }

        response.status(200).json(rows);
    });
});

router.post("/", function (request, response) {
    if (!request.body.name || !request.body.city) {
        return response.status(400).send("Name and city are required");
    }

    const sql = `
        INSERT INTO customers (name, city)
        VALUES (?, ?)
    `;

    const values = [
        request.body.name,
        request.body.city
    ];

    database.run(sql, values, function (error) {
        if (error) {
            return response.status(500).send("Database error");
        }

        const newCustomer = {
            id: this.lastID,
            name: request.body.name,
            city: request.body.city
        };

        response.status(201).json(newCustomer);
    });
});

router.get("/:id", function (request, response) {
    const id = Number(request.params.id);

    const sql = `
        SELECT * FROM customers
        WHERE id = ?
    `;

    database.get(sql, [id], function (error, row) {
        if (error) {
            return response.status(500).send("Database error");
        }

        if (!row) {
            return response.status(404).send("Customer not found");
        }

        response.status(200).json(row);
    });
});

router.put("/:id", function (request, response) {
    const id = Number(request.params.id);

    if (!request.body.name || !request.body.city) {
        return response.status(400).send("Name and city are required");
    }

    const sql = `
        UPDATE customers
        SET name = ?, city = ?
        WHERE id = ?
    `;

    const values = [
        request.body.name,
        request.body.city,
        id
    ];

    database.run(sql, values, function (error) {
        if (error) {
            return response.status(500).send("Database error");
        }

        if (this.changes === 0) {
            return response.status(404).send("Customer not found");
        }

        const updatedCustomer = {
            id: id,
            name: request.body.name,
            city: request.body.city
        };

        response.status(200).json(updatedCustomer);
    });
});

router.delete("/:id", function (request, response) {
    const id = Number(request.params.id);

    const sql = `
        DELETE FROM customers
        WHERE id = ?
    `;

    database.run(sql, [id], function (error) {
        if (error) {
            return response.status(500).send("Database error");
        }

        if (this.changes === 0) {
            return response.status(404).send("Customer not found");
        }

        response.status(200).send("Customer deleted");
    });
});

module.exports = router;