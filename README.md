# Smartsecurity Web Service

### Clone this repo
```
  git clone https://github.com/cenidetiot/smartsecurity-web-service.git
 
```

### Install requirements 
```
  npm i
```
 
### Configurations

```javascript

  //MYSQL Configurations 
  exports.mysql = {
    host : 'URL', // MySQL Host
    db : 'databasename', //Database name
    user : 'databaseuser', // Database User
    password : '*******' // Database Password
  }
  // Orion Contextbroker configurations
  exports.context = {
    host:'URL', // Orion Host
    v : "v2", // Ngsi Version
    port : 1026 // Orion Port
  }
  
  exports.keyrock = "URL" //KeyRock URL
  exports.crate = 'URL'; // CrateDB Host
  
```

### Run 
```
  npm start 
```
