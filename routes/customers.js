const express = require("express");

const router = express.Router();

const database = require("../database");

function validateCustomer(body) {
    if (!body.name || body.name.trim() === "") {
        return "Customer name is required";
    }

    if (!body.city || body.city.trim() === "") {
        return "Customer city is required";
    }

    return null;
}

router.get("/", function (request, response) {
    database.all("SELECT * FROM customers", function (error, rows) {
        if (error) {
            return response.status(500).json({
                error: "Database error"
            });
        }

        response.status(200).json(rows);
    });
});

router.post("/", function (request, response) {
    const validationError = validateCustomer(request.body);

    if (validationError) {
        return response.status(400).json({
            error: validationError
        });
    }

    const sql = `
        INSERT INTO customers (name, city)
        VALUES (?, ?)
    `;

    const values = [
        request.body.name.trim(),
        request.body.city.trim()
    ];

    database.run(sql, values, function (error) {
        if (error) {
            return response.status(500).json({
                error: "Database error"
            });
        }

        const newCustomer = {
            id: this.lastID,
            name: request.body.name.trim(),
            city: request.body.city.trim()
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
            return response.status(500).json({
                error: "Database error"
            });
        }

        if (!row) {
            return response.status(404).json({
                error: "Customer not found"
            });
        }

        response.status(200).json(row);
    });
});

router.put("/:id", function (request, response) {
    const id = Number(request.params.id);

    const validationError = validateCustomer(request.body);

    if (validationError) {
        return response.status(400).json({
            error: validationError
        });
    }

    const sql = `
        UPDATE customers
        SET name = ?, city = ?
        WHERE id = ?
    `;

    const values = [
        request.body.name.trim(),
        request.body.city.trim(),
        id
    ];

    database.run(sql, values, function (error) {
        if (error) {
            return response.status(500).json({
                error: "Database error"
            });
        }

        if (this.changes === 0) {
            return response.status(404).json({
                error: "Customer not found"
            });
        }

        const updatedCustomer = {
            id: id,
            name: request.body.name.trim(),
            city: request.body.city.trim()
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
            return response.status(500).json({
                error: "Database error"
            });
        }

        if (this.changes === 0) {
            return response.status(404).json({
                error: "Customer not found"
            });
        }

        response.status(200).json({
            message: "Customer deleted"
        });
    });
});

module.exports = router;