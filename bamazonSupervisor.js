var inquirer = require('inquirer');
var productSalesByDepartments = require("./connection").productSalesByDepartments;
var endConnection =require("./connection").endConnection;
var newDepartment = require("./connection").newDepartment;
var bamazonSupervisor={
    insertDepartmentInfo: function(){
        inquirer.prompt([
            {
                name:"departmentName",
                type: "input",
                message: "Please, enter your department name."
            },
            {
                name:"overHeadCosts",
                type: "input",
                message: "Please, enter your department costs."
            }
        ]).then(function(answer){
            var departmentName = answer.departmentName;
            var overHeadCosts = answer.overHeadCosts;
            newDepartment(departmentName,overHeadCosts);
            
        }).then(function(){
            bamazonSupervisor.showMenu();
        });
    },
    
    showMenu: function(){
        inquirer.prompt([
            {
                name:"whattodo",
                type: "list",
                choices: ["View Product Sales by Department", new inquirer.Separator(),
                            "Create New Department", new inquirer.Separator(),
                        "Finish", new inquirer.Separator()],
                message:"what do you want to do?"

            }
        ]).then(function(answer){
            switch(answer.whattodo){
                case "View Product Sales by Department":
                    console.log(answer.whattodo);
                    productSalesByDepartments();
                   
                    bamazonSupervisor.showMenu();
                   
                    break;
                case "Create New Department":
                    bamazonSupervisor.insertDepartmentInfo();
                    
                    break;
                case "Finish":
                    endConnection();
                    break;

            
            }
        
        });
        
    }
}
bamazonSupervisor.showMenu();