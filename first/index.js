// Global array to store customers
let customers = [];

const form = document.getElementById("customerForm");
const tableBody = document.getElementById("customerTable");
const clearBtn = document.getElementById("clearBtn");


// Handle form submission
form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Create customer object
    const customer = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        age: document.getElementById("age").value,
        height: document.getElementById("height").value,
        weight: document.getElementById("weight").value
    };

    // Add customer to array
    customers.push(customer);

    // Display customers
    displayCustomers();

    // Clear form
    form.reset();
});


// Display customers in table
function displayCustomers() {

    tableBody.innerHTML = "";

    customers.forEach(function(customer) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.age}</td>
            <td>${customer.height}</td>
            <td>${customer.weight}</td>
        `;

        tableBody.appendChild(row);
    });
}


// Clear button
clearBtn.addEventListener("click", function() {
    form.reset();
});