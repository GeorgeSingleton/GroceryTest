var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {

	if(xhr.readyState ===4){

		//Parse JSON
		var groceries = JSON.parse(xhr.responseText);

		//Loop through groceries
		for (var i = 0; i < groceries.length; i++) { 
					
			//Define method to get total items
			groceries[i].total = function(){
				var totalItems = 0;

				for (var x = 0; x < groceries[i].baskets.length; x++) {
					totalItems += groceries[i].baskets[x];
				}
				return(totalItems);
			}

			//Define method to get total cost
			groceries[i].totalCost = function(){
				var totalCost = groceries[i].total() * groceries[i].unit_cost;
				return totalCost;
			}

			//Define fucntion to print to page
			function printToPage(){
				//Find grocery list from DOM
				var groceryList = document.getElementById("groceryList");

				//Create relevant elements to add to page
				var li = document.createElement("li");
				var name = document.createElement("h2");
				var totalBaskets = document.createElement("p");
				var totalItems = document.createElement("p");
				var costPerItem = document.createElement("p");
				var totalCost = document.createElement("p");

				//Populate elements with data
				name.textContent = "Name: " + groceries[i].name;
				totalBaskets.textContent = "Total Baskets: " + groceries[i].baskets.length;
				totalItems.textContent = "Total Items: " + groceries[i].total();
				costPerItem.textContent = "Cost Per Item: £" + groceries[i].unit_cost.toFixed(2);
				totalCost.textContent = "Total Cost: £" + groceries[i].totalCost().toFixed(2);

				//Insert elements to DOM
				groceryList.appendChild(li);
				li.appendChild(name);
				li.appendChild(totalBaskets);
				li.appendChild(totalItems);
				li.appendChild(costPerItem);
				li.appendChild(totalCost);
			}

			printToPage();

		}

	}
};

xhr.open('GET', 'data/groceries.json');
xhr.send();
