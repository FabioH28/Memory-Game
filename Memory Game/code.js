const cardArray = [
  {name: 'fries', img: 'images/fries.png'},
  {name: 'cheeseburger', img: 'images/cheeseburger.png'},
  {name: 'hotdog', img: 'images/hotdog.png'},
  {name: 'ice-cream', img: 'images/ice-cream.png'},
  {name: 'milkshake', img: 'images/milkshake.png'},
  {name: 'pizza', img: 'images/pizza.png'},
  {name: 'fries', img: 'images/fries.png'},
  {name: 'cheeseburger', img: 'images/cheeseburger.png'},
  {name: 'hotdog', img: 'images/hotdog.png'},
  {name: 'ice-cream', img: 'images/ice-cream.png'},
  {name: 'milkshake', img: 'images/milkshake.png'},
  {name: 'pizza', img: 'images/pizza.png'}
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid');
let cardsChosen = [];
let cardsChosenId = [];
const cardsWon = [];
let lockBoard = false;

const result = document.getElementById('result');

function createBoard(){
  gridDisplay.innerHTML = '' ;
  for(let i=0; i<cardArray.length; i++){
    const card = document.createElement('img');
    card.setAttribute('src', 'images/blank.jpg');
    card.setAttribute('data-id', i);
    card.addEventListener('click', flipCard);
    gridDisplay.appendChild(card);
  }
  cardsChosen = [];
  cardsChosenId = [];
  cardsWon.length = 0;
}

function flipCard(){
  if (lockBoard) return;

  const cardId = this.getAttribute('data-id');
  if (cardsChosenId.includes(cardId)) return;

  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  this.setAttribute('src', cardArray[cardId].img);

  if(cardsChosen.length === 2){
    lockBoard = true;
    setTimeout(checkMatch, 500);
  }
}

function checkMatch(){
  const cards = document.querySelectorAll('#grid img');
  const [optionOneId, optionTwoId] = cardsChosenId;

  if(cardsChosen[0] === cardsChosen[1]){
    cards[optionOneId].setAttribute('src', 'images/white.png');
    cards[optionTwoId].setAttribute('src', 'images/white.png');

    cards[optionOneId].classList.add('matched');
    cards[optionTwoId].classList.add('matched');

    cards[optionOneId].removeEventListener('click', flipCard);
    cards[optionTwoId].removeEventListener('click', flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute('src', 'images/blank.jpg');
    cards[optionTwoId].setAttribute('src', 'images/blank.jpg');
  }

  // reset
  cardsChosen = [];
  cardsChosenId = [];
  lockBoard = false;

  // check win
  if(cardsWon.length === cardArray.length / 2){

    result.innerText = Number(result.innerText) + 1;
    setTimeout(() => {
      if(confirm('You found all matches! Do you want to play again?')){
        createBoard();
      }
    }, 200) // small delay to allow last match to show
  }
}

createBoard() ;
