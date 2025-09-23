const http = require("http");
const fs = require("fs");
const path = require("path");
const dateET = require("./src/dateTimeET");

console.log("Nädalapäev:", dateET.weekDay());
const vanasona = require("./vanasonad");
const textRef = path.join("vanasonad","vanasõnad.txt");

console.log("Kuupäev:", dateET.longDate());
console.log("Kellaeg:", dateET.time());

const pageBegin = '<!DOCTYPE html><html lang="et"><head><meta charset="utf-8"><title>Saskia Tork, veebiprogrammerimine</title></head><body>';
const pageBody = '<h1>Saskia Tork, veebiprogrammerimine</h1>\n\t<p>See leht on tehtud <a href="https://www.tlu.ee">Tallinna ülikool</a> veebiprogrammeerimise kursusel ja ei sisalda mõistliku sisu. Alustasin sel sügisel teist ülikooliaastat. Siiani tundub, et ees on tulemas huvitav aasta. Lisaks mainin ka, et see pilt on hetkel ajutine, niikaua kuni ma leian koha, kust ma saan selle originaalse pildi. Tahtsin kodus kõik uuesti läbi teha ja ei mäletanud kust see pärit. Ma programmeerin esimest korda, vaatame mis välja tuleb. Kui see leht töötab, siis ma arvan, et õppisin juba midagi.</p><hr> ';
const pageEnd = '</body></html>';

http.createServer(function(req, res){
	vanasona.readWisdomFile(textRef, (err, data) => {
		if(err){
			console.log("Viga vanasõnade lugemisel:", err)
		} else{
			let one = vanasona.pickOneWisdom(data);
			console.log("Tänane vanasõna:", one);
		}
		res.writeHead(200, {"Content-type": "text/html"});//res.write("Läkski käima");
		res.write(pageBegin);
		res.write(pageBody);
		res.write("<p>Täna on " + dateET.weekDay () +  " " + dateET.longDate ()+ " " + dateET.time() + ".</p>");
		res.write("<p><strong>Tänane vanasõna:</strong> " + one + "</p>");
		res.write(pageEnd);
		return res.end();
	})

}).listen(5213);