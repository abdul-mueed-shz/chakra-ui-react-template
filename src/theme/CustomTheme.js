import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    main: {
        primary: '#8829d4',
        secondary: '#47b61c',
        gray: '#999999',
        white: '#f5f5f5',
        black: '#343434',
    },
}

export const CustomTheme = extendTheme({ colors })