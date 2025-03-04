import styled from '@emotion/styled';

const Table = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 120px;
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
  grid-template-columns: 2fr 1fr 1fr 1fr 120px;
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  align-items: center;

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

const ActionButton = styled.button`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: ${props => props.delete ? props.theme.colors.darkGray : props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  margin-right: ${props => props.theme.spacing.xs};

  &:hover {
    background: ${props => props.delete ? '#e74c3c' : props.theme.colors.secondary};
  }
`;

const Status = styled.span`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: ${props => {
    switch (props.status) {
      case 'active': return 'rgba(46, 204, 113, 0.2)';
      case 'pending': return 'rgba(241, 196, 15, 0.2)';
      case 'sold': return 'rgba(231, 76, 60, 0.2)';
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
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.9rem;
`;

const ListingTable = ({ listings, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <div>Property</div>
        <div>Price</div>
        <div>Status</div>
        <div>Date Posted</div>
        <div>Actions</div>
      </TableHeader>
      {listings.map(listing => (
        <TableRow key={listing.id}>
          <div>
            <strong>{listing.title}</strong>
            <div>{listing.address}</div>
          </div>
          <div>${listing.price.toLocaleString()}</div>
          <div>
            <Status status={listing.status}>
              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
            </Status>
          </div>
          <div>{new Date(listing.datePosted).toLocaleDateString()}</div>
          <div>
            <ActionButton onClick={() => onEdit(listing)}>Edit</ActionButton>
            <ActionButton delete onClick={() => onDelete(listing.id)}>Delete</ActionButton>
          </div>
        </TableRow>
      ))}
    </Table>
  );
};

export default ListingTable; 