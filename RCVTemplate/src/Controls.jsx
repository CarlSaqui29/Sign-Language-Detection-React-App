import React, { Component }  from 'react';
import "./Controls.css";

function Controls() {
  const wordList = [
    ['Ka-mus-ta', 'sa-lamat', 'Mahal Kita', 'o oh', 'hin dech'],
    ['hi un-sa-on ni-mo', 'sa-lamat', 'Gi-higug-ma ko ik-aw', 'o oh', 'dil i'],
    ['kab la-haw', 'Ag-yama-nak unay!', 'A-ya-yaten ka', 'wen', 'ha-an']
  ];

  const textarea = document.querySelector("textarea");
  let voiceList = document.getElementById("voiceList");
  let speechBtn = document.querySelector("button");

  // let synth = speechSynthesis;
  let isSpeaking = true;

  // putting the voices to select tag
  const voices = () => {
    for(let voice of speechSynthesis.getVoices()){
        let selected = voice.name === "Google Bahasa Indonesia" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
  }
  voices();
  speechSynthesis.addEventListener("voiceschanged", voices);

  const textToSpeech = (text) => {
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of speechSynthesis.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    speechSynthesis.speak(utterance);
  }

  const getDialect = () => {
      let dialect = document.getElementById("dialect").value;
      return dialect;
  }
  // when btn is clicked
  speechBtn.addEventListener("click", e =>{
    let text = textarea.value;
    let whatDialect = 0;
    e.preventDefault();

    if(text !== ""){
        if(!speechSynthesis.speaking){
            // what dialect is selected
            let dialect = getDialect();
            if (dialect == 'tagalog') {
                whatDialect = 0;
            } else if (dialect == 'ilocano') {
                whatDialect = 1;
            } else if (dialect == 'cebuano') {
                whatDialect = 2;
            }

            // search word
            switch (text) {
                case 'hello':
                  text = wordList[whatDialect][0]
                  break;
                case 'thank you':
                    text = wordList[whatDialect][1]
                  break;
                case 'i love you':
                    text = wordList[whatDialect][2]
                  break;
                case 'yes':
                    text = wordList[whatDialect][3]
                  break;
                case 'no':
                    text = wordList[whatDialect][4]
                  break;
              }
            textarea.value = text;
            textToSpeech(text);
        }
        if(text.length > 80){
            setInterval(()=>{
                if(!speechSynthesis.speaking && !isSpeaking){
                    let isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
            if(isSpeaking){
                speechSynthesis.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                speechSynthesis.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        }else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
  });

  return (
    <div className="wrapper">
      <form action="#">
        <div className="row">
          <label>Detected Sign Language</label>
          <textarea readonly></textarea>
        </div>
        <div className="flex">
          <div className="col">
            <label>Select Dialect</label>
            <div className="outer">
              <select id="dialect">
                <option value="tagalog" selected>Tagalog</option>
                <option value="ilocano">Ilocano</option>
                <option value="cebuano">Cebuano</option>
              </select>
            </div>
          </div>
          <div className="col">
            <label>Select Voice</label>
            <div class="outer">
              <select id="voiceList"></select>
            </div>
          </div>
        </div>
        <button>Convert To Speech</button>
      </form>
    </div>
  )
}

export default Controls;