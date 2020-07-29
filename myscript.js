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

    var m = 0;
    if(x2-x1) m = (y2-y1)/(x2-x1);

  var p1 = check(x1,y1) , p2 = check(x2,y2);


  var show = "The region code for ( "+x1+", "+y1+" ) is "+check(x1,y1)+".<br>"   +
             "The region code for ( "+x2+", "+y2+" ) is "+check(x2,y2)+".<br>";

  if(p1 == "0000" && p2 == "0000")show+="<br><br><br>The line is <b>Visible</b> because both region code is <b>0000</b>.<br>";
  else if(p1&p2)show+="<br><br><br>The line is <b>Not Visible</b> because the BitWise AND of two ends is <b>not 0000</b>.<br>";
  else{

    show+="<br>This line is a <b>Clipping Candidate</b> because the BitWise AND of <br> two ends is <b>0000</b>.<br><br>";
    show+="Value of slope <b>m</b> = (y<sub>2</sub> - y<sub>1</sub>) / (x<sub>2</sub> - x<sub>2</sub>) = <b>"+m.toPrecision(3)+"</b><br>";


    if(p1=="0000")show+="This ( "+x1+", "+y1+" ) End is already in the clipping area.<br>"
    else {
      show+="<br><b>Calculating Clipping Coordinates for ( "+x1+", "+y1+" ).</b><br><br>";
      var xi=x1,yi=y1;

      var fx=0,fy=0;

      if(p1[0]=='1'){
          yi=ymax;
          show+= "<b>Y<sub>i</sub></b> = Y<sub>max</sub> = <b>"+yi+"</b> ['.' the region code is <b>"+p1[0]+"</b>"+p1[1]+p1[2]+p1[3]+" ].<br>";
          fy=1;
      }
      if(p1[1]=='1'){
          yi=ymin;
          show+= "<b>Y<sub>i</sub></b> = Y<sub>min</sub> = <b>"+yi+"</b> ['.' the region code is "+p1[0]+"<b>"+p1[1]+"</b>"+p1[2]+p1[3]+" ].<br>";
          fy=1;
      }
      if(p1[2]=='1'){
          xi=xmax;
          show+= "<b>X<sub>i</sub></b> = X<sub>max</sub> = <b>"+xi+"</b> ['.' the region code is "+p1[0]+p1[1]+"<b>"+p1[2]+"</b>"+p1[3]+" ].<br>";
          fx=1;
      }
      if(p1[3]=='1'){
          xi=xmin;
          show+= "<b>X<sub>i</sub></b> = X<sub>min</sub> = <b>"+xi+"</b> ['.' the region code is "+p1[0]+p1[1]+p1[2]+"<b>"+p1[3]+"</b> ].<br>";
          fx=1;
      }

      if(!fx){
        if(m)xi+= ((yi-y1) / m);
        show+="<b>X<sub>i</sub></b> = X<sub>i</sub> + ( (Y<sub>i</sub> - Y<sub>1</sub>) / m ) = <b>"+xi+"</b>.<br>";
      }
      if(!fy){
        yi+= ((xi-x1) * m);
        show+="<b>Y<sub>i</sub></b> = Y<sub>i</sub> + ( (X<sub>i</sub> - X<sub>1</sub>) * m ) = <b>"+yi.toPrecision(3)+"</b>.<br>";
      }


    }


  }


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
