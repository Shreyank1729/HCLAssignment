/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')

// Change this to get detailed logging from the stomp library
global.DEBUG = false;

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url);

var stockPublisher = new StockPublisher();
var observer = new Observer();
stockPublisher.subscribe(observer);


client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

function connectCallback() {
  	var subscription = client.subscribe("/fx/prices", function(data){
		stockPublisher.notify(observer, data);
	});
}

client.connect({}, connectCallback, function(error) {
  alert(error.headers.message)
})