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
const wrongLetter = document.querySelector('.wrong-letters')
const hint = document.querySelector(".hint span")
const guessLeft = document.querySelector(".guess-left span")
const typingInput = document.querySelector('.typing-input')

let word; 
let maxGuesses; 
let corrects = []; 
let incorrects = [];

function randomWord() {
    let randomObj = wordList[Math.floor(Math.random() * wordList.length)]
    word = randomObj.word;
    maxGuesses = 8; corrects = []; incorrects = [];
    console.log(word);

    hint.innerText = randomObj.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;


    let html = "";
    for (let i=0; i<word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord()

function initGame(e) {
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`)
    && !corrects.includes(key)){
        console.log(key)
        if(word.includes(key)){
            // console.log("letter found")
            for(let i=0; i < word.length; i++) {
                if(word[i] === key) {
                    corrects.push(key)
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            // console.log("letter not found")
            maxGuesses--;
            incorrects.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrects;
    }
    typingInput.value = "";

    setTimeout(() => {
        if(corrects.length === word.length){
            alert("That's Correct!! CONGRATS!!!");
            randomWord();
        }
    
        else if(maxGuesses < 1){
            alert("GAME OVER!");
            for(let i = 0; i<word.length; i++){
                inputs.querySelectorAll("input")[i].value = word[i];
            }    
        }
    });
}



resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("keydown", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());













