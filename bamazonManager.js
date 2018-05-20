var inquirer = require("inquirer");
var showItems = require("./connection").showItems;
var endConnection = require("./connection").endConnection;
var viewLowInventory = require("./connection").viewLowInventory;
var addInventory = require("./connection").addInventory;
var addNewInventory = require("./connection").addNewInventory;

var bamazonManager ={
    showMenuConfirm: function(){
        inquirer.prompt([
            {
                name: "showMenuConfirm",
                type: "confirm",
                message: "Do you want to see Menu?"

            }
        ]).then(function(answer){
            if(answer.showMenuConfirm){
                bamazonManager.showMenu();
            }
            else{
                endConnection();
            }
        });
    },
    addExistedInventory: function(){
        inquirer.prompt([
            {
                name:"productID",
                type: "input",
                message: "Please, insert the product id which you want to add inventory."
            },
            {
                name:"quantityAdd",
                type: "input",
                message: "Please, insert the quantity of the product that want to add inventory."
            }

        ]).then(function(answer){
            addInventory(answer.productID,answer.quantityAdd);
            //this.showMenuConfirm();
        }).then(function(){
            bamazonManager.showMenuConfirm();
        });
        // this.showMenuConfirm();
    },
    addNewInventory: function(){
        inquirer.prompt([
            {
                name:"productName",
                type:"input",
                message:"Please, enter the name of product."
            },
            {
                name:"departmentName",
                type:"input",
                message:"Please, enter the name of department."
            },
            {
                name:"price",
                type:"input",
                message:"Please, enter the price of product."
            },
            {
                name:"stockQuantity",
                type:"input",
                message:"Please, enter the quantity of product."
            }
        ]).then(function(answer){
            addNewInventory(answer.productName,answer.departmentName,answer.price,answer.stockQuantity);
        }).then(function(){
            bamazonManager.showMenuConfirm();
        });
    },
    showMenu: function(){
        inquirer.prompt([
            {
                name:"menu",
                type:"list",
                choices: ["View Products for Sale", new inquirer.Separator(),
                         "View Low Inventory",new inquirer.Separator(),
                         "Add to Inventory",new inquirer.Separator(),
                        "Add New Product", new inquirer.Separator()],
                message: "Enter what are yougoing to do?"
                
            }
        ]).then(function(answer){
            switch(answer.menu){
                case "View Products for Sale":
                    showItems();
                    bamazonManager.showMenuConfirm();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    bamazonManager.showMenuConfirm();
                    breeak;
                case "Add to Inventory":
                    bamazonManager.addExistedInventory();
                    //bamazonManager.showMenuConfirm();
                    break;
                case "Add New Product":
                    bamazonManager.addNewInventory();
                    break;

            }
            
        
            
        });
    },


}

bamazonManager.showMenuConfirm();


