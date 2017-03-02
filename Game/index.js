var GDiv;
var castle;
function Game(playground_div, width, height){
	var fa = document.createElement('script');
	fa.type = 'text/javascript';
	fa.src = 'https://use.fontawesome.com/042a2ec465.js';
	document.head.appendChild(fa);
	var noselect = document.getElementsByClassName("noselect");
	for(var i = 0; i < noselect.length; i++){
		noselect[i].style.userSelect = 'none';
		noselect[i].style.mozUserSelect = 'none';
		noselect[i].style.msUserSelect = 'none';
		noselect[i].style.webkitUserSelect = 'none';
	}
	GDiv = document.getElementById(playground_div);
	this.width = width;
	this.height = height;
	GDiv.style.width = this.width+"px";
	GDiv.style.height = this.height+"px";
	GDiv.style.overflow = 'hidden';
	GDiv.style.border = '2px solid #aaa';
	GDiv.style.cursor = 'url("game.ico"),auto';
	GDiv.className = 'noselect';
	this.Start = function(gamecode){
		var button = document.createElement("button");
		const width = 100;
		const height = 100;
		button.style.width = width+"px";
		button.style.height = height+"px";
		button.style.borderRadius = "100%";
		button.style.position = "relative";
		button.style.cursor = "pointer";
		button.style.left = (this.width/2-width/2)+"px";
		button.style.top = (this.height/2-height/2)+"px";
		button.id = "start";
		button.innerHTML = "Start";
		GDiv.appendChild(button);
		var startBtn = document.getElementById("start");
		startBtn.addEventListener("click", function(){
			GDiv.removeChild(startBtn);
			gamecode();
			var shop = document.createElement("div");
			shop.id = 'GameShop';
			shop.style = 'z-index:9999;display:inline-block;color:white;background-color:orange;border:2px solid darkorange;border-radius:5px;padding:5px;position:relative;width:70px;left:400px;top:240px;cursor:pointer;';
			shop.innerHTML = '<i class="fa fa-shopping-cart" aria-hidden="true"></i> Shop';
			GDiv.appendChild(shop);
			document.getElementById("GameShop").addEventListener("click", function(){
				Shop();
			});
		});
	}
	this.Level = function(number){
		if(number == 1){
			var level1 = document.createElement('div');
			level1.id = 'Level1';
			level1.style.width = this.width+'px';
			level1.style.height = this.height+'px';
			level1.style.backgroundColor = 'rgba(0,0,0,0.9)';
			level1.style.zIndex = '-9999';
			level1.style.position = 'absolute';
			GDiv.appendChild(level1);
			var lvl = document.getElementById("Level1");
			var roadpart1 = document.createElement("div");
			roadpart1.className = 'road';
			roadpart1.style.width = '75px';
			roadpart1.style.top = '50px';
			lvl.appendChild(roadpart1);
			var roadpart2 = document.createElement("div");
			roadpart2.className = 'road';
			roadpart2.style.width = '250px';
			roadpart2.style.top = '100px';
			roadpart2.style.left = '-25px';
			roadpart2.style.transform = 'rotate(90deg)';
			lvl.appendChild(roadpart2);
			var roadpart3 = document.createElement("div");
			roadpart3.className = 'road';
			roadpart3.style.width = '300px';
			roadpart3.style.top = '200px';
			roadpart3.style.left = '75px';
			roadpart3.style.transform = 'rotate(0deg)';
			lvl.appendChild(roadpart3);
			var roadpart4 = document.createElement("div");
			roadpart4.className = 'road';
			roadpart4.style.width = '250px';
			roadpart4.style.top = '0px';
			roadpart4.style.left = '225px';
			roadpart4.style.transform = 'rotate(-90deg)';
			lvl.appendChild(roadpart4);
			var roadpart5 = document.createElement("div");
			roadpart5.className = 'road';
			roadpart5.style.width = '125px';
			roadpart5.style.top = '-150px';
			roadpart5.style.left = '375px';
			lvl.appendChild(roadpart5);
			var road = document.getElementsByClassName('road');
			for(var i = 0; i < road.length; i++){
			road[i].style.height = '50px';
			road[i].style.backgroundColor = 'blue';
			road[i].style.position = 'relative';
			}
			castle = new Castle(450,50,100);
		}
	}
	this.Arrow = function(whichArrow, WhatToDo){
		window.addEventListener('keydown', function(e){
			switch(e.keyCode){
				case 37:
				if(whichArrow == 'left'){
					WhatToDo();
				}
				break;
				case 40:
				if(whichArrow == 'bottom'){
					WhatToDo();
				}
				break;
				case 38:
				if(whichArrow == 'top'){
					WhatToDo();
				}
				break;
				case 39:
				if(whichArrow == 'right'){
					WhatToDo();
				}
				break;
			}
		})
	}
}
var Enemy = function(x, y, size, speed, color, type, name){
	    this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.type = type;
		this.name = name;
		this.speed = speed;
		this.hp = 0;
		this.damage = 1;
		this.attack = function(damage, castleName){
			if(castleName.hp > 0){
			castleName.hp -= damage;
			document.getElementById("castle-hp-amount").innerHTML = castleName.hp+' <i class="fa fa-heart" aria-hidden="true" style="color:red;"></i>';
		    if(castleName.hp < 0){
			castleName.hp = 0;
			document.getElementById("castle-hp-amount").innerHTML = castleName.hp+' <i class="fa fa-heart" aria-hidden="true" style="color:red;"></i>';
			}
			}else{
			castleName.hp = 0;
            document.getElementById("castle-hp-amount").innerHTML = castleName.hp+' <i class="fa fa-heart" aria-hidden="true" style="color:red;"></i>';
			setInterval(function(){
				GDiv.innerHTML = '';
				GDiv.style.backgroundColor = 'red';
				GDiv.style.textAlign = 'center';
				GDiv.innerHTML = '<h2 style="position:relative;top:100px;">Game Over!</h2>';
			},0);
			}
		}
		this.updateX = function(number){
			this.x += number;
			document.getElementById(this.name).style.left = this.x+"px";
		};
		this.posX = function(number){
			this.x = number;
			document.getElementById(this.name).style.left = this.x+"px";
		};
		this.updateY = function(number){
			this.y += number;
			document.getElementById(this.name).style.top = this.y+"px";
		};
		this.posY = function(number){
			this.y = number;
			document.getElementById(this.name).style.top = this.y+"px";
		};
		this.remove = function(){
			document.getElementById(this.name).parentNode.removeChild(document.getElementById(this.name));
		}
		this.hide = function(){
			document.getElementById(this.name).style.visibility = 'hidden';
		};
		this.show = function(){
			document.getElementById(this.name).style.visibility = 'visible';
		};
		this.hit = function(amount,variableName){
			var variable = variableName;
			variable.hp -= amount; 
			var elem = document.getElementById("hp-status-"+variable.name);
			elem.style.width = 46 * (variable.hp / (variable.hp + amount))+"px";
		}
		this.move = function(level, variable){
			var i = 0;
			var enemy = document.getElementById(variable.name);
			var hp = document.getElementById('hp-'+variable.name);
			hp.style.transform = 'rotate(-90deg)';
			hp.style.transition = 'transform .3s linear';
			enemy.style.transform = 'rotate(90deg)';
			enemy.style.transition = 'transform .3s linear';
			switch(level){
				case 1:
					var moveInt = setInterval(function(){
						i++;
						if(i < 81/variable.speed){
							variable.show();
							variable.updateX(variable.speed);
							hp.style.transform = 'rotate(-90deg)';
							hp.style.top = '14.5px';
							hp.style.left = '-7px';
							enemy.style.transform = 'rotate(90deg)';
						}else if(i < 331/variable.speed){
							variable.updateY(variable.speed);
							hp.style.transform = 'rotate(-180deg)';
							hp.style.top = '14.5px';
							hp.style.left = '-7px';
							enemy.style.transform = 'rotate(180deg)';
						}else if(i < 581/variable.speed){
							variable.updateX(variable.speed);
							hp.style.transform = 'rotate(-90deg)';
							hp.style.top = '14.5px';
							hp.style.left = '-7px';
							enemy.style.transform = 'rotate(90deg)';
						}else if(i < 831/variable.speed){
							variable.updateY(-variable.speed);
							hp.style.transform = 'rotate(0deg)';
							hp.style.top = '14.5px';
							hp.style.left = '-7px';
							enemy.style.transform = 'rotate(0deg)';
						}else if(i < 961/variable.speed){
							variable.updateX(variable.speed);
							hp.style.transform = 'rotate(-90deg)';
							hp.style.top = '14.5px';
							hp.style.left = '-7px';
							enemy.style.transform = 'rotate(90deg)';
						}else{
							if(variable.x > 450){
								variable.attack(variable.damage,castle);
								variable.remove();
								clearInterval(moveInt);
							}
						}
					},1000/30);
				break;
			}
		}
		var enemy = document.createElement('div');
		enemy.id = this.name;
		enemy.style.position = 'absolute';
		enemy.style.left = this.x+(this.size/2)+"px";
		enemy.style.top = this.y+"px";
		enemy.style.border = '2px solid #bbb';
		enemy.style.boxSizing = 'border-box';
		enemy.style.visibility = 'hidden';
		enemy.style.zIndex = '-1';
		enemy.innerHTML = '<div id="hp-'+this.name+'" style="background-color:#777;width:50px;height:8px;position:relative;box-sizing:border-box;border:2px solid #aaa;border-radius:2.5px;box-shadow:0px 0px 2px #000;"><div id="hp-status-'+this.name+'" style="float:left;position:relative;background-color:red;width:46px;height:4px;"></div></div>';
		if(type == undefined || type == 'box'){
			enemy.style.backgroundColor = this.color;
			enemy.style.width = this.size+"px";
			enemy.style.height = this.size+"px";
		}
		if(type == 'bubble'){
			enemy.style.boxSizing = 'border-box';
			enemy.style.backgroundColor = '';
			enemy.style.border = '3px solid '+this.color;
			enemy.style.borderRadius = '100%';
			enemy.style.width = this.size+"px";
			enemy.style.height = this.size+"px";
		}
		if(type == 'circle'){
			enemy.style.backgroundColor = this.color;
			enemy.style.borderRadius = '100%';
			enemy.style.width = this.size+"px";
			enemy.style.height = this.size+"px";
		}
		if(type == 'triangle'){
			enemy.style.width = '0';
			enemy.style.height = '0';
			enemy.style.backgroundColor = '';
			enemy.style.borderLeft = (this.size/2)+'px solid transparent';
			enemy.style.borderRight = (this.size/2)+'px solid transparent';
			enemy.style.borderBottom = (this.size/2)+'px solid '+this.color;
		}
		GDiv.appendChild(enemy);
	}
	var Castle = function(x,y,hp){
		this.x = x;
		this.y = y;
		this.hp = hp;
		var castle = document.createElement("div");
		var width = 50;
		var height = 50;
		castle.style.position = 'relative';
		castle.style.left = this.x+"px";
		castle.style.top = this.y+"px";
		castle.style.width = width+'px';
		castle.style.height = height+'px';
		castle.id = 'Castle';
		castle.style.background = 'url("https://d30y9cdsu7xlg0.cloudfront.net/png/198720-200.png")';
		castle.style.backgroundSize = width+'px '+height+'px';
		castle.style.backgroundColor = 'green';
		castle.style.zIndex = '-2';
		GDiv.appendChild(castle);
		var castleHP = document.createElement('div');
		castleHP.id = 'castle-hp';
		castleHP.innerHTML = '<p id="castle-hp-amount" style="width:60px;padding:5px;background-color:green;border-radius:5px;border:2px solid darkgreen;box-size:border-box;">'+this.hp+' <i class="fa fa-heart" aria-hidden="true" style="color:red;"></i></p>';
		castleHP.style = 'color:white;position:relative;left:320px;top:290px;';
		GDiv.appendChild(castleHP);
	}
	var i = 0;
	function Shop(){
		i++;
		var artillerieshop = document.createElement("div");
		artillerieshop.style.width = "150px";
		artillerieshop.style.height = GDiv.style.height;
		artillerieshop.style.backgroundColor = 'rgba(0,0,0,0.7)';
		artillerieshop.style.position = 'relative';
		artillerieshop.style.top = '-150px';
		artillerieshop.zIndex = '999999';
		artillerieshop.id = 'TheShop';
		GDiv.appendChild(artillerieshop);
		if(i == 1){
		document.getElementById("TheShop").style.visibility = 'visible';
		}else{
		document.getElementById("TheShop").style.visibility = 'hidden';
		i = 0;
		}
	}