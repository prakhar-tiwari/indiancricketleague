const fs = require('fs');
const csv = require('fast-csv');
const moment = require('moment');
const Match = require('../models/Match');
const { matchPrediction } = require('../models/MatchPrediction');


const ITEMS_PER_PAGE = 10;

exports.insertData = (req, res, next) => {
    let obj = [];
    fs.createReadStream('matches.csv')
        .pipe(csv.parse({ headers: true }))
        .on('data', row => {
            obj.push(row);
        })
        .on('end', rowCount => {
            const matchData = obj.map(item => {
                const dateFormat = ['DD/MM/YY', 'YYYY-MM-DD']
                let formattedDate;
                if (moment(item.date, dateFormat[0]).format(dateFormat[0]) == item.date) {
                    formattedDate = moment(item.date, dateFormat[0]).format();
                }
                else if (moment(item.date, dateFormat[1]).format(dateFormat[1]) == item.date) {
                    formattedDate = moment(item.date, dateFormat[1]).format();
                }
                return {
                    ...item,
                    date: formattedDate
                }
            })
            Match.insertMany(matchData)
                .then(result => {
                    console.log('Data inserted successfully');
                })
                .catch(err => {
                    console.log(err);
                })
        })
}

exports.getMatchData = (req, res, next) => {
    const pageNumber = +req.query.pageNumber || 1; // adding plus to convert string query to number
    let totalItems;
    Match.find()
        .countDocuments()
        .then(result => {
            totalItems = result;
            return Match.find()
                .skip((pageNumber - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })
        .then(matches => {
            const result = {
                matches,
                currentPage: pageNumber,
                hasNextPage: (pageNumber - 1) * ITEMS_PER_PAGE < totalItems,
                hasPreviousPage: (pageNumber - 1) > 0,
                nextPage: pageNumber + 1,
                previousPage: pageNumber - 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
            };

            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
}

exports.getMatchByYear = (req, res, next) => {
    const year = req.query.year;
    const pageNumber = +req.query.pageNumber || 1;
    let totalItems;
    Match.find({ season: year })
        .countDocuments()
        .then(result => {
            totalItems = result;
            return Match.find({ season: year })
                .skip((pageNumber - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })
        .then(matches => {
            const result = {
                matches,
                currentPage: pageNumber,
                hasNextPage: (pageNumber - 1) * ITEMS_PER_PAGE < totalItems,
                hasPreviousPage: (pageNumber - 1) > 0,
                nextPage: pageNumber + 1,
                previousPage: pageNumber - 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
                year
            };

            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
}

exports.getByTeamName = (req, res, next) => {
    const teamName = req.query.teamName;
    const pageNumber = +req.query.pageNumber || 1;

    console.log(teamName, pageNumber)
    Match.find({
        $or: [
            { team1: teamName },
            { team2: teamName }
        ]
    })
        .countDocuments()
        .then(result => {
            totalItems = result;
            return Match.find({
                $or: [
                    { team1: teamName },
                    { team2: teamName }
                ]
            })
                .skip((pageNumber - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })
        .then(matches => {
            const result = {
                matches,
                currentPage: pageNumber,
                hasNextPage: (pageNumber - 1) * ITEMS_PER_PAGE < totalItems,
                hasPreviousPage: (pageNumber - 1) > 0,
                nextPage: pageNumber + 1,
                previousPage: pageNumber - 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
                teamName
            };
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
}

exports.getMatchDataById = (req, res, next) => {
    const id = req.params.id;
    Match.findById(id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

exports.getTeamNames = (req, res, next) => {
    Match.aggregate([
        {
            $group: {
                _id: {
                    teamName: '$team1'
                }
            }
        }
    ])
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

exports.getVenueData = (req, res, next) => {
    Match.aggregate([
        {
            $group: {
                _id: {
                    venue: '$venue'
                }
            }
        },
    ])
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

exports.matchPrediction = (req, res, next) => {
    const { firstTeam, secondTeam, venue, battingTeam } = req.body;
    let headToHeadMatches,
        firstTeamPerformance,
        secondTeamPerformance,
        firstTeamChasingHistory,
        firstTeamDefendingHistory,
        secondTeamChasingHistory,
        secondTeamDefendingHistory;
    Match.aggregate([
        {
            $match: {
                $or: [
                    {
                        $and: [
                            { team1: firstTeam },
                            { team2: secondTeam }
                        ]
                    },
                    {
                        $and: [
                            { team1: secondTeam },
                            { team2: firstTeam }
                        ]
                    }
                ]
            }
        },
        {
            $project: {
                team1: 1,
                team2: 1,
                player_of_match: 1,
                venue: 1,
                winner: 1,
                win_by_runs: 1,
                win_by_wickets: 1,
                date: 1,
                toss_winner: 1,
                toss_decision: 1,
                city: 1
            }
        }
    ])
        .then(result => {
            headToHeadMatches = result;
            return Match.aggregate([
                {
                    $match: {
                        $and: [
                            {
                                $or: [
                                    { team1: firstTeam },
                                    { team2: firstTeam }
                                ]
                            },
                            {
                                $or: [
                                    { winner: firstTeam },
                                    { winner: { $ne: firstTeam } }
                                ]
                            }
                        ]
                    }
                },
                {
                    $sort: { date: -1 }
                },
                {
                    $limit: 5
                }
            ])
        })
        .then(result => {
            firstTeamPerformance = result;
            return Match.aggregate([
                {
                    $match: {
                        $and: [
                            {
                                $or: [
                                    { team1: secondTeam },
                                    { team2: secondTeam }
                                ]
                            },
                            {
                                $or: [
                                    { winner: secondTeam },
                                    { winner: { $ne: secondTeam } }
                                ]
                            }
                        ]
                    }
                },
                {
                    $sort: { date: -1 }
                },
                {
                    $limit: 5
                }
            ])
        })
        .then(result => {
            secondTeamPerformance = result;
            return Match.aggregate([
                {
                    $match: {
                        $or: [
                            { team1: firstTeam },
                            { team2: firstTeam }
                        ],
                    }
                },
                {
                    $match: {
                        $or: [
                            {
                                $and: [
                                    { toss_winner: firstTeam },
                                    { toss_decision: 'bat' },
                                    { winner: firstTeam }
                                ]
                            },
                            {
                                $and: [
                                    { toss_winner: { $ne: firstTeam } },
                                    { toss_decision: 'field' },
                                    { winner: firstTeam }
                                ]
                            },
                        ]
                    }
                }
            ])
        })
        .then(result => {
            firstTeamDefendingHistory = result.length;
            return Match.aggregate([
                {
                    $match: {
                        $or: [
                            { team1: firstTeam },
                            { team2: firstTeam }
                        ],
                    }
                },
                {
                    $match: {
                        $or: [
                            {
                                $and: [
                                    { toss_winner: { $ne: firstTeam } },
                                    { toss_decision: 'bat' },
                                    { winner: firstTeam }
                                ]
                            },
                            {
                                $and: [
                                    { toss_winner: firstTeam },
                                    { toss_decision: 'fielding' },
                                    { winner: firstTeam }
                                ]
                            },
                        ]
                    }
                }
            ])
        })
        .then(result => {
            firstTeamChasingHistory = result.length;
            return Match.aggregate([
                {
                    $match: {
                        $or: [
                            { team1: secondTeam },
                            { team2: secondTeam }
                        ],
                    }
                },
                {
                    $match: {
                        $or: [
                            {
                                $and: [
                                    { toss_winner: secondTeam },
                                    { toss_decision: 'bat' },
                                    { winner: secondTeam }
                                ]
                            },
                            {
                                $and: [
                                    { toss_winner: { $ne: secondTeam } },
                                    { toss_decision: 'field' },
                                    { winner: secondTeam }
                                ]
                            },
                        ]
                    }
                }
            ])
        })
        .then(result => {
            secondTeamDefendingHistory = result.length;
            return Match.aggregate([
                {
                    $match: {
                        $or: [
                            { team1: firstTeam },
                            { team2: firstTeam }
                        ],
                    }
                },
                {
                    $match: {
                        $or: [
                            {
                                $and: [
                                    { toss_winner: { $ne: firstTeam } },
                                    { toss_decision: 'bat' },
                                    { winner: firstTeam }
                                ]
                            },
                            {
                                $and: [
                                    { toss_winner: firstTeam },
                                    { toss_decision: 'fielding' },
                                    { winner: firstTeam }
                                ]
                            },
                        ]
                    }
                }
            ])
        })
        .then(result => {
            secondTeamChasingHistory = result.length;
            let finalResult=matchPrediction(
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
                secondTeamDefendingHistory)
            return res.status(200).json(finalResult)
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        })
}