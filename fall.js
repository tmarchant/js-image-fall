var imageUrl = "babycorn.gif";  //Image path should be given here
var count = 15; // count of images should fall
var fallerSpeed = 30; // Fix how fast the image should fall. Smaller is faster
var explosionAnimationDelay = 40;
var viewportWidth, viewportHeight;
var fallers = new Array();
var explosions = new Array();
var score = 0;
var onlyOnKonami = false;

function init() {
	updateViewport(); 	
	setInterval(updateViewport,500);

	for (var i = 0; i < count; i++) {  
		fallers[i] = new Faller();
	}
	
	setInterval(animateFallers, fallerSpeed);
	setInterval(animateSplosions, explosionAnimationDelay);
}

function updateViewport() {
	viewportHeight = window.innerHeight+document.body.scrollTop;
	viewportWidth = window.innerWidth;
}

function Faller() {
	var _this = this;
	
	this.reset = function() {
		this.x = Math.random()*(window.innerWidth-100);  // set position variables
		this.y = -(Math.random()*viewportHeight);     // set position variables
		this.deltaX = 0.03 + Math.random()/10;  // set step variables
		this.deltaY = 0.6 + Math.random();    // set step variables
		this.spread = Math.random()*20;         // set amplitude variables
		this.cv = 0;
		
		this.rotates = Math.random() > 0.6
		this.dr = Math.random() > 0.5 ? 3 : -3
		this.rotation = 0
	}

	this.createElement = function() {
		this.elem = document.createElement("div");
		this.elem.className = "js-fall-faller";
		this.elem.id = "dot"+fallers.length;
		
		var img = document.createElement("img");
		img.src = imageUrl;
		this.elem.appendChild(img);
		
		document.body.appendChild(this.elem);
		
		this.elem.addEventListener("click", function() {
			incrementScore();
			_this.spawnExplosion();
			_this.reset();
		});
	}
	
	this.getCentrePoint = function() {
		var rect = this.elem.getBoundingClientRect();
		return {
			left: rect.left+(rect.width/2),
			top: rect.top+(rect.height/2)
		}
	}
	
	this.spawnExplosion = function() {
		var centrePoint = this.getCentrePoint();
		explosionAt(centrePoint.left, centrePoint.top);
	}
	
	this.reset();
	this.createElement();
}

function incrementScore() {
	var scoreElem = document.querySelector(".js-fall-score");
	
	if (!scoreElem) {
		scoreElem = document.createElement("span");
		scoreElem.className = "js-fall-score";
		document.body.appendChild(scoreElem);
	}

	score+=10;
	scoreElem.innerHTML = "SCORE: "+score;
}

function explosionAt(left, top) {
	var splosion = new Explosion(left, top)
	explosions.push(splosion);
}

function Explosion(left, top) {
	this.frame = 1;
	this.frameWidth = 157;
	this.frameHeight = 229;
	this.totalFrames = 20;
	
	this.elem = document.createElement("div");
	this.elem.className = "js-fall-explosion"
	this.elem.style.top = top-(this.frameHeight/2)+"px";
	this.elem.style.left = left-(this.frameWidth/2)+"px";
	
	document.body.appendChild(this.elem);
	
	this.isFinished = function() {
		return this.frame == this.totalFrames
	}
	
	this.remove = function() {
		this.elem.parentNode.removeChild(this.elem)
	}
}

function animateFallers() {
	for (i = 0; i < fallers.length; i++) {
		var f = fallers[i];
		
		f.y += f.deltaY;
		if (f.y > viewportHeight) {
			fallers[i].reset();
		}
		f.cv += f.deltaX;

		f.elem.style.top=f.y+"px";
		f.elem.style.left=f.x + f.spread*Math.sin(f.cv)+"px";  
		
		if (f.rotates) {
			f.elem.style.transform = "rotate("+f.rotation+"deg)"
			f.rotation+=f.dr;
		}
    }
}

function animateSplosions() {
	while (explosions.length && explosions[0].isFinished()) {
		explosions.shift().remove();
	}
	
	for (i = 0; i < explosions.length; i++) {
		var e = explosions[i];
		e.elem.style.backgroundPosition = "-"+ e.frame*e.frameWidth + "px 0px"
		e.frame++
    }
}


var lastKeyPresses = []
var konami = "38,38,40,40,37,39,37,39,66,65";

if (onlyOnKonami) {
	document.addEventListener("keydown", function(e) {
		lastKeyPresses.push(e.keyCode);
		
		if (lastKeyPresses.toString().indexOf(konami) >= 0 ) {
			init();
		}
		while (lastKeyPresses.length > 10) {
			lastKeyPresses.shift();
		}
	});
} else {
	init();
}

/*   Free Script provided by HIOXINDIA            */
/*   visit us at http://www.hscripts.com     */
/*   This is a copyright product of hioxindia.com */

