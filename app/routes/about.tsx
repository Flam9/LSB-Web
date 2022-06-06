import { Box, AspectRatio, Heading, Heading, Center, Img, Text, Button } from '@chakra-ui/react'


export default function About() {
    return (
        <Box height="50vh" overflow="hidden" position="relative">
            <AspectRatio maxW='100%' ratio={16 / 9} position="absolute" bottom="-40px" left="0" right="0" top="0">
                <video autoPlay muted loop>
                    <source src="/vids/MogGarden2.mp4" type="video/mp4" />
                </video>
            </AspectRatio>
            <Center zIndex={2} position="relative" height="100%">
                <Heading as="h2" size="4xl" color="white">About LSB-Web</Heading>
            </Center>
        </Box>
    );
}
