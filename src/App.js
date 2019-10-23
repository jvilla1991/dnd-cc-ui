import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';

import logo from './logo.svg';
import './App.css';
import style from './style';

class App extends Component {
  state = {
    username: '',
    password: '',
    characters: []
  }

  constructor(props) {
    super(props)

    this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this);
    this.handleUsernameOnChange = this.handleUsernameOnChange.bind(this);
    this.findCharacters = this.findCharacters.bind(this);
  }

  handlePasswordOnChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleUsernameOnChange = (e) => {
    this.setState({ username: e.target.value });
  }

  findCharacters = () => {
    axios.post(`http://localhost:1010/character/${this.state.username}/characters`)
      .then((res) => {
        this.setState({ characters: res.data.data });
      });
  }

  componentDidMount = () => {
    axios.get('http://localhost:1010/users')
      .then((res) => {
        console.log(res.data);
      });
  }

  render = () => {
    return (
      <div className="App">
        <TextField
          id="standard-dense"
          label="Username"
          className={clsx(this.props.classes.textField, this.props.classes.dense)}
          margin="dense"
          value={this.state.username}
          onChange={this.handleUsernameOnChange}
        />
        <TextField
          id="standard-dense"
          label="Password"
          type="password"
          className={clsx(this.props.classes.textField, this.props.classes.dense)}
          margin="dense"
          value={this.state.password}
          onChange={this.handlePasswordOnChange}
        />
        <Button variant="outlined"
          color="primary"
          className={this.props.classes.button}
          onClick={this.findCharacters}
        >
          Find Characters
        </Button>
        {this.state.characters.length == 0 ? null :
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
              </ListSubheader>
            }
            className={this.props.classes.root}
          >
            {this.state.characters.map((c) => (
              <ListItem button>
                <ListItemText primary={c.name} />
              </ListItem>
            ))}
          </List>
        }
      </div>
    );
  }
}

export default withStyles(style)(App);
