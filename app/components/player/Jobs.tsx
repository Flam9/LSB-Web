import {Center, Flex, Text, Box} from '@chakra-ui/react';
import {JOB_ABBREVIATION} from '~/constants';

const HALF_JOB_LENGTH = JOB_ABBREVIATION.length / 2;

export const Jobs = () => {
    const dom = [];
    JOB_ABBREVIATION.map((job) => {
        console.log(job);
        if (job === '') {
            return;
        }

        dom.push(
            <Flex key={job}>
                <Box as="dt" marginRight="2">
                    {job}
                </Box>
                <Box as="dd">1</Box>
            </Flex>
        );
    });
    return <Box as="dl">{dom}</Box>;
};
