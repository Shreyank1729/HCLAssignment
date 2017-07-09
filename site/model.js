function StockPublisher(){
	this.observers = [];
}

StockPublisher.prototype.subscribe = function(observer){
	this.observers.push(observer)
}

StockPublisher.prototype.notify = function(observer, data){
	var index = this.observers.indexOf(observer);
	if(index > -1){
		this.observers[index].notify(index, data);
	}
}

StockPublisher.prototype.getNumberOfSubscribers = function(observer, data){
	return this.observers.length;
}

function Observer(){
	var self = this;
	self.stocks = [];

	self.createSparkLines = function(row, sparkElement){
		var sparkline = new Sparkline(sparkElement);
    	var bestBid = row['bestBid'],
    	bestAsk = row['bestAsk'];
    	var midprice = (bestBid + bestAsk) /2;
    	sparkline.draw([0 , bestBid, midprice, bestAsk, 1]);
	}

	self.createElement = function(element, id){
		var element = document.createElement(element);
		element.setAttribute("id", id);
		return element;
	}

	self.createTableRows = function(row){
		var rowElement = document.createElement('tr');
    	for (var cell in row) {
			var element = self.createElement('td', cell + row['name']);
			element.appendChild(document.createTextNode(row[cell]));
			rowElement.appendChild(element);
    	}

    	return rowElement;
	}

	self.getSparkElement = function(data){
		var sparkElement = self.createElement('span', "spark" + data['name']);
    	this.createSparkLines(data, sparkElement);
    	return sparkElement;
	}
}

Observer.prototype.notify = function(index, data){
	var tableBody = document.getElementById("stockTable");
	var stock = JSON.parse(data.body);

	if(this.stocks && this.stocks.indexOf(stock['name']) == -1) {
		this.stocks.push(stock['name']);
    	var stockRow = this.createTableRows(stock);
    	var sparkElement = this.getSparkElement(stock);
		stockRow.appendChild(sparkElement)
    	tableBody.appendChild(stockRow);
    }
    else {
    	for (var item in stock) {
            document.getElementById(item + stock['name']).innerHTML = stock[item];
    	}

    	var sparkElement = document.getElementById("spark" + stock['name'])
		this.createSparkLines(stock, sparkElement);
    }
}