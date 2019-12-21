import React from "react";
import '../styles/App.scss';
import 'fomantic-ui-css/semantic.css';
import { Menu, Container, Header, } from 'semantic-ui-react';

import Search from "./Search";

const App: React.FC = () => {
  return (
    <div className="App">
      <Menu className="top-bar">
        <Menu.Item header>JobFind</Menu.Item>
      </Menu>
      <Container>
        <Header>Find your Dream Job!</Header>
        <Search />
      </Container>
    </div>
  );
};

export default App;
