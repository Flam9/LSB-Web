// Converted from https://github.com/Flam9/XiWeb/blob/master/includes/includes.php

// Character skill IDs (Combat, Ranged, Magic and Crafting)
export const SKILL_ID = {
    'non': 2,
    'h2h': 1,
    'dag': 2,
    'swd': 3,
    'gsd': 4,
    'axe': 5,
    'gax': 6,
    'syh': 7,
    'pol': 8,
    'kat': 9,
    'gkt': 10,
    'clb': 11,
    'stf': 12,
    'ame': 22,
    'ara': 23,
    'ama': 24,
    'arc': 25,
    'mrk': 26,
    'thr': 27,
    'grd': 28,
    'eva': 29,
    'shl': 30,
    'par': 31,
    'div': 32,
    'hea': 33,
    'enh': 34,
    'enf': 35,
    'ele': 36,
    'drk': 37,
    'sum': 38,
    'nin': 39,
    'sng': 40,
    'str': 41,
    'wnd': 42,
    'blu': 43,
    'geo': 44,
    'hnd': 45,
    'fsh': 48,
    'wdw': 49,
    'smt': 50,
    'gld': 51,
    'clt': 52,
    'lth': 53,
    'bon': 54,
    'alc': 55,
    'cok': 56,
    'syn': 57,
    'rid': 58,
};

export const JOB_NAME = [
    '',     // None
    'Warrior',
    'Monk',
    'White Mage',
    'Black Mage',
    'Red Mage',
    'Thief',
    'Paladin',
    'Dark Knight',
    'Beastmaster',
    'Bard',
    'Ranger',
    'Samurai',
    'Ninja',
    'Dragoon',
    'Summoner',
    'Blue Mage',
    'Corsair',
    'Puppetmaster',
    'Dancer',
    'Scholar',
    'Geomancer',
    'Rune Fencer',
];

// Jobs
export const JOB_ABBREVIATION = [
    '',     // None
    'WAR',  // Warrior
    'MNK',  // Monk
    'WHM',  // White Mage
    'BLM',  // Black Mage
    'RDM',  // Red mage
    'THF',  // Thief
    'PLD',  // Paladin
    'DRK',  // Dark Knight
    'BST',  // Beastmaster
    'BRD', // Bard
    'RNG', // Ranger
    'SAM', // Samurai
    'NIN', // Ninja
    'DRG', // Dragoon
    'SMN', // Summoner
    'BLU', // Blue Mage
    'COR', // Corsair
    'PUP', // Puppetmaster
    'DNC', // Dancer
    'SCH', // Scholar
    'GEO', // Geomancer
    'RUN', // Rune fencer
];

// Equipment slot IDs
export const EQUIPMENT_ID = [
    'Main',
    'Sub',
    'Ranged',
    'Ammo',
    'Head',
    'Body',
    'Hands',
    'Legs',
    'Feet',
    'Neck',
    'Waist',
    'Ear1',
    'Ear2',
    'Ring1',
    'Ring2',
    'Back'
] as const;
export type EQUIPMENT_ID_TYPE = typeof EQUIPMENT_ID[number];

export const FACE = [
    '1a',
    '1b',
    '2a',
    '2b',
    '3a',
    '3b',
    '4a',
    '4b',
    '5a',
    '5b',
    '6a',
    '6b',
    '7a',
    '7b',
    '8a',
    '8b',
];

export const RACE = [
    'Hm',
    'Hf',
    'Em',
    'Ef',
    'Tm',
    'Tf',
    'M',
    'G'
];

export const AH_ITEM_TYPE = [
    'N/A',
    'Hand-To-Hand',
    'Daggers',
    'Swords',
    'Great Swords',
    'Axes',
    'Great Axes',
    'Scythes',
    'Polearms',
    'Katana',
    'Great Katana',
    'Clubs',
    'Staves',
    'Ranged',
    'Instruments',
    'Ammunition',
    'Shields',
    'Helms',
    'Body',
    'Gloves',
    'Legs',
    'Feet',
    'Neck',
    'Waist',
    'Earrings',
    'Rings',
    'Back',
    'White Magic',
    'Black Magic',
    'Summoning',
    'Ninjutsu',
    'Songs',
    'Medicines',
    'Furnishings',
    'Crystals',
    'Cards',
    'Cursed Items',
    'Smithing',
    'Goldsmithing',
    'Clothcraft',
    'Leathercraft',
    'Bonecraft',
    'Woodworking',
    'Alchemy',
    'Misc.',
    'Fishing Gear',
    'Pet Items',
    'Ninja Tools',
    'Beast-made',
    'Fish',
    'Meat & Eggs',
    'Seafood',
    'Vegetables',
    'Soups',
    'Bread & Rice',
    'Sweets',
    'Drinks',
    'Ingredients',
    'Dice',
    'Automation',
    'Grips',
];

export const NATION = [
    "San d'Oria",
    'Bastok',
    'Windurst'
];

export const INVENTORY_LOCATION = [
    'Inventory',
    'Mog Safe 1',
    'Mog Safe 2',
    'Storage',
    'Mog Locker',
    'Mog Satchel',
    'Mog Sack',
    'Mog Case',
    'Mog Wardrobe',
    'Mog Wardrobe 2',
    'Mog Wardrobe 3',
    'Mog Wardrobe 4',
    'Delivery Box'
]