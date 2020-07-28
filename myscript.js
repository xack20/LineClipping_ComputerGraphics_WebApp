var xmin,xmax,ymin,ymax;
var x1,y1,x2,y2;


function check(x, y){

  var v = 0 ;
  if(y > ymax )v|=8;
  if(y < ymin)v|=4;
  if(x > xmax)v|=2;
  if(x < xmin)v|=1;

  return v;
}

function calc(){
  xmin = document.getElementById('xmin').value;
  xmax = document.getElementById('xmax').value;
  ymin = document.getElementById('ymin').value;
  ymax = document.getElementById('ymax').value;

  x1 = document.getElementById('x1').value;
  y1 = document.getElementById('y1').value;
  x2 = document.getElementById('x2').value;
  y2 = document.getElementById('y2').value;

  var p1 = check(x2,y2);


}
