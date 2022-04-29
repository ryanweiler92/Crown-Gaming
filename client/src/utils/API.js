export const searchGames = (query) => {
    return fetch(`https://www.cheapshark.com/api/1.0/games?title=${query}`)
}

export const getDeal = (query) => {
    return fetch (`https://www.cheapshark.com/api/1.0/deals?id=${query}`)
}

export const mostPopularGames2022 = () => {
    return fetch(`https://api.rawg.io/api/games?key=fbde7880bed94a09825e4fcc274085c4&dates=2022-01-01,2022-12-31&ordering=-added`)
}