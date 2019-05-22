const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require('event-stream');
const mysql = require('mysql');

let mysqlCon = mysql.createConnection({
	host: 'localhost',
	user: '****',
	password: '****',
	database: '*****`'
});

mysqlCon.connect((err) => {
	if (!err)
		console.log('Connected to Database!');
	else
		console.log('Connection Failed!');

});

let getStream = () => {
	let jsonData = 'xae',
		stream = fs.createReadStream(jsonData).pipe(JSONStream.parse('_source'));
	return stream;
};

getStream().pipe(es.mapSync(data => {
	
		// let insert = "insert into source (Domain, RegistrarName, NameServer, CreatedDate, UpdatedDATE, ExpiresDate, Types, Email, ContactName, Street1, City, State, PostalCode, Country, fax, Telephone)";
		let insert = mysql.format('insert into Source (Domain, RegistrarName, NameServer, CreatedDate, UpdatedDATE, ExpiresDate, Types, Email, ContactName, Street1, City, State, PostalCode, Country, fax, Telephone) Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[data.domain, data.registrarName, null, data.createdDate, data.updatedDate, data.expiresDate, data.contact.type, data.contact.email, data.contact.name, data.contact.street1, data.contact.city, data.contact.state, data.contact.postalCode, data.contact.country, data.contact.fax, data.contact.telephone]); 
		// let values = [data.domain, data.registrarName, data.nameServers, data.createdDate, data.updatedDate, data.expiresDate, data.contact.type, data.contact.email, data.contact.name, data.contact.street1, data.contact.city, data.contact.state, data.contact.postalCode, data.contact.country, data.contact.fax, data.contact.telephone];

		// let valString = values.map(
		// 	(value) => {
		// let newVal = (value === undefined) ? "-" : value.toString().replace('"', '');
		// 		return '\"' + newVal + '\"';
		// 	}).join(',');

		// let qString = insert + " VALUES ( " + valString + ")";
		mysqlCon.query(insert, function (err, result) {
			if (err) throw err;
			console.log(result);

		});
}));
