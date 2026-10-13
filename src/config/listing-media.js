/**
 * Extra media for Dan's listings, keyed by MLS#. Everything else on a listing page (photos, price, facts,
 * description) syncs from his Coldwell Banker profile automatically; only videos need adding here.
 * Put the files in public/videos/.
 */
export const LISTING_MEDIA = {
  6629102: {
    // 6724 Harvey Lane
    video: '/videos/6724-harvey-ln-tour.mp4',
    poster: '/videos/6724-harvey-ln-tour.jpg',
  },
};

export function mediaForListing(mlsId) {
  return LISTING_MEDIA[mlsId] || null;
}
