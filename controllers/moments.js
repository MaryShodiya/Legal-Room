
const moment = require('moment');

module.exports = {
   formatDate : function (date, format) {
       return moment(date).format(format)
   }
    
}




/*var moment = require('moment');
exports.index = function(req, res) {
    // send moment to your ejs
    res.render('feed.ejs', { moment: moment });
}*/
