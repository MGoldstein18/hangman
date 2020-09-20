//import React, CSS, images for displaying the hangman and other relevent components
import React from 'react'
import './hangman.css'
import {randomWord} from './Words.js'
import step0 from './images/0.jpg'
import step1 from './images/1.jpg'
import step2 from './images/2.jpg'
import step3 from './images/3.jpg'
import step4 from './images/4.jpg'
import step5 from './images/5.jpg'
import step6 from './images/6.jpg'
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn} from "mdbreact";

//Create a class component called Hangman
class Hangman extends React.Component {

    //declare props to be used for image display and mistaken letter tracking 
    static defaultProps = {
        images : [step0, step1, step2, step3, step4, step5, step6],
        maxWrong : 6
    }   

    /*constructor to create state which will track the number of mistakes made by the player, a set of the letters guessed by 
    the player and the correct which is randomly generater using the randomWord function imported from the Words.js file which 
    stores all the words*/
    constructor (props){
        super(props)
        this.state = {
            mistake : 0,
            guessed : new Set([]),
            answer : randomWord()
        }
        this.handleGuess = this.handleGuess.bind(this)
        this.resetButton = this.resetButton.bind(this)
    }
    /*The handleGuess function is called when a letter is selected. It adds the guessed letter to the state tracking the letters guessed
    and checks if the correct word has the selected letter and if it doesn't the mistake tracking is increased*/
    handleGuess(e){
        let letter = e.target.value
        this.setState(prevState => ({
            guessed: prevState.guessed.add(letter),
            mistake : prevState.mistake + (prevState.answer.includes(letter) ? 0 : 1)
        }))
    }
    
    /*The guessed word function displays the corret words or the place holder _ until the correct letters are guessed. It does this 
    by "mapping" through the correct word, checking if each letter is a match for the guessed letter and then either displaying the
    correct letter or the _*/
    guessedWord(){
        return (this.state.answer.split("").map(letter => this.state.guessed.has(letter) ? letter : " _ "))
    }

    /*The generateButtons method "maps" over each letter of the alphabet and creates a button for each letter. Each button has a 
    unique key and value which are equal to the letter of the buttons and when clicked they call the handleGuess method above. 
    The buttons will be added to the set of guessed letters and disabled after being clicked.*/
    generateButtons(){
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
            <button
            class = "btn btn-lg btn-primary m-2"
            key={letter}
            value = {letter}
            onClick = {this.handleGuess}
            disabled = {this.state.guessed.has(letter)}>
                {letter}
            </button>
        ))
    }


    //The resetButton method is called when the Reset Button is clicked and it resets the game by reseting state. 
    resetButton(){
        this.setState({
            mistake : 0,
            guessed : new Set([]),
            answer : randomWord()
        })
    }

    /*the render method displays everything and also checks to see if the game has been won or lost by tracking whether or not the 
    number of letter guessed eceeds the max number of wrong guesses and by checking if the guessed letters are equal to the correct word*/
    render(){
        const gameOver = this.state.mistake >= this.props.maxWrong
        const winner = this.guessedWord().join("") === this.state.answer
        let gameStat = this.generateButtons()

        if(winner){
            gameStat = "You won!!!"
        }

        if(gameOver){
            gameStat = "You Lost!"
        }

        return(
            <div className="hangmanContainer">
                <h1 className="text-center">Hangman</h1>
                <div className="float-left">
                <MDBPopover
                    placement="bottom"
                    popover
                    clickable
                    >
                    <MDBBtn type ="button" className = "help" outline color="info"><b id="hello">Help?!</b></MDBBtn>
                    <div>
                        <MDBPopoverHeader><b>Here is how the game works:</b></MDBPopoverHeader>
                        <MDBPopoverBody>
                            <ul>
                                <li>The <b>aim of the game</b> is to guess the randomly generated word before you run out of guesses</li>
                                <li>If you <b>guess a correct letter</b> it will be added to the word</li>
                                <li>If you <b>guess an incorrect letter</b> your number of wrong guesses (displayed in the top right corner of the screen) will increase and your character will move closer to being hung</li>
                                <li>All the words are <b>programming related</b></li>
                                <li><b>Goodluck!</b></li>
                            </ul>
                        </MDBPopoverBody>
                    </div>
                </MDBPopover>
                </div>
                <div className="float-right">Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}</div>
                <div className="text-center">
                    <img src={this.props.images[this.state.mistake]} alt="Hangman"/>
                </div>
                <div className="text-center">
                    <p>Guess the programming related word:</p>
                    <p>
                        {!gameOver ? this.guessedWord() : this.state.answer}
                    </p>
                    <p>
                        {gameStat}
                    </p>
                    <button className = "btn btn-info" onClick={this.resetButton}>Reset</button>
                </div>
            </div>
        )
    }
}

export default Hangman

