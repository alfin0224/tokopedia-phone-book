import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ContactListPage from './pages/ContactList';
import FormContactPage from './components/FormContact';
import EditContactPage from 'components/EditContact';
import Footer from 'components/global/Footer';
import Header from 'components/global/Header';


const App: React.FC = () => {

  return (
    <Router>
      <Header />
      <Routes>
          <Route path='/' element={<ContactListPage />} />
          <Route path='/add' element={<FormContactPage />} />
          <Route path='/edit/:id' element={<EditContactPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
