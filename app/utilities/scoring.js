const calculateFinalScore = () => {
    let maxPenalty = 300
    let maxTime = 60

    let score = calculateBaseScore()

    let penaltyThreshold = 5 + 3 * (level.arenaSize - 3)    // 2x2 => 2, 3x3 => 5, 4x4 => 8, 5x5 => 11
    let penaltyByTime = 0
    if (this.playTime / 1000 - penaltyThreshold < 0) {
        penaltyByTime = 0
    } else {
        penaltyByTime = (this.playTime / 1000 - penaltyThreshold) * maxPenalty / maxTime
    }

    score -= Math.round(penaltyByTime)

    return score
}

const calculateBaseScore = (correctAnswer, totalQuestions) => {
    return 1000 * correctAnswer / totalQuestions
}