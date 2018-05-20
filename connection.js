var mysql = require("mysql");
var Table = require('cli-table'); 
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Mnis!103666",
  database: "bamazon"
});
   
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});
var product={
    price:0,
    quantity:0
}
function showItems(){
   // console.log("Selecting all products...\n");
    console.log("\n\n You can see th elist of all items below:")   
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        var table = new Table({
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                   , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                   , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                   , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
            });
          table.push([" item_id", "product_name","department_name","price","stock_quantity","product_sales"]);
    // Log all results of the SELECT statement
        for(var i=0;i<res.length;i++){
            var sales=0;
            if(res[i].product_sales){
                var sales = res[i].product_sales;
            }
            else{
                sales = 0;
            }
            var itemID = res[i].item_id.toString();
            table.push([res[i].item_id.toString(), res[i].product_name.toString(), res[i].department_name.toString(),res[i].price.toString(), res[i].stock_quantity.toString(),sales]);
           
        }    
        //return table.toString();
   // console.log(res);
   console.log("\n\n");
    console.log(table.toString());
       // console.log("end of select"); 
  }); //console.log("end of connection1");
  //console.log("end of connection2");
  
  
}
function selectByID(productID,quantityReq){
    var price=0;
    var quantity=0;
    var id=0;
    var productSales = 0;
    var productSalesTemp=0;
   // console.log("productID: "+ productID);
    connection.query(
        "SELECT * FROM products WHERE ?",
        { item_id: productID },
        function(err, res) {
         //   console.log("in select bu id");
         // console.log(res);
          // Call readProducts AFTER the DELETE completes
          //readProducts();
       price=res[0].price ;
       quantity = res[0].stock_quantity;
       productSales= res[0].product_sales;
       
       id=res[0].item_id;
         // console.log("product.price1"+price);
        //   product.quantity = res[0].stock_quantity;
        if(quantity >= quantityReq){
            var remainInventory = quantity - quantityReq;
            var priceF = parseFloat(price);
            var quantityR=parseFloat(quantityReq);
            var productSalsF=parseFloat(productSales);
            productSalesTemp =(price *quantityReq)+productSales;
            // console.log("product.price2"+price);
            // console.log("product.id"+id);
            // console.log("remainInventory"+remainInventory);
            // console.log("productSalesTemp**** "+productSalesTemp);
            updateQuantity(remainInventory,id,parseFloat(productSalesTemp) );
            issueBill(parseFloat( quantityReq ), parseFloat(price));
            endConnection();////ino ezafe kardam ==> test bamazonCustomer

        }
        else{
            console.log("insufficient inventory");
        }
        }
      );
      
      
      //console.log("product****");
     // console.log(product.quantity);
     
      return product;
}
function updateQuantity(newInventory,id,productSalesTemp){
  //  console.log("productSalesTemp>>>>>> "+productSalesTemp);
  //  console.log("newInventory",newInventory);
   connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newInventory,
            product_sales: productSalesTemp
          },
          {
            item_id: id
          }
        ],
        function(err, res) {
            console.log('Thank you for your purchase!');
          //console.log(res.affectedRows + " products updated!\n");
          // Call deleteProduct AFTER the UPDATE completes
          //deleteProduct();
         // endConnection();
        }
      );
     
      // logs the actual query being run
      //console.log(query.sql);
}
function updateQuantityByManager(newInventory,id){
    console.log("newInventory",newInventory);
   connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newInventory
          },
          {
            item_id: id
          }
        ],
        function(err, res) {
           // console.log('Thank you for updating!');
          //console.log(res.affectedRows + " products updated!\n");
          // Call deleteProduct AFTER the UPDATE completes
          //deleteProduct();
         // endConnection();
        }
      );
     
      // logs the actual query being run
      //console.log(query.sql);
}
function issueBill(quantity,price){
    var total = parseFloat(quantity) *parseFloat(price) ;
    console.log("price in bill:************ "+price+"******************");
    console.log("quantity in bill:************ "+quantity+"****************");
    console.log("your total is: "+total);
}
function endConnection(){
    connection.end();
}
function viewLowInventory(){
    let query = "SELECT * FROM products WHERE stock_quantity<5";
    connection.query(
        query,
        function(err, res) {
            var table = new Table({
                chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                       , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                       , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                       , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                });
              table.push([" item_id", "product_name","department_name","price","stock_quantity","product_sales"]);
        // Log all results of the SELECT statement
            for(var i=0;i<res.length;i++){
                var sales=0;
                if(res[i].product_sales){
                    var sales = res[i].product_sales;
                }
                else{
                    sales = 0;
                }
                var itemID = res[i].item_id.toString();
                table.push([res[i].item_id.toString(), res[i].product_name.toString(), res[i].department_name.toString(),res[i].price.toString(), res[i].stock_quantity.toString(),sales]);
               
            }    
            //return table.toString();
       // console.log(res);
       console.log("\n\n");
        console.log(table.toString());
         // console.log(res);
        //   var element=0;
        //   //foreach(var element in res){
        //     for(element=0;element<res.length;element++){
        //         console.log("Product id: "+ res[element].item_id+"Product Name: "+res[element].product_name+
        //                     "department_name: "+res[element].department_name+
        //                     "price: "+res[element].price+
        //                     "stock_quantity"+res[element].stock_quantity);
        //         console.log("-------------------------------------");
        //     }
          
    //    price=res[0].price ;
    //    quantity = res[0].stock_quantity;
    //    id=res[0].item_id;
    //       console.log("product.price1"+price);
        //   product.quantity = res[0].stock_quantity;
        
        }
      );
}
function addInventory(productID,productQuantity){
    
      // logs the actual query being run
    console.log("productID: ",productID);
    console.log("productQuantity: ",productQuantity);
    var totalquantity=0;
    connection.query(
        "SELECT * FROM products WHERE ?",
        { item_id: productID },
        function(err, res) {
         //   console.log("in select bu id");
          //console.log(res);
          // Call readProducts AFTER the DELETE completes
          //readProducts();
       //price=res[0].price ;
       totalquantity =parseInt(res[0].stock_quantity) +parseInt(productQuantity) ;
       updateQuantityByManager(totalquantity,productID);
       //id=res[0].item_id;
          //console.log("totalquantity"+totalquantity);
        } 
      );
 
}
function addNewInventory(productName,departmentName,price,stockQuantity){
    connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: productName,
          department_name: departmentName,
          price: price,
          stock_quantity: stockQuantity
        },
        function(err, res) {
          console.log(res.affectedRows + " product inserted!\n");
          // Call updateProduct AFTER the INSERT completes
          //updateProduct();
        }
      );
    
      // logs the actual query being run
      //console.log(query.sql);

}
function productSalesByDepartments(){
    var query="SELECT d.department_id as department_id,d.department_name as department_name,d.over_head_costs as over_head_costs,"
    + "sum(p.product_sales) as product_sales,(sum(p.product_sales)-d.over_head_costs) as total_profit "+
    "FROM departments AS d INNER JOIN products AS p"+
    " WHERE d.department_name=p.department_name group by department_name";
    console.log(query);
    connection.query(query,function(err,res){
      
       var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
        });
      table.push(["department_id", "department_name","over_head_costs","product_sales","total_profit"]);
        for(var i=0;i<res.length;i++){
          
            var department_id=res[i].department_id;
            var department_name=res[i].department_name;
            var over_head_costs=res[i].over_head_costs;
            var product_sales;
            var total_profit;
        if(res[i].product_sales){
             product_sales = res[i].product_sales;
        }
        else{
            product_sales ="";
        }
        if(res[i].total_profit){
            total_profit=res[i].total_profit;
        }
        else{
            total_profit ="";
        }
    

    table.push([department_id, department_name,over_head_costs,product_sales,total_profit]);
      }
   console.log("\n");
   console.log(table.toString());
   for(i=0;i<res.length;i++){
        console.log("\n");
   }
//    console.log("\n");
        //connection.end();
    });
}
function newDepartment(departmentName,overHeadCosts){
   
    // console.log("departmentName"+departmentName);
    // console.log("overHeadCosts"+overHeadCosts);
    connection.query(
        "INSERT INTO departments SET ?",
        {
            
          department_name: departmentName,
          over_head_costs: overHeadCosts
         
        },
        function(err, res) {
          //console.log( "\n department inserted!\n");
         // selectDepartments();

          // Call updateProduct AFTER the INSERT completes
          //updateProduct();
        }
      );
}
function selectDepartments(){
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        var table = new Table({
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                   , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                   , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                   , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
            });
          table.push([" department_id", "department_name","over_head_costs"]);
    // Log all results of the SELECT statement
        for(var i=0;i<res.length;i++){
            var sales=0;
            // if(res[i].product_sales){
            //     var sales = res[i].product_sales;
            // }
            // else{
            //     sales = 0;
            // }
            //var itemID = res[i].item_id.toString();
            table.push([res[i].department_id.toString(), res[i].department_name.toString(),res[i].over_head_costs.toString()]);
           
        }    
        //return table.toString();
   // console.log(res);
   console.log("\n\n");
    console.log(table.toString());
       // console.log("end of select"); 
  }); 
}
module.exports = {
    connection:connection,
    showItems: showItems,
    selectByID: selectByID,
    endConnection: endConnection,
    viewLowInventory: viewLowInventory,
    addInventory: addInventory,
    addNewInventory: addNewInventory,
    productSalesByDepartments: productSalesByDepartments,
    newDepartment: newDepartment
}