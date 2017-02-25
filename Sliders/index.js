var Width = document.getElementById("width");
var Height = document.getElementById("height");
var bgcolor = document.getElementById("BgColor");
var dia_images = document.getElementById("DiaImages");
var dia_text = document.getElementById("DiaText");
var out = document.getElementById("javascriptOutput");
var submitting = document.getElementById("Submit");
var script = document.getElementById("scriptPreview");
var addscript = document.getElementById("addscript");
var animtype = document.getElementById("AnimTypes");
var speed = document.getElementById("Speed");
addscript.addEventListener("click", function(){
	script.innerHTML = eval(out.value.split("<script>")[1].split("</script>")[0]);
});
function Outputting(){
	out.value = '<script type="text/javascript" src="https://sencoding.github.io/Sliders/Sliders.js"></script>\n';
	out.value += '<script>\n';
	if(Width.value != '' && Height.value != '' && dia_images.value != ''){
		var dia_img_split = dia_images.value.split(",");
		out.value += 'var newSlider = new Sliders([\''+dia_img_split.join("','")+'\'], \'YOUR_DIV_ID_HERE\','+width.value+','+height.value+');\n';
	}
	if(bgcolor.value != ''){
		out.value += 'newSlider.Background(\''+bgcolor.value+'\');\n';
	}
	if(animtype.value != 'select...'){
		if(speed.value == ''){
			speed.value = 1000;
		}
		out.value += 'newSlider.'+animtype.value+'('+speed.value+');\n';
	}
	if(dia_text.value != ''){
		var dia_text_split = dia_text.value.split(",");
		out.value += 'newSlider.AddText([\''+dia_text_split.join("','")+'\']);\n';
		out.value += 'newSlider.FadeText();\n';
	}
	out.value += '</script>';
}