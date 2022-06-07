import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import type { chars } from '@prisma/client';
import {
    Grid, GridItem, Heading, FormControl, FormLabel, Input, InputGroup, InputRightElement, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, Img, Square, Flex, Text, VisuallyHidden
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

import { db } from '~/utils/db.server';
import { RACE, FACE, JOB_ABBREVIATION } from '~/constants'
import { ContentWrapper } from '~/components/ContentWrapper';
import { Card } from '../../components/Card'
import { FiSearch } from 'react-icons/fi'

type OnlineStatus = {
    charname: string,
    mjob: number,
    mlvl: number,
    name: string,
    sjob: number,
    slvl: number,
    face: number,
    race: number
}

type LoaderData = Array<OnlineStatus>;

// Queries from https://github.com/Flam9/XiWeb/blob/master/services/getOnlineCharacters.php
export const loader: LoaderFunction = async () => {
    const data = await db.$queryRaw`SELECT charname, zone_settings.name, mjob, sjob, mlvl, slvl, bazaar_message, face, race
FROM chars, zone_settings, char_stats, char_look
WHERE chars.charid in (select charid from accounts_sessions) and chars.pos_zone = zone_settings.zoneid and chars.charid = char_stats.charid;`;

    return json(data);
};

// TODO pagination
// TODO search

export default function WhosOnline() {
    const userStatusList = useLoaderData<LoaderData>();
    const navigate = useNavigate();
    console.log(userStatusList);

    return (

        <ContentWrapper>

            <Heading as="h2" size="2xl" marginTop="6" marginBottom="3">Players</Heading>
            <Card>
                <FormControl>
                    <FormLabel htmlFor='adventurer-name-search'>Search for an adventurer</FormLabel>
                    <InputGroup>
                        <Input id='adventurer-name-search' type='text' />

                        <InputRightElement children={<FiSearch />} />
                    </InputGroup>
                </FormControl>
            </Card>
            <Card>
                <Heading as="h3" size="lg" marginTop="6" marginBottom="3">{userStatusList.length} adventurers online</Heading>

                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>A list of adventurers currently exploring Vanadiel</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Job</Th>
                                <Th>Zone</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {userStatusList.map(({ charname, name, mlvl, mjob, slvl, sjob, face, race }: any) => (
                                <Tr key={charname} _hover={{ backgroundColor: 'gray.200', cursor: 'pointer' }} onClick={() => navigate(`/players/${charname}`, {})}>
                                    <Td>
                                        <Flex alignItems="center">
                                            <Square size='40px' bg='purple.700' color='white' marginRight="2">
                                                <Img src={`/faces/${RACE[race - 1]}${FACE[face]}.webp`} alt="" />
                                            </Square>


                                            <Link to={`/players/${charname}`}>{charname}<VisuallyHidden>'s profile page</VisuallyHidden></Link>
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Text>{mlvl}{JOB_ABBREVIATION[mjob]} / {slvl}{JOB_ABBREVIATION[sjob]}</Text>
                                    </Td>
                                    <Td>{name}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Card>
        </ContentWrapper >
    );
}
