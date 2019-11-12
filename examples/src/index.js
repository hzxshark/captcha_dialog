import React from 'react';
import { render} from 'react-dom';
import MyComponent from '../../src';

const handleExport = (value) => {
  console.log(value,'验证码')
}

const App = () => <MyComponent handleExport = {(e) => handleExport(e)}/>;
render(<App />, document.getElementById("root"));