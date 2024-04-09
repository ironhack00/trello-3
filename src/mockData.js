const mockData = {
    lists:{
        '01List':{
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
        '02List':{
            id: '02list',
            title: 'In progress',
            cards: []
        },
    },
    listIds: ['01List', '02List']
}

export default mockData;