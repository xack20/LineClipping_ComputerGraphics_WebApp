var xmin,xmax,ymin,ymax;
var x1,y1,x2,y2;

function calc(){

    xmin = Number(document.getElementById('xmin').value);
    xmax = Number(document.getElementById('xmax').value);
    ymin = Number(document.getElementById('ymin').value);
    ymax = Number(document.getElementById('ymax').value);

    x1 = Number(document.getElementById('x1').value);
    y1 = Number(document.getElementById('y1').value);
    x2 = Number(document.getElementById('x2').value);
    y2 = Number(document.getElementById('y2').value);

  var p1 = check(x1,y1) , p2 = check(x2,y2);


  var show = "The region code for ( "+x1+", "+y1+" ) is "+check(x1,y1)+".<br>"   +
             "The region code for ( "+x2+", "+y2+" ) is "+check(x2,y2)+".<br>";

  if(p1 == "0000" && p2 == "0000")show+="<br><br><br>The line is <b>Visible</b> because both region code is <b>0000</b>.<br>";
  else if(p1&p2)show+="<br><br><br>The line is <b>Not Visible</b> because the BitWise AND of two ends is <b>not 0000</b>.<br>";

  document.getElementById('l1').innerHTML = show;

}

function check(x, y){
  var v = "" ;
  v = (y > ymax ) ? v.concat("1") : v.concat("0");
  v = (y < ymin) ? v.concat("1") : v.concat("0");
  v = (x > xmax) ? v.concat("1") : v.concat("0");
  v = v.concat( (x < xmin) ? '1' : '0');
  return v;
}
