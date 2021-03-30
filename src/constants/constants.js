export const actions = new Map([
    ['IDLE', ['start', 'repair']],
    ['PICKING', ['place', 'repair']],
    ['PLACING', ['done', 'reset', 'repair']],
    ['FAILED', ['reset', 'repair']],
    ['REPAIRING', ['reset']]
]);