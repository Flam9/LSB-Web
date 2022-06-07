import {Box, Flex, Heading, VStack, HStack, Img, Text, Button, Grid, GridItem} from '@chakra-ui/react';
import {YellBox} from '../components/yell-box';
import {ContentWrapper} from '../components/ContentWrapper';

const Hero = () => (
    <Box
        height="310px"
        backgroundImage="url('/hero-bg.png')"
        backgroundSize="cover"
        position="relative"
        backgroundPosition="center"
    >
        <Box
            background="rgba(36,141,165,0.9)"
            width="55%"
            clipPath="polygon(0 0, 80% 0%, 100% 100%, 0% 100%)"
            position="absolute"
            top={0}
            left={0}
            bottom={0}
        ></Box>
        <Flex justifyContent="center" alignItems="center" height="100%">
            <Box width="1280px" zIndex={1} color="white">
                <VStack width="45%" spacing="16px" alignItems="flex-start" paddingX="5">
                    <Heading as="h2">Welcome to LSB-Web</Heading>
                    <Text>
                        LSB-Web is a level 99 capped retail-like server focused on providing a true Final Fantasy XI
                        experience.
                    </Text>
                    <Button color="black">
                        <HStack spacing="10px">
                            <Img src="/discord-logo.png" alt="" />
                            <Text>Join our community</Text>
                        </HStack>
                    </Button>
                </VStack>
            </Box>
        </Flex>
    </Box>
);

const News = () => <Box>Some news</Box>;

export default function Index() {
    return (
        <>
            <Hero />
            <ContentWrapper marginTop="5">
                <Grid templateColumns="repeat(2, 1fr)" gap={6} paddingX="5">
                    <GridItem w="100%">
                        <News />
                    </GridItem>
                    <GridItem w="100%">
                        <YellBox />
                    </GridItem>
                </Grid>
            </ContentWrapper>
        </>
    );
}
