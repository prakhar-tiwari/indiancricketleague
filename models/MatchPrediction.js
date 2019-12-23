const statsRatings = {
    lastFiveMatch: 15,
    chasingDefendingHistory: 35,
    battingTeam: 10,
    headToHeadWins: 40
}

exports.matchPrediction = (
    firstTeam,
    secondTeam,
    venue,
    battingTeam,
    headToHeadMatches,
    firstTeamPerformance,
    secondTeamPerformance,
    firstTeamChasingHistory,
    firstTeamDefendingHistory,
    secondTeamChasingHistory,
    secondTeamDefendingHistory) => {



    let firstTeamHeadToHeadWins = 0,
        secondTeamHeadToHeadWins = 0,
        firstTeamLastFiveWin = 0,
        secondTeamLastFiveWin = 0,
        firstTeamTotalWins = 0,
        secondTeamTotalWins = 0;

    headToHeadMatches.map(teamMatch => {
        if (teamMatch.winner === firstTeam) {
            firstTeamHeadToHeadWins++
        }
        else {
            secondTeamHeadToHeadWins++
        }
    });
    firstTeamPerformance.map(teamMatch => {
        if (teamMatch.winner === firstTeam)
            firstTeamLastFiveWin++;
    })

    secondTeamPerformance.map(teamMatch => {
        if (teamMatch.winner === secondTeam)
            secondTeamLastFiveWin++;
    })

    firstTeamTotalWins = firstTeamChasingHistory + firstTeamDefendingHistory;
    secondTeamTotalWins = secondTeamChasingHistory + secondTeamDefendingHistory;

    let winningPercent = winningProbability(
        firstTeam,
        secondTeam,
        battingTeam,
        firstTeamHeadToHeadWins,
        secondTeamHeadToHeadWins,
        firstTeamLastFiveWin,
        secondTeamLastFiveWin,
        firstTeamTotalWins,
        secondTeamTotalWins);

    return {
        firstTeam,
        secondTeam,
        venue,
        battingTeam,
        firstTeamPercent: winningPercent.firstTeamPercent,
        secondTeamPercent: winningPercent.secondTeamPercent,
        firstTeamHeadToHeadWins,
        secondTeamHeadToHeadWins,
        firstTeamChasingHistory,
        firstTeamDefendingHistory,
        secondTeamChasingHistory,
        secondTeamDefendingHistory,
        firstTeamLastFiveWin,
        secondTeamLastFiveWin
    }
}

function winningProbability(
    firstTeam,
    secondTeam,
    battingTeam,
    firstTeamHeadToHeadWins,
    secondTeamHeadToHeadWins,
    firstTeamLastFiveWin,
    secondTeamLastFiveWin,
    firstTeamTotalWins,
    secondTeamTotalWins) {

    let firstTeamPercent = 0,
        secondTeamPercent = 0;

    if (firstTeamHeadToHeadWins > secondTeamHeadToHeadWins) {
        firstTeamPercent += statsRatings.headToHeadWins;
    }
    else {
        secondTeamPercent += statsRatings.headToHeadWins
    }

    if (firstTeamLastFiveWin > secondTeamLastFiveWin) {
        firstTeamPercent += statsRatings.lastFiveMatch;
    }
    else{
        secondTeamPercent += statsRatings.lastFiveMatch;
    }

    if (battingTeam === firstTeam) {
        firstTeamPercent += statsRatings.battingTeam;
    }
    else {
        secondTeamPercent += statsRatings.battingTeam;
    }

    if (firstTeamTotalWins > secondTeamTotalWins) {
        firstTeamPercent += statsRatings.chasingDefendingHistory;
    }
    else{
        secondTeamPercent += statsRatings.chasingDefendingHistory;
    }

    if (firstTeamPercent === 0) {
        firstTeamPercent = 5;
        secondTeamPercent = 95;
    }
    if (secondTeamPercent === 0) {
        secondTeamPercent = 5;
        firstTeamPercent = 95;
    }
    return {
        firstTeamPercent,
        secondTeamPercent
    }
}