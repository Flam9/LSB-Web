import React from 'react';
import {Text} from '@chakra-ui/react';

export const AutoTranslate: React.FC<{children: React.ReactChildren | string}> = ({children}) => (
    <>
        <Text as="span" userSelect="none" color="green.500" fontWeight="600" marginX="3px" verticalAlign="text-top">
            ⦅
        </Text>
        {children}
        <Text as="span" userSelect="none" color="red.700" fontWeight="600" marginX="3px" verticalAlign="text-top">
            ⦆
        </Text>
    </>
);
