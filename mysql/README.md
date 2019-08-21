# 连接mysql数据库


``` js
const mysql = require('tiny-sql');

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