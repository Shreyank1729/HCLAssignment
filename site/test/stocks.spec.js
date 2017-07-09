var publisher = new StockPublisher();

var subscriber1 = new Observer();
var subscriber2 = new Observer();
var subscriber3 = new Observer();

publisher.subscribe(subscriber1);
publisher.subscribe(subscriber2);
publisher.subscribe(subscriber3);

describe("Subscriber Check ", function() {
  it("Check the number of subscribers", function() {
    expect(publisher.getNumberOfSubscribers()).toBe(3);
  });
});


describe("Element Creation Check ", function() {
  it("Check if elements are created", function() {
  	var element = subscriber1.createElement('td', "dummyCell1")
    expect(element.id).toBe("dummyCell1");
    expect(element.nodeName).toBe("TD");
  });
});


describe("Spark Element Creation Check ", function() {
  it("Check if spark element is created", function() {
  	var data = {name : 'abc'}
	element = subscriber1.getSparkElement(data);
	expect(element.id).toBe("sparkabc");
    expect(element.nodeName).toBe("SPAN");
  });
});

describe("Row creation", function() {
  it("Check if rows are created based on data", function() {
  	var dummyData = {name : 'abc' , askBid : '12.3445' , 'bestBid' : '13.124'}
	element = subscriber1.createTableRows(dummyData);
	expect(element.innerHTML).toBe('<td id="nameabc">abc</td><td id="askBidabc">12.3445</td><td id="bestBidabc">13.124</td>');
  });
});