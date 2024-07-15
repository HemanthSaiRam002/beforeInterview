import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
const rootContainer = createRoot(rootElement);

const render = (Component: React.FC) => {
  rootContainer.render(
    <React.StrictMode>
      <Component />
    </React.StrictMode>
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    console.log('Accepting the updated App module!');
    render(NextApp);
  });
}
