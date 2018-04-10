var fs = require('fs');



/*change to fit data required*/
var data = 'data.json'

function loadData() {
    return JSON.parse(fs.readFileSync(data));
}


/*export all modules*/
module.exports = {
    loadData: loadData,
}
