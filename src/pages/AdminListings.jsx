import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import ListingForm from '../components/admin/ListingForm';
import ListingTable from '../components/admin/ListingTable';
import { getListings, addListing, updateListing, deleteListing } from '../firebase/listings';

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const AddButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const AdminListings = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const data = await getListings();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleAddListing = async (listing) => {
    try {
      setLoading(true);
      await addListing(listing);
      const updatedListings = await getListings();
      setListings(updatedListings);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding listing:', error);
      alert('Failed to add listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditListing = async (listing, newImages) => {
    try {
      await updateListing(listing.id, listing, newImages);
      const updatedListings = await getListings();
      setListings(updatedListings);
      setShowForm(false);
      setEditingListing(null);
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };

  const handleDeleteListing = async (id) => {
    try {
      const listing = listings.find(l => l.id === id);
      await deleteListing(id, listing.images);
      setListings(listings.filter(l => l.id !== id));
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  return (
    <AdminContainer>
      <Header>
        <h1>Manage Listings</h1>
        <AddButton onClick={() => setShowForm(true)} disabled={loading}>
          {loading ? 'Loading...' : 'Add New Listing'}
        </AddButton>
      </Header>

      {loading && <div>Loading...</div>}

      {showForm && (
        <ListingForm
          onSubmit={editingListing ? handleEditListing : handleAddListing}
          initialData={editingListing}
          onCancel={() => {
            setShowForm(false);
            setEditingListing(null);
          }}
        />
      )}

      <ListingTable
        listings={listings}
        onEdit={(listing) => {
          setEditingListing(listing);
          setShowForm(true);
        }}
        onDelete={handleDeleteListing}
      />
    </AdminContainer>
  );
};

export default AdminListings; 