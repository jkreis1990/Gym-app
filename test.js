function ConvexHullPoints(strArr) { 
  let points = strArr.map(val => val.match(/\d+/g).map(val => Number(val))).sort(Comparison);
  let removed = false;
  do {
    let middle = CalculateMiddle (points);
    let area = CalculateArea (points, middle);
    for (i = 0; i < points.length; i++) {
      let removedPoint = points.splice(i, 1)[0];
      if (area == CalculateArea (points, middle)) {
        removed = true;
        break;
      } else {
        removed = false;
        points.splice(i, 0, removedPoint);
      }
    }
    if (!removed) {
      return points.length;
    }
  } while (removed);
  
  function Comparison (a, b) {
    return a[0] == b[0] ? a[1] - b[1] : a[0] - b[0];
  }
  
  function CalculateMiddle (points) {
    let xVals = [];
    let yVals = [];
    points.map(point => point.map((val, ind) => ind == 0 ? xVals.push(val) : yVals.push(val)));
    let xMax = Math.max(...xVals);
    let xMin = Math.min(...xVals);
    let yMax = Math.max(...yVals);
    let yMin = Math.min(...yVals);
    return [xMin + ((xMax - xMin) / 2), yMin + ((yMax - yMin) / 2)];
  }
  
  function CalculateArea (points, middle) {
    let sum = 0;
    let count = points.length;
    for (j = 0; j < count; j++) {
      let a = points[j];
      let b = points[(j + 1) % count];
      let side1 = Math.sqrt(Math.pow(Math.abs(a[0] - b[0]), 2) + Math.pow(Math.abs(a[1] - b[1]), 2));
      let side2 = Math.sqrt(Math.pow(Math.abs(a[0] - middle[0]), 2) + Math.pow(Math.abs(a[1] - middle[1]), 2));
      let side3 = Math.sqrt(Math.pow(Math.abs(b[0] - middle[0]), 2) + Math.pow(Math.abs(b[1] - middle[1]), 2));
      let s = (side1 + side2 + side3) / 2;
      sum += Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
    }
    return sum;
  }
}

console.log(ConvexHullPoints(["(2,2)", "(3,1)", "(2,6)", "(0,1)", "(2,3)", "(5,2)"]));

var data = JSON.parse(arguments[0]),
  el = null,
  options = null,
  option = null;
for (var key in data) {
  el = document.getElementById(key);
  if (el != null) {
    if (el.nodeName === "SELECT") {
      options = el.options;
      if (el.options.selectedIndex == 0) {
        if (data[key] == "") {
          options.selectedIndex = 1;
        } else if (typeof data[key] == "string") {
          for (var i = 0; i < options.length; i++) {
            if (options[i].text === data[key]) {
              options.selectedIndex = i;
              break;
            }
          }
        } else if (typeof data[key] === "number") {
          document.getElementById(key).options.selectedIndex = data[key];
        }
      }
    } else if (el.nodeName == "INPUT" || el.nodeName == "TEXTAREA") {
      switch (el.type) {
        case "checkbox":
          el.checked = !!data[key];
          break;
        case "text":
        case "textarea":
          el.value = data[key];
          break;
        default:
          break;
      }
    } else if (el.nodeName == "FILE") {
        

    }
  }
}