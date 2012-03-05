var Crawler = require("simplecrawler").Crawler;
// var myCrawler = new Crawler("jeradbitner.com");
var myCrawler = new Crawler("engineering.mit.edu");
myCrawler.domain = "engineering.mit.edu";
myCrawler.supportedMimeTypes = [
  /^text\//i
];
myCrawler.scanSubdomains = false;
myCrawler.ignoreWWWDomain = true;
// myCrawler.discoverResources = false;

var items = new Array;

myCrawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
  // Only want html pages &&
  // only want stuff on this domain. (Seems to pull in other things sometimes
  //   even though simplcrawler claims it should not).
  if (queueItem.stateData.contentType.indexOf("text/html") != -1 &&
    (queueItem.domain  == myCrawler.domain)) {
    items.push(queueItem.path);
    console.log(queueItem.url);
  }
});

myCrawler.start();

myCrawler.on("complete", function() {
  console.log(items);
  console.log(items.length);
});