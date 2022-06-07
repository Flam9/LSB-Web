import React from 'react';
import {Grid, GridItem, Img, Text, Tooltip, Center, Box} from '@chakra-ui/react';
import {EQUIPMENT_ID} from '~/constants';
import type {EQUIPMENT_ID_TYPE} from '~/constants';

const getItemImageUrl = (id: string) => `https://static.ffxiah.com/images/icon/${id}.png`;

const capitalizeEachWord = (str: string): string => {
    return str
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
};

interface EquipProps {
    slot: EQUIPMENT_ID_TYPE;
    item: Array<string>;
    equipSlot: number;
}

const Equip: React.FC<EquipProps> = ({slot, item, equipSlot}) => {
    if (!item) {
        return (
            <Box
                width="32px"
                height="32px"
                backgroundImage={`url('https://www.ffxiah.com/images/eq${equipSlot}.gif')`}
            />
        );
    }

    const [itemId, itemName] = item;

    return (
        <Tooltip label={itemName} aria-label={`${itemName} equiped on ${slot}`}>
            <Box backgroundImage="url('https://www.ffxiah.com/images/equip_box.gif')">
                <Img src={getItemImageUrl(itemId)} alt="" width="32px" height="32px" />
            </Box>
        </Tooltip>
    );
};

interface GearGridProps {
    gear: Array<{
        slotid: number; // TODO remove?
        equipslotid: number;
        itemid: number;
        name: string;
    }>;
}

export const GearGrid: React.FC<GearGridProps> = ({gear}) => {
    // Remap the data to something more usable
    const mappedGear = React.useMemo(() => {
        const mapping: {[key: string]: Array<string>} = {};

        gear.forEach(({equipslotid, itemid, name}) => {
            const userFriendlyName = capitalizeEachWord(name.replace(/_/g, ' '));
            const itemIdString = `${itemid}`;
            mapping[EQUIPMENT_ID[equipslotid]] = [itemIdString, userFriendlyName];
        });

        return mapping;
    }, [gear]);

    return (
        <Grid
            gridTemplateColumns="32px 32px 32px 32px"
            gridTemplateRows="32px 32px 32px 32px"
            color="blackAlpha.700"
            fontWeight="600"
            fontSize="x-small"
        >
            <GridItem>
                <Box width="32px" height="32px" backgroundImage="url('https://www.ffxiah.com/images/equip_box.gif')">
                    <Equip slot={EQUIPMENT_ID[0]} item={mappedGear[EQUIPMENT_ID[0]]} equipSlot={1} />
                </Box>
            </GridItem>
            <GridItem bg="orange.300">
                <Equip slot={EQUIPMENT_ID[1]} item={mappedGear[EQUIPMENT_ID[1]]} equipSlot={2} />
            </GridItem>
            <GridItem bg="orange.300">
                <Equip slot={EQUIPMENT_ID[2]} item={mappedGear[EQUIPMENT_ID[2]]} equipSlot={3} />
            </GridItem>
            <GridItem bg="orange.300">
                <Equip slot={EQUIPMENT_ID[3]} item={mappedGear[EQUIPMENT_ID[3]]} equipSlot={4} />
            </GridItem>

            <GridItem bg="orange.300">
                <Equip slot={EQUIPMENT_ID[4]} item={mappedGear[EQUIPMENT_ID[4]]} equipSlot={5} />
            </GridItem>
            <GridItem bg="orange.300">
                <Equip slot={EQUIPMENT_ID[9]} item={mappedGear[EQUIPMENT_ID[9]]} equipSlot={6} />
            </GridItem>
            <GridItem bg="orange.300">
                <Equip slot={EQUIPMENT_ID[11]} item={mappedGear[EQUIPMENT_ID[11]]} equipSlot={7} />
            </GridItem>
            <GridItem bg="orange.300">
                <Equip slot={EQUIPMENT_ID[12]} item={mappedGear[EQUIPMENT_ID[12]]} equipSlot={8} />
            </GridItem>

            <GridItem bg="orange.300">
                <Equip slot={EQUIPMENT_ID[5]} item={mappedGear[EQUIPMENT_ID[5]]} equipSlot={9} />
            </GridItem>
            <GridItem bg="orange.300">
                <Equip slot={EQUIPMENT_ID[6]} item={mappedGear[EQUIPMENT_ID[6]]} equipSlot={10} />
            </GridItem>
            <GridItem bg="orange.300">
                <Equip slot={EQUIPMENT_ID[13]} item={mappedGear[EQUIPMENT_ID[13]]} equipSlot={11} />
            </GridItem>
            <GridItem bg="orange.300">
                <Equip slot={EQUIPMENT_ID[14]} item={mappedGear[EQUIPMENT_ID[14]]} equipSlot={12} />
            </GridItem>

            <GridItem bg="orange.300">
                <Equip slot={EQUIPMENT_ID[15]} item={mappedGear[EQUIPMENT_ID[15]]} equipSlot={13} />
            </GridItem>
            <GridItem bg="orange.300">
                <Equip slot={EQUIPMENT_ID[10]} item={mappedGear[EQUIPMENT_ID[10]]} equipSlot={14} />
            </GridItem>
            <GridItem bg="orange.300">
                <Equip slot={EQUIPMENT_ID[7]} item={mappedGear[EQUIPMENT_ID[7]]} equipSlot={15} />
            </GridItem>
            <GridItem bg="orange.300">
                <Equip slot={EQUIPMENT_ID[8]} item={mappedGear[EQUIPMENT_ID[8]]} equipSlot={16} />
            </GridItem>
        </Grid>
    );
};
