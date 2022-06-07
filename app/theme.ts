// https://chakra-ui.com/docs/styled-system/theming/customize-theme
// This is the only file you should change in order to theme the entire website
import {extendTheme} from '@chakra-ui/react';

const overrides = {
    // https://chakra-ui.com/docs/styled-system/theming/theme#typographyhttps://chakra-ui.com/docs/styled-system/theming/theme#typography
    fonts: {
        body: "'Noto Sans JP', system-ui, sans-serif",
        heading: "'Noto Sans JP', system-ui, sans-serif",
    },
};

export const theme = extendTheme(overrides);
