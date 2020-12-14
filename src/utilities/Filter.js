
function lastElementOfArray(arr) {
    return arr[arr.length - 1];
}

function capitaliseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function createFarmFilterIndex(data) {
    const landTypes = new Set();
    const locales = new Set();

    data.forEach( ele => {
        if (ele.land_type) {
            landTypes.add(ele.land_type.toUpperCase());
        }

        if (ele.locale) {
            locales.add(ele.locale.toUpperCase());
        }
    });

    return [
        {
            Name: 'Land Type',
            ID: 'land_type',
            Values: [...landTypes].map( e => ({ value: e, label: e })),
        }, 
        {
            Name: 'Locale',
            ID: 'locale',
            Values: [...locales].map( e => ({ value: e, label: e })),
        }
    ];
}

export async function createHarvestFilterIndex(data) {
    const fields = {
        crop: new Set(),
        seed_brand: new Set(),
        planting_mode: new Set(),
        weeding_mode: new Set(),
        harvest_cutting_mode: new Set(),
        fertilizer: new Set(),
        pesticide: new Set(),
    }

    data.forEach(ele => {
        Object.keys(fields).forEach( key => {
            if (ele[key]) {
                fields[key].add(ele[key].toUpperCase());
            }
        })
    })

    return Object.entries(fields).map(([key, value]) => ({
        Name: key.split('_').map(capitaliseFirstLetter).join(' '),
        ID: key,
        Values: [...value].map( e => ({ value: e, label: e }))
    }));
}

export async function createUserFilterIndex(data) {
    const fields = {
        locale: new Set(),
        "custom:district": new Set(),
        "custom:state": new Set(),
    }

    data.forEach(ele => {
        Object.keys(fields).forEach( key => {
            if (ele[key]) {
                fields[key].add(ele[key].toUpperCase());
            }
        })
    })

    return Object.entries(fields).map(([key, value]) => ({
        Name: capitaliseFirstLetter(lastElementOfArray(key.split(':'))),
        ID: key,
        Values: [...value].map( e => ({ value: e, label: e }))
    }));
}

export async function filter(data, filterProps) {
    let filteredData = [...data];

    Object.entries(filterProps).forEach(([key, values]) => {
        if (values && values.length !== 0) {
            const temp = filteredData.filter( val => values.includes(val[key]?.toUpperCase()));
            filteredData = temp;
        }
    });


    return filteredData;
}

export default {
    createFarmFilterIndex,
    createHarvestFilterIndex,
    createUserFilterIndex,
    filter,
}