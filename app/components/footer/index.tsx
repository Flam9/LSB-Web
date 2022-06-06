import { Center, Flex, Text, Box } from '@chakra-ui/react';

// TODO replace hex with theme token
export const Footer = () => (
    <Center backgroundColor="#193238" color="white">
        <Flex width="1280px" justifyContent="space-between" paddingX="5" paddingY="2" alignItems="center">
            <Text flexBasis="40%">LSB-Web | Classic FFXI Emulation Server</Text>
            <Box>
                <Text as="div" fontSize="small">All FINAL FANTASY® XI content and images © 2002-2022SQUARE ENIX CO., LTD. All Rights Reserved.</Text>
                <Text as="div" fontSize="small">FINAL FANTASY® is a registered trademark of SQUARE ENIX CO., LTD. All Rights Reserved.</Text>
            </Box>
        </Flex>
    </Center>
)