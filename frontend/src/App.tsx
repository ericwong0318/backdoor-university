import * as React from 'react';
import { useEffect } from 'react';
import { AppLocalizedStrings } from './App/localization';
import { useAuth } from './Components/auth/AuthProvider';
import LanguageProvider from './Components/LanguageProvider/LanguageProvider';
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
      <LanguageProvider>
        <Header />
        <Main />
        <Footer />
      </LanguageProvider>
    </div>
  );
}

export default App;
