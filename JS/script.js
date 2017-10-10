console.log("test")

$(document).ready(function(){
	// BlackJack deal function
		// Create deck function
		// Shuffle deck function
		// Add card[0] and card[2] to player hand, 1 and 3 to dealer
		// Place card function
		// Push card onto players array

	var playersHand = [];
	var dealersHand = [];
	//freshdeck is the return value of the function createDeck
	const freshDeck = createDeck();
	// console.log(freshDeck);

	// make a full copy of the freshdeck using slice, dont point at it
	var theDeck = freshDeck.slice()
	
	var gameOver = false

	// var cards = $(".card").html()


	$(".deal-button").click(function(){

		//we will create and shuffle a new deck
		theDeck = freshDeck.slice();
		theDeck = shuffleDeck(theDeck);
		playersHand = [] //////resetting the array to when you hit deal againn the cards clear out and new cards go in
		dealersHand = []
		console.log(theDeck)
		//update the player and dealer hand arrays
		//the player ALWAYS gets the first card
		// console.log(theDeck[0])
		var topCard = theDeck.shift();
		// console.log(topCard);
		// console.log(theDeck.length);
		playersHand.push(topCard);
		
		


		//give the dealer the next top card
		topCard = theDeck.shift();
		dealersHand.push(topCard)
		

		//give the player the next top card
		var topCard = theDeck.shift();
		playersHand.push(topCard);
		
		

		//and give the dealer the next top card
		topCard = theDeck.shift();
		dealersHand.push(topCard)
		

		console.log(playersHand)
		console.log(dealersHand)

		////Call place card for each of the 4 cards
		////arg 1. who, arg2. where, arg 3. what(card to place in the DOM)
		placeCard('player', 1,playersHand[0]);
	

		setTimeout(function(){
		placeCard('dealer', 1,dealersHand[0]);
		}, 500)

		setTimeout(function(){
		placeCard('player', 2,playersHand[1]);
		},700)

		setTimeout(function(){
		placeCard('dealer', 2,dealersHand[1]);
		},1000)

		/////call calculate total
		///takes 2 args. 1. the entire hand 2.who
		calculateTotal(playersHand, 'player')
		calculateTotal(dealersHand, 'dealer')

		if (playersHand.length == 2){
			$(".deal-button").prop('disabled', true);
		}



		checkWin();
		resetGame();


	})




	$(".hit-button").click(function(){
		//hit functionality
		console.log("user clicked hit")
		if (calculateTotal(playersHand, 'player') < 21){
		//get the top card
		var topCard = theDeck.shift();
		//push it into the players hand
		playersHand.push(topCard);
		//put the card in the DOM
		placeCard('player', playersHand.length, topCard)
		//update total
		calculateTotal(playersHand, 'player')
	}

		checkWin();
	})



	$(".stand-button").click(function(){
		$(".hit-button").prop('disabled', true)
		//stand fnctionality
		console.log("user clicked stand")
		//nothing happend to the players hand when they hit stand
		//the control passes over to the dealer
		//rules for dealer
		//1. dealer has less than 17 they must hit
		//2. dealer has more than 17 they CANNOT hit
		var dealersTotal = calculateTotal(dealersHand,'dealer')
		while(dealersTotal < 17){
			var topCard = theDeck.shift();
			dealersHand.push(topCard);
			placeCard('dealer', dealersHand.length, topCard)
			dealersTotal = calculateTotal(dealersHand,'dealer')
			
		}

		checkWin();
	
	})



	$(".bet1-button").click(function(){
		console.log("bet 1 clicked")
		$(".message").html(`<img class="animated bounceInUp" src="bluechip.png" />`)
		$(".currentBets").html(+1)
	})

	$(".bet5-button").click(function(){
		console.log("bet 5 clicked")
		$(".message").html("")
		$(".message1").html(`<img class="animated bounceInUp" src="redchip.png" />`)
		$(".currentBets").html(+5)
	})

	$(".bet25-button").click(function(){
		console.log("bet 25 clicked")
		$(".message").html("")
		$(".message2").html(`<img class="animated bounceInUp" src="greenchip.png" />`)
		$(".currentBets").html(+25)
	})

	$(".deck").click(function(){
		console.log("user clicked deck")

	})





	function checkWin(){
		var playersTotal = calculateTotal(playersHand, 'player');
		var dealersTotal = calculateTotal(dealersHand, 'dealer');
		
		if (playersTotal > 21){
			$(".player-total").html(`${playersTotal}: Busted`)
			$(".dealer-total").html(`${dealersTotal}: You win`)
		}else if (dealersTotal > 21){
			$(".dealer-total").html(`${dealersTotal}: Busted`)
			$(".player-total").html(`${playersTotal}: You win`)
		}else if(playersHand.length == 2 && playersTotal == 21){
			$(".player-total").html("BLACKJACK")
		}else if(dealersHand.length == 2 && dealersTotal == 21){
			$(".dealer-total").html("BLACKJACK")
		}else if((dealersTotal & playersTotal) > 17 && (playersTotal > dealersTotal)){
			$(".dealer-total").html(`${dealersTotal}: Sorry, you lose`)
			$(".player-total").html(`${playersTotal}: Congratulations, you win`)
		}else if((dealersTotal & playersTotal) > 17 && (dealersTotal > playersTotal)){
			$(".player-total").html(`${playersTotal}: Sorry, you lose`)
			$(".dealer-total").html(`${dealersTotal}: Congratulations, you win`)
		}else if((dealersTotal & playersTotal > 17) && dealersTotal == playersTotal){
			$(".player-total").html(`${playersTotal}: Tie`)
			$(".dealer-total").html(`${dealersTotal}: Tie`)
		}else if(dealersTotal == 21){
			$(".dealer-total").html(`${dealersTotal}: You win`)
		}else if(playersTotal == 21){
			$(".player-total").html(`${playersTotal}: You win`)
		}
		
		gameOver = true
		resetGame();

	}

		function resetGame(){
		// $(".card").html("-")
		
		$('.reset-button').html(`<button id ="reset" class="btn">Reset Game</button>`)
		var resetGame = $("#reset")
		$("#reset").click(function(){
			playersHand = [];
			dealersHand = [];
			playersTotal = 0;
			dealersTotal = 0;
			$(".player-total").html(0);
			$(".dealer-total").html(0);
			gameOver = false;
			$(".card").html("-");
			$(".deal-button").prop('disabled', false)
			$(".hit-button").prop('disabled', false)
			$(".message").html("Place Bets Here")
			$(".message1").html("")
			$(".message2").html("")
			$(".currentBets").html(0)
			
		// 	for(let i=0; i < squares.length; i++){
		// 	cards[i].innerHTML = "*"
		// 	squares[i].className = 'square'
		// }
		})

	}



	function calculateTotal(hand, who){
		//purpose:
		// 1. find out the number and return it
		// 2. update the DOM with the right number
		//start counter at 0
		var handTotal = 0;
		//as we loop through the hand we need a var for each cards value
		var thisCardsValue = 0;
		var totalAce = 0

		for(let i = 0; i < hand.length; i++){
			thisCardsValue = Number(hand[i].slice(0,-1)); //this includes everything on the card image name except the letter(it only grabs the number)
			if(thisCardsValue == 1){
				thisCardsValue = 11;
				totalAce++;
			}else if (thisCardsValue > 10){
			thisCardsValue = 10
		}
			handTotal += thisCardsValue;
		
	}
		for(let i = 0; i < totalAce; i++){
			if(handTotal > 21){
				handTotal -= 10;
			}
		}
		

		var classSelector = `.${who}-total`;
		// $(classSelector).html(handTotal);
		return handTotal;
	}


	function placeCard(who,where,whatToPlace, delay=500){
		setTimeout(function(){
		var classSelector = `.${who}-cards .card-${where}`;
		// replace the html of the who-cards .card-where with an image
		$(classSelector).html(`<img class="animated flipInY" src="images/cards/${whatToPlace}.png" />`);
	},delay)
	}


	function createDeck(){
		var newDeck = [];
		// Card = suit + value
		// suits is a constand it cannot be reassigned
		const suits = ['h', 's', 'd', 'c']
		// outer loop for suit
		for(let s=0; s < suits.length; s++){
			// inner loop through value
			for(let c = 1; c <=13; c++){
				newDeck.push(c+suits[s])
			}
		}
		return newDeck;
	}

	function shuffleDeck(aDeckToBeShuffled){
		// Loop. a lot.	
		// each time through the loop we will switch two indices(cards)
		// when the loop(lots of times) is done, the array(deck) will be shuffled 
		for(let i = 0; i < 50000; i++){
			var rand1 = Math.floor(Math.random() * aDeckToBeShuffled.length); //now we have a radom number between 1 and 51
			var rand2 = Math.floor(Math.random() * aDeckToBeShuffled.length);
			//we want to switch thedeck rand1 with thedeck rand2
			//and we want to stash the value of thedeck[rand1] into temp so we can get it back after overriding the deck rand1 with the deck rand 2
			var temp = aDeckToBeShuffled[rand1];
			aDeckToBeShuffled[rand1] = aDeckToBeShuffled[rand2];
			aDeckToBeShuffled[rand2] = temp;
		}
		// console.log(theDeck)
		return aDeckToBeShuffled;
	}
	
})