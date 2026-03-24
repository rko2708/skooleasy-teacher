/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#1d5f5f';
const tintColorDark = '#f4d35e';

export const Colors = {
  light: {
    text: '#132122',
    background: '#f6f3ea',
    tint: tintColorLight,
    icon: '#6d7672',
    tabIconDefault: '#7d8682',
    tabIconSelected: tintColorLight,
    surface: '#fffdf8',
    surfaceMuted: '#efe6d4',
    border: '#e2d6bf',
    shadow: '#392f18',
    muted: '#5d645f',
    accentStrong: '#1d5f5f',
    heroBackground: '#f3ead6',
    heroBorder: '#dbc8a0',
    heroAccent: '#8c5a11',
    badgeBackground: '#d9ebe8',
    successSoft: '#d8ead5',
    warningSoft: '#f7e1c7',
    warning: '#c97a16',
  },
  dark: {
    text: '#f4f1e8',
    background: '#142022',
    tint: tintColorDark,
    icon: '#9fb4b1',
    tabIconDefault: '#93a09f',
    tabIconSelected: tintColorDark,
    surface: '#1b2d30',
    surfaceMuted: '#23383c',
    border: '#335055',
    shadow: '#020404',
    muted: '#b8c4c1',
    accentStrong: '#f4d35e',
    heroBackground: '#263b3a',
    heroBorder: '#4b6b67',
    heroAccent: '#f4d35e',
    badgeBackground: '#314e52',
    successSoft: '#27463b',
    warningSoft: '#4b3922',
    warning: '#f2b35e',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "'Avenir Next', 'Segoe UI', Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
