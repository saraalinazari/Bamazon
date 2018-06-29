var showItems = require('./connection').showItems;
var selectByID = require('./connection').selectByID;
var endConnection= require('./connection').endConnection;
var inquirer = require('inquirer');
var buyingProcess={
    quantityReq:0,
    productID:0,
    showAll: function(){
        showItems();
        
    },
    getInput: function(){
        inquirer.prompt([
            {
                name:"productID",
               message:"Please, enter your favorite product id?",
               type: "input"
           },
           {
               name:"quantity",
               message:"Please, enter your how many items do you want to buy?",
               type: "input"
           }
       ]).then(function(answer){
         
           buyingProcess.productID = answer.productID;
        
           buyingProcess.quantityReq = answer.quantity;
          
           buyingProcess.checkavailability();
       });
    },
    checkavailability: function(){
        
        var product;
        product =selectByID(this.productID,this.quantityReq);
       
        
    }
}
buyingProcess.showAll();

buyingProcess.getInput();
 