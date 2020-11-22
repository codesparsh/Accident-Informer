var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accidents = Schema({
    photo:{
        type:Object
    },
    location:{
        type:JSON
    }

})

var Accidents = mongoose.model('accidents',accidents);

module.exports = Accidents;