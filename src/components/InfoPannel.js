import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInfoFunctionAction } from '../store/WordInfoReducer'
import { useState } from 'react'
import { useEffect } from 'react'
import './InfoPannel.css'

const InfoPannel = () => {
    const dispatch = useDispatch()
    const word = useSelector((state) => state.wordInfo.word)
    const currentFunction = useSelector((state) => state.wordInfo.function)
    const infoFunctions = ['Meaning', 'Usage', 'Forms']
    const infoButtons = infoFunctions.map((element) => {
        return (
            <button
                className={
                    element === currentFunction
                        ? 'activeWordInfoBtn'
                        : 'wordInfoBtn'
                }
                onClick={() => dispatch(setInfoFunctionAction(element))}
            >
                {element}
            </button>
        )
    })
    const [infoContent, setInfoContent] = useState()
    useEffect(() => {
        switch (currentFunction) {
            case 'Meaning':
                {
                    fetch(`http://localhost:8000/meaning/${word}`)
                        .then((response) => response.json())
                        .then((json) => {
                            let answer = []
                            for (let key in json) {
                                answer.push(
                                    <h6 className="partOfSpeech">{key}</h6>
                                )
                                let listItems = []
                                for (let def in json[key]) {
                                    listItems.push(
                                        <li className="wordInfoLine">
                                            {json[key][def]}
                                        </li>
                                    )
                                }
                                answer.push(<ol>{listItems}</ol>)
                            }
                            setInfoContent(answer)
                        })
                        .catch(console.log('Kek'))
                }
                break

            case 'Usage':
                {
                    fetch(`http://localhost:8000/usage/${word.toLowerCase()}`)
                        .then((response) => response.json())
                        .then((json) => {
                            let answer = []
                            for (let key in json) {
                                answer.push(
                                    <li className="wordInfoLine">
                                        {json[key]}
                                    </li>
                                )
                            }
                            setInfoContent(<ol>{answer}</ol>)
                        })

                        .catch(console.log('Kek'))
                }
                break
            case 'Forms':
                console.log()
        }
    }, [word, currentFunction])

    return (
        <div className="infoPannel">
            <div className="chooseInfo">{infoButtons}</div>
            <div className="infoContent">
                <h4 className="currentWordInfo">{word}</h4>
                <div>{infoContent}</div>
            </div>
        </div>
    )
}

export default InfoPannel
