var showItems = require('./connection').showItems;
var selectByID = require('./connection').selectByID;
var endConnection= require('./connection').endConnection;
var inquirer = require('inquirer');
var buyingProcess={
    quantityReq:0,
    productID:0,
    showAll: function(){
        showItems();
        //buyingProcess.getInput();
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
          // console.log("hhgh");
          // console.log(answer);
           buyingProcess.productID = answer.productID;
         //  console.log(buyingProcess.productID);
           buyingProcess.quantityReq = answer.quantity;
          // console.log(buyingProcess.quantityReq);
           buyingProcess.checkavailability();
       });//  console.log("in getinput");
    },
    checkavailability: function(){
        
        var product;
        product =selectByID(this.productID,this.quantityReq);
       // endConnection();
       // console.log("in checkavailablity");
       // var availableQuantity = product.stock_quantity;
        // console.log("in check*****");
        // console.log(product);
       // console.log(availableQuantity);
        
    }
}
buyingProcess.showAll();
//showItems();
// var getinput = showItems();
// if(getinput){
//     console.log(getinput.toString());
// //setTimeout(buyingProcess.getInput, 1000);
buyingProcess.getInput();
 //}

//console.log("after input");
//buyingProcess.checkavailability();
