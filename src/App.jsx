import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import ResourcesPage from './pages/resources';
import MilitaryRelocation from './pages/resources/military-relocation';
import VALoans from './pages/resources/va-loans';
import ListingAgent from './pages/resources/listing-agent';
import NewConstruction from './pages/resources/new-construction';
import FirstTimeHomeBuyers from './pages/resources/first-time-home-buyers';
import Land from './pages/resources/land';
import SingleFamilyHome from './pages/resources/single-family-home';
import CustomHomeBuilding from './pages/resources/custom-home-building';

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="listings" element={<Listings />} />
            <Route path="listings/:id" element={<ListingDetail />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="admin" element={<Admin />} />
            
            {/* Resources Routes */}
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="resources/military-relocation" element={<MilitaryRelocation />} />
            <Route path="resources/va-loans" element={<VALoans />} />
            <Route path="resources/listing-agent" element={<ListingAgent />} />
            <Route path="resources/new-construction" element={<NewConstruction />} />
            <Route path="resources/custom-home-building" element={<CustomHomeBuilding />} />
            <Route path="resources/first-time-home-buyers" element={<FirstTimeHomeBuyers />} />
            <Route path="resources/land" element={<Land />} />
            <Route path="resources/single-family-home" element={<SingleFamilyHome />} />
            
            {/* 404 route - must be last */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
