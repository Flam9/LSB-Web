import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import type { chars } from '@prisma/client';

import { db } from '~/utils/db.server';
import { RACE, FACE, JOB_ABBREVIATION } from '~/constants'

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

// TODO convert to chakra
export default function WhosOnline() {
    const userStatusList = useLoaderData<LoaderData>();
    console.log(userStatusList);
    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">{userStatusList.length} online</h1>
                    <p className="mt-2 text-sm text-gray-700">A list of adventurers currently exploring Vanadiel</p>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Job</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Zone</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {userStatusList.map(({ charname, name, mlvl, mjob, slvl, sjob, face, race }: any) => (
                                            <tr key={charname}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex-shrink-0">
                                                            <img className="h-10 w-10 rounded-full" src={`/faces/${RACE[race - 1]}${FACE[face]}.webp`} alt="" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <Link className="text-indigo-600 hover:text-indigo-900" to={`/adventurers/${charname}`}>{charname}</Link>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <div className="text-gray-900">{mlvl}{JOB_ABBREVIATION[mjob]}/{slvl}{JOB_ABBREVIATION[sjob]}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
