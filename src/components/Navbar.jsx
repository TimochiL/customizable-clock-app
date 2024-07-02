import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { IoSettings } from 'react-icons/io5';
import { FaGithub, FaLinkedin, FaQuestionCircle } from "react-icons/fa"
import { BsMoonStarsFill } from "react-icons/bs";
import { TbClockEdit } from "react-icons/tb";
import { TbSquareRoundedLetterT } from "react-icons/tb";
import HelpMenu from './HelpMenu.jsx';
import SettingsMenu from './SettingsMenu.jsx';
import ThemeMenu from './ThemeMenu.jsx';

const Navbar = ({settingsUpdateToApp, data}) => {
    const [helpIsToggled, setHelpIsToggled] = useState(false);
    const [settingsIsToggled, setSettingsIsToggled] = useState(false);
    const [themeIsToggled, setThemeIsToggled] = useState(false);

    const [navData, setNavData] = useState(data)

    function handleToggleHelp() {
        toggleElse('help');
        setHelpIsToggled(h => !h);
    }
    function handleToggleSettings() {
        toggleElse('settings');
        setSettingsIsToggled(s => !s);
    }
    function handleToggleTheme() {
        toggleElse('theme');
        setThemeIsToggled(t => !t);
    }

    function toggleElse(toggleOn) {
        switch (toggleOn) {
            case 'help':
                settingsIsToggled && setSettingsIsToggled(s => !s);
                themeIsToggled && setThemeIsToggled(t => !t);
                break;
            case 'settings':
                helpIsToggled && setHelpIsToggled(h => !h);
                themeIsToggled && setThemeIsToggled(t => !t);
                break;
            case 'theme':
                helpIsToggled && setHelpIsToggled(h => !h);
                settingsIsToggled && setSettingsIsToggled(s => !s);
                break;
        }
    }

    const settingsUpdateToNav = (menuData) => {
        setNavData(menuData)
    }

    useEffect(() => {
        settingsUpdateToApp(navData)
    }, [navData])

    return (
        <div className='navbar-container'>
            <div className='navbar'>
                <IconContext.Provider value={{ size: 24 }}>
                    <div className='icon-buttons'>
                        <TbSquareRoundedLetterT />
                        <FaLinkedin className='linkedin-button'/>
                        <FaGithub className='github-button'/>
                    </div>
                </IconContext.Provider>
                <span className='title'>
                    <IconContext.Provider value={{ size: 24 }}>
                        <>
                            <TbClockEdit />
                        </>
                    </IconContext.Provider>
                    TIME TAILOR
                </span>
                <IconContext.Provider value={{ size: 24 }}>
                    <div className='icon-buttons'>
                        <FaQuestionCircle className='help-button' onClick={handleToggleHelp} />
                        <IoSettings className='settings-button' onClick={handleToggleSettings} />
                        <BsMoonStarsFill className='theme-button' onClick={handleToggleTheme} />
                    </div>
                </IconContext.Provider>
            </div>
            <div className='menus-container'>
                {
                helpIsToggled
                    ? <HelpMenu
                        displayState='active'
                        />
                    : <HelpMenu
                        displayState='inactive'
                    />
                }
                {
                settingsIsToggled
                    // ? <SettingsMenu className='settings-menu--active' settingsUpdateToNav={settingsUpdateToNav} data={data} />
                    // : <SettingsMenu className='settings-menu--inactive' settingsUpdateToNav={settingsUpdateToNav} data={data} />
                    ? <SettingsMenu
                        displayState='active'
                        settingsUpdateToNav={settingsUpdateToNav}
                        data={data} />
                    : <SettingsMenu
                        displayState='inactive'
                        settingsUpdateToNav={settingsUpdateToNav}
                        data={data} />
                }
                {
                themeIsToggled
                    ? <ThemeMenu
                        displayState='active'
                        />
                    : <ThemeMenu
                        displayState='inactive'
                        />
                }
            </div>
        </div>
    )
}

export default Navbar