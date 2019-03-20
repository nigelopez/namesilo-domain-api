# namesilo-api

- This is a fork from [https://github.com/xaoseric/namesilo-api-node]. I am adding new stuff on top of it. 
- I am converting all responses from xml to json by [https://github.com/buglabs/node-xml2json] dependency
- Converting api methods to be more specific rather than generic, currently they return axios response object
- Adding more checks


# Install
coming soon
# Embed
`var NameSilo = require('namesilo-api')`

# Methods

## constructor
- expects apikey as first parameter

```
var ns = new NameSilo('9de2514521cfae95a93')
```


## checkRegisterAvailability(array domains)<Promise>
```
ns.checkRegisterAvailability(["stakemonsters.com","harboroutlets.io","github.com"]).then(resp=>{
    console.dir(resp)
}).catch(err=>{
    console.error(err)
})
```
returns
```json
{ code: '300',
  detail: 'success',
  available:
   { domain:
      [ { price: '32.88', '$t': 'harboroutlets.io' },
        { price: '6.99', '$t': 'stakemonsters.com' } ] },
  unavailable: { domain: 'github.com' } }
```


# Api Documentation
Check NameSilo Api Documentation at [https://www.namesilo.com/api_reference.php]
