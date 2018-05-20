
USE bamazon;
CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2),
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id));

insert into products (product_name, department_name,price, stock_quantity) 
values ('free people long dress','women clothing', 98.50,15);

insert into products (product_name, department_name,price, stock_quantity) 
values ('CK dress pants','men clothing', 80.50,5);
insert into products (product_name, department_name,price, stock_quantity) 
values ('Clarks high heel shoes','women shoes', 69.99,12);
insert into products (product_name, department_name,price, stock_quantity) 
values ('Micheal Kors crossbody','handbags and accessories', 168.00,8);
insert into products (product_name, department_name,price, stock_quantity) 
values ('Anne Clien Black women','watches', 110.50,7);
insert into products (product_name, department_name,price, stock_quantity) 
values ('Corell 16-set peices silver','home and furniture', 59.99,16);
insert into products (product_name, department_name,price, stock_quantity) 
values ('Corell 42-set pieces silver','women clothing', 258.10,3);


CREATE TABLE departments(
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs DECIMAL(10,2),
    PRIMARY KEY (department_id));

 ALTER TABLE products
ADD product_sales DECIMAL(10,2);