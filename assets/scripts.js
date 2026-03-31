// output:
// name,
// base + mixers + garnish


//nesting?
// if alcohol scale is below 3 -> abv below 3 & one base
// if alcohol scale is between 3-6 -> abv between 3-6 & one base
// if alcohol scale is between 6-10 -> abv above 6 & two bases
//if chose occasion, then assign the base

//if adventure scale is below 3 -> mixer and garnish with similar taste profile as base
//if adventure scale is between 3-6 -> mixer and garnish with different taste profile as base
//if adventure scale is between 6-10 -> mixer and garnish with very different taste profile as base


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

		

		//since i have 4 filters, i was not sure how i can make the code work	
		//trying to understand boolean in js using if/else statements: https://claude.ai/share/e74a5c83-61c0-4e88-9b6f-27dc7947f5df
		//filter(), https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter	
		//how to filter in js: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
		//here is an example: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_filter2
		//i watched this tutorial on how to filter in js: https://www.youtube.com/watch?v=nKglx7dN7Ss
		//watched filter() tutorial: https://www.youtube.com/watch?v=nKglx7dN7Ss	
		//more about filter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
		//also read about other filtering method like map and reduce and scores but not applying them now as they are too much to digent

		//i decided to use filter and if/else to connect user input to my database. 
//BASE

//i went to a tutoring sesstion where the tutor (jonathan wang) helped me understand how i can incorporate occasion into my filtering. 
// alcoholScale and adventureScale both affect the base selection, so occasion can just be nested in side the filterBase funciton

		let filterBase = data.base.filter(base => {
					   //Array.prototype(here is base from data) .filter()
			let alcohol = ""
			//set an empty string
		
			if (alcoholScale <= 3) {
				alcohol = base.abv === 1

				if (occasion === 'Casual Weeknight') {
					alcohol = base.occasion.includes('Casual Weeknight')
				} else if (occasion === 'Celebrating Something') {
					alcohol = base.occasion.includes('Celebration')
				} else if (occasion === 'Dinner Party') {
					alcohol = base.occasion.includes('Dinner Party')
				} else if (occasion === 'Brunch') {
					alcohol = base.occasion.includes('Brunch')
				} else if (occasion === 'Weekend Fun') {
					alcohol = base.occasion.includes('Weekend Fun')
				} else if (occasion === 'Date Night') {
					alcohol = base.occasion.includes('Date Night')
				}


				}else if (alcoholScale <= 6) {
					//4 <= alcoholscale <= 6
					alcohol = base.abv === 2
					if (occasion === 'Flexible') {
							alcohol = base.occasion.includes('All')
						} else if (occasion === 'Celebrating Something') {
							alcohol = base.occasion.includes('Celebration')
						} else if (occasion === 'Dinner Party') {
							alcohol = base.occasion.includes('Dinner Party')
						} else if (occasion === 'Brunch') {
							alcohol = base.occasion.includes('Brunch')
						} else if (occasion === 'Weekend Fun') {
							alcohol = base.occasion.includes('Weekend Fun')
						} else if (occasion === 'Date Night') {
							alcohol = base.occasion.includes('Date Night')
						} else if (occasion === 'Casual Weeknight') {
							alcohol = base.occasion.includes('Casual Weeknight')
						}

				}else if (alcoholScale <= 10) {
					alcohol = base.abv === 3
					if (occasion === 'Casual Weeknight') {
					alcohol = base.occasion.includes('Casual Weeknight')
					} else if (occasion === 'Celebrating Something') {
						alcohol = base.occasion.includes('Celebration')
					} else if (occasion === 'Dinner Party') {
						alcohol = base.occasion.includes('Dinner Party')
					} else if (occasion === 'Brunch') {
						alcohol = base.occasion.includes('Brunch')
					} else if (occasion === 'Weekend Fun') {
						alcohol = base.occasion.includes('Weekend Fun')
					} else if (occasion === 'Date Night') {
						alcohol = base.occasion.includes('Date Night')
					}
				}

				console.log('alcohol', alcohol) //true or false for each line above
				return alcohol
				//according to my tutor: best practice to return at the end of the function
				
			//reture here 
		})

		//select one randomly
//random selectionexample:https://codepen.io/thowell/pen/OGONYY
//math.floor rounds things down https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor so it gives me a number that is not a decimal

//inside [] is a number and that number will locate the drink in my array filterBase
//mathrandom() gives me a number between 0 and 1, and i multiply it by the length of my array, so the number will always brween 0 and my array length.
//2 bases will be selected
//random1, 2 will be a number
		let random1 = Math.floor(Math.random() * filterBase.length)
		let random2 = Math.floor(Math.random() * filterBase.length)		 
		let selectedBase = ""
		if (alcoholScale <= 4) {
					selectedBase = filterBase[random1]
				}
				else if (alcoholScale <= 8) 
				{
					selectedBase = [filterBase[random1], filterBase[random2]]
				}

				else if (alcoholScale <= 10) 
				{
					selectedBase = [filterBase[random1], filterBase[random2], filterBase[random3]]
				}
		console.log('selected base:', selectedBase)

//MIXERs
		

	// my taste	set generated by gpt: ["sweet","acid","bitter","salty","umami","fruity","herbal","smoky","creamy", "spicy"]

	//here is where the adventurous scale filters

	//i have 4 filters, so i will use if/else to group them in to groups of 3 based on the adventure scale(what user inputs). within each adventurous group, its a group of 3 base on the taste profiles. for the final selection,i will select one randomly

	//im applying the same filering logic for garnish
	
		let filterMixer = data.mixer.filter(mixer => {

			if (adventureScale <= 3) {
				if (
					selectedBase.taste.includes('sweet') ||
					selectedBase.taste.includes('acid') ||
					selectedBase.taste.includes('fruity')
					) {
				
				return mixer.taste.includes('acid') || 
						mixer.taste.includes('sweet') || 
						mixer.taste.includes('fruity')

					
				} else if (
					selectedBase.taste.includes('salty') ||
					selectedBase.taste.includes('bitter') ||
					selectedBase.taste.includes('smoky') ||
					selectedBase.taste.includes('spicy')
				) {
				return mixer.taste.includes('umami') || 
						mixer.taste.includes('bitter') || 
						mixer.taste.includes('sweet') || 
						mixer.taste.includes('fruity')

					
				} else if (
					selectedBase.taste.includes('umami') ||
					selectedBase.taste.includes('herbal') ||
					selectedBase.taste.includes('creamy')
				) {
				return mixer.taste.includes('acid') || 
						mixer.taste.includes('sweet') || 
						mixer.taste.includes('fruity')

				}
			} else if (adventureScale <= 6) {
				if (
					selectedBase.taste.includes('sweet') ||
					selectedBase.taste.includes('acid') ||
					selectedBase.taste.includes('fruity')
					) {
				return mixer.taste.includes('umami') || 
						mixer.taste.includes('bitter') || 
						mixer.taste.includes('salty')

				} else if (
					selectedBase.taste.includes('salty') ||
					selectedBase.taste.includes('bitter') ||
					selectedBase.taste.includes('smoky')||
					selectedBase.taste.includes('spicy')
				) {
				return mixer.taste.includes('umami') || 
						mixer.taste.includes('acid') ||
						mixer.taste.includes('fruity')

				} else if (
					selectedBase.taste.includes('umami') ||
					selectedBase.taste.includes('herbal') ||
					selectedBase.taste.includes('creamy')
				) {
				return mixer.taste.includes('smoky') || 
						mixer.taste.includes('spicy') || 
						mixer.taste.includes('salty')	
				}

			} else if (adventureScale <= 10) {
				if (
					selectedBase.taste.includes('sweet') ||
					selectedBase.taste.includes('acid') ||
					selectedBase.taste.includes('fruity')
					) {
				return mixer.taste.includes('creamy') || 
						mixer.taste.includes('bitter') || 
						mixer.taste.includes('acid')	

				} else if (
					selectedBase.taste.includes('salty') ||
					selectedBase.taste.includes('bitter') ||
					selectedBase.taste.includes('smoky') ||
					selectedBase.taste.includes('spicy')
				) {
				return mixer.taste.includes('acid') || 
						mixer.taste.includes('creamy') || 
						mixer.taste.includes('umami')

				} else if (
					selectedBase.taste.includes('umami') ||
					selectedBase.taste.includes('herbal') ||
					selectedBase.taste.includes('creamy')
				) {
				return mixer.taste.includes('spicy') || 
						mixer.taste.includes('salty') || 
						mixer.taste.includes('creamy')					
				}
			}
		
		})

//Garnish

		let filterGarnish = data.garnish.filter(garnish => {

			if (adventureScale <= 3) {
				if (
					selectedBase.taste.includes('sweet') ||
					selectedBase.taste.includes('acid') ||
					selectedBase.taste.includes('fruity')
					) {
				
				return garnish.taste.includes('acid') || 
						garnish.taste.includes('sweet') || 
						garnish.taste.includes('fruity')

					
				} else if (
					selectedBase.taste.includes('salty') ||
					selectedBase.taste.includes('bitter') ||
					selectedBase.taste.includes('smoky') ||
					selectedBase.taste.includes('spicy')
				) {
				return garnish.taste.includes('umami') || 
						garnish.taste.includes('bitter') || 
						garnish.taste.includes('sweet') || 
						garnish.taste.includes('fruity')

					
				} else if (
					selectedBase.taste.includes('umami') ||
					selectedBase.taste.includes('herbal') ||
					selectedBase.taste.includes('creamy')
				) {
				return garnish.taste.includes('acid') || 
						garnish.taste.includes('sweet') || 
						garnish.taste.includes('fruity')

				}
			} else if (adventureScale <= 6) {
				if (
					selectedBase.taste.includes('sweet') ||
					selectedBase.taste.includes('acid') ||
					selectedBase.taste.includes('fruity')
					) {
				return garnish.taste.includes('umami') || 
						garnish.taste.includes('bitter') || 
						garnish.taste.includes('salty')

				} else if (
					selectedBase.taste.includes('salty') ||
					selectedBase.taste.includes('bitter') ||
					selectedBase.taste.includes('smoky')||
					selectedBase.taste.includes('spicy')
				) {
				return garnish.taste.includes('umami') || 
						garnish.taste.includes('acid') ||
						garnish.taste.includes('fruity')

				} else if (
					selectedBase.taste.includes('umami') ||
					selectedBase.taste.includes('herbal') ||
					selectedBase.taste.includes('creamy')
				) {
				return garnish.taste.includes('smoky') || 
						garnish.taste.includes('spicy') || 
						garnish.taste.includes('salty')	
				}

			} else if (adventureScale <= 10) {
				if (
					selectedBase.taste.includes('sweet') ||
					selectedBase.taste.includes('acid') ||
					selectedBase.taste.includes('fruity')
					) {
				return garnish.taste.includes('creamy') || 
						garnish.taste.includes('bitter') || 
						garnish.taste.includes('acid')	

				} else if (
					selectedBase.taste.includes('salty') ||
					selectedBase.taste.includes('bitter') ||
					selectedBase.taste.includes('smoky') ||
					selectedBase.taste.includes('spicy')
				) {
				return garnish.taste.includes('acid') || 
						garnish.taste.includes('creamy') || 
						garnish.taste.includes('umami')

				} else if (
					selectedBase.taste.includes('umami') ||
					selectedBase.taste.includes('herbal') ||
					selectedBase.taste.includes('creamy')
				) {
				return garnish.taste.includes('spicy') || 
						garnish.taste.includes('salty') || 
						garnish.taste.includes('creamy')					
				}
			}
		
		})

		
		let selectedGarnish = filterGarnish[Math.floor(Math.random() * filterGarnish.length)]
		let selectedMixer = filterMixer[Math.floor(Math.random() * filterMixer.length)]
		//for me to see in console what is chosen
		console.log('selected mixer', selectedMixer)
		console.log('selected garnish', selectedGarnish)

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
