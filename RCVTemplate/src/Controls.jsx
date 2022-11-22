import React, {useState, useEffect} from 'react';
import "./Controls.css";

function Controls() {
  const msg = new SpeechSynthesisUtterance();

  // init translation word
  const wordList = [
    ['Ka-mus-ta', 'sa-lamat', 'Mahal Kita', 'o oh', 'hin dech'],
    ['hi un-sa-on ni-mo', 'sa-lamat', 'Gi-higug-ma ko ik-aw', 'o oh', 'dil i'],
    ['kab la-haw', 'Ag-yama-nak unay!', 'A-ya-yaten ka', 'wen', 'ha-an']
  ];

  const engList = ['Hello', 'Thank You', 'I Love You', 'Yes', 'No'];

  // set default Dialect
  window.localStorage.setItem('dialect', "tagalog");

  // set default voice
  window.localStorage.setItem('voice', "Google Bahasa Indonesiaid-ID");
  let voices = window.speechSynthesis.getVoices();
  msg.voice = voices[56];

  const speechHandler = (voiceNum) => {
    let word = window.localStorage.getItem('word');
    console.log(word);
    let voices = window.speechSynthesis.getVoices();
    let voiceName = window.localStorage.getItem('voice');
    let dialect = window.localStorage.getItem('dialect');
    console.log(voiceName);
    console.log(dialect);
    // check what voice will use
    if (voiceName == "Google Bahasa Indonesiaid-ID") {
      voiceNum = 56;
    } else if (voiceName == "Google हिन्दीhi-IN") {
      voiceNum = 55;
    } else {
      voiceNum = 49;
    }
    // check what translation dialect will use
    let idx = 0;
    idx = engList.indexOf(word);
    if (dialect == 'tagalog') {   
      word = wordList[0][idx];
    } else if (dialect == "ilocano") {
      word = wordList[1][idx];
    } else {
      word = wordList[2][idx];
    }
    // init speak
    msg.text = word;
    msg.voice = voices[voiceNum];
    window.speechSynthesis.speak(msg);
  }
  

  const options = ["Google Bahasa Indonesiaid-ID", "Google हिन्दीhi-IN", "Google US Englishen-US"];
  const onVoiceOptionChangeHandler = (event) => {
      let voiceName = event.target.value;
      window.localStorage.setItem('voice', voiceName);
  }
  const onDialectOptionChangeHandler = (event) => {
    let dialect = event.target.value;
    window.localStorage.setItem('dialect', dialect);
  }
  
  return (
    <div className="wrapper">
      <div className='form'>
        {/* <div className="row">
          <label>Detected Sign Language</label>
          <textarea></textarea>
        </div> */}
        <div className="flex">
          <div className="col">
            <label>Select Dialect</label>
            <div className="outer">
              <select id="dialect" onChange={onDialectOptionChangeHandler}>
                <option value="tagalog">Tagalog</option>
                <option value="ilocano">Ilocano</option>
                <option value="cebuano">Cebuano</option>
              </select>
            </div>
          </div>
          <div className="col">
            <label>Select Voice</label>
            <div class="outer">
              <select id="voiceList" onChange={onVoiceOptionChangeHandler}>
                 {options.map((option, index) => {
                    return <option key={index} >
                        {option}
                    </option>
                })}
                
              </select>
            </div>
          </div>
        </div>
        <button onClick={() => speechHandler()}>Convert To Speech</button>
      </div>
    </div>
  )
}

export default Controls;