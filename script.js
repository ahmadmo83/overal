const data = ["هر","همه","هیچ","بعضی","بعض","است","هست","هستند","نیست","نیستند","غیر","لا"];

function diagnosis(caseSub){  // برای تشخیص کم و کیف قضیه  
	result = "";
	if (caseSub.at(-1) == data[5] || caseSub.at(-1) == data[6] || caseSub.at(-1) == data[7]) {
		result += "m"; }
	else if (caseSub.at(-1) == data[8] || caseSub.at(-1) == data[9]){
		result += "s"; }
	if (caseSub[0] == data[0] || caseSub[0] == data[1] || caseSub[0] == data[2]) {
		result += "k"; }
	else if (caseSub[0] == data[3] || caseSub[0] == data[4]){
		result += "j";}
	return result;
}
function to_farsi(list, tag){ // برای فارسی نویسی صحیح و اضافه کردن عنوان قضیه
    result = tag + " : ";
    for (let ls of list){
        result += ls + " ";}
    return result;
}
function contradiction(caseSub, quality){ // تناقض
	caseSub = caseSub.slice();
	if (caseSub[1] == data[10] || caseSub[1] == data[11]){
		caseSub[2] = caseSub[1] + caseSub[2];
		caseSub.splice(1,1);
    }
	if (quality == "mk") { 
		if (caseSub[0] == data[0]){
			caseSub[0] = data[3];
			caseSub.splice(-1, 1, data[9]);
			caseSub[1] = caseSub[1].slice(0,-1) + " ها";}
		else if (caseSub[0] == data[1]){
			caseSub[0] = data[3];
			caseSub.splice(-1, 1, data[9]);}
    }
	if (quality == "mj") { 
		caseSub[0] = data[2];
		caseSub.splice(-1, 1, data[8]);
		caseSub[1] += "ی";
		if (caseSub.includes("ها")){
			caseSub.splice(caseSub.indexOf("ها"),1);}
    }
	if (quality == "sk") {
		caseSub[0] = data[3];
		caseSub.splice(-1, 1, data[7]);
		caseSub[1] = caseSub[1].slice(0,-1) + " ها";
    }
	if (quality == "sj") {
		caseSub[0] = data[0];
		caseSub.splice(-1, 1, data[5]);
		caseSub[1] += "ی";
		if (caseSub.includes("ها")){
			caseSub.splice(caseSub.indexOf("ها"),1);}
}
	return caseSub;
}
function overlap(caseSub, quality){ // تداخل
	caseSub = caseSub.slice();
	if (caseSub[1] == data[10] || caseSub[1] == data[11]){
		caseSub[2] = caseSub[1] + caseSub[2];
		caseSub.splice(1,1);
    }
	if (quality == "mk") { 
		if (caseSub[0] == data[0]){
			caseSub[1] = caseSub[1].slice(0,-1) + " ها";
			caseSub.splice(-1, 1, data[7]);}
		caseSub[0] = data[3];
    }
	if (quality == "mj") {
		caseSub[0] = data[0];
		caseSub.splice(-1, 1, data[5]);
		caseSub[1] += "ی";
		if (caseSub.includes("ها")){
			caseSub.splice(caseSub.indexOf("ها"),1);}
    }
	if (quality == "sk") {
		caseSub[0] = data[3];
		caseSub[1] = caseSub[1].slice(0,-1) + " ها";
		caseSub.splice(-1, 1, data[9]);
    }
	if (quality == "sj") {
		caseSub[0] = data[2];
		caseSub.splice(-1, 1, data[8]);
		caseSub[1] += "ی";
		if (caseSub.includes("ها")){
			caseSub.splice(caseSub.indexOf("ها"),1);}
    }
	return caseSub;
}
function contrast(caseSub, quality){ // تضاد 
	caseSub = caseSub.slice();
	if (caseSub[1] == data[10] || caseSub[1] == data[11]){
		caseSub[2] = caseSub[1] + caseSub[2];
		caseSub.splice(1,1);
    }
	if (quality == "mk") { 
		caseSub[0] = data[2];
		caseSub.splice(-1, 1, data[8]);
		if (caseSub.includes("ها")){
			caseSub.splice(caseSub.indexOf("ها"),1);
			caseSub[1] += "ی";}
    }
	if (quality == "mj") {
		return ["ندارد"];
    }
	if (quality == "sk") {
		caseSub[0] = data[0];
		caseSub.splice(-1, 1, data[5]);
  }
	if (quality == "sj") {				
		return ["ندارد"];
}
	return caseSub;
}
function entry_under_contrast(caseSub, quality){ // دخول تحت تضاد
	caseSub = caseSub.slice();
	if (caseSub[1] == data[10] || caseSub[1] == data[11]){
		caseSub[2] = caseSub[1] + caseSub[2];
		caseSub.splice(1,1);
    }
	if (quality == "mk") {				
		return ["ندارد"];
}
	if (quality == "mj") {
		caseSub.splice(-1, 1, caseSub.at(-1) == data[7] ? data[9] : data[8]);
   }
	if (quality == "sk") {				
		return ["ندارد"];
}
	if (quality == "sj") { 				
		caseSub.splice(-1, 1, caseSub.at(-1) == data[9] ? data[7] : data[5]);
   }
	return caseSub;
}
function reverse_level(caseSub, quality){ // عکس مستوی
	caseSub = caseSub.slice();
	if (caseSub[1] == data[10] || caseSub[1] == data[11]){
		caseSub[2] = caseSub[1] + caseSub[2];
		caseSub.splice(1,1);
    }
	if (caseSub.at(-3) == data[10] || caseSub.at(-3) == data[11]){
		caseSub.splice(-2, 1, caseSub.at(-3) + caseSub.at(-2));
		caseSub.splice(-3,1);
    }
	if (quality == "mk") {
		if (caseSub[0] == data[0]){
			caseSub[1] = caseSub[1].slice(0,-1);
			caseSub.splice(-1, 1, data[7]);}
		caseSub[0] = data[3];
		
		final = caseSub[1];
		caseSub[1] = caseSub.at(-2) + " ها";
		caseSub.splice(-2, 1, final);
}
	if (quality == "mj") {
		final = caseSub[1];
		caseSub[1] = caseSub.at(-2);
		caseSub.splice(-2, 1, final);
}
	if (quality == "sk") {
		final = caseSub[1].slice(0,-1);
		caseSub[1] = caseSub.at(-2) + "ی";
		caseSub.splice(-2, 1, final);
}
        if (quality == "sj") {				
            return ["ندارد"];
    }
	return caseSub;
}
function reverse_opposite_one(caseSub, quality){ // عکس نقیض موافق
	caseSub = caseSub.slice();
	if (caseSub[1] == data[10] || caseSub[1] == data[11]){
		caseSub[2] = caseSub[1] + caseSub[2];
		caseSub.splice(1,1);
    }
	if (caseSub.at(-3) == data[10] || caseSub.at(-3) == data[11]){
		caseSub.splice(-2, 1, caseSub.at(-3) + caseSub.at(-2));
		caseSub.splice(-3,1);
    }
	if (quality == "mk") {
		final = caseSub[1];
		caseSub[1] = caseSub.at(-2);
		caseSub.splice(-2, 1, final);
		if (caseSub[0] == data[0]){
			caseSub[1] = caseSub[1] + "ی";
			caseSub.splice(-2, 1, caseSub.at(-2).slice(0,-1));}
}
	if (quality == "mj") {				
            return ["ندارد"];
    }
	if (quality == "sk") {
		caseSub[0] = data[3];
		caseSub[1] = caseSub[1].slice(0,-1);
		caseSub.splice(-1, 1, data[9]);

		final = caseSub[1];
		caseSub[1] = caseSub.at(-2) + " ها";
		caseSub.splice(-2, 1, final);
}
	if (quality == "sj")  {
		final = caseSub[1];
		caseSub[1] = caseSub.at(-2);
		caseSub.splice(-2, 1, final);
}
	if (caseSub[1].slice(0,3) == data[10]){
		caseSub[1] = caseSub[1].slice(3);
    } else if (caseSub[1].slice(0,2) == data[11]){
		caseSub[1] = caseSub[1].slice(2);
	} else {
		caseSub[1] = data[10] + caseSub[1]; }

	if (caseSub.at(-2).slice(0,3) == data[10]){
		caseSub.splice(-2, 1, caseSub.at(-2).slice(3));
	} else if (caseSub.at(-2).slice(0,2) == data[11]){
		caseSub.splice(-2, 1, caseSub.at(-2).slice(2));
	} else{
		caseSub.splice(-2, 1, data[10] + caseSub.at(-2));}

	return caseSub;
}
function reverse_opposite_two(caseSub, quality){ // عکس نقیض مخالف
	caseSub = caseSub.slice();
	if (caseSub[1] == data[10] || caseSub[1] == data[11]){
		caseSub[2] = caseSub[1] + caseSub[2];
		caseSub.splice(1,1);
    }
	if (caseSub.at(-3) == data[10] || caseSub.at(-3) == data[11]){
		caseSub.splice(-2, 1, caseSub.at(-3) + caseSub.at(-2));
		caseSub.splice(-3,1);
    }
	if (quality == "mk") { 
		caseSub[0] = data[2];
		caseSub.splice(-1, 1, data[8]);
		if (caseSub.includes("ها")){
			caseSub.splice(caseSub.indexOf("ها"),1);
			caseSub[1] += "ی";}
		
		final = caseSub[1];
		caseSub[1] = caseSub.at(-2);
		caseSub.splice(-2, 1, final);
		caseSub[1] = caseSub[1] + "ی";
		caseSub.splice(-2, 1, caseSub.at(-2).slice(0, -1));
}
	if (quality == "mj") {				
            return ["ندارد"];
    }
	if (quality == "sk") {
		caseSub[0] = data[3];
		caseSub.splice(-1, 1, data[7]);
		caseSub[1] = caseSub[1].slice(0, -1);

		final = caseSub[1];
		caseSub[1] = caseSub.at(-2) + " ها";
		caseSub.splice(-2, 1, final);
}
	if (quality == "sj")  {
		caseSub.splice(-1, 1, caseSub.at(-1) == data[9] ? data[7] : data[5]);
		
		final = caseSub[1];
		caseSub[1] = caseSub.at(-2);
		caseSub.splice(-1, 1, final);
}
	if (caseSub[1].slice(0,3) == data[10]){
		caseSub[1] = caseSub[1].slice(3);
	} else if (caseSub[1].slice(0,2) == data[11]){
		caseSub[1] = caseSub[1].slice(2);
	} else{
		caseSub[1] = data[10] + caseSub[1]; }

	return caseSub;
}
function portable_veto(caseSub, quality){ // نقض محمول
	caseSub = caseSub.slice();
	if (caseSub[1] == data[10] || caseSub[1] == data[11]){
		caseSub[2] = caseSub[1] + caseSub[2];
		caseSub.splice(1,1);
    }
	if (caseSub.at(-3) == data[10] || caseSub.at(-3) == data[11]){
		caseSub.splice(-2, 1, caseSub.at(-3) + caseSub.at(-2));
		caseSub.splice(-3,1);
    }
	if (quality == "mk") {
		caseSub[0] = data[2];
		caseSub.splice(-1, 1, data[8]);
		if (caseSub.includes("ها")){
			caseSub.splice(caseSub.indexOf("ها"),1);
			caseSub[1] += "ی";}
	}
	if (quality == "mj") {
		caseSub.splice(-1, 1, caseSub.at(-1) == data[7] ? data[9] : data[8]);
	}
	if (quality == "sk") {
		caseSub[0] = data[0];
		caseSub.splice(-1, 1, data[5]);
	}
	if (quality == "sj") {
		caseSub.splice(-1, 1, caseSub.at(-1) == data[9] ? data[7] : data[5]);
}
	if (caseSub.at(-2).slice(0,3) == data[10]){
		caseSub.splice(-2, 1, caseSub.at(-2).slice(3));
	} else if (caseSub.at(-2).slice(0,2) == data[11]){
		caseSub.splice(-2, 1, caseSub.at(-2).slice(2));
	} else{
		caseSub.splice(-2, 1, data[10] + caseSub.at(-2));}

	return caseSub;
}
function topic_veto(caseSub, quality){ // نقض موضوع
	caseSub = caseSub.slice();
	if (caseSub[1] == data[10] || caseSub[1] == data[11]){
		caseSub[2] = caseSub[1] + caseSub[2];
		caseSub.splice(1,1);
    }
	if (caseSub.at(-3) == data[10] || caseSub.at(-3) == data[11]){
		caseSub.splice(-2, 1, caseSub.at(-3) + caseSub.at(-2));
		caseSub.splice(-3,1);
    }
	if (quality == "mk") {
		if (caseSub[0] == data[0]){
			caseSub[0] = data[3];
			caseSub.splice(-1, 1, data[9]);
			caseSub[1] = caseSub[1].slice(0,-1) + " ها";
		} else if (caseSub[0] == data[1]){
			caseSub[0] = data[3];
			caseSub.splice(-1, 1, data[9]);}
	}
	if (quality == "mj") {				
            return ["ندارد"];
    }
	if (quality == "sk") {
		caseSub[0] = data[3];
		caseSub.splice(-1, 1, data[7]);
		caseSub[1] = caseSub[1].slice(0,-1) + " ها";
	}
	if (quality == "sj") {				
            return ["ندارد"];
    }
	if (caseSub[1].slice(0,3) == data[10]){
		caseSub[1] = caseSub[1].slice(3);
	} else if (caseSub[1].slice(0,2) == data[11]){
		caseSub[1] = caseSub[1].slice(2);
	} else{
		caseSub[1] = data[10] + caseSub[1]; }

	return caseSub;
}
function parties_veto(caseSub, quality){ // نقض طرفین
	caseSub = caseSub.slice();
	if (caseSub[1] == data[10] || caseSub[1] == data[11]){
		caseSub[2] = caseSub[1] + caseSub[2];
		caseSub.splice(1,1);
    }
	if (caseSub.at(-3) == data[10] || caseSub.at(-3) == data[11]){
		caseSub.splice(-2, 1, caseSub.at(-3) + caseSub.at(-2));
		caseSub.splice(-3,1);
    }
	if (quality == "mk") {
		if (caseSub[0] == data[0]){
			caseSub[1] = caseSub[1].slice(0,-1) + " ها";
			caseSub.splice(-1, 1, data[7]);}
		caseSub[0] = data[3];
	}
	if (quality == "mj") {				
            return ["ندارد"];
    }
	if (quality == "sk") {
		caseSub[0] = data[3];
		caseSub[1] = caseSub[1].slice(0,-1) + " ها";
		caseSub.splice(-1, 1, data[9]);
	}
	if (quality == "sj") {				
            return ["ندارد"];
    }
	if (caseSub[1].slice(0,3) == data[10]){
		caseSub[1] = caseSub[1].slice(3);
	} else if (caseSub[1].slice(0,2) == data[11]){
		caseSub[1] = caseSub[1].slice(2);
	} else{
		caseSub[1] = data[10] + caseSub[1]; }

	if (caseSub.at(-2).slice(0,3) == data[10]){
		caseSub.splice(-2, 1, caseSub.at(-2).slice(3));
	} else if (caseSub.at(-2).slice(0,2) == data[11]){
		caseSub.splice(-2, 1, caseSub.at(-2).slice(2));
	} else{
		caseSub.splice(-2, 1, data[10] + caseSub.at(-2)); }

	return caseSub;
}



// DOM
document.getElementById("btn").addEventListener("click", function(){
	
	var case_main = document.getElementById("input").value.split(" ");
	
	var result_show = to_farsi(contradiction(case_main,diagnosis(case_main)), "تناقض") + "<br><br>" +
	to_farsi(overlap(case_main,diagnosis(case_main)), "تداخل") + "<br><br>" +
	to_farsi(contrast(case_main,diagnosis(case_main)), "تضاد") + "<br><br>" +
	to_farsi(entry_under_contrast(case_main,diagnosis(case_main)), "دخول تحت تضاد") + "<br><br>" +
	to_farsi(reverse_level(case_main,diagnosis(case_main)), "عکس مستوی") + "<br><br>" +
	to_farsi(reverse_opposite_one(case_main,diagnosis(case_main)), "عکس نقیض موافق") + "<br><br>" +
	to_farsi(reverse_opposite_two(case_main,diagnosis(case_main)), "عکس نقیض مخالف") + "<br><br>" +
	to_farsi(portable_veto(case_main,diagnosis(case_main)), "نقض محمول") + "<br><br>" +
	to_farsi(topic_veto(case_main,diagnosis(case_main)), "نقض موضوع") + "<br><br>" +
	to_farsi(parties_veto(case_main,diagnosis(case_main)), "نقض طرفین");
	
	document.getElementById("screen").innerHTML = result_show;

});