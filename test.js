/* eslint-disable */

let modifiedformat = '03d10h05m15s'
const timeformats = ['d', 'h', 'm', 's'];
let totalTime = 0;
while (modifiedformat !== '') {
  for (let formatcount = 0; formatcount < timeformats.length; formatcount++) {
  	console.log("begin");
    if (modifiedformat.indexOf(timeformats[formatcount]) !== -1) {
      switch (modifiedformat.substring(modifiedformat.indexOf(timeformats[formatcount]), modifiedformat.indexOf(timeformats[formatcount]) + 1)) {
        case 'd':
          var numOfUnits = parseInt(modifiedformat.substring(modifiedformat.indexOf(timeformats[formatcount]) - 2, modifiedformat.indexOf(timeformats[formatcount])));
          totalTime += 86400 * numOfUnits;
          break;
        case 'h':
          numOfUnits = parseInt(modifiedformat.substring(modifiedformat.indexOf(timeformats[formatcount]) - 2, modifiedformat.indexOf(timeformats[formatcount])));
          totalTime += 3600 * numOfUnits;
          break;
        case "m":
          numOfUnits = parseInt(modifiedformat.substring(modifiedformat.indexOf(timeformats[formatcount]) - 2, modifiedformat.indexOf(timeformats[formatcount])));
          totalTime += 60 * numOfUnits;
          break;
        case "s":
          numOfUnits = parseInt(modifiedformat.substring(modifiedformat.indexOf(timeformats[formatcount]) - 2, modifiedformat.indexOf(timeformats[formatcount])));
          totalTime += numOfUnits;
          break;
      }
      modifiedformat = modifiedformat.substring(modifiedformat.indexOf(timeformats[formatcount]) + 1, modifiedformat.length);
      console.log(modifiedformat)
    }
  }
}
console.log(totalTime)
let date = new Date().getTime()
console.log(date.toString().substring(0, (date.toString().length - 3)))