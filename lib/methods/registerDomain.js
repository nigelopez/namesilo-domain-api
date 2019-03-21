const xml2json = require('xml2json')
const utils = require('../helpers/utils')
const _ = require('lodash')
const querystring = require('querystring')
const debug = require('debug')('registerDomain')


// https://www.namesilo.com/api_reference.php#registerDomain
module.exports.registerDomain = function (config, axios, domain,years,options) {
    return new Promise(function(resolve, reject) {                
        // validations
        if (config.apiKey == null) return reject('API Key can not be null.')
        if (!utils.isString(domain)) return reject('Domain needs to be a string')
        if (parseInt(years)<1 || parseInt(years)>10) return reject(`Invalid years inside registerDomain api call`)
        var default_options = {
            auto_renew: 0 // lets disable auto_renew by default
        }
        var optionals = _.defaults(options,default_options)
        axios.post('registerDomain', querystring.stringify({ domain,years,...optionals }))
            .then(function (response) {
                if (response.status===200) {
                    try {
                        var json  = JSON.parse(xml2json.toJson(response.data))
                        console.log(response.data)

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
