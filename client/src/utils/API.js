export const mostPopularGames2022 = () => {
    return fetch(`https://api.rawg.io/api/games?key=fbde7880bed94a09825e4fcc274085c4&dates=2022-01-01,2022-12-31&ordering=-added`)
}

export const getSingleGame = (query) => {
    return fetch(`https://api.rawg.io/api/games/${query}?key=fbde7880bed94a09825e4fcc274085c4`)
}