import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import sceneImg from '../../assets/images/scene.jpg';
import { button } from '../../styles/buttons';
import {
  pageHeroOverlay,
  pageHeroOverlayMobile,
} from '../../styles/heroOverlays';

export const PageRoot = styled.div`
  width: 100%;
  min-height: 100%;
  background: ${props => props.theme.colors.background};
`;

export const PageHero = styled.header`
  margin-top: 0;
  padding-top: calc(72px + 2rem);
  padding-bottom: 2rem;
  padding-left: clamp(1.25rem, 4vw, 3rem);
  padding-right: clamp(1.25rem, 4vw, 3rem);
  background: ${props =>
    props.$image
      ? `${pageHeroOverlay}, url(${props.$image}) center/cover no-repeat`
      : props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);

  @media (max-width: 768px) {
    padding-top: calc(68px + 1.5rem);
    padding-bottom: 1.5rem;
    background: ${props =>
      props.$image
        ? `${pageHeroOverlayMobile}, url(${props.$image}) center/cover no-repeat`
        : props.theme.colors.primary};
  }
`;

export const PageHeroInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export const PageEyebrow = styled.p`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
  margin: 0 0 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    content: '';
    width: 2rem;
    height: 1px;
    background: rgba(255, 255, 255, 0.45);
    flex-shrink: 0;
  }
`;

export const PageTitle = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.02em;
  margin: 0 0 0.75rem;
  max-width: 26ch;
`;

export const PageLead = styled.p`
  font-size: clamp(1rem, 2vw, 1.15rem);
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.82);
  margin: 0;
  max-width: 62ch;
`;

export const PageHeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
`;

export const PageHeroButton = styled(Link)`
  ${button('outlineLight')}

  &.primary {
    ${button('light')}
  }
`;

export const PageMain = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1.25rem, 4vw, 3rem) clamp(2.5rem, 6vw, 4rem);
`;

export const PagePanel = styled.section`
  background: ${props => props.theme.colors.white};
  border: ${props => props.theme.borders.subtle};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: clamp(1.25rem, 3vw, 2rem);
  max-width: ${props => props.$narrow ? '800px' : 'none'};
  margin: ${props => (props.$narrow ? '0 auto' : '0')};

  @media (max-width: 768px) {
    border-radius: 0;
    border-left: none;
    border-right: none;
    margin-left: calc(-1 * clamp(1.25rem, 4vw, 3rem));
    margin-right: calc(-1 * clamp(1.25rem, 4vw, 3rem));
    padding-left: clamp(1.25rem, 4vw, 3rem);
    padding-right: clamp(1.25rem, 4vw, 3rem);
  }
`;

export const Prose = styled.div`
  font-size: 1.05rem;
  line-height: 1.75;
  color: ${props => props.theme.colors.text};

  p {
    margin: 0 0 1.25rem;
  }

  h2 {
    font-family: ${props => props.theme.fonts.heading};
    font-size: 1.5rem;
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
    margin: 2rem 0 0.75rem;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 1.5rem 0 0.5rem;
    color: ${props => props.theme.colors.primary};
  }

  ul {
    margin: 0 0 1.25rem;
    padding-left: 1.25rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: ${props => props.theme.colors.secondary};
  }
`;

export const PageCTA = styled.aside`
  margin-top: clamp(2.5rem, 5vw, 3.5rem);
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border-radius: ${props => props.theme.borderRadius.large};
  background: ${props => props.theme.colors.primary};
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem 2rem;
  box-shadow: ${props => props.theme.shadows.medium};

  h2 {
    font-family: ${props => props.theme.fonts.heading};
    font-size: clamp(1.5rem, 3vw, 1.9rem);
    font-weight: 600;
    margin: 0 0 0.35rem;
    color: #fff;
  }

  p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.78);
    max-width: 48ch;
  }
`;

export const PageCTAActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
`;

export const PageCTAButton = styled(Link)`
  ${button('light')}

  &.ghost {
    ${button('outlineLight')}
  }
`;

const DEFAULT_HERO_IMAGE = sceneImg;

export function PageHeader({
  eyebrow,
  title,
  lead,
  heroImage,
  solid,
  primaryAction,
  secondaryAction,
}) {
  const image = solid ? null : (heroImage ?? DEFAULT_HERO_IMAGE);
  return (
    <PageHero $image={image}>
      <PageHeroInner>
        {eyebrow && <PageEyebrow>{eyebrow}</PageEyebrow>}
        <PageTitle>{title}</PageTitle>
        {lead && <PageLead>{lead}</PageLead>}
        {(primaryAction || secondaryAction) && (
          <PageHeroActions>
            {primaryAction && (
              primaryAction.to.startsWith('tel:') || primaryAction.to.startsWith('mailto:') ? (
                <PageHeroButton as="a" href={primaryAction.to} className="primary">
                  {primaryAction.label}
                </PageHeroButton>
              ) : (
                <PageHeroButton to={primaryAction.to} className="primary">
                  {primaryAction.label}
                </PageHeroButton>
              )
            )}
            {secondaryAction && (
              <PageHeroButton to={secondaryAction.to}>
                {secondaryAction.label}
              </PageHeroButton>
            )}
          </PageHeroActions>
        )}
      </PageHeroInner>
    </PageHero>
  );
}

PageHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  lead: PropTypes.string,
  heroImage: PropTypes.string,
  primaryAction: PropTypes.shape({
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  secondaryAction: PropTypes.shape({
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  solid: PropTypes.bool,
};

export function EngagementCTA({
  title = 'Ready to talk about your next move?',
  description = 'Call Dan for a straightforward conversation about buying, selling, or relocating in Colorado Springs.',
  primaryTo = '/contact',
  primaryLabel = 'Contact Dan',
  secondaryTo = 'tel:7193018257',
  secondaryLabel = 'Call (719) 301-8257',
}) {
  const isExternal = (to) => /^(tel|sms|mailto):/.test(to);
  return (
    <PageCTA>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <PageCTAActions>
        <PageCTAButton to={primaryTo}>{primaryLabel}</PageCTAButton>
        {isExternal(secondaryTo) ? (
          <PageCTAButton as="a" href={secondaryTo} className="ghost">
            {secondaryLabel}
          </PageCTAButton>
        ) : (
          <PageCTAButton to={secondaryTo} className="ghost">
            {secondaryLabel}
          </PageCTAButton>
        )}
      </PageCTAActions>
    </PageCTA>
  );
}

EngagementCTA.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  primaryTo: PropTypes.string,
  primaryLabel: PropTypes.string,
  secondaryTo: PropTypes.string,
  secondaryLabel: PropTypes.string,
};
