import React from "react";
import 'fomantic-ui-css/semantic.css';
import { Menu, Container, Grid, } from 'semantic-ui-react';

import Search from "./Search";

const App: React.FC = () => {
  return (
    <div className="App">
      <Menu>
        <Menu.Item header >JobFind</Menu.Item>
      </Menu>
      <Container>
        <Search />
      </Container>
    </div>
  );
};

export default App;
