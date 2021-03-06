function dependencies(depArr){
  var dependencyObj = {};
  var installOrder = [];

  for (var i = 0; i < depArr.length; i++) {
    var tempArr = depArr[i].split(': ');
    if (tempArr[1] === "") {
      installOrder.push(tempArr[0]);
    } else {
      if (!dependencyObj.hasOwnProperty(tempArr[1])) {
        dependencyObj[tempArr[1]] = [tempArr[0]];
      }
      else {
        dependencyObj[tempArr[1]].push(tempArr[0]);
      }
    }
  }

  for (var i = 0; i < installOrder.length; i++){
    if(dependencyObj.hasOwnProperty(installOrder[i])){
      for(var j = 0; j < dependencyObj[installOrder[i]].length; j++){
        installOrder.push(dependencyObj[installOrder[i]][j]);
      }
      delete dependencyObj[installOrder[i]];
    }
  }
  return installOrder;
}
console.log(dependencies(['A: B', 'B: C', 'C: ']));
console.log(dependencies(['E: F', 'F: G', 'G: ', 'A: B', 'B: C', 'C: D', 'D: ']));
console.log(dependencies(['CamelCaser: ', 'SuperMan: Kryptonite', 'Kryptonite: CamelCaser']));
