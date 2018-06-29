var mysql = require("mysql");
var Table = require('cli-table'); 
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
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
       
   console.log("\n\n");
    console.log(table.toString());
       
  }); 
 
  
}
function selectByID(productID,quantityReq){
    var price=0;
    var quantity=0;
    var id=0;
    var productSales = 0;
    var productSalesTemp=0;
    connection.query(
        "SELECT * FROM products WHERE ?",
        { item_id: productID },
        function(err, res) {
       price=res[0].price ;
       quantity = res[0].stock_quantity;
       productSales= res[0].product_sales;
       
       id=res[0].item_id;
        if(quantity >= quantityReq){
            var remainInventory = quantity - quantityReq;
            var priceF = parseFloat(price);
            var quantityR=parseFloat(quantityReq);
            var productSalsF=parseFloat(productSales);
            productSalesTemp =(price *quantityReq)+productSales;
            
            updateQuantity(remainInventory,id,parseFloat(productSalesTemp) );
            issueBill(parseFloat( quantityReq ), parseFloat(price));
            endConnection();

        }
        else{
            console.log("insufficient inventory");
        }
        }
      );
      
    
      return product;
}
function updateQuantity(newInventory,id,productSalesTemp){
 
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
          
        }
      );
     
     
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
          
        }
      );
     
      
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
          
       console.log("\n\n");
        console.log(table.toString());
        
        
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
        
       totalquantity =parseInt(res[0].stock_quantity) +parseInt(productQuantity) ;
       updateQuantityByManager(totalquantity,productID);
       
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
         
        }
      );
    
     

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

       
    });
}
function newDepartment(departmentName,overHeadCosts){
   
    
    connection.query(
        "INSERT INTO departments SET ?",
        {
            
          department_name: departmentName,
          over_head_costs: overHeadCosts
         
        },
        function(err, res) {
         
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
    
        for(var i=0;i<res.length;i++){
            var sales=0;
           
            table.push([res[i].department_id.toString(), res[i].department_name.toString(),res[i].over_head_costs.toString()]);
           
        }    
        
   console.log("\n\n");
    console.log(table.toString());
       
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