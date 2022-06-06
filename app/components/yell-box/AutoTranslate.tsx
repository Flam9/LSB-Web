import React from "react";
import { Text } from '@chakra-ui/react'

export const AutoTranslate: React.FC<{ children: React.ReactChildren | string }> = ({ children }) => (
    <>
        <Text as="span" userSelect="none" color="green.500" fontWeight="600" marginX="3px" verticalAlign="text-top">⦅</Text>
        {children}
        <Text as="span" userSelect="none" color="red.700" fontWeight="600" marginX="3px" verticalAlign="text-top">⦆</Text>

    </>
);
/*
.autotranslate-start {
    user-select: none;
    color: #329932;
    font-weight: 600;
    font-size: 17px;
    line-height: 16px;
    margin: 0 3px;
  }
  .autotranslate-end {
    user-select: none;
    color: #c22c41;
    font-weight: 600;
    font-size: 17px;
    line-height: 16px;
    margin: 0 3px;
  }
  */