# namesilo-domain-api

- This is a fork from [https://github.com/xaoseric/namesilo-api-node]. I am adding new stuff on top of it. 
- I am converting all responses from xml to json by [https://github.com/buglabs/node-xml2json] dependency
- Converting api methods to be more specific rather than generic, currently they return axios response object
- Adding more checks


# Install
```
npm install --save namesilo-domain-api
```

# Embed
```
var NameSilo = require('namesilo-api')
```

# Methods

## constructor
- expects apikey as first parameter

```
var ns = new NameSilo('9de2514521cfae95a93')
```


## checkRegisterAvailability(array domains) `Promise`
```
ns.checkRegisterAvailability(["stakemonsters.com","harboroutlets.io","github.com"]).then(resp=>{
    console.dir(resp)
}).catch(err=>{
    console.error(err)
})
```
returns
```
{ code: '300',
  detail: 'success',
  available:
   { domain:
      [ { price: '32.88', '$t': 'harboroutlets.io' },
        { price: '6.99', '$t': 'stakemonsters.com' } ] },
  unavailable: { domain: 'github.com' } }
```

## registerDomain(domain,[years=1,options={}]) `Promise`
this is the main method to register a Domain. You can pass Optional parameters like seen at [https://www.namesilo.com/api_reference.php#registerDomain]
```
ns.registerDomain("github.com",1,{privacy:1}).then(....).catch(.....)
```
returns
```
{ code: '261', detail: 'Domain unavailable for registration.' }
```

in case of successfull registration you will receive
```
{ code: '300',
  detail: 'success',
  message: 'Your domain registration was successfully processed.',
  domain: 'thegrande.top',
  order_amount: '0.99' }
```
note: for some reason if you define a nameserver along the domainRegister it always throw 301. You might need to use changeNameServers after the registration

## changeNameServers(domain,nameservers=[]) `Promise`
```
ns.changeNameServers('gamingmaster.xyz',['name1.biz','names2.biz'])
```

returns

```
{ code: '300', detail: 'success' }
```

## listDomains(options={}) `Promise`
lists all domains
```
ns.listDomains().then(res=>{
    console.log(res)
}).catch(err=>{
    console.error(err)
})
```



# Response codes:
common ones. you might want to check other codes at [https://www.namesilo.com/api_reference.php]
```
261 : Domain not available to register
300 : Success
301 : 301: Successful registration, but not all provided hosts were valid resulting in our nameservers being used
```


# Api Documentation
Check NameSilo Api Documentation at [https://www.namesilo.com/api_reference.php]
