var xmin, xmax, ymin, ymax;
var x1, y1, x2, y2;

function calc() {

  xmin = Number(document.getElementById('xmin').value);
  xmax = Number(document.getElementById('xmax').value);
  ymin = Number(document.getElementById('ymin').value);
  ymax = Number(document.getElementById('ymax').value);

  x1 = Number(document.getElementById('x1').value);
  y1 = Number(document.getElementById('y1').value);
  x2 = Number(document.getElementById('x2').value);
  y2 = Number(document.getElementById('y2').value);

  var m = ((x2 - x1) ? ((y2 - y1) / (x2 - x1)) : 0);
  var p1 = check(x1, y1);
  var p2 = check(x2, y2);

  var dbg = 0;

  var show = "";
  while (true) {

    show += "<br>The region code for <b>( " + x1.toPrecision(3) + ", " + y1.toPrecision(3) + " )</b> is <b>" + check(x1, y1) + "</b> and <b>( " + x2.toPrecision(3) + ", " + y2.toPrecision(3) + " )</b> is <b>" + check(x2, y2) + "</b>.<br>";

    if (p1 == "0000" && p2 == "0000") {
      show += "<br><br>The line is <b>Visible</b> because both region code is <b>0000</b>.<br>";
      break;
    } else if ((p1[0] == p2[0] && p2[0] == '1') || (p1[1] == p2[1] && p2[1] == '1') || (p1[2] == p2[2] && p2[2] == '1') || (p1[3] == p2[3] && p2[3] == '1')) {
      show += "<br><br>The line is <b>Not Visible</b> because the BitWise AND of two ends is <b>not 0000</b>.<br>";
      break;
    } else {

      show += "<br>This line is a <b>Clipping Candidate</b> because the BitWise AND of <br> two ends is <b>0000</b>.<br><br>";
      var xi, yi;

      xi = (p1 != "0000") ? x1 : x2;
      yi = (p1 != "0000") ? y1 : y2;

      var P = (p1 != "0000") ? p1 : p2;

      show += "<br><b>Calculating Clipping Coordinates for ( " + xi.toPrecision(3) + ", " + yi.toPrecision(3) + " ).</b><br><br>";


      if (P[0] == '1') {
        if (m) xi += ((ymax - yi) / m);
        yi = ymax;
        show += "<b>Y<sub>i</sub></b> = Y<sub>max</sub> = <b>" + yi.toPrecision(3) + "</b> ['.' the region code is <b>" + P[0] + "</b>" + P[1] + P[2] + P[3] + " ].<br>";
        show += "here, <b>m = </b> (Y<sub>2</sub> - Y<sub>1</sub>) / (X<sub>2</sub> - X<sub>1</sub>) = "+ m.toPrecision(3) + ".<br>";
        show += "<b>X<sub>i</sub></b> = X<sub>1</sub> + ( (Y<sub>i</sub> - Y<sub>1</sub>) / m ) = <b>" + xi.toPrecision(3) + "</b>.<br>";

      } else if (P[1] == '1') {
        if (m) xi += ((ymin - yi) / m);
        yi = ymin;
        show += "<b>Y<sub>i</sub></b> = Y<sub>min</sub> = <b>" + yi.toPrecision(3) + "</b> ['.' the region code is " + P[0] + "<b>" + P[1] + "</b>" + P[2] + P[3] + " ].<br>";
        show += "here, <b>m = </b> (Y<sub>2</sub> - Y<sub>1</sub>) / (X<sub>2</sub> - X<sub>1</sub>) = "+ m.toPrecision(3) + ".<br>";
        show += "<b>X<sub>i</sub></b> = X<sub>1</sub> + ( (Y<sub>i</sub> - Y<sub>1</sub>) / m ) = <b>" + xi.toPrecision(3) + "</b>.<br>";
      } else if (P[2] == '1') {
        yi += ((xmax - xi) * m);
        xi = xmax;
        show += "<b>X<sub>i</sub></b> = X<sub>max</sub> = <b>" + xi.toPrecision(3) + "</b> ['.' the region code is " + P[0] + P[1] + "<b>" + P[2] + "</b>" + P[3] + " ].<br>";
        show += "here, <b>m = </b> (Y<sub>2</sub> - Y<sub>1</sub>) / (X<sub>2</sub> - X<sub>1</sub>) = "+ m.toPrecision(3) + ".<br>";
        show += "<b>Y<sub>i</sub></b> = Y<sub>1</sub> + ( (X<sub>i</sub> - X<sub>1</sub>) * m ) = <b>" + yi.toPrecision(3) + "</b>.<br>";
      } else if (P[3] == '1') {
        yi += ((xmin - xi) * m);
        xi = xmin;
        show += "<b>X<sub>i</sub></b> = X<sub>min</sub> = <b>" + xi.toPrecision(3) + "</b> ['.' the region code is " + P[0] + P[1] + P[2] + "<b>" + P[3] + "</b> ].<br>";
        show += "here, <b>m = </b> (Y<sub>2</sub> - Y<sub>1</sub>) / (X<sub>2</sub> - X<sub>1</sub>) = "+ m.toPrecision(3) + ".<br>";
        show += "<b>Y<sub>i</sub></b> = Y<sub>1</sub> + ( (X<sub>i</sub> - X<sub>1</sub>) * m ) = <b>" + yi.toPrecision(3) + "</b>.<br>";
      }
    }
    if (p1 != "0000") {
      x1 = xi;
      y1 = yi;
      p1 = check(x1, y1);
    } else {
      x2 = xi;
      y2 = yi;
      p2 = check(x2, y2);
    }

  }
  document.getElementById('l1').innerHTML = show;
}



function check(x, y) {
  var v = "";
  v = (y > ymax) ? v.concat("1") : v.concat("0");
  v = (y < ymin) ? v.concat("1") : v.concat("0");
  v = (x > xmax) ? v.concat("1") : v.concat("0");
  v = v.concat((x < xmin) ? '1' : '0');
  return v;
}
