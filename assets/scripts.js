// output:
// name,
// base + mixers + garnish



// if occasion is brunch
// base: abv below 6

// if weather is 20, 23, 24 & temp high (clear sky)
// base taste:{clear, crisp} 





let submitButton = document.querySelector('#submit')
let resultCard = document.querySelector('output')

submitButton.addEventListener('click', () => { // “Listen” for clicks.
	
	resultCard.classList.add('show') 
	
})


// let placeChannelInfo = (channelData) => {


// 	let channelTitle = document.querySelectorAll('.channel-title')// use a class instead of id
// 	channelTitle.forEach(el => { el.innerHTML = channelData.title})
// 	//after call every class items, use loop to append content to every class item/element(el), 

// 	let channelDescription = document.querySelectorAll('.channel-description')
// 	channelDescription.forEach(el => { el.innerHTML = channelData.description?.html || ''})

// 	let channelLink = document.querySelectorAll('.channel-link')
// 	channelLink.forEach(el => { el.href = `https://www.are.na/channel/${channelSlug}` })

// 	let channelUsers = document.querySelectorAll('.channel-users')
// 	channelUsers.forEach(el => { el.innerHTML = channelData.owner.name})
	
// 	console.log()
// }
