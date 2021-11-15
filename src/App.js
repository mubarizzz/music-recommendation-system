import React, { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import Recommendations from './Recommendations';
import { allSongs } from './songs';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()


// var randomItem = sadSongs[Math.floor(Math.random()*sadSongs.length)];
var randomItem = []

for (var i = 0; i < 6; i++) {
  var idx = Math.floor(Math.random() * allSongs.length);
  randomItem.push(allSongs[idx]);
  allSongs.splice(idx, 1);
}

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function App() {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])
  const [show, setShow] = useState(true)

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    //setSavedNotes([...happySongs, note])
    setSavedNotes([...savedNotes, note])
    setNote('')
    // {happySongs.map(n => (
    //         <h2>{n}</h2>
    //         // <><p key={n}> {n}</p></>
    //       ))} 
  }
  
  // const fun1 = () =>{
  //   savedNotes = happySongs;
  //   happySongs.map(n => (
  //           <h2>{n}</h2>
  //           // <><p key={n}> {n}</p></>
  //         ))
  // }

  return (
    <>
      <h1>Music Recommendation System</h1>
      <div className="container">
        <div className="box">
          <h2>Speak To Get Recommendations</h2>
    
          {/* <button onClick={fun1} disabled={!note}> */}
          <button onClick={() => setShow(!show)} disabled={!note}>
            Get Recommendation
          </button>
          <button className='sirib' onClick={() => setIsListening(prevState => !prevState)}>
          {isListening ? <img src={require('./siri.gif')} alt="loading1..." /> : <img src={require('./siri2.png')} alt="loading..." />}
          </button>
          <p>{note}</p>
        </div>
        <div className="box2">
          <div className="p">
          <h2>Recommendations:</h2>
          
          {(show) ? <Spinner animation="border" /> : <Recommendations name={randomItem} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
