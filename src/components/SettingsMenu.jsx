/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'

const SettingsMenu = ({settingsUpdateToNav, data, displayState}) => {
    const [clockPosition, setClockPosition] = useState(getLocalStorageValue('clockPosition','center'));
    const [timeFormat, setTimeFormat] = useState(getLocalStorageValue('timeFormat','12hr'));
    const [showSeconds, setShowSeconds] = useState(getLocalStorageValue('showSeconds', 'true') === 'true');
    const [showMeridiem, setShowMeridiem] = useState(getLocalStorageValue('showMeridiem', 'true') === 'true');

    useEffect(() => {
        renderTimeFormatChange(timeFormat);
    }, [])

    function handleClockPositionChange(event) {
        setClockPosition(event.target.value);
        localStorage.setItem('clockPosition', event.target.value);
    }
    function handleTimeFormatChange(event) {
        setTimeFormat(event.target.value);
        renderTimeFormatChange(event.target.value);
        localStorage.setItem('timeFormat', event.target.value);
    }
    function renderTimeFormatChange(format) {
        format === 'military' 
            ? disableElement('.show-seconds-button')
            : enableElement('.show-seconds-button');
        format !== '12hr'
            ? disableElement('.show-meridiem-button')
            : enableElement('.show-meridiem-button');
    }

    function handleShowSecondsChange() {
        setShowSeconds(s => !s);
        localStorage.setItem('showSeconds', JSON.stringify(!showSeconds));
    }
    function handleShowMeridiemChange() {
        setShowMeridiem(m => !m);
        localStorage.setItem('showMeridiem', JSON.stringify(!showMeridiem));
    }

    function disableElement(selector) {
        const element = document.querySelector(selector);
        element.disabled = true;
    }
    function enableElement(selector) {
        const element = document.querySelector(selector);
        element.disabled = false;
    }
    function getLocalStorageValue(attribute, defaultValue) {
        return localStorage.getItem(attribute) === null
            ? defaultValue
            : localStorage.getItem(attribute);
    }

    useEffect(() => {
        settingsUpdateToNav({
            clockPosition: clockPosition,
            timeFormatSettings: {
                timeFormat: timeFormat,
                showSeconds: showSeconds,
                showMeridiem: showMeridiem
            },
        })
    }, [clockPosition, timeFormat, showSeconds, showMeridiem]);

    return (
        <div className='settings-menu' id={displayState}>
            <span className='menu-title'>
                Settings
            </span>
            <div className='menu-detail'>
                <span className='menu-subtitle'>
                    Clock Position
                </span>
                <div className='menu-options'>
                    <label>
                        <input  type='radio'
                                value='top'
                                checked={clockPosition === 'top'}
                                onChange={handleClockPositionChange} />
                        Top
                    </label>
                    <label>
                        <input  type='radio'
                                value='center'
                                checked={clockPosition === 'center'}
                                onChange={handleClockPositionChange} />
                        Center
                    </label>
                    <label>
                        <input  type='radio'
                                value='bottom'
                                checked={clockPosition === 'bottom'}
                                onChange={handleClockPositionChange} />
                        Bottom
                    </label>
                </div>
            </div>
            <div className='menu-detail'>
                <span className='menu-subtitle'>
                    Time Format
                </span>
                <div className='menu-options'>
                    <label>
                        <input  type='radio'
                                value='12hr'
                                checked={timeFormat === '12hr'}
                                onChange={handleTimeFormatChange} />
                        12-Hour
                    </label>
                    <label>
                        <input  type='radio'
                                value='24hr'
                                checked={timeFormat === '24hr'}
                                onChange={handleTimeFormatChange} />
                        24-Hour
                    </label>
                    <label>
                        <input  type='radio'
                                value='military'
                                checked={timeFormat === 'military'}
                                onChange={handleTimeFormatChange} />
                        Military
                    </label>
                </div>
                <div className='menu-options-buttons'>
                    <button
                        className='show-seconds-button'
                        onClick={handleShowSecondsChange}>
                            {showSeconds ? 'Hide Seconds' : 'Show Seconds'} 
                    </button>
                    <button
                        className='show-meridiem-button'
                        onClick={handleShowMeridiemChange}>
                            {showMeridiem ? 'Hide Meridiem' : 'Show Meridiem'} 
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SettingsMenu