const mockData = {
    lists:{
        '01list':{
            id: '01list',
            title: 'Vamos che',
            cards: [{
                id: '01Card',
                title: 'Comprar pan'
            },
            {
                id: '02Card',
                title: 'Comprar lechuga'
            },
            {
                id: '03Card',
                title: 'Comprar carne'
            }]
        },
        '02list':{
            id: '02list',
            title: 'In progress',
            cards: []
        },
    },
    listIds: ['01list', '02list']
}

export default mockData;