import React, { useEffect, useState } from 'react';

import Homepage from './components/pages/homepage';

import { DataReportProvider } from './components/context/DataReportContext';

function App() {
  const [dataReport, setDataReport] = useState({});
  const loadDataReport = () => {
    fetch('http://localhost:5000/api/data').then(res =>res.json())
    .then(data => {
      setDataReport(data);
    }).catch(err => console.log(err))
  };
  useEffect(() => loadDataReport(), [])

  return (
    <div className="App">
      <header>
      
      </header>
      <DataReportProvider value={dataReport}>
        <Homepage />
      </DataReportProvider>
      
    </div>
  );
}

export default App;
