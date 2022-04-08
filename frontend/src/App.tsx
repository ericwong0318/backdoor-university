import * as React from 'react';
import { useEffect } from 'react';
import { useAuth } from './Components/auth/AuthProvider';
import Footer from './Layouts/Footer/Footer';
import Header from './Layouts/Header/Header';
import Main from './Layouts/Main/Main';

function App() {
  const auth = useAuth();

  useEffect(() => {
    // Try to auto login
    if (auth.canAutoLogin()) {
      auth.attemptAutoLogin();
    }
  })


  return (
    <div className="App">
      <head>
        <title>
          Backdoor-University
        </title>
      </head>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
