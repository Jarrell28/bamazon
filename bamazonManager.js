var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
});

choices();

function choices() {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
            message: "What do you want to do?"
        }
    ]).then(function (choice) {
        switch (choice.options) {
            case "View Products for Sale":
                showProducts();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                newProduct();
                break;
            case "Exit":
                console.log("Exited Program");
                process.exit();
                break;

        }
    })
}

function showProducts() {

    // console.log("connected as id " + connection.threadId + "\n");

    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // console.log(res);
        console.log("Here are the available items:");
        res.forEach(item => console.log("Id: " + item.item_id + " | Product: " + item.product_name + " | Price: $" + item.price + " | Quantity: " + item.stock_quantity));

        choices();
    })
}

function lowInventory() {
    var query = connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;

        res.forEach(item => console.log("Id: " + item.item_id + " | Product: " + item.product_name + " | Price: $" + item.price + " | Quantity: " + item.stock_quantity));

        choices();

    })
}

function addToInventory() {
    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // console.log(res);
        console.log("Here are the available items:");
        res.forEach(item => console.log("Id: " + item.item_id + " | Product: " + item.product_name + " | Price: $" + item.price + " | Quantity: " + item.stock_quantity));



        inquirer.prompt([
            {
                name: "product",
                type: "input",
                message: "Select ID of product"
            },
            {
                name: "quantity",
                type: "input",
                message: "Enter new quantity"
            }
        ]).then(function (input) {
            var id = parseInt(input.product);
            var quantity = parseInt(input.quantity);

            var query2 = connection.query("UPDATE products SET ? WHERE ?", [
                {
                    stock_quantity: quantity
                },
                {
                    item_id: id
                }
            ], function (err, res) {
                if (err) throw err;
                console.log("Updated Product Quantity");
                choices();
            })
        })
    })

}

function newProduct() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter name of product"
        },
        {
            name: "department",
            type: "input",
            message: "Enter Department"
        },
        {
            name: "price",
            type: "input",
            message: "Enter Price"
        },
        {
            name: "quantity",
            type: "input",
            message: "Enter Quantity"
        }
    ]).then(function (product) {
        var price = parseInt(product.price);
        var quantity = parseInt(product.quantity);
        var product = { product_name: product.name, department_name: product.department, price, stock_quantity: quantity };
        var query = connection.query("INSERT INTO products SET ?", product, function (err, res) {
            if (err) throw err;

            console.log("Product Added");
            choices();
        })
    })
}