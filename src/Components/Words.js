//Words.js is a file to store the array of words which could be guessed in the game.
var words = [
    "python",
    "react",
    "javascript",
    "html",
    "css",
    "node",
    "express", 
    "redux",
    "programming",
    "coding",
    "developer",
    "C"
]

//The randomWord function generate a random word by return the word at the place of a random number in the array. 
function randomWord(){
    return words[Math.floor(Math.random()* words.length)]
}

export {randomWord}