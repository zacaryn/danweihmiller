import { Navigate, useParams } from 'react-router-dom';

/** Legacy manual listing URLs → synced MLS listings page */
const ListingDetail = () => {
  const { id } = useParams();
  return <Navigate to={id ? `/contact?topic=${encodeURIComponent(id)}` : '/listings'} replace />;
};

export default ListingDetail;
