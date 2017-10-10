console.log("test")

$(document).ready(function(){

	const freshDeck = createDeck(); 
	console.log(freshDeck);
	var theDeck = [];
	var playersHand = [];
	var dealersHand = [];


	$(".deal-button").click(function(){
		playersHand= []; //makes it so when you hit deal again the players hand and dealers hand get cleared out so new cards appear when you hit deal
		dealersHand= [];
		console.log("click deal")
		theDeck = freshDeck.slice(); //makes a copy of fresh deck and storing it in theDeck so we don't mess with the original freshDeck
		shuffleDeck(theDeck); //shuffling the copy of freshDeck we just made
		console.log(theDeck);

		var topCardOfDeck = theDeck.shift() //taking the top card of the deck
		playersHand.push(topCardOfDeck); //putting the top card into the players hand array
		placeCard('player', 1, playersHand[0])

		topCardOfDeck = theDeck.shift();
		dealersHand.push(topCardOfDeck) //putting the next top card into the dealer hand arrray
		placeCard('dealer', 1, dealersHand[0])

		topCardOfDeck = theDeck.shift();
		playersHand.push(topCardOfDeck) //putting the next card into the player hand
		placeCard('player', 2, playersHand[1])

		topCardOfDeck = theDeck.shift();
		dealersHand.push(topCardOfDeck) //putting the next top card into the dealer hand
		placeCard('dealer', 2, dealersHand[1])

		calculateTotal(playersHand,'player'); //calling calculate totla and telling it who to calculate total for 'player' is for ${who}

		calculateTotal(dealersHand,'dealer'); //dealer goes in for ${who}-total


	})

	$(".hit-button").click(function(){
		if (calculateTotal(playersHand,'player') < 21){ //only let the player hit if they have less than 21
		console.log("click hit")
		var topCardOfDeck = theDeck.shift();
		playersHand.push(topCardOfDeck);
		placeCard('player', playersHand.length, topCardOfDeck) //players hand calls for who, where, and what
		calculateTotal(playersHand, 'player')
	}
	})


	$(".stand-button").click(function(){
		console.log("click stand")
		//keep the dealer drawing until the dealer has at least 17
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
		while(dealerTotal < 17){
			var topCardOfDeck = theDeck.shift();
			dealersHand.push(topCardOfDeck);
			placeCard('dealer', dealersHand.length, topCardOfDeck);
			dealerTotal = calculateTotal(dealersHand, 'dealer')
			setTimeout(function(){
			placeCard('dealer', dealersHand.length, topCardOfDeck)
			},9000)
		
		}

		
		//dealer must have at least 17 to get out of the while loop
	})

	function calculateTotal(hand, who){ //hand is the array with cards to total up. who is the section of the DOM to chagne
		var handTotal = 0;
		var thisCardTotal = 0;
		var hasAce = false
		var totalAce = 0;
		//loop throuhg the card images and take off the last element(letter) so that card total just equals the number
		for(let i = 0; i < hand.length; i++){
			thisCardTotal = Number(hand[i].slice(0, -1));
			if (thisCardTotal == 1){ //making an ace equal to 11 insted of 1
				hasAce = true;
				thisCardTotal = 11;
				totalAce++;
			}else if (thisCardTotal > 10){ //making face cards equal to 10
				thisCardTotal = 10
			}

			handTotal += thisCardTotal;
		}

		//we now kow the total with aces = 11 and face cards = 10
		//we need to reduce the value of auy ace from 11 to 1 if it causes them to bust
		// loop through the aces and change the value of the ace from 11 to 1 to keep you from busting
		for(let i = 0; i < totalAce; i++){
			if (handTotal > 21){
				handTotal -= 10;
			}
		}
		var classSelector = `.${who}-total`;
		$(classSelector).html(handTotal);
		return handTotal;

	}

	function placeCard(who, where, card){ //who is player or dealer hand, where is which card slot, card is the image of the card
		var classSelector = `.${who}-cards .card-${where}`;
		$(classSelector).html(`<img src="images/cards/${card}.png" />`) //putting the image of whatever card is chosen into the html
	}

	


	function createDeck(){
		var newDeck = [];
		//outer loop for suit
		const suits = ["h", "s", "d", "c"] //looping throuhg 1-13 heatrs, 1-13 spades, 1-13 diamonds, 1-13 clubs
		for(let s = 0; s < suits.length; s++){
			//inner loop for value
			for(let c = 1; c <= 13; c++){
				newDeck.push(c+suits[s]);
			}
		}
		return newDeck;
		

	}


	function shuffleDeck(arrayToBeShuffled){ //loop through the array a lot of times and switch cards as we loop
		for(let i = 0; i < 50000; i++){
			var rand1 = Math.floor(Math.random() * arrayToBeShuffled.length); //which is 52
			var rand2 = Math.floor(Math.random() * arrayToBeShuffled.length);
			var savedValueCardOne = arrayToBeShuffled[rand1]; //storing the rand1 value so it doesn't get overwritten
			arrayToBeShuffled[rand1] = arrayToBeShuffled[rand2];
			arrayToBeShuffled[rand2] = savedValueCardOne;
		}
		return arrayToBeShuffled;

	}



})