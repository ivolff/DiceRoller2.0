let sum = 0, min = 100000, max = -1;

function rolld(d){
	return Math.floor(Math.random() * Math.floor(d)) + 1
}

function simple_roll(arg){
	const textField = document.querySelector(".dice-result__content");

	if (textField) {
		textField.textContent = `${rolld(arg).toString()}`;
	}
}

function string_parcer(){
	const str = document.getElementById("TextInput").value.toString();
	const args = str.toString().split(" ").filter(function(entry) { return /\S/.test(entry); });
	console.log(args.length);
	const ans = pro_roll(args);
	let outputField = document.getElementById("dNoutput");
	outputField.textContent = ans;
	return ans;
}

function table_parcer(){
	let dices = ["d4", "d6", "d8", "d10", "d12", "d20"];
	let locans = "";
	let ans = "";
	for (let i = 0; i < dices.length; i++) {
		locans = document.getElementById(dices[i]+"count").value.toString();
		if(!/^\d+$/.test(locans)){
			document.getElementById(dices[i] + "output").value = "";
			continue;
		}
		locans +=dices[i];
		locans = pro_roll([locans]);
		document.getElementById(dices[i] + "output").value = locans;
		if(locans !== "") {
			ans += locans + " | "
		}
	}

	try{
		return ans.substr(0, ans.length - 2);
	} catch (e){
		return ans
	}
}

function start(){
	sum = 0;
	min = 100000;
	max = -1;
	let ans = ""
	let ansT = table_parcer();
	let ansS = string_parcer();
	if(ansS.length > 0 && ansT.length > 0)
		ans = ansT + "| " + ansS;
	else
		ans = ansT + ansS;
	let sum_check = document.getElementById("sum")
	let min_check = document.getElementById("min")
	let max_check = document.getElementById("max")
	if(sum_check.checked)
		ans += "sum: " + sum.toString() + "  ";
	if(min_check.checked)
		ans += "min: " + min.toString() + "  ";
	if(max_check.checked)
		ans += "max: " + max.toString() + "  ";
	document.getElementById("Output").textContent = ans;
}

function pro_roll(args){
	let ans = "";
	let dicev;
	let tmp;
	for (let i = 0; i < args.length; i++) {
		tmp = args[i].split("d").filter(function(entry) { return /\S/.test(entry); })
		if(!/^\d+$/.test(tmp[0]))
			continue
		if (tmp.length === 1) {
			if(parseInt(tmp[0], 10) === 0)
				continue;
			dicev = rolld(parseInt(tmp[0], 10));
			sum += dicev
			if(dicev > max)
				max = dicev
			if(dicev < min)
				min = dicev
			ans += dicev.toString() + " | ";
		}
		if (tmp.length === 2) {
			for (let j = 0; j < parseInt(tmp[0]); j++) {
				if(!/^\d+$/.test(tmp[1]) || (parseInt(tmp[1], 10) === 0))
					continue;
				dicev = rolld(parseInt(tmp[1], 10));
				console.log(dicev)
				sum += dicev;
				if(dicev > max)
					max = dicev
				if(dicev < min)
					min = dicev
				ans += dicev.toString() + " | ";
			}
		}
	}
	try{
		return ans.substr(0, ans.length - 2);}
	catch (e){
		return ans
	}
}

module.exports = {
	simple_roll,
	start
};