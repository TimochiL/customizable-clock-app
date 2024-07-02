import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Clock = (props) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    const formatDigits = (timeValue) => {
        return timeValue > 9 ? timeValue : ('0' + timeValue)
    }
    const getMeridiem = () => {
        return time.getHours() < 13 ? 'AM' : 'PM'
    }
    const formatTime = (format) => {
        let displayTimeFormat = ''
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const hours = time.getHours() === 0 ? 24 : time.getHours();

        switch (format) {
            
            case '12hr': {
                const hoursString = hours < 13
                                        ? hours
                                        : hours - 12;
                const secondsString = props.timeFormatSettings.showSeconds
                                        ? ':' + formatDigits(seconds)
                                        : '';
                const meridiemString = props.timeFormatSettings.showMeridiem
                                        ? getMeridiem()
                                        : '';

                displayTimeFormat = `${hoursString}:${formatDigits(minutes)}${secondsString} ${meridiemString}`
            } break;

            case '24hr': {
                const secondsString = props.timeFormatSettings.showSeconds
                                        ? (':' + formatDigits(seconds)) 
                                        : ('')

                displayTimeFormat = `${hours}:${formatDigits(minutes)}${secondsString}`
            } break;

            case 'military': {
                const hours = time.getHours();

                displayTimeFormat = `${formatDigits(hours)}${formatDigits(minutes)}`
            }
        }
        return displayTimeFormat;
    }

    return (
        <div className='clock-container'>
            <div id={props.clockPosition} className='clock'>
                <span
                    className='clock-text'
                    id={props.timeFormatSettings.timeFormat}>
                        {formatTime(props.timeFormatSettings.timeFormat)}
                </span>
            </div>
        </div>
    )
}

Clock.propTypes = {
    clockPosition: PropTypes.string,
    timeFormatSettings: PropTypes.object,
    
}
Clock.defaultProps = {
    clockPosition: 'center',
    timeFormatSettings: {
        timeFormat: '12hr',
        showSeconds: true,
        showMeridiem: true
    }
}



export default Clock