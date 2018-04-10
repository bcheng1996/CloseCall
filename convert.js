var fs = require('fs');
function convert(array){
	var i;
	var cstring = "name,latitude,longitude,time,clock\n";
	for(i = 0; i < array.length; i++){
		cstring += array[i].name + "," + array[i].lat + "," + array[i].long + "," + array[i].time + "\n";
		console.log(cstring);
	}
	fs.writeFile("test.csv", cstring, function(err){
		if(err){
			return console.log(err);
		};
	});
}

module.exports = {
	convert:convert,
}
