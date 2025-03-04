import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import AdminListings from './pages/AdminListings';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="listings" element={<Listings />} />
          <Route path="listings/:id" element={<ListingDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/listings" element={<AdminListings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
