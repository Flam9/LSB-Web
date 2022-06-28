import type {LoaderFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import {Link, useLoaderData} from '@remix-run/react';
import type {chars} from '@prisma/client';
import {db} from '~/utils/db.server';
import {ContentWrapper} from '~/components/ContentWrapper';
import {GearGrid} from '~/components/player/GearGrid';
import {Jobs} from '~/components/player/Jobs';

interface Equip {
    slotid: number;
    equipslotid: number;
    itemid: number;
    name: string;
}
type LoaderData = Array<Equip>;

export const loader: LoaderFunction = async ({params}) => {
    const charid = await db.chars.findFirst({
        where: {
            charname: params.name,
        },
        select: {
            charid: true,
        },
    });
    // console.log(charid);

    const data = await db.$queryRaw`SELECT slotid, equipslotid, char_inventory.itemid, name
      FROM char_equip, char_inventory, item_basic
      WHERE char_equip.charid = char_inventory.charid and char_equip.slotid = char_inventory.slot and
      char_equip.containerid = char_inventory.location and char_inventory.itemid = item_basic.itemid and char_equip.charid = 1`;

    return json(data);
};

export default function ProfilePage() {
    const data = useLoaderData<LoaderData>();

    return (
        <ContentWrapper>
            <GearGrid gear={data} />
            <Jobs />
        </ContentWrapper>
    );
}
