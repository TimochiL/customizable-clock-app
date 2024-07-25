# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2024-07-25

### Added

- Local storage to save user preferences (don't worry, no sensitive information is used on this site)
  - Clock position
  - Time Format and Show Seconds/Meridiem Buttons
  - Background type, color, image, and blur
  - UI Color
- Clock opacity slider (changes the transparency/opacity of the clock display text)
- Input field and slider hover animations

### Fixed

- Clock position alignment issues (top option too close to navbar)

## [1.0.0] - 2024-07-24

### Added

- LinkedIn icon button functionality; link LinkedIn button to LinkedIn homepage
- Github icon button functionality; link Github button to repo page
- LinkedIn and Github icon button animations
- Background blur slider to theme menu

### Changed

- Portfolio button to match LinkedIn and Github button style

## [0.0.1] - 2024-07-01

### Added

- Clock component displays the time given clock position and time format settings properties.
  - The 12-hour time format consists of the hours, minutes, seconds, and meridiem.
  - The 24-hour time format consists of the hours, minutes, and seconds.
  - The military time format consists of hours and minutes only.
  - The clock display text can be placed at the top, middle, or bottom of the screen.
  - Settings menu provides additional customization to the clock position and time format.
- Navbar component contains help, settings, and theme icon buttons that open corresponding menus.
  - Navbar uses react-icons icons.
  - Portfolio website, LinkedIn, and Github repo icon buttons created for future implementation.
  - All other menus are toggled off when an icon is clicked to open a menu.
  - Navbar icons and the menu active state are animated with CSS transitions and keyframes.
- Help menu provides a description of the app's functionality.
- Settings menu provides user-interactive method of selecting and changing the clock position and time format through radio inputs.
  - The seconds and meridiem toggle buttons hide and show the seconds and meridiem clock units when clicked and are animated with CSS transitions.
  - The seconds toggle button is disabled when the military time format is active. The meridiem toggle button is disabled with the 24-hour or military time format is active.
- Theme menu provides user-interactive method of altering the app's background and interface colors.
  - The user can optionally select a background color or background image.
  - When the background color option is selected, the background color selector element is correspondingly enabled while the image URL text input is disabled. The background color selector element is disabled and the image URL text input is enabled when the background image option is selected.
  - The UI color input element alters the text color, border color, background color, and icon color of the Navbar and menu components with appropriate alpha channel values.
  - Menu background colors and border colors are calculated from the RGB values of the UI hex color selected by the app user.
  - Color previews are provided above each color input with an included hex color corresponding to the selected background or UI color.
- App component passes a callback function as a property to get updated JavaScript Object data from child components Navbar and SettingMenu and pass updated time format and position values to child component Clock.

[unreleased]: https://github.com/TimochiL/customizable-clock-app/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/TimochiL/customizable-clock-app/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/TimochiL/customizable-clock-app/compare/v0.0.1...v1.0.0
[0.0.1]: https://github.com/TimochiL/customizable-clock-app/releases/tag/v0.0.1
