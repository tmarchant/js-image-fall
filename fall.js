/*   Free Script provided by HIOXINDIA            */
/*   visit us at http://www.hscripts.com     */
/*   This is a copyright product of hioxindia.com */

var image = "leaf.gif";  //Image path should be given here
var no = 10; // No of images should fall
var speed = 40; // Fix how fast the image should fall
var dwidth = window.innerWidth;
var dheight = window.innerHeight; 

function updateViewport() {
	dheight = window.innerHeight+document.body.scrollTop;
}
 	
setInterval(updateViewport,500);

var fallers = new Array();

function Faller() {
	this.cv = 0;
	this.px = Math.random()*(window.innerWidth-100);  // set position variables
	this.py = -(Math.random()*dheight) - 100;     // set position variables
	this.am = Math.random()*20;         // set amplitude variables
	this.sx = 0.02 + Math.random()/10;  // set step variables
	this.sy = 0.6 + Math.random();    // set step variables
	
	this.rotates = Math.random() > 0.7;
	this.rotation = 0;
}

for (var i = 0; i < no; ++ i) {  
	buildFaller(i);
}

function buildFaller(i) {
	fallers[i] = new Faller()
	document.write("<div id=\"dot"+ i +"\" style=\"POSITION: absolute; Z-INDEX: 9000; TOP: 15px;LEFT: 15px;\"><img src='"+image+"'><\/div>");
}

function animate() {
	for (i = 0; i < no; ++ i) {
		var f = fallers[i];
		
		f.py += f.sy;
		if (f.py > dheight-50) {
			f = new Faller();
			fallers[i] = f;
		}
		f.cv += f.sx;
		
		var elem = document.getElementById("dot"+i);
		
		elem.style.top=f.py+"px";
		elem.style.left=f.px + f.am*Math.sin(f.cv)+"px";  
		
		if (f.rotates) {
			elem.style.transform = "rotate("+f.rotation+"deg)"
			f.rotation+=3;
		}
    }
}

setInterval(animate, speed);

/*   Free Script provided by HIOXINDIA            */
/*   visit us at http://www.hscripts.com     */
/*   This is a copyright product of hioxindia.com */

