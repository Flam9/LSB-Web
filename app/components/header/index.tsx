import { Flex, Button, HStack, Heading, Center, Img, Box } from '@chakra-ui/react';
import { Link } from "@remix-run/react";

export const Header = () => (
    <Center backgroundColor="white" height="70px" paddingX="5">
        <Flex as="nav" maxWidth="1280px" width="100%" justifyContent="space-between">
            <HStack spacing="40px">
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
                <Button>Login</Button>
                <Button>Register</Button>
            </HStack>
        </Flex>
    </Center>
)