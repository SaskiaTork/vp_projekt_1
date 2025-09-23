const fs = require("fs");
const dateEt = require("./src/dateTimeET");
const textRef = "vanasonad/vanasonad.txt";

function pickOneWisdom(rawText){
	//jagan teksti ";" järgi massiiviks (list, array)
	let oldWisdomList = rawText.split(";");
	//console.log(oldWisdomList);
	//väljastan kuupäeva
	console.log("Täna on " + dateEt.longDate() + ".")
	//loosin ühe ja väljastan
	console.log("Tänane vanasõna: " + oldWisdomList[Math.round(Math.random() * (oldWisdomList.length -1))]);
}

function showAllWisdom(rawText){
	//jagan teksti ";" järgi massiiviks (list, array)
	let oldWisdomList = rawText.split(";");
	for (let i = 0; i < oldWisdomList.length; i ++){
		console.log((i + 1) + ") " + oldWisdomList[i]);
	}
}
	
function readTextFile(fileRef){
	fs.readFile(fileRef, "utf8", (err, data)=>{
		if(err){
			console.log(err);
		} else {
			//console.log(data);
			if(Math.round(Math.random()) == 0){
				pickOneWisdom(data);
			} else {
				showAllWisdom(data);
			}
		}
	});
}

readTextFile(textRef);