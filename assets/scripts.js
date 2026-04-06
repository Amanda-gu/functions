let mixButton = document.querySelector('#mix')
let mixagainButton = document.querySelector('#mix-again')
let resultCard = document.querySelector('#result-modal')
let ingredientList = document.getElementById('ingredient-list')


//what's inside the result card function
let showCard = (data) => {

	//how to get the users selected values: https://www.w3schools.com/JSREF/tryit.asp?filename=tryjsref_select_value   
	// let name = document.querySelector('#recipe-name').value
	let occasion = document.querySelector("#occasion").value
	let alcoholScale = document.querySelector("#alc-scale").value
	let adventureScale = document.querySelector("#adv-scale").value

	//need to see user input in console
	console.log(occasion)
	console.log('Alcohol Scale:', alcoholScale)
	console.log('Adventure Scale:', adventureScale)



//BASE

		let alcohol = ""
			//set an empty string
		let selectedFamily
		let selectedBase
		let selectedBases
		let selectedMixer
		let familyName

//put everythign in ranges so i dont repeat the code
		let level
		if (alcoholScale <= 3) {
			level = data.light
		} else if (alcoholScale <=6){
			level = data.medium
		} else if (alcoholScale <=10){
			level = data.strong
		}
		console.log('level:', level)
		//level is an array of families

		selectedFamily = level[Math.floor(Math.random() * level.length)]
		//select one of the items on the level array
		
		//here i need the name of the params/keys
		//how to convert between object and array https://dev.to/awaisalwaisy/7-ways-to-convert-objects-into-array-in-javascript-35m4
		familyName = Object.keys(selectedFamily)[0] 
		//object.keys returns an array from the key, and here is only 1 item in the array, so use [0] to select it
		//basically [0] turn the array back to an object(not key)
		
		familyData = selectedFamily[familyName]
		//trouble shooting: familyData = selectedFamily.familyName is causing error in the filter()
		//gemini chat: https://gemini.google.com/share/824c8b7d38df
		//dot and bracket logic: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors

		console.log('selectedfamily:',selectedFamily)
		console.log('family name', familyName)

		//need to put[] on familyName because it's not a parameter it's a string now
		let filterBase = familyData.base.filter(base => {
				alcohol = base.occasion.includes(occasion)
				console.log('alcohol', alcohol) 
				return alcohol
			})

		let base1 = Math.floor(Math.random() * filterBase.length)	 
		let base2 = Math.floor(Math.random() * filterBase.length)

		if (alcoholScale <= 6){
			
			selectedBases = [filterBase[base1]]
			console.log('selected base:', selectedBases[0])
		} else if (6 < alcoholScale <= 10){	 
			selectedBases = [filterBase[base1], filterBase[base2]]
			console.log('selected bases', selectedBases)		
		}
			
			

		//family and base are chosen, below is for mixer selection 
		//data here looks like: Light/Medium/Strong -> family -> base/mixer
		for (let i = 0; i < selectedBases.length; i++) {
					selectedBase = selectedBases[i]	
					
					let group1 = 	selectedBase.taste.includes('sweet') ||
									selectedBase.taste.includes('acid') ||
									selectedBase.taste.includes('fruity')

					let group2 =  	selectedBase.taste.includes('salty') ||
									selectedBase.taste.includes('bitter') ||
									selectedBase.taste.includes('smoky') ||
									selectedBase.taste.includes('spicy')

					let group3 =  	selectedBase.taste.includes('umami') ||
									selectedBase.taste.includes('herbal') ||
									selectedBase.taste.includes('creamy')

				
					let filterMixer = familyData.mixer.filter(mixer => {
						let mix = ""

						let mixGroup1 = mixer.taste.includes('acid') || 
										mixer.taste.includes('sweet') || 
										mixer.taste.includes('fruity')
					
						let mixGroup2 = mixer.taste.includes('creamy') || 
										mixer.taste.includes('bitter') || 
										mixer.taste.includes('herbal') || 
										mixer.taste.includes('fruity')

						let mixGroup3 = mixer.taste.includes('spicy') || 
										mixer.taste.includes('smoky') || 
										mixer.taste.includes('unami')


						if (adventureScale <= 3) {
										if (group1) {
										mix = mixGroup1 || mixGroup2
				
										} else if (group2) {
										mix = mixGroup2 || mixGroup1

										} else if (group3) {
										mix = mixGroup3 || mixGroup2
										}

						} else if (adventureScale <= 6) {
										if (group1) {
										mix = mixGroup2 || mixGroup3
				
										} else if (group2) {
										mix = mixGroup3 || mixGroup1

										} else if (group3) {
										mix = mixGroup1 || mixGroup2
										}

						} else if (adventureScale <= 10){ 
										if (group1) {
										mix = mixGroup3 || mixGroup2
				
										} else if (group2) {
										mix = mixGroup1 || mixGroup2

										} else if (group3) {
										mix = mixGroup2 || mixGroup3
										}
						}
						return mix //true or false for each line above
						})

					let mix1 = Math.floor(Math.random() * filterMixer.length)
					let mix2 = Math.floor(Math.random() * filterMixer.length)		 
					selectedMixer = [filterMixer[mix1], filterMixer[mix2]]
								//for me to see in console what is chosen
					console.log('selected mixer', selectedMixer)
					// console.log('selected garnish', selectedGarnish)
				}
		
//choose mixer base on the base
	
		let cocktailLabel =	
			selectedBases.label ??
			(selectedBases.label || '') + ' ' +
			(selectedBases.label || '') 
			
			+ ' ' + selectedMixer[0].label + ' ' + selectedMixer[1].label + ' ' + familyName

		let cocktailDescription = 
					
					selectedBases.description ?? (selectedBases[0].description || '')
					+ ', ' +
					(selectedMixer[0].description || '') + ' and ' + (selectedMixer[1].description || '')
					;

				console.log('cocktail description:', cocktailDescription)
				console.log('cocktail label:', cocktailLabel)

		//add to html
		let listItem =
				`		
					<h3 id="recipe-name">${cocktailLabel}</h4>
						<p>${cocktailDescription}</p>

					<h4>Base</h4>
					<ul id="recipe-base">
						<li>${selectedBases.name || ''}</li>
						<li>${selectedBases[0]?.name || ''}</li>
						<li>${selectedBases[1]?.name || ''}</li>
					</ul>

					<h4 id="recipe-mixers">Mixers</h4>
					<ul>
						<li>${selectedMixer[0].name || ''}</li>
						<li>${selectedMixer[1].name || ''}</li>
					</ul>			
					
				`
			//innerHtml so it doesnt add to the list everytime i click
			ingredientList.innerHTML = listItem
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
	.then(data => {
		showCard(data)
		console.log(data)
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
	fetch('./assets/data.json')
	.then(response => response.json())
	.then(data => {
		showCard(data)
		console.log(data)
	})
	
})


// Target your form.
let formElement = document.querySelector('form')

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

