// theme.js
import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1e3d59', // Dark blue
    accent: '#4a9e82', // Green
    background: '#222', // Dark background
    surface: '#393e46', // Lighter shade for cards and elements
    cardBackground: '#333', // Card background color
    text: '#fff', // Light text color
  },
};

export default theme;