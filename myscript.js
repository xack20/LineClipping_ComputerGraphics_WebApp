var xmin,xmax,ymin,ymax;
var x1,y1,x2,y2;


function check(x, y){

  var v = "" ;
  v = (y > ymax ) ? v.concat("1") : v.concat("0");
  v = (y < ymin) ? v.concat("1") : v.concat("0");
  v = (x > xmax) ? v.concat("1") : v.concat("0");
  v = (x < xmin) ? v.concat("1") : v.concat("0");

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

  var p1 = check(x1,y1) , p2 = check(x2,y2);

  if(p1 == "0000" && p2 == "0000")



  var show = "The region code for ( "+x1+", "+y1+" ) is "+check(x1,y1)+"<br>"   +
             "The region code for ( "+x2+", "+y2+" ) is "+check(x2,y2)+"<br>";



  document.getElementById('l1').innerHTML = show;

}
