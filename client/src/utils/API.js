export const getSingleGame = (query) => {
    return fetch(`https://api.rawg.io/api/games/${query}?key=fbde7880bed94a09825e4fcc274085c4`)
}

export const mostPopularGames = (year) => {
    return fetch(`https://api.rawg.io/api/games?key=fbde7880bed94a09825e4fcc274085c4&dates=${year}&ordering=-added`)
}