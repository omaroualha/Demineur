import React from 'react';

const Score = props => {
    let scoree = props.score;
    return (
        <div className="score">
            <p> Score : {scoree}</p>

        </div>
    );
};

export default Score;