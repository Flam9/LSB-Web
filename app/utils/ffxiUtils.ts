/**
 * Converts the given job abbreviation to its id.
 *
 * @param {String} abbr                 The job abbreviation to convert.
 * @returns {Number}                    The job id.
 */
function getJobIdByAbbr(abbr: string): number {
    const jobs = {
        '': 0,
        war: 1,
        mnk: 2,
        whm: 3,
        blm: 4,
        rdm: 5,
        thf: 6,
        pld: 7,
        drk: 8,
        bst: 9,
        brd: 10,
        rng: 11,
        sam: 12,
        nin: 13,
        drg: 14,
        smn: 15,
        blu: 16,
        cor: 17,
        pup: 18,
        dnc: 19,
        sch: 20,
        geo: 21,
        run: 22,
    };
    return jobs[abbr];
}

/**
 * Converts the given job id to its abbreviation.
 *
 * @param {Number} id                   The job id to convert.
 * @returns {String}                    The job abbreviation.
 */
function getJobAbbrById(id: number): string {
    const jobs = {
        0: '',
        1: 'war',
        2: 'mnk',
        3: 'whm',
        4: 'blm',
        5: 'rdm',
        6: 'thf',
        7: 'pld',
        8: 'drk',
        9: 'bst',
        10: 'brd',
        11: 'rng',
        12: 'sam',
        13: 'nin',
        14: 'drg',
        15: 'smn',
        16: 'blu',
        17: 'cor',
        18: 'pup',
        19: 'dnc',
        20: 'sch',
        21: 'geo',
        22: 'run',
    };
    return jobs[id] || '';
}

/**
 * Converts the linkshell color to a valid Html color code.
 *
 * @private
 * @static
 * @param {Number} color                The color code to convert.
 * @returns {String}                    The converted color code.
 */
function getLinkshellHtmlColor(color: string): string {
    if (!color || color === 0) {
        return 'transparent';
    }

    // Convert the given color to proper Html color (rgb)..
    const c = parseInt(color);
    const r = ((c & 0x0f) << 4) + 0x0f;
    const g = (((c >> 0x04) & 0x0f) << 0x04) + 0x0f;
    const b = (((c >> 0x08) & 0x0f) << 0x04) + 0x0f;
    //return sprintf('#%02X%02X%02X', r, g, b);
    return ''; //todo
}

/**
 * Converts the itemid to the linkshell rank.
 *
 * @param {Number} itemid               The item id.
 * @returns {Number}                    The linkshell rank based on the item id.
 */
function getLinkshellRankByItemId(itemid: number): number {
    switch (itemid) {
        case 513: // Linkshell
            return 1;
        case 514: // Linksack
            return 2;
        case 515: // Linkpearl
            return 3;
    }
    return 0;
}
