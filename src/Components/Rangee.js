import React from 'react';
import Cell from '../Components/Cell'

const Rangee = props => {



    let cells = props.cells.map((data, index) => {
        return (
            <Cell key={index} data={data} open={props.open} />
        );
    })
    return (
        <div className="rangee">
            {cells}

        </div>
    );
};

export default Rangee;