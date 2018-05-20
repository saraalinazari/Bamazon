# bamazonCustomer.js
* This page shows list of products to the customers and ask them to insert the id of the product that they want to buy.
* In order to see the results, you need to type the command below in your command line after you change your current directory to the same local directory that you pulled the git hub repository :
	bamazonCustomer.js
* After running bamazonCustomer.js, it calls the showItems() function which included from connection.js fule. You can see the screen of showing the product list to the customer:

 ![Alt Text](images/bamazonCustomer1.jpg)!

* Then it asks you about the id of the product and the quantity that you want to buy. After user enters the id and quantity, it calls selectByID() function included from connection.js. selectByID(), get the product id and retrieve data like quantity, price, and product_sales from product table. 
	>If the requested quantity is less or equal than what we have in stock, it issues the bill and update the quantity by subtraction of previous quantity by requested quantity. Also, according to the quantity and price it issues the bill and updates the product_sales amount. You can see the bill as output below:
![Alt Text](/images/bamazonCustomer2.jpg)	
    > If requested quantity is greater than the number of products that we have, then it shows a message of "insufficient inventory". You can see this scenario in the screens below:
![Alt Text](/images/bamazonCustomer1.2.jpg)
![Alt Text](/images/bamazonCustomer2.2.jpg)


# bamazonManager.js
* Application asks user each time if she wants to see the menu. After she enters "Y", then shows the menu. If user select <View Products for Sale>, then it shows the list of all products. 
![Alt Text](/images/bamazonManager2.2.jpg)
* If user select <View Low Inventory>, then it shows all products that are the counts is less than 5.
![Alt Text](/images/bamazonManager3.2.jpg)
* If user selects <Add to Inventory>, then it asks about the id of product and the count that she wants to add. And, updates the table with new quantity+old quantity.
![Alt Text](/images/bamazonManager4.2.jpg)
* If user selects <Add New Product>, then it asks all questions of name, quantity, department, and price.
![Alt Text](/images/bamazonManager8.2.jpg)
* If user selects <View Products for Sale>, then she can see all products including whatever she added new inventory and also existed inventory.
![Alt Text](/images/bamazonManager9.2.jpg)

# bamazonSupervisor.js

* Application shows you the menu with three different options: 
	>  <View Product Sales by Department>
	>  <Create New Department>
	>  <Finish>
	![Alt Text](/images/bamazonSupervisor1.jpg)
* If user clicks <View Product Sales by Department>, then it shows the table with the department id, name, overhead costs, product sales, total profit. It adds the product sales of all products with the same department name and shows it under product_sales. It is sum of all product sales within same department. Then it subtract over_hea_costs value of product_sales column of each department to show how much profit that each department has.
![Alt Text](/images/bamazonSupervisor2.jpg)
* If user selects  <Create New Department>, then it asks about the name and overhead costs of department to inser the data to department table. you can see the screenshot of table befor adding departments:

![Alt Text](/images/bamazonSupervisor4.jpg)

Then user should insert the data about new department.
![Alt Text](/images/bamazonSupervisor5.jpg)
You can see the screenshot of department table after adding new department with name: dep1 and costs:3000 in the following image:
![Alt Text](/images/bamazonSupervisor6.jpg)
* If user selects <Finish>, then it ends the connection
