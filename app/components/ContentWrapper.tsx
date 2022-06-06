import { Flex, Box } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'
import React from 'react'


export const ContentWrapper: React.FC<BoxProps> = ({ children, ...props }) => (
    <Flex {...props} justifyContent="center" paddingX="5">
        <Box maxWidth="1280px">{children}</Box>
    </Flex >
)