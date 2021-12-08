const baseURL = "http://localhost:5000/api/scores"

export const getScores = () => {
    return(
        fetch(baseURL)
        .then(res => res.json())
    )
}

export const postScore = (high_score) => {
    return(
        fetch(baseURL, {
            method: "POST",
            body: JSON.stringify(high_score),
            headers: {"Content-Type": "application/json"}
        })
        .then(result => result.json())
    )
}
