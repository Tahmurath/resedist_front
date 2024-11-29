import 'server-only'

const dictionaries = {
    en: () => import('../../dictionaries/en/common.json').then((module) => module.default),
    fa: () => import('../../dictionaries/fa/common.json').then((module) => module.default),
}

export const getDictionary = async (locale) => {
    if (!dictionaries[locale]) {
        locale = "en"
        console.log(locale);

    }
    // if (typeof dictionaries[locale] !== 'function') {
    //     console.log(dictionaries[locale]);
    //
    // }
    return dictionaries[locale]();
};

//export const getDictionary = async (locale) => dictionaries[locale]()