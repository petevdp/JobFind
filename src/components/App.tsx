import React from "react";
import 'fomantic-ui-css/semantic.css';
import { Menu, Container, } from 'semantic-ui-react';

import Search from "./Search";

const App: React.FC = () => {
  return (
    <div className="App">
      <Menu>
        <Menu.Item header >JobFind</Menu.Item>
      </Menu>
      <Container className="content-container">
        <Search />
      </Container>
    </div>
  );
};

export default App;
