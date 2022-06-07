import {
    Flex, Button, HStack, Heading, Center, Img, Box, IconButton, useBreakpointValue
} from '@chakra-ui/react';
import { Link } from "@remix-run/react";
import { FiMenu } from 'react-icons/fi'


export const Header = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    // console.log(isDesktop)

    return (
        <Center backgroundColor="white" height="70px" paddingX="5">
            <Flex as="nav" maxWidth="1280px" width="100%" justifyContent="space-between">
                {isDesktop ? (
                    <><HStack spacing="40px">
                        <Link to="/">
                            <HStack spacing="10px">
                                <Box marginTop="7" zIndex="2" >
                                    <Img src="/cait.png" alt="" width="54px" height="93px" />
                                </Box>
                                <Heading as="h1" size="md">LSB-Web</Heading>
                            </HStack>
                        </Link>
                        <HStack spacing="30px">
                            <Link to="/about">About</Link>
                            <Link to="/rules">Rules</Link>
                            <Link to="/market">Market</Link>
                            <Link to="/players">Players</Link>
                        </HStack>
                    </HStack>
                        <HStack spacing="20px">
                            <Button variant="ghost">Login</Button>
                            <Button variant="primary">Register</Button>
                        </HStack></>) : (
                    <Flex width="100%" justifyContent="space-between" alignItems="center">
                        <Link to="/">
                            <HStack spacing="10px">
                                <Box marginTop="7" zIndex="2" >
                                    <Img src="/cait.png" alt="" width="54px" height="93px" />
                                </Box>
                                <Heading as="h1" size="md">LSB-Web</Heading>
                            </HStack>
                        </Link>
                        <IconButton
                            variant="ghost"
                            icon={<FiMenu fontSize="1.25rem" />}
                            aria-label="Open Menu"
                        />
                    </Flex>)}
            </Flex>
        </Center>
    )
}