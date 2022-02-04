const qualities = {
    tedious: {
        _id: '67rdca3eeb7f6fgeed471198',
        name: 'Нудила',
        color: 'primary'
    },
    strange: {
        _id: '67rdca3eeb7f6fgeed471100',
        name: 'Странный',
        color: 'secondary'
    },
    buller: {
        _id: '67rdca3eeb7f6fgeed4711012',
        name: 'Троль',
        color: 'success'
    },
    alcoholic: {
        _id: '67rdca3eeb7f6fgeed471101',
        name: 'Алкоголик',
        color: 'danger'
    },
    handsome: {
        _id: '67rdca3eeb7f6fgeed471102',
        name: 'Красавчик',
        color: 'info'
    },
    uncertain: {
        _id: '67rdca3eeb7f6fgeed471103',
        name: 'Неуверенный',
        color: 'dark'
    }
};
const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(qualities);
        }, 2000);
    });

const getQualById = (notFullQualArray) => {
    const qualKeys = Object.keys(qualities);
    const qualKeyIndex = [];
    notFullQualArray.forEach((notFullQual) => {
        const index = qualKeys.findIndex((qkey) => qualities[qkey]._id === notFullQual.value);
        qualKeyIndex.push(index);
    });
    return qualKeyIndex.map((indx) => {
        return qualities[qualKeys[indx]];
    });
};
export default {
    fetchAll,
    getQualById
};
