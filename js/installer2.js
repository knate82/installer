//function used in loop to split string in order to give me the ability to to actually check current package and dependency.
function strToArr(str, splitChar){
  return str.split(splitChar);
}

function createInstaller(pkgArr){
  var installOrder = [];
  //first step get all packages with no dependencies
  for(var i = 0; i < pkgArr.length;){
    if(/:\s\w/.test(pkgArr[i])){
      i++;
    } else {
      //remove extra characters
      pkgArr[i].split(": ");
      //push to installOrder Array
      installOrder.push(pkgArr[i][0]);
      //remove installed item from array
      pkgArr.splice(i, 1);
    }
  }
  //second step itterate through remaining pakages and install only after dependency is installed.
  for(var i = 0; i < pkgArr.length; i++){
    console.log("pkgArr: "+pkgArr);
    var dependents = pkgArr[i].split(': ');
    //check current package dependency to see if it's already installed.
    for(var j = 0; j < installOrder.length; j++){
      //if it is, install current package
      if(installOrder[j] === dependents[1]){
        installOrder.push(dependents[0]);
        pkgArr.splice(i, 1);
      } else {
        pkgArr.push(pkgArr[i]);
        pkgArr.splice(i, 1);
      }
    }
  }
  console.log(installOrder);
}
createInstaller(['E: F', 'F: G', 'G: ', 'A: B', 'B: C', 'C: D', 'D: ']);
