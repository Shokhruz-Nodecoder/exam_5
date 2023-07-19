const Auth = require('./auth');
const Chanel = require("./chanel.route")
const Balance = require("./user.route")
const Subscrp = require("./subcrp.route") 

module.exports = [Auth,Chanel,Balance,Subscrp];