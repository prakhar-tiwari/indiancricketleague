import React, { useState } from 'react';
import './Theme.css';
import { connect } from 'react-redux';
import { changeTheme } from './actions/matchActions';

function Theme(props) {
    const [teamColor, setTeamColor] = useState('');
    const [teamName, setTeamName] = useState('');
    const teamColors = [
        {
            team: 'Chennai Super Kings',
            color: '#ffff3c'
        },
        {
            team: 'Delhi Daredevils',
            color: '#c02826'
        },
        {
            team: 'Kings XI Punjab',
            color: '#ed1d24'
        },
        {
            team: 'Mumbai Indians',
            color: '#004ba0'
        },
        {
            team: 'Rajasthan Royals',
            color: '#254aa5'
        },
        {
            team: 'Royal Challengers Bangalore',
            color: '#ec1c24'
        },
        {
            team: 'Sunrisers Hyderabad',
            color: '#ff822a'
        },
        {
            team: 'Kolkata Knight Riders',
            color: '#2e0854'
        },
        {
            team: 'Delhi Capitals',
            color: '#ef1b23'
        },
        {
            team: 'Kochi Tuskers Kerala',
            color: '#7F3F98'
        },
        {
            team: 'Deccan Chargers',
            color: '#366293'
        },
        {
            team: 'Pune Warriors',
            color: '#ea4c2d'
        },
        {
            team: 'Rising Pune Supergiants',
            color: '#ffdd53'
        },
        {
            team: 'Rising Pune Supergiant',
            color: '#d11d9b'
        },
        {
            team: 'Gujarat Lions',
            color: '#E04F16'
        }
    ]

    const teamData = teamColors.map(teamItem => {
        const teamInitials = teamItem.team.split(' ').map(item => item[0]).join('').toLowerCase();
        return {
            ...teamItem,
            teamInitials
        }
    })

    const handleClick = (team) => {
        if (team) {
            setTeamName(team.team);
            const themeName = `${team.team.split(' ').join('-')}-theme`;
            props.changeTheme(themeName);
            setTeamColor(team.color)
        }
        else {
            props.changeTheme('');
            setTeamName('');
            setTeamColor('');
        }
    }
    return (
        <div className="sidenav">
            <div style={{ background: teamColor }} className="background-div"></div>
            <span className="heading"><h6 
            style={{backgroundImage: `linear-gradient(to left bottom, #fdf906, ${(teamColor)?teamColor:'#fff'})`}}>
                {(teamName) ? teamName : 'Choose Your Team'}</h6></span>
            {(teamColor) ? <span className="setdefault"><p onClick={() => handleClick('')}>Set Default</p></span> : null}
            {
                teamData.map((team, index) => (
                    <a key={index} onClick={() => handleClick(team)} href="#">
                        <img src={`/images/logos/${team.teamInitials}-logo.png`} />
                        <span>{team.team}</span>
                    </a>
                ))
            }
        </div>
    )
}

export default connect(null, { changeTheme })(Theme)
