import styled from '@emotion/styled';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
`;

const ImageGallery = styled.div`
  position: relative;
  height: 500px;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Thumbnails = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
  overflow-x: auto;
  padding-bottom: ${props => props.theme.spacing.sm};
`;

const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  opacity: ${props => props.active ? 1 : 0.6};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    opacity: 1;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.xl};

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Details = styled.div`
  h1 {
    font-size: 2.5rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text};
  }
`;

const Sidebar = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  height: fit-content;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${props => props.theme.spacing.md} 0;

  li {
    padding: ${props => props.theme.spacing.sm} 0;
    border-bottom: 1px solid ${props => props.theme.colors.lightGray};
    display: flex;
    justify-content: space-between;
  }
`;

const ContactButton = styled.a`
  display: block;
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  text-align: center;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.small};
  margin-top: ${props => props.theme.spacing.md};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const ListingDetail = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  // This would come from your backend
  const listing = {
    // Placeholder data
  };

  if (!listing) return <div>Loading...</div>;

  return (
    <DetailContainer>
      <ImageGallery>
        <MainImage src={listing.images[currentImage]} alt={listing.title} />
        <Thumbnails>
          {listing.images.map((image, index) => (
            <Thumbnail
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              active={currentImage === index}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </Thumbnails>
      </ImageGallery>

      <ContentGrid>
        <Details>
          <h1>{listing.title}</h1>
          <p>{listing.description}</p>
        </Details>

        <Sidebar>
          <h2>${listing.price.toLocaleString()}</h2>
          <FeatureList>
            <li>
              <span>Bedrooms</span>
              <span>{listing.bedrooms}</span>
            </li>
            <li>
              <span>Bathrooms</span>
              <span>{listing.bathrooms}</span>
            </li>
            <li>
              <span>Square Feet</span>
              <span>{listing.squareFeet.toLocaleString()}</span>
            </li>
          </FeatureList>
          <ContactButton href="/contact">Contact Agent</ContactButton>
        </Sidebar>
      </ContentGrid>
    </DetailContainer>
  );
};

export default ListingDetail; 