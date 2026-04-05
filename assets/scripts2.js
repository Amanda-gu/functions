


let mixButton = document.querySelector('#mix')
let mixagainButton = document.querySelector('#mix-again')
let resultCard = document.querySelector('#result-modal')
let ingredientList = document.getElementById('ingredient-list')


//what's inside the result card function
let showCard = (data2) => {

	//DOM, everything in the result card
	let cocktailName = document.querySelector('#recipe-name')
	let cocktailBase = document.querySelector('#base')
	let cocktailMixers = document.querySelector('#mixers')
	let cocktailGarnish = document.querySelector('#garnish')
	

	//how to get the users selected values: https://www.w3schools.com/JSREF/tryit.asp?filename=tryjsref_select_value   
	// let name = document.querySelector('#recipe-name').value
	let occasion = document.querySelector("#occasion").value
	let alcoholScale = document.querySelector("#alc-scale").value
	let adventureScale = document.querySelector("#adv-scale").value

	//need to see user input in console
	console.log(occasion)
	console.log('Alcohol Scale:', alcoholScale)
	console.log('Adventure Scale:', adventureScale)


		
//this is just some research and thought process
		//since i have 4 filters, i was not sure how i can make the code work	
		//trying to understand boolean in js using if/else statements: https://claude.ai/share/e74a5c83-61c0-4e88-9b6f-27dc7947f5df
		//filter(), https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter	
		//how to filter in js: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
		//here is an example: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_filter2
		//i watched this tutorial on how to filter in js: https://www.youtube.com/watch?v=nKglx7dN7Ss	
		//more about filter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
		//also read about other filtering method like map and reduce and scores but not applying them now as they are too much to digest
		//i decided to use filter and if/else to connect user input to my database. 




//BASE

	let alcohol = ""
			//set an empty string
		
			if (alcoholScale <= 3) {
				let families = data2.light //light
				let selectedFamilyWrapper = families[Math.floor(Math.random() * families.length)] //light --> spritz
				let selectedFamily = Object.values(selectedFamilyWrapper)[0]//turn object to array https://dev.to/awaisalwaisy/7-ways-to-convert-objects-into-array-in-javascript-35m4
				console.log(selectedFamily)

				
				let filterBase = selectedFamily.base.filter(base => {
					   //Array.prototype(here is base from data) .filter()
					alcohol = base.occasion.includes(occasion)
					console.log('alcohol', alcohol) 
					return alcohol
				})
				let random1 = Math.floor(Math.random() * filterBase.length)	 
				let selectedBase = filterBase[random1]
				console.log('selected base:', selectedBase)
			//choose mixer base on the base
	

		// if (selectedBases.length > 1) {}
				let filterMixer = selectedFamily.mixer.filter(mixer => {
						let mix = ""
						if (adventureScale <= 3) {
							if (
								selectedBase.taste.includes('sweet') ||
								selectedBase.taste.includes('acid') ||
								selectedBase.taste.includes('fruity')
								) {
							
							mix = mixer.taste.includes('acid') || 
									mixer.taste.includes('sweet') || 
									mixer.taste.includes('fruity')

								
							} else if (
								selectedBase.taste.includes('salty') ||
								selectedBase.taste.includes('bitter') ||
								selectedBase.taste.includes('smoky') ||
								selectedBase.taste.includes('spicy')
							) {
							mix = mixer.taste.includes('umami') || 
									mixer.taste.includes('bitter') || 
									mixer.taste.includes('sweet') || 
									mixer.taste.includes('fruity')

								
							} else if (
								selectedBase.taste.includes('umami') ||
								selectedBase.taste.includes('herbal') ||
								selectedBase.taste.includes('creamy')
							) {
							mix = mixer.taste.includes('acid') || 
									mixer.taste.includes('sweet') || 
									mixer.taste.includes('fruity')

							}
						} else if (adventureScale <= 6) {
							if (
								selectedBase.taste.includes('sweet') ||
								selectedBase.taste.includes('acid') ||
								selectedBase.taste.includes('fruity')
								) {
							mix = mixer.taste.includes('umami') || 
									mixer.taste.includes('bitter') || 
									mixer.taste.includes('salty')

							} else if (
								selectedBase.taste.includes('salty') ||
								selectedBase.taste.includes('bitter') ||
								selectedBase.taste.includes('smoky')||
								selectedBase.taste.includes('spicy')
							) {
							mix = mixer.taste.includes('umami') || 
									mixer.taste.includes('acid') ||
									mixer.taste.includes('fruity')

							} else if (
								selectedBase.taste.includes('umami') ||
								selectedBase.taste.includes('herbal') ||
								selectedBase.taste.includes('creamy')
							) {
							mix = mixer.taste.includes('smoky') || 
									mixer.taste.includes('spicy') || 
									mixer.taste.includes('salty')	
							}

						} 
						return mix //true or false for each line above
					})
					let mix1 = Math.floor(Math.random() * filterMixer.length)	 
					let selectedMixer  = filterMixer[mix1]
					//for me to see in console what is chosen
					console.log('selected mixer', selectedMixer)
					// console.log('selected garnish', selectedGarnish)
	
					let cocktailDescription = 
					
								selectedBase.description 

								+ ', with ' + 'a ' +
								
								selectedMixer.description 
								;

			console.log('cocktail description:', cocktailDescription)

				let listItem =
					`		
							<h3 id="recipe-name">NAME</h4>
							<p>${cocktailDescription}</p>

							<h4>Base</h4>
							<ul>
								<li>${selectedBase?.name || ''}</li>
								<li>${selectedBase[0]?.name || ''}</li>
								<li>${selectedBase[1]?.name || ''}</li>
							</ul>

							<h4>Mixers</h4>
							<ul>
								<li>${selectedMixer?.name || ''}</li>
							</ul>

							
					
				`
				//innerHtml so it doesnt add to the list everytime i click
			ingredientList.innerHTML = listItem
			} 

			

}




//share template from MDN: https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API 
const shareData = {
  title: "Mixology Lab",
  text: "Create Your Own Recipe",
  url: "https://amanda-gu.github.io/functions/",
};

const btn = document.querySelector("#share");
const resultPara = document.querySelector(".result");

// Share must be triggered by "user activation"
btn.addEventListener("click", async () => {
  try {
    await navigator.share(shareData);
    resultPara.textContent = "MDN shared successfully";
  } catch (err) {
    resultPara.textContent = `Error: ${err}`;
  }
});





//click button show result modal

mixButton.addEventListener('click', () => { // “Listen” for clicks.	

	resultCard.showModal()
	
   //fetch in the click so it only fetches when the button is clicked
	fetch('./assets/data.json')
	.then(response => response.json())
	.then(data2 => {
		showCard(data2)
		console.log(data2)
	})
	
})

//close modal

let closeButton = document.getElementById('close')

	closeButton.addEventListener('click', () => {
	resultCard.close() // And this closes it!
})

//mix again

mixagainButton.addEventListener('click', () => { // “Listen” for clicks.	

   //fetch in the click so it only fetches when the button is clicked
	fetch('./assets/data2.json')
	.then(response => response.json())
	.then(data => {
		showCard(data2)
		console.log(data)
	})
	
})

	fetch('./assets/data2.json')
	.then(response => response.json())
	.then(data => {
		showCard(data)
		console.log(data)
	})
	



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

//Function to update the URL from the form.
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
	//stateCallback?.()
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

