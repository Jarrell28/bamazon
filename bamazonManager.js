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