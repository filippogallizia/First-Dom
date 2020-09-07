

let name = process.argv.slice(2);
name.push(1);
name.push(2);

const sum = name.reduce(function(e,m) {
	return e + parseInt(m);
},0)

console.log(sum)