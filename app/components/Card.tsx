import { Box } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'
import React from 'react'


export const Card: React.FC<BoxProps> = ({ children, ...props }) => (
    <Box marginBottom="5" {...props} padding="5" boxShadow="lg" backgroundColor="white">
        {children}
    </Box>
)