import type {LoaderFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import {Link, useLoaderData} from '@remix-run/react';
import type {chars} from '@prisma/client';
import {
    Grid,
    GridItem,
    Heading,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Img,
    Square,
    Flex,
    Text,
    VisuallyHidden,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

import {db} from '~/utils/db.server';
import {RACE, FACE, JOB_ABBREVIATION} from '~/constants';
import {ContentWrapper} from '~/components/ContentWrapper';
import {Card} from '../../components/Card';
import {FiSearch} from 'react-icons/fi';

/**
 * Determines if the players nameflags have a GM flag enabled.
 *
 * @param {int} flags                       The characters nameflags to test.
 * @return {bool}                           True if a flag is present, false otherwise.
 */
function hasGmFlag(flags: number): boolean {
    // GM - PlayOnline
    if ((flags & 0x00010000) == 0x00010000) return true;
    // GM - Standard GM
    if ((flags & 0x04000000) == 0x04000000) return true;
    // GM - Senior
    if ((flags & 0x05000000) == 0x05000000) return true;
    // GM - Lead
    if ((flags & 0x06000000) == 0x06000000) return true;
    // GM - Producer
    if ((flags & 0x07000000) == 0x07000000) return true;
    return false;
}

type CharacterDataObject = {
    charid: number;
    charname: string;
    mjob: number;
    mlvl: number;
    sjob: number;
    slvl: number;
    face: number;
    race: number;
    zonename: string;
    nameflags: number;
    pos_zone: number;
    gmlevel: number;
    ls1name: string | null;
    ls2name: string | null;
    ls1color: string | null;
    ls2color: string | null;
    ls1rank: number;
    ls2rank: number;
    mentor: number;
    unlocked: number;
    genkai: number;
    war: number;
    mnk: number;
    whm: number;
    blm: number;
    rdm: number;
    thf: number;
    pld: number;
    drk: number;
    bst: number;
    brd: number;
    rng: number;
    sam: number;
    nin: number;
    drg: number;
    smn: number;
    blu: number;
    cor: number;
    pup: number;
    dnc: number;
    sch: number;
    geo: number;
    run: number;
    ishidden: number;
};

type Character = {
    charname: string;
    mjob: number;
    mlvl: number;
    sjob: number;
    slvl: number;
    face: number;
    race: number;
    zonename: string;
    nameflags: number;
    pos_zone: number;
    gmlevel: number;
    ls1name: string | null;
    ls2name: string | null;
    ls1color: string | null;
    ls2color: string | null;
    ls1rank: number;
    ls2rank: number;
    mentor: number;
    unlocked: number;
    genkai: number;
    jobs: Array<{id: number; name: string; level: number}>;
};

type LoaderData = Array<CharacterDataObject>;

// Queries from https://github.com/Flam9/XiWeb/blob/master/services/getOnlineCharacters.php
export const loader: LoaderFunction = async () => {
    // Query the database for the online characters
    const data: Array<CharacterDataObject> =
        await db.$queryRaw`SELECT c.charid, c.charname, cs.nameflags, c.pos_zone, c.gmlevel, ls1.name AS ls1name, ls2.name AS ls2name, ls1.color AS ls1color, ls2.color AS ls2color, s.linkshellrank1 AS ls1rank, s.linkshellrank2 AS ls2rank, cs.mjob, cs.sjob, cs.mlvl, cs.slvl, c.mentor, cj.*, z.name AS zonename,
            (SELECT COUNT(*) FROM char_vars AS cv WHERE cv.charid = c.charid AND cv.varname LIKE '%gmhidden%') AS ishidden
            FROM accounts_sessions AS s
            LEFT JOIN chars AS c ON s.charid = c.charid
            LEFT JOIN linkshells AS ls1 ON s.linkshellid1 = ls1.linkshellid
            LEFT JOIN linkshells AS ls2 ON s.linkshellid2 = ls2.linkshellid
            LEFT JOIN char_stats AS cs ON s.charid = cs.charid
            LEFT JOIN char_jobs AS cj ON s.charid = cj.charid
            LEFT JOIN zone_settings AS z ON c.pos_zone = z.zoneid
            ORDER BY c.gmlevel DESC, c.charname ASC;`;

    // Build a character for each online character..
    const characters = data
        .filter((character: CharacterDataObject) => {
            // Skip invalid characters
            if (character.charname == null || character.charname === '') return false;

            // Skip hidden players
            if (character.ishidden >= 1) return false;

            // Skip GMs that are anon (/anon)
            if ((character.nameflags & 0x00001000) === 0x00001000 && character.gmlevel > 0) return false;

            return true;
        })
        .map((character: CharacterDataObject): Character => {
            const {
                charname,
                mjob,
                mlvl,
                sjob,
                slvl,
                face,
                race,
                zonename,
                nameflags,
                pos_zone,
                gmlevel,
                ls1name,
                ls2name,
                ls1color,
                ls2color,
                ls1rank,
                ls2rank,
                mentor,
                unlocked,
                genkai,
                ...rest
            } = character;
            const char = {
                charname,
                mjob,
                mlvl,
                sjob,
                slvl,
                face,
                race,
                zonename,
                nameflags,
                pos_zone,
                gmlevel,
                ls1name,
                ls2name,
                ls1color,
                ls2color,
                ls1rank,
                ls2rank,
                mentor,
                unlocked,
                genkai,
            };

            // Hide players GM status if their flag is off
            if (!hasGmFlag(character.nameflags)) character.gmlevel = 0;

            // Convert the linkshell colors to html colors..
            // character.ls1color = ffxi.getLinkshellHtmlColor(character.ls1color);
            // character.ls2color = ffxi.getLinkshellHtmlColor(character.ls2color);

            // Build the characters jobs array
            /* character.jobs = [];
            for (var x = 0; x < 23; x++) {
                newCharObject.jobs.push({
                    id: x,
                    name: ffxi.getJobAbbrById(x),
                    level: c[ffxi.getJobAbbrById(x)],
                });

                if (x !== 0) delete c[ffxi.getJobAbbrById(x)];
            }

            if (character.gmlevel > 0) {
                character.ls1name = '';
                character.ls2name = '';
                character.ls1color = 0;
                character.ls2color = 0;
            }
*/
            return character;
        });

    characters.sort(function (char1, char2) {
        var nameorder = char1.charname === char2.charname ? 0 : char1.charname < char2.charname ? -1 : 1;
        if ((char1.gmlevel > 0 && char2.gmlevel > 0) || (char1.gmlevel === 0 && char2.gmlevel === 0)) return nameorder;
        else if (char1.gmlevel > 0) return -1;

        return 1;
    });
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
            <Heading as="h2" size="2xl" marginTop="6" marginBottom="3">
                Players
            </Heading>
            <Card>
                <FormControl>
                    <FormLabel htmlFor="adventurer-name-search">Search for an adventurer</FormLabel>
                    <InputGroup>
                        <Input id="adventurer-name-search" type="text" />

                        <InputRightElement children={<FiSearch />} />
                    </InputGroup>
                </FormControl>
            </Card>
            <Card>
                <Heading as="h3" size="lg" marginTop="6" marginBottom="3">
                    {userStatusList.length} adventurers online
                </Heading>

                <TableContainer>
                    <Table variant="simple">
                        <TableCaption>A list of adventurers currently exploring Vanadiel</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Job</Th>
                                <Th>Zone</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {userStatusList.map(({charname, name, mlvl, mjob, slvl, sjob, face, race}: any) => (
                                <Tr
                                    key={charname}
                                    _hover={{backgroundColor: 'gray.200', cursor: 'pointer'}}
                                    onClick={() => navigate(`/players/${charname}`, {})}
                                >
                                    <Td>
                                        <Flex alignItems="center">
                                            <Square size="40px" bg="purple.700" color="white" marginRight="2">
                                                <Img src={`/faces/${RACE[race - 1]}${FACE[face]}.webp`} alt="" />
                                            </Square>

                                            <Link to={`/players/${charname}`}>
                                                {charname}
                                                <VisuallyHidden>'s profile page</VisuallyHidden>
                                            </Link>
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Text>
                                            {JOB_ABBREVIATION[mjob]}
                                            {mlvl}/{JOB_ABBREVIATION[sjob]}
                                            {slvl}
                                        </Text>
                                    </Td>
                                    <Td>{name}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Card>
        </ContentWrapper>
    );
}
