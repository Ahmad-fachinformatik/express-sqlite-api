const loadCustomersButton = document.getElementById("loadCustomersButton");
const customersResult = document.getElementById("customersResult");

const customerNameInput = document.getElementById("customerNameInput");
const customerCityInput = document.getElementById("customerCityInput");
const addCustomerButton = document.getElementById("addCustomerButton");
const customerMessage = document.getElementById("customerMessage");

const loadProductsButton = document.getElementById("loadProductsButton");
const productsResult = document.getElementById("productsResult");

const productNameInput = document.getElementById("productNameInput");
const productPriceInput = document.getElementById("productPriceInput");
const addProductButton = document.getElementById("addProductButton");
const productMessage = document.getElementById("productMessage");


function clearCustomerMessage() {
    customerMessage.innerHTML = "";
    customerMessage.className = "";
}

function clearProductMessage() {
    productMessage.innerHTML = "";
    productMessage.className = "";
}

function showMessage(element, message, className) {
    element.innerHTML = message;
    element.className = className;
}


function createCustomerHTML(customer) {
    return `
        <div class="item">
            <strong>${customer.name}</strong><br>
            City: ${customer.city}<br>

            <button class="delete-button" type="button" onclick="deleteCustomer(${customer.id})">
                Delete Customer
            </button>
        </div>
    `;
}

function createProductHTML(product) {
    return `
        <div class="item">
            <strong>${product.name}</strong><br>
            Price: ${product.price}<br>

            <button class="delete-button" type="button" onclick="deleteProduct(${product.id})">
                Delete Product
            </button>
        </div>
    `;
}


function deleteCustomer(id) {
    clearProductMessage();

    const confirmed = confirm("Are you sure you want to delete this customer?");

    if (!confirmed) {
        return;
    }

    console.log("Deleting customer with id:", id);

    fetch("http://localhost:3000/customers/" + id, {
        method: "DELETE"
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not delete customer");
            }

            return response.json();
        })
        .then(function (result) {
            console.log(result);

            showMessage(customerMessage, "Customer deleted successfully", "success-message");

            loadCustomers();
        })
        .catch(function (error) {
            console.log(error.message);

            showMessage(customerMessage, "Could not delete customer", "error-message");
        });
}

function deleteProduct(id) {
    clearCustomerMessage();

    const confirmed = confirm("Are you sure you want to delete this product?");

    if (!confirmed) {
        return;
    }

    console.log("Deleting product with id:", id);

    fetch("http://localhost:3000/products/" + id, {
        method: "DELETE"
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not delete product");
            }

            return response.json();
        })
        .then(function (result) {
            console.log(result);

            showMessage(productMessage, "Product deleted successfully", "success-message");

            loadProducts();
        })
        .catch(function (error) {
            console.log(error.message);

            showMessage(productMessage, "Could not delete product", "error-message");
        });
}


addCustomerButton.addEventListener("click", function () {
    clearProductMessage();

    console.log("Add customer button clicked");

    const name = customerNameInput.value.trim();
    const city = customerCityInput.value.trim();

    if (name === "") {
        showMessage(customerMessage, "Customer name is required", "error-message");
        return;
    }

    if (city === "") {
        showMessage(customerMessage, "Customer city is required", "error-message");
        return;
    }

    showMessage(customerMessage, "Adding customer...", "loading-message");

    fetch("http://localhost:3000/customers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            city: city
        })
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not add customer");
            }

            return response.json();
        })
        .then(function (newCustomer) {
            console.log(newCustomer);

            showMessage(customerMessage, "Customer added successfully", "success-message");

            customersResult.innerHTML = createCustomerHTML(newCustomer);

            customerNameInput.value = "";
            customerCityInput.value = "";
        })
        .catch(function (error) {
            console.log(error.message);

            showMessage(customerMessage, "Could not add customer", "error-message");
        });
});


addProductButton.addEventListener("click", function () {
    clearCustomerMessage();

    console.log("Add product button clicked");

    const name = productNameInput.value.trim();
    const price = Number(productPriceInput.value);

    if (name === "") {
        showMessage(productMessage, "Product name is required", "error-message");
        return;
    }

    if (productPriceInput.value.trim() === "") {
        showMessage(productMessage, "Product price is required", "error-message");
        return;
    }

    if (isNaN(price)) {
        showMessage(productMessage, "Product price must be a number", "error-message");
        return;
    }

    if (price < 0) {
        showMessage(productMessage, "Product price must be greater than or equal to 0", "error-message");
        return;
    }

    showMessage(productMessage, "Adding product...", "loading-message");

    fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            price: price
        })
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not add product");
            }

            return response.json();
        })
        .then(function (newProduct) {
            console.log(newProduct);

            showMessage(productMessage, "Product added successfully", "success-message");

            productsResult.innerHTML = createProductHTML(newProduct);

            productNameInput.value = "";
            productPriceInput.value = "";
        })
        .catch(function (error) {
            console.log(error.message);

            showMessage(productMessage, "Could not add product", "error-message");
        });
});


function loadCustomers() {
    clearProductMessage();

    console.log("Loading customers");

    customersResult.innerHTML = "Loading customers...";

    fetch("http://localhost:3000/customers")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not load customers");
            }

            return response.json();
        })
        .then(function (customers) {
            customersResult.innerHTML = "";

            if (customers.length === 0) {
                customersResult.innerHTML = "No customers found";
                return;
            }

            customers.forEach(function (customer) {
                customersResult.innerHTML += createCustomerHTML(customer);
            });
        })
        .catch(function (error) {
            console.log(error.message);

            customersResult.innerHTML = "Could not load customers";
        });
}

loadCustomersButton.addEventListener("click", function () {
    loadCustomers();
});


function loadProducts() {
    clearCustomerMessage();

    console.log("Loading products");

    productsResult.innerHTML = "Loading products...";

    fetch("http://localhost:3000/products")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not load products");
            }

            return response.json();
        })
        .then(function (products) {
            productsResult.innerHTML = "";

            if (products.length === 0) {
                productsResult.innerHTML = "No products found";
                return;
            }

            products.forEach(function (product) {
                productsResult.innerHTML += createProductHTML(product);
            });
        })
        .catch(function (error) {
            console.log(error.message);

            productsResult.innerHTML = "Could not load products";
        });
}

loadProductsButton.addEventListener("click", function () {
    loadProducts();
});