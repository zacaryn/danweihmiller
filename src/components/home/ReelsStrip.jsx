import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FiPlay, FiArrowRight } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { REELS } from '../../config/reels';
import { trackPixelCustom } from '../../lib/meta-pixel';

const NAVY = '#0E1F45';

const Section = styled.section`
  margin-top: clamp(3rem, 6vw, 4.5rem);
  padding: clamp(3rem, 6vw, 4.5rem) 0;
  background: ${NAVY};
  color: #fff;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
`;

const Inner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 3rem);
`;

const Head = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Eyebrow = styled.p`
  margin: 0 0 0.35rem;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
`;

const Title = styled.h2`
  margin: 0;
  font-family: ${p => p.theme.fonts.heading};
  font-size: clamp(1.9rem, 3.5vw, 2.5rem);
  font-weight: 600;
  color: #fff;
`;

const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);

  a {
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    transition: background 0.15s ease;
  }

  a:hover {
    background: rgba(255, 255, 255, 0.14);
  }

  svg {
    width: 0.95rem;
    height: 0.95rem;
  }
`;

/* 4 across on desktop; a swipeable row on phones */
const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 900px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: clamp(1.25rem, 4vw, 3rem); /* keep the page gutter when snapping */
    gap: 0.9rem;
    margin: 0 calc(-1 * clamp(1.25rem, 4vw, 3rem));
    padding: 0 clamp(1.25rem, 4vw, 3rem) 0.5rem;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Reel = styled.figure`
  margin: 0;

  @media (max-width: 900px) {
    flex: 0 0 62%;
    scroll-snap-align: start;
  }

  @media (max-width: 480px) {
    flex-basis: 72%;
  }
`;

const Frame = styled.div`
  position: relative;
  aspect-ratio: 9 / 16;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);

  img,
  video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* the whole frame is clickable; the visible button sits bottom-left so each video's title stays readable */
const Play = styled.button`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0.9rem;
  border: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0.5));
  cursor: pointer;

  span {
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.92);
    color: ${NAVY};
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
    transition: transform 0.15s ease;
  }

  svg {
    width: 1.4rem;
    height: 1.4rem;
    margin-left: 3px;
  }

  &:hover span {
    transform: scale(1.07);
  }
`;

const Caption = styled.figcaption`
  margin-top: 0.75rem;

  strong {
    display: block;
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
  }

  p {
    margin: 0.2rem 0 0;
    font-size: 0.85rem;
    line-height: 1.45;
    color: rgba(255, 255, 255, 0.72);
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    margin-top: 0.35rem;
    font-size: 0.82rem;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
  }

  a svg {
    width: 0.85rem;
    height: 0.85rem;
  }
`;

/** "Watch" strip: Dan's short videos, playable in place (one at a time), with links to follow him. */
const ReelsStrip = () => {
  const [playing, setPlaying] = useState(null);
  const refs = useRef({});

  const play = (id) => {
    Object.entries(refs.current).forEach(([key, v]) => key !== id && v?.pause());
    setPlaying(id);
    trackPixelCustom('PlayReel', { content_name: id });
    setTimeout(() => refs.current[id]?.play().catch(() => {}), 0);
  };

  return (
    <Section aria-labelledby="reels-title">
      <Inner>
        <Head>
          <div>
            <Eyebrow>Watch</Eyebrow>
            <Title id="reels-title">Colorado Springs, from Dan</Title>
          </div>
          <Socials>
            <span>Follow for more</span>
            <a href="https://www.facebook.com/danweihmillerrealtor" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/danweihmiller/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@danielweihmiller" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <FaTiktok />
            </a>
          </Socials>
        </Head>
        <Row>
          {REELS.map((r) => (
            <Reel key={r.id}>
              <Frame>
                {playing === r.id ? (
                  <video
                    ref={(v) => {
                      refs.current[r.id] = v;
                    }}
                    src={r.video}
                    poster={r.poster}
                    controls
                    playsInline
                    preload="metadata"
                    onEnded={() => setPlaying(null)}
                  />
                ) : (
                  <>
                    <img src={r.poster} alt="" loading="lazy" />
                    <Play type="button" onClick={() => play(r.id)} aria-label={`Play: ${r.title}`}>
                      <span>
                        <FiPlay aria-hidden />
                      </span>
                    </Play>
                  </>
                )}
              </Frame>
              <Caption>
                <strong>{r.title}</strong>
                <p>{r.blurb}</p>
                {r.link && (
                  <Link to={r.link}>
                    See the home <FiArrowRight aria-hidden />
                  </Link>
                )}
              </Caption>
            </Reel>
          ))}
        </Row>
      </Inner>
    </Section>
  );
};

export default ReelsStrip;
