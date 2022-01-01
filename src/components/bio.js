import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={['auto', 'webp', 'avif']}
        src="../images/GHLandy.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />

      {author?.name && (
        <p>
          <strong>{author.name}</strong>，{author?.summary || null}
        </p>
      )}
    </div>
  );
};

export default Bio;
