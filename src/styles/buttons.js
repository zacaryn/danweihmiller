/**
 * The one button style for the whole site. Interpolate into any styled component:
 *
 *   const Cta = styled(Link)`${button('primary')}`;
 *
 * variants: primary (navy), outline (navy outline), light (white, for dark backgrounds),
 *           outlineLight (white outline, for dark backgrounds)
 * sizes:    md (44px, default), sm (36px), lg (50px)
 */
const NAVY = '#0E1F45';
const NAVY_HOVER = '#1B3366';

const SIZES = {
  sm: 'height: 2.25rem; padding: 0 0.95rem; font-size: 0.72rem;',
  md: 'height: 2.75rem; padding: 0 1.25rem; font-size: 0.78rem;',
  lg: 'height: 3.125rem; padding: 0 1.6rem; font-size: 0.82rem;',
};

const VARIANTS = {
  primary: `
    background: ${NAVY};
    color: #fff;
    border-color: ${NAVY};
    &:hover { background: ${NAVY_HOVER}; border-color: ${NAVY_HOVER}; }
  `,
  outline: `
    background: transparent;
    color: ${NAVY};
    border-color: rgba(14, 31, 69, 0.28);
    &:hover { border-color: ${NAVY}; background: rgba(14, 31, 69, 0.04); }
  `,
  light: `
    background: #fff;
    color: ${NAVY};
    border-color: #fff;
    &:hover { background: rgba(255, 255, 255, 0.88); }
  `,
  outlineLight: `
    background: transparent;
    color: #fff;
    border-color: rgba(255, 255, 255, 0.55);
    &:hover { border-color: #fff; background: rgba(255, 255, 255, 0.1); }
  `,
};

export function button(variant = 'primary', size = 'md') {
  return `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    ${SIZES[size] || SIZES.md}
    border: 1px solid transparent;
    border-radius: 6px;
    font-family: inherit;
    font-weight: 700;
    letter-spacing: 0.07em;
    line-height: 1;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
    ${VARIANTS[variant] || VARIANTS.primary}

    svg { width: 1em; height: 1em; flex-shrink: 0; }
    &:focus-visible { outline: 2px solid ${variant === 'light' || variant === 'outlineLight' ? '#fff' : NAVY}; outline-offset: 2px; }
    &:disabled { opacity: 0.6; cursor: default; }
  `;
}
