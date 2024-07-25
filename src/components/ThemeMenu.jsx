/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'

const ThemeMenu = ({ displayState }) => {
    const [backgroundType, setBackgroundType] = useState(getLocalStorageValue('backgroundType', 'color'));
    const [backgroundColor, setBackgroundColor] = useState(getLocalStorageValue('backgroundColor', '#008080'));
    const [backgroundImageUrl, setBackgroundImageUrl] = useState(getLocalStorageValue('backgroundImageUrl',''));
    const [backgroundBlur, setBackgroundBlur] = useState(getLocalStorageValue('backgroundBlur','5'));
    const [uiColor, setUiColor] = useState(getLocalStorageValue('uiColor','#ffffff'));
    const [clockTextAlpha, setClockTextAlpha] = useState(getLocalStorageValue('clockTextAlpha','255'));

    const htmlBody = document.body;
    const colorPicker = document.querySelector('.color-picker');
    const imageUrlInput = document.querySelector('.url-input');
    const navbar = document.querySelector('.navbar');
    const helpMenu = document.querySelector('.help-menu');
    const settingsMenu = document.querySelector('.settings-menu');
    const themeMenu = document.querySelector('.theme-menu');
    const menuSubtitle = document.querySelectorAll('.menu-subtitle');
    const sliders = document.querySelectorAll('.slider-input');
    const buttons = document.querySelectorAll('button');
    const clockText = document.querySelector('.clock-text');

    useEffect(() => {
        htmlBody.style.backgroundColor = backgroundColor;
        htmlBody.style.backgroundImage = `url(${backgroundImageUrl})`;
        htmlBody.style.backdropFilter = `blur(${backgroundBlur}px)`;
    }, [])

    useEffect(() => {
        htmlBody.style.color = uiColor;
        if (navbar !== null)
            renderUiColorChange(uiColor);
    }, [navbar])

    const enableColorPicker = () => {
        colorPicker.disabled = false;
        imageUrlInput.disabled = true;
        sliders.forEach((element) => element.style.setProperty('--inpBorderColor', backgroundColor));
        htmlBody.style.backgroundImage = '';
    }
    const enableUrlInput = () => {
        colorPicker.disabled = true;
        imageUrlInput.disabled = false;
        sliders.forEach((element) => element.style.setProperty('--inpBorderColor', uiColor));
        htmlBody.style.backgroundImage = `url(${backgroundImageUrl})`;
    }

    const getRGB = (hexNum) => {
        const r = (hexNum >> 16) & 255;
        const g = (hexNum >> 8) & 255;
        const b = hexNum & 255;
        return [r,g,b];
    }

    function getLocalStorageValue(attribute, defaultValue) {
        return localStorage.getItem(attribute) === null
            ? defaultValue
            : localStorage.getItem(attribute);
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
        setBackgroundType(event.target.value);
        event.target.value === 'color'
            ? enableColorPicker()
            : enableUrlInput();
        localStorage.setItem('backgroundType', event.target.value);
    }

    function handleBackgroundColorChange(event) {
        setBackgroundColor(event.target.value);
        htmlBody.style.backgroundColor = event.target.value;
        htmlBody.style.backgroundImage = '';
        sliders.forEach((element) => element.style.setProperty('--inpBorderColor', event.target.value));
        localStorage.setItem('backgroundColor', event.target.value);
    }

    function handleBackgroundImageChange(event) {
        if (event.key === 'Enter') {
            setBackgroundImageUrl(event.target.value);
            htmlBody.style.backgroundImage = `url(${event.target.value})`;
        }
        localStorage.setItem('backgroundImageUrl', event.target.value);
    }
    function handleBackgroundImageUrlChange(event) {
        setBackgroundImageUrl(event.target.value);
    }
    function handleBackgroundBlurChange(event) {
        setBackgroundBlur(event.target.value);
        htmlBody.style.backdropFilter = `blur(${event.target.value}px)`;
        localStorage.setItem('backgroundBlur', event.target.value);
    }
    function handleUiColorChange(event) {
        setUiColor(event.target.value);
        renderUiColorChange(event.target.value);
        localStorage.setItem('uiColor', event.target.value);
    }
    function renderUiColorChange(color) {
        htmlBody.style.color = color;
        navbar.style.borderBottomColor = color + '70';
        navbar.style.backgroundColor = color + '33';
        clockText.style.color = color + (+clockTextAlpha).toString(16)

        const themeBackgroundColor = calculateThemeBackground(color);

        settingsMenu.style.backgroundColor = themeMenu.style.backgroundColor = helpMenu.style.backgroundColor = themeBackgroundColor + "dd";
        settingsMenu.style.borderColor = themeMenu.style.borderColor = helpMenu.style.borderColor = color + '70';
        imageUrlInput.style.borderColor = color + 'cc';

        menuSubtitle.forEach((_, i, arr) => {arr[i].style.borderColor = color});
        buttons.forEach((_, i, arr) => {arr[i].style.borderColor = color + 'ad'});
        buttons.forEach((_, i, arr) => {arr[i].style.backgroundColor = color + '70'});
        buttons.forEach((_, i, arr) => {arr[i].style.color = color});

        backgroundType === 'color'
            ? enableColorPicker()
            : enableUrlInput();

        sliders.forEach((element) => element.style.setProperty('--inpBackgroundColor', color));
    }
    function handleClockTextAlphaChange(event) {
        setClockTextAlpha(event.target.value);
        clockText.style.color = uiColor + (+event.target.value).toString(16);
        localStorage.setItem('clockTextAlpha', event.target.value);
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
                                disabled={backgroundType === 'image'}
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
                        disabled={backgroundType === 'color'}
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
                    <div className='text-transparency-container'>
                        <span>Clock Opacity</span>
                            <input
                                className='slider-input'
                                type='range'
                                min='70'
                                max='254'
                                value={clockTextAlpha} 
                                onChange={handleClockTextAlphaChange} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemeMenu