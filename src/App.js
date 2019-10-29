import React, { useState } from 'react';
import AudioSpectrum from 'react-audio-spectrum'
import logo from './logo.svg';

import './App.css';

const onInputChange = (e) => {
  var sound = document.getElementById('sound');
  sound.src = URL.createObjectURL(e.target.files[0]);
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
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Audio Visualizer</h1>
        </header>
        <div style={{
          display: 'flex',
        }}>
          <div className="setting-section file">
            <input type="file" id="input" accept="audio/*" onChange={onInputChange} />
            <audio id="sound" controls></audio>
          </div>
          <div className="setting-section props">
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
          </div>
          <div className="setting-section save">
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
        </div>
        <AudioSpectrum
          id="audio-canvas"
          style={{
            padding: 10
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