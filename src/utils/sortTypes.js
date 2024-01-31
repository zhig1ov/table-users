export const sortTypes = {
    up: {
        class: 'sort-up',
        fn: (a, b) => a.net_worth - b.net_worth
    },
    down: {
        class: 'sort-down',
        fn: (a, b) => b.net_worth - a.net_worth
    },
    default: {
        class: 'sort',
        fn: (a, b) => a
    }
};
