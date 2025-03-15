import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaExternalLinkAlt, FaHome, FaList, FaEnvelope, FaCog, FaCloudDownloadAlt, FaBed, FaBath, FaRuler } from 'react-icons/fa';
import ListingForm from '../components/admin/ListingForm';
import ListingTable from '../components/admin/ListingTable';
import MlsSearch from '../components/admin/MlsSearch';
import { getListings, addListing, updateListing, deleteListing } from '../services/listings-service';
import { importMlsListing } from '../services/mlsService';
import OneHomeImport from '../components/admin/OneHomeImport';
import { toast } from 'react-hot-toast';

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
  
  h2 {
    margin: 0;
    color: ${props => props.theme.colors.primary};
    font-size: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const TabButtons = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TabButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: transparent;
  border: none;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.darkGray};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
    transition: ${props => props.theme.transitions.fast};
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.small};
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Card = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  overflow: hidden;
`;

const SearchContainer = styled(Card)`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid #ddd;
  border-radius: ${props => props.theme.borderRadius.small};
  transition: ${props => props.theme.transitions.fast};

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 64, 54, 0.1);
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid #ddd;
  border-radius: ${props => props.theme.borderRadius.small};
  transition: ${props => props.theme.transitions.fast};

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 64, 54, 0.1);
  }
`;

const FormFooter = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.sm};
`;

const SearchButton = styled(Button)`
  min-width: 120px;
`;

const ResetButton = styled(Button)`
  background: transparent;
  color: ${props => props.theme.colors.darkGray};
  border: 1px solid ${props => props.theme.colors.darkGray};

  &:hover {
    background: ${props => props.theme.colors.lightGray};
    color: ${props => props.theme.colors.primary};
    transform: none;
    box-shadow: none;
  }
`;

const Table = styled.div`
  width: 100%;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-weight: 500;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  align-items: center;
  background: white;

  &:hover {
    background: ${props => props.theme.colors.lightGray};
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.xs};
    padding: ${props => props.theme.spacing.md};
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
  background: ${props => {
    switch (props.status) {
      case 'active': return 'rgba(46, 204, 113, 0.15)';
      case 'pending': return 'rgba(241, 196, 15, 0.15)';
      case 'sold': return 'rgba(231, 76, 60, 0.15)';
      default: return 'rgba(0, 0, 0, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'active': return '#27ae60';
      case 'pending': return '#f39c12';
      case 'sold': return '#c0392b';
      default: return props.theme.colors.text;
    }
  }};
`;

const ActionButton = styled.button`
  padding: 6px;
  background: transparent;
  color: ${props => props.theme.colors.darkGray};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  margin-right: 8px;

  &:hover {
    color: ${props => props.delete ? '#e74c3c' : props.theme.colors.primary};
    background: ${props => props.delete ? 'rgba(231, 76, 60, 0.1)' : 'rgba(74, 64, 54, 0.1)'};
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  background: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  margin: ${props => props.theme.spacing.lg} 0;
`;

const TableRowHeader = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ProperySearchResult = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const PropertyCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  transition: ${props => props.theme.transitions.default};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const PropertyImage = styled.div`
  height: 200px;
  background-color: #f0f0f0;
  background-image: url(${props => props.src || ''});
  background-size: cover;
  background-position: center;
`;

const PropertyContent = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const PropertyTitle = styled.h3`
  margin: 0 0 ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.primary};
`;

const PropertyPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const PropertyFeatures = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.9rem;
`;

const PropertyActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.sm};
`;

const ImportButton = styled(Button)`
  width: 100%;
`;

const BackButton = styled(Button)`
  background: transparent;
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  
  &:hover {
    background: ${props => props.theme.colors.lightGray};
    color: ${props => props.theme.colors.secondary};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  
  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.md};
  }
  
  p {
    color: ${props => props.theme.colors.darkGray};
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
`;

const AdminTitle = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
`;

const AdminNavigation = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  flex-wrap: wrap;
`;

const NavLink = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background: transparent;
  border: none;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.darkGray};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
    transition: ${props => props.theme.transitions.fast};
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    
    &::after {
      background-color: ${props => props.theme.colors.primary};
    }
  }
`;

const AdminActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const PropertyDetails = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const PropertyAddress = styled.h3`
  margin: 0 0 ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.primary};
`;

const PropertyLocation = styled.p`
  margin: 0 0 ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.darkGray};
`;

const PropertySpecs = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.9rem;
`;

const Spec = styled.span`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const SearchResults = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

// Function to search for real properties via address search APIs
const searchProperties = async (criteria) => {
  try {
    console.log('Searching for properties with criteria:', criteria);
    
    // This would connect to a real property search API in production
    // For example, Zillow API, Redfin API, or a custom property database
    
    // For now, we'll return empty results to show the search flow
    return [];
  } catch (error) {
    console.error('Error searching for properties:', error);
    throw error;
  }
};

const AdminListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentListing, setCurrentListing] = useState(null);
  const [activeTab, setActiveTab] = useState('listings');
  const [showMlsSearch, setShowMlsSearch] = useState(false);
  const [showPropertySearch, setShowPropertySearch] = useState(false);
  const [showOneHomeImport, setShowOneHomeImport] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      // Fetch listings from your backend - currently this will be empty
      const data = await getListings();
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddListing = async (listing) => {
    try {
      setLoading(true);
      const newListing = await addListing(listing);
      setListings(prev => [...prev, newListing]);
      setShowForm(false);
      setLoading(false);
    } catch (error) {
      console.error('Error adding listing:', error);
      setLoading(false);
    }
  };

  const handleEditListing = async (listing, newImages) => {
    try {
      setLoading(true);
      const updatedListing = await updateListing(listing.id, { ...listing, images: newImages });
      setListings(prev => prev.map(item => item.id === updatedListing.id ? updatedListing : item));
      setShowForm(false);
      setEditMode(false);
      setCurrentListing(null);
      setLoading(false);
    } catch (error) {
      console.error('Error updating listing:', error);
      setLoading(false);
    }
  };

  const handleDeleteListing = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        setLoading(true);
        await deleteListing(id);
        setListings(prev => prev.filter(item => item.id !== id));
        setLoading(false);
      } catch (error) {
        console.error('Error deleting listing:', error);
        setLoading(false);
      }
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the external property search API
      const results = await searchProperties(searchCriteria);
      setSearchResults(results);
      setActiveTab('searchResults');
    } catch (error) {
      console.error('Error searching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetSearch = () => {
    setShowPropertySearch(false);
    setShowMlsSearch(false);
    setSearchResults([]);
    setSearchCriteria({
      address: '',
      city: '',
      state: '',
      zipCode: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: ''
    });
    setActiveTab('listings');
  };

  const handleImportListing = (property) => {
    // Create a new listing object from the search result
    const newListing = {
      title: property.address,
      price: property.price,
      address: property.address,
      city: property.city,
      state: property.state,
      zipCode: property.zipCode,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      squareFeet: property.squareFeet || 0,
      description: property.description || '',
      status: 'active',
      images: property.images || [],
      mlsNumber: property.mlsNumber || ''
    };

    // Open the form with this data pre-filled
    setCurrentListing(newListing);
    setShowForm(true);
    setEditMode(false);
  };

  const handleEditClick = (listing) => {
    setCurrentListing(listing);
    setEditMode(true);
    setShowForm(true);
  };

  const handleImportFromOneHome = () => {
    setShowForm(false);
    setShowMlsSearch(false);
    setShowPropertySearch(false);
    setShowOneHomeImport(true);
  };
  
  const handleOneHomeImportComplete = (importedListing) => {
    setShowOneHomeImport(false);
    
    if (importedListing) {
      // Add the imported listing to the listings array
      setListings(prevListings => [importedListing, ...prevListings]);
      // Show success toast or message
      toast.success(`Successfully imported listing: ${importedListing.address}`);
    }
  };

  if (showForm) {
    return (
      <AdminContainer>
        <AdminHeader>
          <AdminTitle>{editMode ? 'Edit Listing' : 'Add New Listing'}</AdminTitle>
          <BackButton onClick={() => {
            setShowForm(false);
            setEditMode(false);
            setCurrentListing(null);
          }}>
            Back to Listings
          </BackButton>
        </AdminHeader>
        <ListingForm
          onSubmit={editMode ? handleEditListing : handleAddListing}
          initialData={currentListing}
          onCancel={() => {
            setShowForm(false);
            setEditMode(false);
            setCurrentListing(null);
          }}
        />
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle>Admin Dashboard</AdminTitle>
      </AdminHeader>

      <AdminNavigation>
        <NavLink onClick={() => navigate('/admin')}>
          <FaHome /> Dashboard
        </NavLink>
        <NavLink active>
          <FaList /> Listings
        </NavLink>
        <NavLink onClick={() => navigate('/admin?tab=inquiries')}>
          <FaEnvelope /> Inquiries
        </NavLink>
        <NavLink onClick={() => navigate('/admin?tab=settings')}>
          <FaCog /> Settings
        </NavLink>
      </AdminNavigation>

      <Header>
        <h2>Property Listings</h2>
        <ButtonGroup>
          <ActionButton onClick={() => handleAddListing()} disabled={showForm || loading}>
            <FaPlus /> Add New Listing
          </ActionButton>
          <ActionButton onClick={() => setShowMlsSearch(true)} disabled={showForm || loading}>
            <FaSearch /> Import from MLS
          </ActionButton>
          <ActionButton onClick={() => setShowPropertySearch(true)} disabled={showForm || loading}>
            <FaSearch /> Search Properties
          </ActionButton>
          <ActionButton onClick={handleImportFromOneHome} disabled={showForm || loading}>
            <FaCloudDownloadAlt /> Import from OneHome
          </ActionButton>
        </ButtonGroup>
      </Header>

      {/* Show OneHome Import Form */}
      {showOneHomeImport && (
        <OneHomeImport onImportComplete={handleOneHomeImportComplete} />
      )}

      {/* Show MLS Search */}
      {showMlsSearch && (
        <SearchForm onCancel={() => setShowMlsSearch(false)} onSearch={handleMlsSearch} />
      )}

      {/* Show Property Search */}
      {showPropertySearch && (
        <PropertySearchForm 
          criteria={searchCriteria} 
          onCriteriaChange={handleSearchChange}
          onSearch={handleSearch}
          onReset={handleResetSearch}
          onCancel={() => setShowPropertySearch(false)}
        />
      )}

      {/* Show Listing Form */}
      {showForm && (
        <ListingForm
          onSubmit={editMode ? handleEditListing : handleAddListing}
          initialData={currentListing}
          onCancel={() => {
            setShowForm(false);
            setEditMode(false);
            setCurrentListing(null);
          }}
        />
      )}
      
      {/* Show Search Results if any */}
      {searchResults.length > 0 && (
        <SearchResults>
          <ResultsHeader>
            <h3>Search Results</h3>
            <Button onClick={() => setSearchResults([])}>Close Results</Button>
          </ResultsHeader>
          <ResultsGrid>
            {searchResults.map(property => (
              <PropertyCard key={property.id}>
                <PropertyImage src={property.image} alt={property.address} />
                <PropertyDetails>
                  <PropertyAddress>{property.address}</PropertyAddress>
                  <PropertyLocation>{property.city}, {property.state} {property.zipCode}</PropertyLocation>
                  <PropertyPrice>${property.price.toLocaleString()}</PropertyPrice>
                  <PropertySpecs>
                    <Spec><FaBed /> {property.bedrooms}</Spec>
                    <Spec><FaBath /> {property.bathrooms}</Spec>
                    <Spec><FaRuler /> {property.squareFeet.toLocaleString()} sqft</Spec>
                  </PropertySpecs>
                  <ImportButton onClick={() => handleImportListing(property)}>
                    Import Listing
                  </ImportButton>
                </PropertyDetails>
              </PropertyCard>
            ))}
          </ResultsGrid>
        </SearchResults>
      )}

      {/* Display listings */}
      {!loading ? (
        <>
          {listings.length > 0 ? (
            <ListingTable
              listings={listings}
              onEdit={handleEditClick}
              onDelete={handleDeleteListing}
            />
          ) : (
            <EmptyState>
              <FaHome size={48} />
              <h3>No Listings Found</h3>
              <p>Add your first property listing to get started.</p>
            </EmptyState>
          )}
        </>
      ) : (
        <LoadingState>
          <Spinner />
          <p>Loading listings...</p>
        </LoadingState>
      )}
    </AdminContainer>
  );
};

export default AdminListings; 