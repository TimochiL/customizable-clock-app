import React from 'react'

const HelpMenu = ({displayState}) => {
  return (
    <div className='help-menu' id={displayState}>
            <span className='menu-title'>
                Help
            </span>
            <div className='menu-detail'>
                <p>
                    Click the ⚙️ button to open the settings menu.
                    The settings menu allows you to customize the position and format of the displayed time.
                    Click the ☾⁺₊ button to open the theme menu.
                    From the theme menu, you can change the background to a color or an image.
                    The theme menu also allows you to customize the color of the UI.
                </p>
            </div>
    </div>
  )
}

export default HelpMenu