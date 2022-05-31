import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import type { chars } from '@prisma/client';
import { db } from '~/utils/db.server';

type Equip = {
    slotid: number,
    equipslotid: number,
    itemid: number,
    name: string
}
type LoaderData = Array<Equip>

export const loader: LoaderFunction = async ({ params }) => {
    const charid = await db.chars.findFirst({
        where: {
            charname: params.name
        },
        select: {
            charid: true
        }
    })
    console.log(charid);
    const data = await db.$queryRaw`SELECT slotid, equipslotid, char_inventory.itemid, name
      FROM char_equip, char_inventory, item_basic
      WHERE char_equip.charid = char_inventory.charid and char_equip.slotid = char_inventory.slot and
      char_equip.containerid = char_inventory.location and char_inventory.itemid = item_basic.itemid and char_equip.charid = 1`;


    return json(data);
};

const ItemImage: React.FC<{ id: string, name: string }> = ({ id, name = "Unknown item" }) => (
    <img src={`https://static.ffxiah.com/images/icon/${id}.png`} alt={name} />
)

export default function WhosOnline() {
    const data = useLoaderData<LoaderData>();
    console.log(data);
    return (
        <>Gear:
            {data.map(({ slotid, equipslotid, itemid, name }) => (
                <p>{slotid} - {equipslotid} - <ItemImage id={`${itemid}`} name={name} /> - {name}</p>
            ))}
        </>
    );
}
