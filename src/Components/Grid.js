import React from 'react';
import Rangee from '../Components/Rangee';



class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ligne: this.creatGrid(props)
        }
    }

    creatGrid = props => {
        let grid = [];
        for (let i = 0; i < props.ligne; i++) {
            grid.push([]);

            for (let j = 0; j < props.colone; j++) {

                if (
                    j === (props.colone - 1) ||
                    i === (props.ligne - 1)
                ) {
                    grid[i].push({
                        x: j,
                        y: i,
                        count: 0,
                        nbBomb: 0,
                        isOpen: true,
                        value: "",
                    });
                }
                else {
                    let rand = Math.floor(Math.random() * 3) + 1;
                    grid[i].push({
                        x: j,
                        y: i,
                        isOpen: false,
                        hasBomb: false,
                        value: rand,
                    });
                }
            }
        }

        //Add BomB to grid
        grid = this.AddBombsToGrid(grid);
        //Add Informative Cell to grid
        grid = this.AddInformativeToGrid(grid);

        return grid;
    }

    AddInformativeToGrid(grid) {
        for (let i = 0; i < this.props.ligne - 1; i++) {

            let VerticalInformative = grid[i][this.props.colone - 1];
            let HorizontalInformative = grid[this.props.ligne - 1][i];

            for (let j = 0; j < this.props.colone; j++) {
                if (!grid[j][i].hasBomb) {
                    HorizontalInformative.count += grid[j][i].value;
                }
                else {
                    HorizontalInformative.nbBomb++;
                }
                if (!grid[i][j].hasBomb) {
                    VerticalInformative.count += grid[i][j].value;
                }
                else {
                    VerticalInformative.nbBomb++;
                }
            }
            VerticalInformative.value = VerticalInformative.count + "/" + VerticalInformative.nbBomb + "💣";
            HorizontalInformative.value = HorizontalInformative.count + "/" + HorizontalInformative.nbBomb + "💣";
        }

        return grid;
    }

    AddBombsToGrid(grid) {
        for (let i = 0; i < this.props.bombs; i++) {
            let randomLigne = Math.floor(Math.random() * (this.props.ligne - 1));
            let randomColone = Math.floor(Math.random() * (this.props.colone - 1));
            let cell = grid[randomLigne][randomColone];
            if (cell.hasBomb) {
                i--;
            }
            else {
                cell.hasBomb = true;
                cell.value = "💣";
            }
        }
        return grid;
    }

    
    // Wehn user click to cell
    open = cell => {
        if (this.props.status === "ended") {
            return;
        }
        if (this.props.status === "winner") {
            return;
        }
        cell.isOpen = true;
        this.props.cellClick();
        this.props.CalculScore(cell.value);

        if (cell.hasBomb) {
            this.props.endGame();
        }

    };

    render() {

        let rangees = this.state.ligne.map((range, index) => {
            return (
                <Rangee
                    cells={range}
                    key={index}
                    open={this.open}/>
            )
        })
        return (
            <div className="grid">
                {rangees}
            </div>
        );
    }
}

export default Grid;