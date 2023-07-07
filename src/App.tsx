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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 67 && e.ctrlKey) {
      const storePresent = store.getState().present;
      const playersString = JSON.stringify(storePresent.players);
      const ballString = JSON.stringify(storePresent.ball);
      const routesString = JSON.stringify(storePresent.routes);

      navigator.clipboard.writeText(
        new URL(`${window.location.origin}${window.location.pathname}?players=${playersString}&routes=${routesString}&ball=${ballString}`).href
      );
    }
  };

  return (
    <Provider store={store}>
      <div onKeyDown={((e) => handleKeyDown(e))}>
        <Toolbar onChangeColorIndex={color => setRouteColorIndex(color)} onLineTypeChange={type => setLineType(type)} />
        <Canvas routeColorIndex={routeColorIndex} lineType={lineType} />
      </div>
    </Provider>
  );
}

export default App;
