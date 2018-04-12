import React, { Component } from 'react';
import BasicInputForm from './inputs/InitForm'
import './App.css';
import { EventParameters } from "./api/EventParameters";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'LoadNew',
        };
        // This binding is necessary to make `this` work in the callback
        this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
        this.handleLoadButtonClick = this.handleLoadButtonClick.bind(this);
        this.initSchedule= this.initSchedule.bind(this);
    }

    initSchedule(initState) {
        this.setState({
            eventParams: new EventParameters(
                initState.title, initState.nTeams, initState.startTime, initState.endTime),
            display: 'Customise'
        });
    }

    handleLoadButtonClick() {
        alert("Loading not yet implemented");
    }

    handleCreateButtonClick() {
        this.setState({display: 'Initialise'});
    }

    render() {
        let mainWindow = <h1>An error occurred</h1>;
        if (this.state.display=== 'LoadNew') {
            mainWindow = (
                <div>
                    <button onClick={this.handleCreateButtonClick}>Create new schedule</button>&nbsp;
                    <button onClick={this.handleLoadButtonClick}>Load existing schedule</button>
                </div>
            );
        } else if (this.state.display === 'Initialise') {
            mainWindow = (
                <div>
                    <h1 className="App-intro">
                        Basic setup
                    </h1>
                    <BasicInputForm onSubmit={this.initSchedule}/>
                </div>
            );
        } else if (this.state.display === 'Customise') {
            mainWindow = (
                <div>
                    <h1 className="App-intro">
                        Customise parameters
                    </h1>
                    <h1>{this.state.eventParams.title}</h1>
                    <br/>
                    <h2>{this.state.eventParams.startTime.time} - {this.state.eventParams.endTime.time}</h2>
                    <br/>
                    <h2>Teams</h2>
                    <br/>
                    <ul>
                    {this.state.eventParams.teams.map(team =>
                        <li key={team.number}>{team.number}: {team.name}</li>
                    )}
                    </ul>
                </div>
            )
        }

        return (
          <div className="App">
            <header className="App-header">
                <h1 className="App-title">FLL Scheduler</h1>
                <h3>Version {this.props.version}</h3>
            </header>
              {mainWindow}
          </div>
        );
  }
}

export default App;