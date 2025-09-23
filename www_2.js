const http = require("http");
//lisame mooduli päringu
const url = require("url");
// lisame mooduli failitee kasutamiseks
const path = require("path")
const fs = require("fs");
const dateEt = require("./src/dateTimeET");
const textRef = "txt/vanasonad.txt";
const pageBegin = '<!DOCTYPE html><html lang="et"><head><meta charset="utf-8"><title>Saskia Tork, veebiprogrammerimine</title></head><body>';
const pageBody = '<h1>Saskia Tork, veebiprogrammerimine</h1>\n\t<p>See leht on tehtud <a href="https://www.tlu.ee">Tallinna ülikool</a> veebiprogrammeerimise kursusel ja ei sisalda mõistliku sisu. Alustasin sel sügisel teist ülikooliaastat. Siiani tundub, et ees on tulemas huvitav aasta. Lisaks mainin ka, et see pilt on hetkel ajutine, niikaua kuni ma leian koha, kust ma saan selle originaalse pildi. Tahtsin kodus kõik uuesti läbi teha ja ei mäletanud kust see pärit. Ma programmeerin esimest korda, vaatame mis välja tuleb. Kui see leht töötab, siis ma arvan, et õppisin juba midagi.</p><hr> ';
const pageBanner =<img src="vp_banner_2025_ID.jpg" alt="kursuse bänner">;
const pageEnd = '\n</body>\n</html>';

http.createServer(function(req, res){
	//vaatan päringut
	console.log("päring:" + req.url);
	let currentUrl = url.parse(req.url);
	console.log("parsituna: + currentUrl.pathname")
	
	if (currentUrl.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageBegin);
		res.write(pageBanner);
		res.write(pageBody);
		
		res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate();
		return res.end();
	}	
	
	else if (currentUrl.pathname === "/vanasonad"){
	res.writeHead(200, {"Content-type": "text/html"});
	fs.readFile(textRef, "utf8", (err, data)=>{
		if(err){
			res.write(pageBegin);
			res.write(pageBody);
			res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p><p>Kahjuks tänaseks ühtki vanasõna välja pakkuda pole!</p>");
			res.write(pageEnd);
			return res.end();
		} else {
			let oldWisdomList = data.split(";");
			let folkWisdomOutput = "\n\t<ol>";
			for (let i = 0; i < oldWisdomList.length; i ++){
				folkWisdomOutput += "\n\t\t<li>" + oldWisdomList[i] + "</li>";
			}
			folkWisdomOutput += "\n\t</ol>";
			res.write(pageBegin);
			res.write(pageBanner);
			res.write(pageBody);
			res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p>");
			res.write("\n\t<h2>Valik Eesti vanasõnu</h2>")
			res.write(folkWisdomOutput);
			res.write(pageEnd);
			return res.end();
		}
	});
	}
	
	else if (currentU/rl.pathname === "/vp_banner_2025_ID.jpg"){
		//liidame muidu veebilserverile kättesaamatu kataloogi "images" meie veebi failidega
		let bannerPath = path.join(__dirname,"images");
		fs.readFile(banner.Path + currentU/rl.pathname, (err, data) =>{
			if(err){
				throw(err);	
			}
			else {
				res.writeHead(200,{"Content-type" : "image/jpeg" });
				res.end(data);
				
			}
		});
	
	}
	
	else {
		res.end "Viga 404, ei leia sellist veebilehte!");
	}
}).listen(5213);