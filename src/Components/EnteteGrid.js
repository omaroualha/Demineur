import React from 'react';
import Score from './Score'
import ButtonNewGame from './ButtonNewGame'

const EnteteGrid = props => {
    
    let minutes = Math.floor(props.temps / 60);
    let seconds = props.temps - minutes * 60 || 0;
    let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    let temps = `${minutes} : ${formattedSeconds}`;

    return (
        <div className="Entete-Grid">
            <Score
                score={props.score}
            />

            <ButtonNewGame
                reset={props.reset}
                refresh={props.refresh}
            />

            <div className="miniteur">
                {temps}
            </div>

        </div>
    );
};

export default EnteteGrid;