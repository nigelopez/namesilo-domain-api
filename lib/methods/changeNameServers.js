const xml2json = require('xml2json')
const utils = require('../helpers/utils')
const _ = require('lodash')
const querystring = require('querystring')
const debug = require('debug')('registerDomain')


// https://www.namesilo.com/api_reference.php#changeNameServers
module.exports.changeNameServers = function (config, axios, domain,nameservers) {
    return new Promise(function(resolve, reject) {                
        // validations
        if (config.apiKey == null) return reject('API Key can not be null.')
        if (!utils.isString(domain)) return reject('Domain needs to be a string')
        if (!utils.isArray(nameservers)) return reject('Nameservers needs to be an array')
        if (nameservers.length<2 || nameservers[0]===nameservers[1]) return reject('We need at least 2 different nameserver for that given domain')
        var ns={

        }
        for(var i in nameservers) {
            ns['ns'+(parseInt(i)+1)]=nameservers[i]
        }


        
        axios.post('changeNameServers', querystring.stringify({ domain, ...ns}))
            .then(function (response) {
                if (response.status===200) {
                    try {
                        var json  = JSON.parse(xml2json.toJson(response.data))

                        if (json.hasOwnProperty('namesilo') && json.namesilo.hasOwnProperty('reply'))
                            return resolve(json.namesilo.reply) // verified
                    }
                    catch(e) {
                        return reject(`invalid response`,response.data)
                    }
                    return reject(`unexpected response`,response.data)
                }
            })
            .catch(function (error) {
                reject(error);
            });

    });

};
