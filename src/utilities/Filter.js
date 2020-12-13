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

export async function filter(data, filterProps) {
    let filteredData = [...data];

    Object.entries(filterProps).forEach(([key, values]) => {
        if (values?.length !== 0) {
            const temp = filteredData.filter( val => values.includes(val[key]?.toUpperCase()));
            filteredData = temp;
        }
    });

    return filteredData;
}

export default {
    createFarmFilterIndex,
    filter,
}