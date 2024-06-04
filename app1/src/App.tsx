import React from 'react';
import Button from 'app2/Button'; // error ts-loader

const App = () => (
  <div>
    <h1>Typescript</h1>
    <h2>App 1</h2>
    <React.Suspense fallback="Loading Button">
      <Button size="large" />
      <br />
      <Button size="small" />
    </React.Suspense>
  </div>
);

export default App;
