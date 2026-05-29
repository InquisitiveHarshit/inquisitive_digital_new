/**
 * Shared in-memory sitemap cache singleton.
 * Keeps the same object reference across imports so bust() works everywhere.
 */
export const sitemapState = {
  cache: null,
  cacheTime: 0,
  bust() {
    this.cache = null;
    this.cacheTime = 0;
  },
};
