import React, { useState, useEffect } from 'react';
import AudioSpectrum from 'react-audio-spectrum'
import logo from './logo.svg';
import {Animated} from "react-animated-css";

import './App.css';

const onAudioInputChange = (e) => {
  var sound = document.getElementById('sound');
  sound.src = URL.createObjectURL(e.target.files[0]);
}
const onVideoInputChange = (e) => {
  var video = document.getElementById('video');
  video.src = URL.createObjectURL(e.target.files[0]);
  video.loop
}

const getLocalSettings = () => ({
  capColor: localStorage.getItem('capColor') || ' ',
  capHeight: Number(localStorage.getItem('capHeight') || 4),
  meterWidth: Number(localStorage.getItem('meterWidth') || 3),
  meterCount: Number(localStorage.getItem('meterCount') || 512),
  gap: Number(localStorage.getItem('gap') || 5),
  meterColor1: localStorage.getItem('meterColor1') || '#f00',
  meterColor2: localStorage.getItem('meterColor2') || '#0C70FD',
  meterColor3: localStorage.getItem('meterColor3') || '#0CFD70',
})
const setLocalSettings = ({
  capColor,
  capHeight,
  meterWidth,
  meterCount,
  gap,
  meterColor1,
  meterColor2,
  meterColor3,
}) => {
  localStorage.setItem('capColor', capColor)
  localStorage.setItem('capHeight', capHeight)
  localStorage.setItem('meterWidth', meterWidth)
  localStorage.setItem('meterCount', meterCount)
  localStorage.setItem('gap', gap)
  localStorage.setItem('meterColor1', meterColor1)
  localStorage.setItem('meterColor2', meterColor2)
  localStorage.setItem('meterColor3', meterColor3)
}

const App = () => {
    const [defaultSettings] = useState(getLocalSettings)
    
    const [capColor, setCapColor] = useState(defaultSettings.capColor)
    const [capHeight, setCapHeight] = useState(defaultSettings.capHeight)
    const [meterWidth, setMeterWidth] = useState(defaultSettings.meterWidth)
    const [meterCount, setMeterCount] = useState(defaultSettings.meterCount)
    const [gap, setGap] = useState(defaultSettings.gap)
    const [meterColor1, setMeterColor1] = useState(defaultSettings.meterColor1)
    const [meterColor2, setMeterColor2] = useState(defaultSettings.meterColor2)
    const [meterColor3, setMeterColor3] = useState(defaultSettings.meterColor3)

    const [audioInput, setAudioInput] = useState('')
    const [audioFiles, setAudioFiles] = useState([])
    const [currentAudioIndex, setCurrentAudioIndex] = useState(-1)
    const [isPlaying, setIsPlaying] = useState(false)
    const [showTitle, setShowTitle] = useState(false)
    const [titles, setTitles] = useState([])
    const [artists, setArtists] = useState([])
    const [titleColors, setTitleColors] = useState([])

    useEffect(() => {
      var video = document.getElementById('video');
      var sound = document.getElementById('sound');
      if (isPlaying) {
        sound.play()
        video.play()
        setShowTitle(true)
      } else {
        sound.pause();
        sound.src = sound.src;
        video.pause()
        video.src = video.src
      }
    }, [isPlaying])
    useEffect(() => {
      var sound = document.getElementById('sound');
      if (audioFiles[currentAudioIndex]) {
        sound.src = URL.createObjectURL(audioFiles[currentAudioIndex]);
        sound.onended = () => {
          console.log('ended')
          setShowTitle(false)
          if (audioFiles.length > currentAudioIndex + 1) {
            setTimeout(() => {
              setCurrentAudioIndex(currentAudioIndex + 1)
              setTimeout(() => {
                sound.play()
                setShowTitle(true)
              }, 1000)
            }, 2000)
          }
        }
      }
    }, [currentAudioIndex])
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Audio Visualizer</h1>
        </header> */}
        <div style={{
          display: 'flex',
        }}>
          <div className="setting-section file">
            <h3>Music & Video files</h3>
            <label>Music</label>
            <input multiple value={audioInput} type="file" id="input1" accept="audio/*" onChange={(e) => {
              setAudioInput(e.target.value)
              setAudioFiles(e.target.files)
              setCurrentAudioIndex(0)
            }} />
            <label>Video</label>
            <input type="file" id="input2" accept="video/*" onChange={onVideoInputChange} />
            <button onClick={() => setTimeout(() => setIsPlaying(true), 2000)} >Play</button>
            <audio id="sound"></audio>
          </div>
          <div className="setting-section props">
            <h3>Visualizer</h3>
            <PropInput
              label="Cap Color"
              value={capColor}
              onChange={e => setCapColor(e.target.value)}
              type="text"
            />
            <PropInput
              label="Cap Height"
              value={capHeight}
              onChange={e => setCapHeight(Number(e.target.value))}
              type="number"
            />
            <PropInput
              label="Meter Width"
              value={meterWidth}
              onChange={e => setMeterWidth(Number(e.target.value))}
              type="number"
            />
            <PropInput
              label="Meter Count"
              value={meterCount}
              onChange={e => setMeterCount(Number(e.target.value))}
              type="number"
            />
            <PropInput
              label="Gap"
              value={gap}
              onChange={e => setGap(Number(e.target.value))}
              type="number"
            />
            <PropInput
              label="Meter Col 1"
              value={meterColor1}
              onChange={e => setMeterColor1(e.target.value)}
              type="text"
            />
            <PropInput
              label="Meter Col 2"
              value={meterColor2}
              onChange={e => setMeterColor2(e.target.value)}
              type="text"
            />
            <PropInput
              label="Meter Col 3"
              value={meterColor3}
              onChange={e => setMeterColor3(e.target.value)}
              type="text"
            />

            <button onClick={() => setLocalSettings({
              capColor,
              capHeight,
              meterWidth,
              meterCount,
              gap,
              meterColor1,
              meterColor2,
              meterColor3,
            })}>Save settings</button>
          </div>
          
          <div className="setting-section">
            <h3>Song Title</h3>
            {
              Array.prototype.map.call(audioFiles, function(file, index) {
                return <div className="setting-section props">
                  <label>{file.name}</label>
                    <PropInput
                      label="Title"
                      value={titles[index]}
                      onChange={e => {
                        titles[index] = e.target.value
                        setTitles(titles)
                      }}
                      type="text"
                    />
                    <PropInput
                      label="Artist"
                      value={artists[index]}
                      onChange={e => {
                        artists[index] = e.target.value
                        setArtist(artists)
                      }}
                      type="text"
                    />
                    <PropInput
                      label="Title Color"
                      value={titleColors[index]}
                      onChange={e => {
                        titleColors[index] = e.target.value
                        setTitleColors(titleColors)
                      }}
                      type="text"
                    />
                </div>
              })
            }
          </div>
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          padding: 5,
          display: !isPlaying ? 'none' : 'block'
        }}>
          <video muted loop style={{
            width: '100%',
          }} id="video"></video>
          <Animated animationInDelay={1000} animationInDuration={2000} animationOutDuration={2000} animationIn="fadeIn" animationOut="fadeOut" isVisible={showTitle}>
           <div className="fade-in-title" style={{
              color: titleColors[currentAudioIndex] || 'white',
            }}>{titles[currentAudioIndex] || ''}</div>
          </Animated>
          <Animated animationInDelay={1000} animationInDuration={2000} animationOutDuration={2000} animationIn="fadeIn" animationOut="fadeOut" isVisible={showTitle}>
            <div className="fade-in-title" style={{
              bottom: '6vw',
              color: titleColors[currentAudioIndex] || 'white',
              fontSize: '2vw',
            }}>{artists[currentAudioIndex] || ''}</div>
          </Animated>
          <div className="spectrum-cont">
            <AudioSpectrum
              id="audio-canvas"
              style={{
                paddingBottom: '13vw',
                paddingTop: '5vw',
                width: '80%',
              }}
              height={500}
              width={900}
              audioId={'sound'}
              capColor={capColor}
              capHeight={capHeight}
              meterWidth={meterWidth}
              meterCount={meterCount}
              meterColor={[
                {stop: 0, color: meterColor1},
                {stop: 0.5, color: meterColor2},
                {stop: 1, color: meterColor3}
              ]}
              gap={gap}
            />
          </div>
          <button style={{
            position: 'absolute',
            left: 0,
            bottom: -10,
          }} onClick={() => setIsPlaying(false)}>
            Close
          </button>
        </div>
      </div>
    );
}

export default App;


const PropInput = ({ type, label, value, onChange }) => (
  <div>
    <div>
      <label>{label}</label>
    </div>
    <input type={type} value={value} onChange={onChange} />
  </div>
)