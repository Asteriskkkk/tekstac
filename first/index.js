let customers = [];

const form = document.getElementById("customerForm");
const tableBody = document.getElementById("customerTable");
const clearBtn = document.getElementById("clearBtn");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const customer = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        age: document.getElementById("age").value,
        height: document.getElementById("height").value,
        weight: document.getElementById("weight").value
    };

    customers.push(customer);

    displayCustomers();

    form.reset();
});

function displayCustomers() {

    tableBody.innerHTML = "";

    customers.forEach(function(customer) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.age}</td>
            <td>${customer.height}</td>
            <td>${customer.weight}</td>
        `;

        tableBody.appendChild(row);
    });
}

clearBtn.addEventListener("click", function() {
    form.reset();
});