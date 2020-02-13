import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import LoadData from './components/LoadData/LoadData'
import Table from './components/Table/Table'

const App = () => {
  return (
    <BrowserRouter>
      <div className="container mt-3 mb-3">
        <div className="text-right">Upload <LoadData label="little data" dataVolume="small" /> or <LoadData label="lot of data" dataVolume="big" /></div>
        <hr />
        <Route exact to="/" component={Table} />
      </div>
    </BrowserRouter>
  );
}

export default App;
