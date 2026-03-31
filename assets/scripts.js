// output:
// name,
// base + mixers + garnish


//nesting?
// if occasion is brunch
// base: abv below 6

// if weather is 20, 23, 24 & temp high (clear sky)
// base taste:{clear, crisp} 



let mixButton = document.querySelector('#submit')
let resultCard = document.querySelector('output')


//click button show result card
mixButton.addEventListener('click', () => { // “Listen” for clicks.	
	resultCard.classList.add('show') 
    showCard()
})

//what's inside the result card function
let showCard = (data) => {

	//DOM, everything in the result card
	let cocktailName = document.querySelector('#card-recipe-name')
	let cocktailBase = document.querySelector('#base')
	let cocktailMixers = document.querySelector('#mixers')
	let cocktailGarnish = document.querySelector('#garnish')
	

	//how to get the ysers selected values: https://www.w3schools.com/JSREF/tryit.asp?filename=tryjsref_select_value   
	let name = document.querySelector('#recipe-name').value
	let occasion = document.querySelector("#occasion").value
	let alcoholScale = document.querySelector("#alc-scale").value
	let adventureScale = document.querySelector("#adv-scale").value

	//need to see user input in console
	console.log(occasion)
	console.log(alcoholScale)
	console.log(adventureScale)

	let ingredientList = document.getElementById('ingredient-list')

		// Conditional if this is `false` (“not true”):
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
		//watched filter() tutorial: https://www.youtube.com/watch?v=nKglx7dN7Ss	
		//more about filter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
	
	
		let filterBase = data.base.filter(base => {
					   //Array.prototype(here is base from data) .filter()
			if (alcoholScale <= 3) 
				return base.abv === 1
			else if (alcoholScale <= 6) 
				return base.abv === 2
			else if (alcoholScale <= 10) 
				return base.abv === 3

			if (base.abv === 1) {
				return base.name
			}
		})

		data.base.forEach(base => {
			//data.base is an array so need to do foreach to target each base
			if (base.taste.includes('crisp')) {
				return base.name
			}
			console.log('taste:', base.name)
		})

		//if there is more than 1 base that matches, select randomly
		if (filterBase.length > 0) {
			const base = filterBase[Math.floor(Math.random() * filterBase.length)]
			let listItem = `
				<section class="base">
				<p>${base.name}</p>
				</section>
			`;

			ingredientList.insertAdjacentHTML('beforeend', listItem)
		}

		console.log(filterBase)
		

		// data.base.forEach(base => {
		// 	let listItem =
		// 		`           <section id="base">
		// 						<p>${data.base.name}</p>
		// 					</section>
		// 		`
		// 	ingredientList.insertAdjacentHTML('beforeend', listItem)
		// })

		// Don’t feel limited to `ul > li` for these—you can insert any DOM, anywhere!
	

	//since i have 4 filters, i was not sure how i can make the code work	
	//trying to understand boolean in js using if/else statements: https://claude.ai/share/e74a5c83-61c0-4e88-9b6f-27dc7947f5df
	//i don think this is the most efficient
	//filter() seems better, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter	
	//how to filter in js: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
	//here is an example: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_filter2
	//watched this tutorial: https://www.youtube.com/watch?v=nKglx7dN7Ss

    cocktailName.innerHTML = name; //name is what user types in, no filtering needed
	// cocktailBase.innerHTML = base;
	// cocktailMixers.innerHTML = mixers;
	// cocktailBase.innerHTML = garnish;

}







// Target your form.
let formElement = document.querySelector('#some-form')

// Function to match the form to URL/stored params.
let updateForm = (params) => {
	// Parse into params:
	// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
	params = new URLSearchParams(params)

	// Our friend, the `forEach` loop:
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
	params.forEach((value, key) => {
		// Find them by their ID.
		let inputOrSelect = document.getElementById(key)

		if (inputOrSelect) {
			// Set the actual input to the param value.
			inputOrSelect.value = value
		} else {
			// Radios are a bit different, find them by `name` attribute.
			document.querySelectorAll(`[name=${key}]`).forEach((element) => {
				if (value == element.value) { // Check the one matching the param value.
					element.checked = true
				}
			}
		)
		}
	})

	// And a callback! This function is defined over in `main.js`, for clarity.
	// stateCallback?.()
	// The `?.` is optional chaining:
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
}

// Function to save them to `localStorage`.
let storeParams = () => {
	// Get the form data:
	// https://developer.mozilla.org/en-US/docs/Web/API/FormData
	let formParams = new FormData(formElement)

	// Loop through each key/value pair.
	formParams.forEach((value, key) => {
		// And save them out to the browser:
		// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
		localStorage.setItem(key, value)
	})
}

// Function to update the URL from the form.
let updateUrlParams = () => {
	let formParams = new FormData(formElement) // Get the form data.

	formParams = new URLSearchParams(formParams) // Make it into params.
	formParams = formParams.toString() // And then into a string.

	// You could also write this as:
	// let formParams = new URLSearchParams(new FormData(formElement)).toString()

	// Update the URL with the params at the end.
	history.replaceState(null, null, '?' + formParams)
	// We use `history` here (instead of `location`) to not get into an infinite loop!
	// https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState

	// And also store them!
	storeParams()

	// And a callback!
	// stateCallback?.()
}



// First, check for query/params in the URL:
// https://developer.mozilla.org/en-US/docs/Web/API/Location/search
if (location.search) {
	let urlParams = location.search // Get the query string.

	updateForm(urlParams) // Update the form from these.
}
// Otherwise check for saved params in storage.
else if (localStorage.length > 0) {
	let storedParams = Object.entries(localStorage) // Get the saved params.

	updateForm(storedParams) // Update the form from these.
}


// Watch for events!
formElement.addEventListener('submit', (event) => {
	// Don’t actually submit (which would refresh the page):
	// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
	event.preventDefault()
})

// Run any time the form is modified:
// https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event
formElement.addEventListener('input', () => {
	updateUrlParams()
})






fetch('./assets/data.json')
	.then(response => response.json())
	.then(data => {
		console.log(data)
		// And passes the data to the function, above!
		showCard(data)
	})
