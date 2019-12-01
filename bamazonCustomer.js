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

showProducts();

function buyItem() {
    inquirer.prompt([
        {
            type: "input",
            name: "productId",
            message: "Enter the ID of the product you would like to buy:"
        },
        {
            type: "input",
            name: "productQuantity",
            message: "Enter the quantity to buy:"
        }
    ]).then(function (userInput) {
        purchaseProduct(parseInt(userInput.productId), parseInt(userInput.productQuantity));
    })
}


function showProducts() {

    // console.log("connected as id " + connection.threadId + "\n");

    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // console.log(res);
        console.log("Here are the available items:");
        res.forEach(item => console.log("Id: " + item.item_id + " | Product: " + item.product_name + " | Price: $" + item.price + " | Quantity: " + item.stock_quantity));

        buyItem();

    })

}