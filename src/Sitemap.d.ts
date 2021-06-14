export type SiteMap = {
  urlset: {
    url: {
      /**
       * The URI must conform to RFC 2396
       * https://datatracker.ietf.org/doc/html/rfc2396
       */
      loc: string;
      /**
       * W3C DATETIME format
       * http://www.w3.org/TR/NOTE-datetime
       */
      lastmod?: string;
      changefreq?:
        | "always"
        | "hourly"
        | "daily"
        | "weekly"
        | "monthly"
        | "yearly"
        | "never";
      /**
       * 0.0 <= priority <= 1.0
       */
      priority?: number;
    }[];
  };
};
