import React, { Component } from 'react';
import './App.css';
import Grid from './Components/Grid';
import EntetGrid from './Components/EnteteGrid'
import Message from './Components/Message'

class App extends Component {
  constructor() {
    super();
    this.intervals = [];

    this.state = {
      gameStatus: "wating", //running, wating, ended, winner
      ligne: 7,
      colone: 7,
      bombs: 6,
      temps: 0,
      score: 0,
      openCells: 0,
    };
    this.baseState = this.state;
    this.Grid = React.createRef()

  }



  componentDidUpdate(nextProps, nextState) {
    if (this.state.gameStatus === "running") {
      this.checkForWinner();
    }

  }


  checkForWinner = () => {
    if (this.state.score >= 45) {
      this.setState({
        gameStatus: "winner"
      })
    }
  }


  tickTock = () => {
    if (this.state.openCells > 0 && this.state.gameStatus === "running") {
      let time = this.state.temps + 1;
      this.setState({
        temps: time
      });

    }
  }
  componentWillMount() {
    this.intervals = [];
  }
  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t))

  }

  refreshPage() {
    window.location.reload();
  }

  handleCellClick = () => {
    if (this.state.openCells === 0 && this.state.gameStatus !== "running") {
      this.setState(
        {
          gameStatus: "running"
        },
        this.setInterval(this.tickTock, 1000)
      );
    }
    this.setState(prevState => {
      return { openCells: prevState.openCells + 1 };
    });
  };

  CalculScore = value => {
    this.setState({ score: this.state.score + value });
  };



  endGame = () => {
    this.setState({
      gameStatus: "ended"
    });
  };

  render() {
    return (
      <div id="App" className="App">

        <Message status={this.state.gameStatus}
        />
        <EntetGrid
          temps={this.state.temps}
          score={this.state.score}
          status={this.state.gameStatus}
          reset={this.reset}
          refresh={this.refreshPage}
        />

        <Grid ref="child"
          ligne={this.state.ligne}
          colone={this.state.colone}
          bombs={this.state.bombs}
          status={this.state.gameStatus}
          CalculScore={this.CalculScore}
          openCells={this.state.openCells}
          cellClick={this.handleCellClick}
          endGame={this.endGame}
        />

      </div>
    );
  }
}

export default App;
