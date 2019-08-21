# mysql

[Original project](https://github.com/mysqljs/mysql)

## Basic usage

``` js
const mysql = require('./mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'xxxxx',
  database: 'xxx'
});

connection.connect();

connection.query('SELECT * FROM xxxx', function (results, fields) {
  console.log('The solution is: ', results[0]);
});
```