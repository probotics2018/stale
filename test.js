/* eslint-disable */

let modifiedformat = '10h'
const timeformats = ['d', 'h', 'm', 's'];
while (modifiedformat !== '') {
  for (let formatcount = 0; formatcount < timeformats.length; formatcount++) {
  	console.log("begin");
    if (modifiedformat.indexOf(timeformats[formatcount]) !== -1) {
      console.log('modifiedformat: ' + modifiedformat.substring(modifiedformat.indexOf(timeformats[formatcount]) - 2, modifiedformat.indexOf(timeformats[formatcount]) + 1));
      console.log('modifiedformat: ' + modifiedformat.substring(modifiedformat.indexOf(timeformats[formatcount]), modifiedformat.indexOf(timeformats[formatcount]) + 1));
      switch (modifiedformat.substring(modifiedformat.indexOf(timeformats[formatcount]), modifiedformat.indexOf(timeformats[formatcount]) + 1)) {
        case 'd':
          console.log('days');
          break;
        case 'h':
          console.log("hours");
          break;
        case "m":
          console.log("minutes");
          break;
        case "s":
          console.log("sec");
          break;
      }
      modifiedformat = modifiedformat.substring(modifiedformat.indexOf(timeformats[formatcount]) + 1, modifiedformat.length);
      console.log(modifiedformat)
    }
  }
}