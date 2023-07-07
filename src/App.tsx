import Canvas from './Canvas';
import './App.css';
import { Provider } from 'react-redux';
import { store } from "./state/Store"
import Toolbar from './Toolbar';
import React from 'react';
import { LineType } from './utils/lineType';

function App() {
  const [routeColorIndex, setRouteColorIndex] = React.useState<number>(0);
  const [lineType, setLineType] = React.useState<LineType>("dashed");

  return (
    <Provider store={store}>
      <Toolbar onChangeColorIndex={color => setRouteColorIndex(color)} onLineTypeChange={type => setLineType(type)} />
      <Canvas routeColorIndex={routeColorIndex} lineType={lineType} />
    </Provider>
  );
}

export default App;
