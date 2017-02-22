var TimeInMs;
var Fade_i;
var Slider;
var SlideSrcArr;
var SBox;
var SliderText;
var TextArr;
var Vorige;
var Volgende;
var output;
var PreviewImg;
var SlideBox;
var ChooseOpacity = function(){
	Slider.style.opacity = 0;	
	setTimeout(function(){
		Slider.style.opacity = 1;
	},TimeInMs);
};
var HidePreviewImg = function(value){
	document.getElementById("triangle"+value).style.display = 'none';
	document.getElementById("PreviewImgDiv").style.display = 'none';
};
var ShowPreviewImg = function(value){
	var PreviewImgDiv = document.getElementById("PreviewImgDiv");
	var PreviewImg = document.getElementById("PreviewImg");
	PreviewImg.src = SlideSrcArr[value - 1];
	PreviewImgDiv.style.display = '';
	document.getElementById("triangle"+value).style.display = '';
	PreviewImgDiv.style.height = PreviewImg.height + "px";
	PreviewImgDiv.style.width = PreviewImg.width + "px";
	PreviewImgDiv.style.marginTop = "-110px";
	PreviewImgDiv.style.marginLeft = 0 - (PreviewImg.width / 2) + "px";
	document.getElementById('DiaDot'+value).appendChild(PreviewImgDiv);
};
/*   This function says wich dia The Text and The Slider needs too go to,
     this is for the dots as you can see in the dot elements by onclick     */
function GoToDia(value){
	ChooseOpacity();
	document.getElementById("DiaDot"+(Fade_i + 1)+"").className = 'dot';
	Slider.style.transition = 'all '+TimeInMs+'ms ease-in-out';
	Slider.style.height = output.style.height;
	SliderText.style.transition = 'all '+TimeInMs+'ms ease-in-out';
	SliderText.style.opacity = 0;
	setTimeout(function(){
		Slider.src = SlideSrcArr[value - 1];
		SliderText.innerHTML = TextArr[value - 1];
		SliderText.style.opacity = 1;
		document.getElementById("DiaDot"+value+"").className = 'dot active';
	},TimeInMs);
	if(Fade_i >= 0 && Fade_i < SlideSrcArr.length){
		Fade_i = value - 1;
	}
}
//This is the main function for the whole project
function Sliders(array, outputElem, width, height){
	this.array = array;
	SlideSrcArr = this.array;
	//settings SlideBox Div and in here goes the Centered Slider and the Overlay as you can see in the SBox.innerHTML
	SBox = document.createElement('div');
	SBox.style = 'overflow:hidden;border-radius:5px;border:2px solid #ddd;background-color:#000;';
	SBox.id = 'SlideBox';
	SBox.innerHTML = '<div id="Overlay" style="z-index:0;"></div>'+
                     '<center><img id="Slider"'+
					 'src="'+SlideSrcArr[0]+'"'+
					 'style="opacity:1;width:auto;"></center>';
	//settings for the Previous Button Div that will be set into the named output
	var Previous = document.createElement('div');
	Previous.id = "Previous";
	Previous.className = "slide-btn";
	Previous.style = "float:left;left:10px;";
	Previous.innerHTML = '<i class="fa fa-chevron-left btn-fa-style" aria-hidden="true"></i>';
	//settings for the Next Button Div that will be set into the named output
	var Next = document.createElement('div');
	Next.id = "Next";
	Next.className = "slide-btn";
	Next.style = "float:right;right:10px;";
	Next.innerHTML = '<i class="fa fa-chevron-right btn-fa-style" aria-hidden="true"></i>';
	//settings for the SlidePoints element that will be set into the named output
	var SlidePoints = document.createElement('div');
	SlidePoints.id = 'SlidePoints';
	SlidePoints.style = 'display:inline-block;position:relative;bottom:45px;z-index:9999;';
	for(var i = 0; i < SlideSrcArr.length; i++){
		SlidePoints.innerHTML += '<div class="dot" id="DiaDot'+(i + 1)+'" onclick="GoToDia('+(i + 1)+')" onmouseover="ShowPreviewImg('+(i + 1)+');" onmouseout="HidePreviewImg('+(i +1)+');"><div id="triangle'+(i + 1)+'" class="arrow-down" style="display:none;"></div></div>';
	}
	//settings for the Text element that will be set into the named output
	var Text = document.createElement('div');
	Text.id = 'SliderText';
	Text.className = 'select';
	Text.style = 'word-wrap:break-word;max-height: 5.1em;line-height: 1.3em;overflow:hidden;position:relative;bottom:175px;padding-left:40px;padding-right:40px;color:white;text-shadow:2px 2px 1px #000;z-index:999;font-size:16px;font-family:Arial;';
	//Declaring the Element that will show the preview img if you hover on a dot
	PreviewImg = document.createElement('div');
	PreviewImg.id = 'PreviewImgDiv';
	PreviewImg.style = 'position:relative;bottom:7.5px;padding:10px;background-color:#bbb;border-radius:5px;display:none;';
	PreviewImg.innerHTML = '<img src="" id="PreviewImg" style="height:75px;width:auto;outline:2px solid #777;">';
	//searchTerm for getting the named element in the constructor function
	output = document.getElementById(outputElem);
	if(width == undefined || height == undefined){
	output.style = 'width:500px;height:400px;';
	}else{
	output.style = 'width:'+width+'px;height:'+height+'px;';
	}
	output.className = 'no-select';
	if(navigator.userAgent.indexOf('Edge') != -1 || navigator.userAgent.indexOf('Trident') != -1){
	output.innerHTML = '<b style="color:red;">Sorry This SlidePlayer Does Not Support Your Browser!</b>';
	}else{
	output.innerHTML = SBox.outerHTML + Previous.outerHTML + Next.outerHTML + '<center>' + SlidePoints.outerHTML + '</center>' + PreviewImg.outerHTML + Text.outerHTML;
	}
	var overlay = document.getElementById("Overlay");
	SlideBox = document.getElementById("SlideBox");
	output.addEventListener("mouseover", function(){
    overlay.style.boxShadow = 'inset 0px 0px 30px 0px rgb(0,0,0)';	
	});
	output.addEventListener("mouseout", function(){
    overlay.style.boxShadow = 'inset 0px 0px 15px 0px rgb(0,0,0)';
	});
	Slider = document.getElementById('Slider');
	Fade_i = 0;
	SlideBox.style.width = output.style.width;
	SlideBox.style.height = output.style.height;
	Slider.style.height = SlideBox.style.height;
	overlay.style.height = SlideBox.style.height;
	overlay.style.width = SlideBox.style.width;
	overlay.style.boxShadow = 'inset 0px 0px 15px 0px rgb(0,0,0)';
	SliderText = document.getElementById("SliderText");
	Vorige = document.getElementById("Previous");
	Volgende = document.getElementById("Next");
	this.Scale = function(time){
		TimeInMs = time;
		document.getElementById("DiaDot1").className = 'dot active';
		Slider.style.transition = 'all '+TimeInMs+'ms ease-in-out';
		var DoScale = function(WhichButton){
			Slider.style.transform = 'scale(0)';
			    if(Fade_i >= 0 && WhichButton == 'Previous'){
					document.getElementById("DiaDot"+(Fade_i + 2)).className = 'dot';
				}
				if(Fade_i < SlideSrcArr.length && WhichButton == 'Next'){
					document.getElementById("DiaDot"+(Fade_i)).className = 'dot';
				}
				setTimeout(function(){
					if(Fade_i < 0 && WhichButton == 'Previous'){
						document.getElementById("DiaDot"+(Fade_i + 2)).className = 'dot';
						Fade_i = SlideSrcArr.length - 1;
					}
					if(Fade_i >= SlideSrcArr.length && WhichButton == 'Next'){
						document.getElementById("DiaDot"+(Fade_i)).className = 'dot';
						Fade_i = 0;
					}
					document.getElementById("DiaDot"+(Fade_i + 1)).className = 'dot active';
					Slider.src = SlideSrcArr[Fade_i];
					Slider.style.transform = 'scale(1)';
			}, TimeInMs);
		}
		Vorige.addEventListener("click",function(){
			Fade_i--;
			DoScale('Previous');
		});
		Volgende.addEventListener("click",function(){
			Fade_i++;
			DoScale('Next');
		});
	}
	this.Rotate = function(time){
		TimeInMs = time;
		document.getElementById("DiaDot1").className = 'dot active';
		Slider.style.transition = 'all '+TimeInMs+'ms ease-in-out';
		var degrees = 0;
		var DoRotate = function(WhichButton){
			if(WhichButton == 'Next'){
				degrees += 180;
			}else if(WhichButton == 'Previous'){
				degrees -= 180;
			}
			Slider.style.transform = 'rotate('+degrees+'deg)';
			if(WhichButton == 'Previous' && Fade_i >= 0){
				document.getElementById('DiaDot'+(Fade_i + 2)).className = 'dot';
				document.getElementById('DiaDot'+(Fade_i + 1)).className = 'dot active';
			}else if(WhichButton == 'Next' && Fade_i < SlideSrcArr.length){
				document.getElementById('DiaDot'+(Fade_i)).className = 'dot';
				document.getElementById('DiaDot'+(Fade_i + 1)).className = 'dot active';
			}
			if(Fade_i < 0 && WhichButton == 'Previous'){
				document.getElementById('DiaDot'+(Fade_i + 2)).className = 'dot';
				Fade_i = SlideSrcArr.length - 1;
				document.getElementById('DiaDot'+(Fade_i + 1)).className = 'dot active';
			}
			else if(Fade_i >= SlideSrcArr.length && WhichButton == 'Next'){
				document.getElementById('DiaDot'+(Fade_i)).className = 'dot';
				Fade_i = 0;
				document.getElementById('DiaDot'+(Fade_i + 1)).className = 'dot active';
			}
			setTimeout(function(){
				Slider.src = SlideSrcArr[Fade_i];
				if(WhichButton == 'Next'){
					degrees += 180;
			    }else if(WhichButton == 'Previous'){
					degrees -= 180;
			    }
				Slider.style.transform = 'rotate('+degrees+'deg)';
			}, TimeInMs);
		};
		Vorige.addEventListener("click", function(){
			Fade_i--;
			DoRotate('Previous');
		});
		Volgende.addEventListener("click", function(){
			Fade_i++;
			DoRotate('Next');
		});
	}
	this.Slide = function(time){
		TimeInMs = time;
		document.getElementById("DiaDot1").className = 'dot active';
		var SlideWidth = Slider.width * 2;
		var GetSlide = function(WhichButton){
			Slider.style = 'height:'+SlideBox.style.height+';transition:all '+TimeInMs+'ms ease-in-out 0s;opacity:1;';
			Slider.style.marginLeft = SlideWidth+'px';
			if(WhichButton == 'Previous'){
				document.getElementById("DiaDot"+(Fade_i + 2)+"").className = 'dot';
			}else if(WhichButton == 'Next'){
				document.getElementById("DiaDot"+(Fade_i)+"").className = 'dot';
			}
			if(Fade_i < 0 && WhichButton == 'Previous'){
				Fade_i = SlideSrcArr.length - 1;
			}
			else if(Fade_i >= SlideSrcArr.length && WhichButton == 'Next'){
				Fade_i = 0;
			}	
			setTimeout(function(){
				Slider.src = SlideSrcArr[Fade_i];
				document.getElementById("DiaDot"+(Fade_i + 1)+"").className = 'dot active';
				Slider.style.animation = 'slide-margin '+TimeInMs+'ms ease-in-out 1 forwards';
			}, TimeInMs);
		};
		Vorige.addEventListener("click", function(){
			Fade_i--;
			GetSlide('Previous');
			});
		Volgende.addEventListener("click", function(){
			Fade_i++;
			GetSlide('Next');
		});
	}
	this.Fade = function(time){
		document.getElementById("DiaDot1").className = 'dot active';
		TimeInMs = time;
		Slider.style.transition = 'all '+TimeInMs+'ms ease-in-out';
	    Vorige.addEventListener("click", function(){
			Fade_i--;
			if(Fade_i >= 0){
				ChooseOpacity();
				document.getElementById("DiaDot"+(Fade_i + 2)+"").className = 'dot';
				setTimeout(function(){	
					Slider.src = SlideSrcArr[Fade_i];
					document.getElementById("DiaDot"+(Fade_i + 1)+"").className = 'dot active';
				},(TimeInMs - 50));
			}else{
				ChooseOpacity();
				document.getElementById("DiaDot"+(Fade_i + 2)+"").className = 'dot';
				Fade_i = SlideSrcArr.length - 1;		
				setTimeout(function(){
					Slider.src = SlideSrcArr[Fade_i];
					document.getElementById("DiaDot"+(Fade_i + 1)+"").className = 'dot active';
				},(TimeInMs - 50));
			}
		});
	    Volgende.addEventListener("click", function(){
			Fade_i++;
			if(Fade_i < SlideSrcArr.length){
				ChooseOpacity();
				document.getElementById("DiaDot"+(Fade_i)+"").className = 'dot';
				setTimeout(function(){	
					Slider.src = SlideSrcArr[Fade_i];
					document.getElementById("DiaDot"+(Fade_i + 1)+"").className = 'dot active';
				},(TimeInMs - 50));
			}else{
				ChooseOpacity();
				document.getElementById("DiaDot"+(Fade_i)+"").className = 'dot';
				Fade_i = 0;
				setTimeout(function(){
					Slider.src = SlideSrcArr[Fade_i];
					document.getElementById("DiaDot"+(Fade_i + 1)+"").className = 'dot active';
				},(TimeInMs - 50));
			}
		});
	}
	this.AddText = function(TextSrcArr){
		TextArr = TextSrcArr;
		if(TextSrcArr[Fade_i] != null){
			window.onload = function(){
				SliderText.innerHTML = TextSrcArr[Fade_i];
			}
		}else{
			SliderText.innerHTML = '';
		}
		Vorige.addEventListener("click", function(){
			setTimeout(function(){
				SliderText.innerHTML = '';
				SliderText.innerHTML = TextSrcArr[Fade_i];
				if(TextSrcArr[Fade_i] == null){
					SliderText.innerHTML = '';
				}
			}, TimeInMs);
		});
		Volgende.addEventListener("click", function(){
			setTimeout(function(){
				SliderText.innerHTML = '';
				SliderText.innerHTML = TextSrcArr[Fade_i];
				if(TextSrcArr[Fade_i] == null){
					SliderText.innerHTML = '';
				}
			}, TimeInMs);
		});
	}
	this.FadeText = function(){
		SliderText.style.transition = 'all '+TimeInMs+'ms ease-in-out';
		Vorige.addEventListener("click", function(){
			SliderText.style.opacity = 0;
			setTimeout(function(){
				SliderText.style.opacity = 1;
			}, TimeInMs);
		});
		Volgende.addEventListener("click", function(){
			SliderText.style.opacity = 0;
			setTimeout(function(){
				SliderText.style.opacity = 1;
			}, TimeInMs);
		});
	}
	this.Background = function(background, speed){
		if(background.indexOf('://') != -1){
			if(background.indexOf('url(') != -1){
				SlideBox.style.background = background;
			}else{
				SlideBox.style.background = 'url("'+background+'")';
			}
		}else if(typeof(background) == 'object'){
			var BgArr = background;
			var i = 0;
			SlideBox.style.transition = 'all '+speed+'ms ease-in-out';
			SlideBox.style.background = BgArr[i];
			setInterval(function(){
				if(i < BgArr.length - 2){
					SlideBox.style.background = BgArr[i + 1];
					i++;
			    }else{
					SlideBox.style.background = BgArr[i + 1];
					i = 0;
				}
			},speed);
		}else{
			SlideBox.style.background = background;
	    }
	}
	this.Animate = function(time, animTime, animType){
		TimeInMs = time;
		document.getElementById("DiaDot1").className = 'dot active';
		Slider.style.transition = 'all '+(animTime / 2)+'ms ease-in-out';
		SliderText.style.transition = 'all '+(animTime / 2)+'ms ease-in-out';
		Vorige.parentNode.removeChild(Vorige);
		Volgende.parentNode.removeChild(Volgende);
	    if(animType == 'normal' || animType == 'Fade' || animType == undefined){
			setInterval(function(){
				Fade_i++;
				if(Fade_i < SlideSrcArr.length){
					Slider.style.opacity = 0;
					SliderText.style.opacity = 0;
					document.getElementById("DiaDot"+(Fade_i)).className = 'dot';
					setTimeout(function(){
						Slider.src = SlideSrcArr[Fade_i];
						SliderText.innerHTML = TextArr[Fade_i];
						document.getElementById("DiaDot"+(Fade_i + 1)).className = 'dot active';
						Slider.style.opacity = 1;
						SliderText.style.opacity = 1;
					}, animTime / 2);
				}else { 
					document.getElementById("DiaDot"+(Fade_i)).className = 'dot';
					Fade_i = 0;
					Slider.style.opacity = 0;
					SliderText.style.opacity = 0;
					setTimeout(function(){
						Slider.src = SlideSrcArr[Fade_i];
						SliderText.innerHTML = TextArr[Fade_i];
						document.getElementById("DiaDot"+(Fade_i + 1)).className = 'dot active';
						Slider.style.opacity = 1;
						SliderText.style.opacity = 1;
					}, animTime / 2);
				}
			}, TimeInMs * 2);
		}else if(animType == 'Scale'){
			setInterval(function(){
				Fade_i++;
				if(Fade_i < SlideSrcArr.length){
					document.getElementById("DiaDot"+(Fade_i)).className = 'dot';
					Slider.style.transform = 'scale(0)';
					SliderText.style.opacity = 0;
					setTimeout(function(){
						Slider.src = SlideSrcArr[Fade_i];
						SliderText.innerHTML = TextArr[Fade_i];
						document.getElementById("DiaDot"+(Fade_i + 1)).className = 'dot active';
						Slider.style.transform = 'scale(1)';
					    SliderText.style.opacity = 1;
					}, animTime / 2);
				}else { 
					document.getElementById("DiaDot"+(Fade_i)).className = 'dot';
					Fade_i = 0;
					Slider.style.transform = 'scale(0)';
					SliderText.style.opacity = 0;
					setTimeout(function(){
						Slider.src = SlideSrcArr[Fade_i];
						SliderText.innerHTML = TextArr[Fade_i];
						document.getElementById("DiaDot"+(Fade_i + 1)).className = 'dot active';
						Slider.style.transform = 'scale(1)';
					    SliderText.style.opacity = 1;
					}, animTime / 2);
				}
			}, TimeInMs * 2);
		}
	}
	function loadAllImages(){
		for(var i = 0; i < SlideSrcArr.length; i++){
			var img = new Image();
			img.src = SlideSrcArr[i];
			img.style = 'display:none;';
			img.id = 'Img'+(i+1);
			output.appendChild(img);
		}
		for(var j = 0; j < SlideSrcArr.length; j++){
			output.removeChild(document.getElementById("Img"+(j+1)));
		}
    }
	loadAllImages();
}
