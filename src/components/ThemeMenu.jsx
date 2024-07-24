/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const ThemeMenu = ({ displayState }) => {
    const [backgroundType, setBackgroundType] = useState('color');
    const [backgroundColor, setBackgroundColor] = useState('#008080');
    const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
    const [backgroundBlur, setBackgroundBlur] = useState('5');
    const [uiColor, setUiColor] = useState('#ffffff');

    const htmlBody = document.body;
    const colorPicker = document.querySelector('.color-picker');
    const imageUrlInput = document.querySelector('.url-input');
    const navbar = document.querySelector('.navbar');
    const helpMenu = document.querySelector('.help-menu');
    const settingsMenu = document.querySelector('.settings-menu');
    const themeMenu = document.querySelector('.theme-menu');
    const menuSubtitle = document.querySelectorAll('.menu-subtitle');
    const slider = document.querySelector('.slider-input')
    const buttons = document.querySelectorAll('button');

    const enableColorPicker = () => {
        colorPicker.disabled = false;
        imageUrlInput.disabled = true;
        htmlBody.style.backgroundImage = '';
    }
    const enableUrlInput = () => {
        colorPicker.disabled = true;
        imageUrlInput.disabled = false;
        console.log(backgroundImageUrl)
        htmlBody.style.backgroundImage = `url(${backgroundImageUrl})`;
    }

    const getRGB = (hexNum) => {
        const r = (hexNum >> 16) & 255;
        const g = (hexNum >> 8) & 255;
        const b = hexNum & 255;
        return [r,g,b];
    }

    function calculateThemeBackground(hexColor) {
        const hexNum = parseInt(hexColor.slice(1), 16);
        const [r,g,b] = getRGB(hexNum);
        let offset = 60;
        let limit = 255;

        const isDarkColor = r < 127 && b < 127 && g < 127 || !getRGB(backgroundColor).every((value) => value < 127);
        
        const minOrMax = (first, second, idc=isDarkColor) => {
            if (idc)
                return Math.min(first, second);
            return Math.max(first, second);
        }

        if ( !isDarkColor ) {
            offset *= -1;
            limit = 0;
        }
        return "#" + (1 << 24 | minOrMax(r+offset,limit) << 16 | minOrMax(g+offset,limit) << 8 | minOrMax(b+offset,limit)).toString(16).slice(1);
    }

    function handleBackgroundTypeChange(event) {
        setBackgroundType(event.target.value)
        event.target.value === 'color'
            ? enableColorPicker()
            : enableUrlInput();
    }

    function handleBackgroundColorChange(event) {
        setBackgroundColor(event.target.value);
        htmlBody.style.backgroundColor = event.target.value;
        htmlBody.style.backgroundImage = '';
        slider.style.setProperty('--inpBorderColor', event.target.value)
    }

    function handleBackgroundImageChange(event) {
        if (event.key === 'Enter') {
            setBackgroundImageUrl(event.target.value);
            htmlBody.style.backgroundImage = `url(${event.target.value})`;
        }
    }
    function handleBackgroundImageUrlChange(event) {
        setBackgroundImageUrl(event.target.value);
    }
    function handleBackgroundBlurChange(event) {
        setBackgroundBlur(event.target.value)
        htmlBody.style.backdropFilter = `blur(${event.target.value}px)`
    }
    function handleUiColorChange(event) {
        setUiColor(event.target.value);
        htmlBody.style.color = event.target.value;
        navbar.style.borderBottomColor = event.target.value + '70';
        navbar.style.backgroundColor = event.target.value + '33';

        const themeBackgroundColor = calculateThemeBackground(event.target.value);

        settingsMenu.style.backgroundColor = themeMenu.style.backgroundColor = helpMenu.style.backgroundColor = themeBackgroundColor + "dd";
        settingsMenu.style.borderColor = themeMenu.style.borderColor = helpMenu.style.borderColor = themeBackgroundColor + "70";

        menuSubtitle.forEach((_, i, arr) => {arr[i].style.borderColor = event.target.value});
        buttons.forEach((_, i, arr) => {arr[i].style.borderColor = event.target.value + 'ad'});
        buttons.forEach((_, i, arr) => {arr[i].style.backgroundColor = event.target.value + '70'});
        buttons.forEach((_, i, arr) => {arr[i].style.color = event.target.value});

        slider.style.setProperty('--inpBackgroundColor', event.target.value);
    }

    return (
        <div className='theme-menu' id={displayState}>
            <span className='menu-title'>
                Theme
            </span>
            <div className='menu-detail'>
                <span className='menu-subtitle'>
                    Background Type
                </span>
                <div className='menu-options'>
                    <label>
                        <input
                            type='radio'
                            value='color'
                            checked={backgroundType === 'color'}
                            onChange={handleBackgroundTypeChange} />
                        Background Color
                    </label>
                    <div className='color-picker-container'>
                        <div className='color-hex-display'>
                            <label>Selected Color:</label>
                            <span style={{
                                backgroundColor: backgroundType === 'color'
                                    ? backgroundColor
                                    : uiColor + "40",
                                color: uiColor,
                                borderColor: uiColor
                            }}>
                                {backgroundColor.toUpperCase()}
                            </span>
                        </div>
                        <div className='color-picker-display'>
                            <label>Select a Color:</label>
                            <input
                                className='color-picker'
                                type='color'
                                value={backgroundColor}
                                onChange={handleBackgroundColorChange}
                            />
                        </div>
                    </div>
                    <label>
                        <input
                            type='radio'
                            value='image'
                            checked={backgroundType === 'image'}
                            onChange={handleBackgroundTypeChange} />
                        Background Image
                    </label>
                    <input
                        className='url-input'
                        type='text'
                        placeholder='Enter Image URL'
                        value={backgroundImageUrl}
                        onKeyDown={handleBackgroundImageChange}
                        onChange={handleBackgroundImageUrlChange}
                        disabled
                    />
                    <div className='background-blur-container'>
                        <span>Background Blur</span>
                        <input
                            className='slider-input'
                            type='range'
                            min='1'
                            max='25'
                            value={backgroundBlur} 
                            onChange={handleBackgroundBlurChange} />
                    </div>
                </div>
            </div>
            <div className='menu-detail'>
                <span className='menu-subtitle'>
                    UI Color
                </span>
                <div className='menu-options'>
                    <div className='color-picker-container'>
                        <div className='color-hex-display'>
                            <label>Selected Color:</label>
                            <span style={{
                                backgroundColor: backgroundType === 'color'
                                    ? backgroundColor
                                    : uiColor + "70",
                                color: uiColor,
                                borderColor: uiColor,
                            }}>
                                {uiColor.toUpperCase()}
                            </span>
                        </div>
                        <div className='color-picker-display'>
                            <label>Select a Color:</label>
                            <input
                                className='color-picker'
                                type='color'
                                value={uiColor}
                                onChange={handleUiColorChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemeMenu