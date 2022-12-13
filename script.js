// console.log("are you working?")
// list of 6 letter words via https://byjus.com/english/6-letter-words/
const wordList = [
    {
        word: "august",
        hint: "the name of a month"
    },
    {
        word: "circle",
        hint: "the shape of the sun"
    },
    {
        word: "decade",
        hint: "ten years long"
    },
    {
        word: "afraid",
        hint: "another word for scared"
    },
    {
        word: "coffee",
        hint: "alot of people drink this in the morning"
    },
    {
        word: "annual",
        hint: "another word for every year"
    },
    {
        word:"device",
        hint:"a title for a cellphone or computer"
    },
    {
        word:"camera",
        hint:"i use this to take pictures"
    },
    {
        word:"doctor",
        hint:"someone i go see when i am feeling sick"
    },
    {
        word:"dollar",
        hint:"in mexico the currency is pesos, in the US the currency is..."
    },
    {
        word:"branch",
        hint:"a part that is connected to a tree"
    },
    {
        word:"bottle",
        hint:"i drink soda out of a ..."
    },
    {
        word:"bright",
        hint:"another word for smart, also a word to describe the sun"
    },
    {
        word:"bridge",
        hint:"something you can cross over"
    },
    {
        word:"double",
        hint:"comes before triple"
    }, {
        word:"career",
        hint:"another term for a job"
    }, {
        word:"driver",
        hint:"someone who can maneuver a vehicle"
    },
]

const inputs = document.querySelector('.inputs')
const resetBtn = document.querySelector('.reset-btn')
const wrongLetter = document.querySelector('.wrong-letters span')
const hint = document.querySelector(".hint span")
const guessLeft = document.querySelector(".guess-left span")
const typingInput = document.querySelector('.typing-input')
const alertBox = document.querySelector('.alertbox')


// const winningMessageElement = document.getElementById("winningMessage")
// const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

let word; //had to turn into global var
let maxGuesses; 
let corrects = []; 
let incorrects = []; //created for non-matching letters

function showAlertBox(text){
    alertBox.innerText = text
    alertBox.style.display = "flex"
}

function randomWord() {

    setTimeout(function() {
        alertBox.style.display = "none"
    }, 3000);

    //this is what gets random object from my wordlist
    let randomObj = wordList[Math.floor(Math.random() * wordList.length)]
    word = randomObj.word; //this is what will choose a word from random object
    
    maxGuesses = 8; corrects = []; incorrects = [];//max amt of guesses for player
    console.log(word);

    hint.innerHTML = randomObj.hint;//pulls from random wordlist
    guessLeft.innerHTML = maxGuesses;
    wrongLetter.innerHTML = incorrects;


    let html = ""; //1. to bring over the input of the letters
    for (let i=0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord()

function initGame(e) { //created this function so player can key in a letter
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`)//if statement to make sure player types in a letter, not a number; after ampersands-so letter cant be added twice 
    && !corrects.includes(key)){//populates the word into box
        console.log(key)
        if(word.includes(key)){ //validates letter typed in, matches word being guessed
            for(let i=0; i < word.length; i++) {
                if(word[i] === key) { //this will populate the (matching) letter into the input
                    corrects.push(key)
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            // console.log("letter not found")
            maxGuesses--;// decreases the guess by one
            incorrects.push(` ${key}`);//this will add the wrong letter to 'Wrong letters' field, and used template literal to add a space
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrects;//wrong-letter field from html
    }
    typingInput.value = "";

    setTimeout(() => {
        if(corrects.length === word.length){
            showAlertBox("You Win!!")
            // winningMessageElement.classList.add("You win!")
            // winningMessageElement.classList.add('show')
            randomWord();
        }
    
        else if(maxGuesses < 1){//indicates to player out of chances
            showAlertBox("Sorry, Try Again!")
            for(let i = 0; i<word.length; i++){
                inputs.querySelectorAll("input")[i].value = word[i];
            }
            randomWord();

        }
    });
}



resetBtn.addEventListener("click", randomWord);//to activate Reset Game button
typingInput.addEventListener("keydown", initGame);//to input inside 'insert letter'
inputs.addEventListener("click", () => typingInput.focus());//focus sets element as the active element in current doc;element can be:button, txt field, or window
document.addEventListener("keydown", () => typingInput.focus());













