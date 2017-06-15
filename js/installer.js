// Create installer that installs packages and all their dependencies.  If a package has dependency, install dependency prior to package.
// Create code modules complete with controller.
var installOrder = [];
var dependents = [];
//Remove special characters
function polishArr(arr) {
return arr.toString().replace(/[^a-zA-z0-9:]/g, '');
}
function strToArr(str, splitChar){
  return str.split(splitChar);
}
//Get packages with no dependents and add them to the install array
function noDependents(pkgArr){
  for(var i = 0; i < pkgArr.length; i++){
    if(/:\s\w/.test(pkgArr[i])){
      dependents.push(pkgArr[i]);
    } else if(pkgArr[i]  === ','){
      i++;
    } else {
      var cleanPkg = polishArr(pkgArr[i]);
      installOrder.push(cleanPkg);
    }
  }
}
//Loop through packages that are left over and install what is needed for dependencies
function organizer(dependents){
  for(var i = 0; i < dependents.length; i++){
    var install = dependents[i].toString().split(': ');
    //Strip Special Characters so my comparison below will actually work...
    var cleanPkg1 = polishArr(install[1]);
    for(var x = 0; x < installOrder.length; x++){
      if(cleanPkg1 == installOrder[x]) {
        var cleanPkg = polishArr(install[0]);
        installOrder.push(cleanPkg);
      }
    }
  }
}
// Install Service Controller
function installController(pkgArr){
  // Break up main string into a usable array.
  //var pkgArr = strToArr(str, ",");
  noDependents(pkgArr);
  organizer(dependents);
  console.log('install order: '+installOrder);
}

// // Accept input from command line
// var prompt = require('prompt');
//
// // Start prompt
// prompt.start();
//
// //Get information from user: (package: dependency)
// prompt.get(['packages'], function(err, result){
//   //Call controlling function
//   return installController(result.packages);
// });
