import { Box, Text } from '@chakra-ui/react'
import React from 'react';
import { AutoTranslate } from "./AutoTranslate";


const YellBoxMsg: React.FC<{ time: string, name: string, children: any }> = ({ time, name, children }) => (
    <Text as="li" marginBottom="1" color="white" fontSize="small" lineHeight="16px">
        <Text as="span" color="#7af">[{time}] {name}: </Text>
        <Text as="span">{children}</Text>
    </Text>
)


export const YellBox = () => (
    <Box minHeight="200px" background="linear-gradient(to bottom, rgba(49, 48, 90, 1) 0%, rgba(20, 20, 37, 1) 50%, rgba(49, 48, 90, 1) 100%)" position="relative"
        border="4px solid rgb(126, 126, 126)"
        borderRadius="2px"
        overflow="auto"
        zIndex={1}
        _before={{
            content: `""`,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.15) 100%)",
            backgroundSize: "100% 5px",
            zIndex: 1
        }}>
        <Box as="ul" color="white"
            zIndex={2}
            position="relative"
            textAlign="left"
            listStyleType="none"
            overflow="auto"
            margin={0}
            padding="8px">
            <YellBoxMsg time="12:35:58 AM" name="Antiqua">
                Welcome to nameless! Landsandboat
            </YellBoxMsg>

            <YellBoxMsg time="12:35:58 AM" name="Orangekwie">
                wts <AutoTranslate>Alkyoneuss Brc.</AutoTranslate>
                <AutoTranslate>Do you need it?</AutoTranslate>
                <AutoTranslate>/tell</AutoTranslate>
            </YellBoxMsg>

            <YellBoxMsg time="12:35:58 AM" name="Cabinman">
                WTS
                <AutoTranslate>Scp. Harness +1</AutoTranslate> /
                <AutoTranslate>Serket Ring</AutoTranslate> /
                <AutoTranslate>Pluto's Staff</AutoTranslate>
                <AutoTranslate>/tell</AutoTranslate>
            </YellBoxMsg>

            <YellBoxMsg time="12:35:58 AM" name="Afidegg">
                any rdm 55-75 wanna exp? <AutoTranslate>/tell</AutoTranslate> :]
            </YellBoxMsg>
        </Box>
    </Box>
);

