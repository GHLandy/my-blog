import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const GithubStats = () => {
  const data = useStaticQuery(graphql`
    query GithubStatsQuery {
      site {
        siteMetadata {
          author {
            github
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;

  if (!author?.github) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        gap: '10px',
        marginBottom: '12px',
      }}
    >
      <a
        href={`https://github.com/${author.github}`}
        style={{ display: 'block', maxWidth: '450px', width: '100%' }}
      >
        <img
          src={`https://github-readme-stats.vercel.app/api?username=${author.github}&show_icons=true&theme=cobalt`}
          alt="GitHub stats"
          style={{ width: '100%' }}
        />
      </a>

      <a
        href={`https://github.com/${author.github}`}
        style={{ display: 'block', maxWidth: '380px', width: '100%' }}
      >
        <img
          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${author.github}&layout=compact&theme=cobalt`}
          alt="Top Langs"
          style={{ width: '100%' }}
        />
      </a>
    </div>
  );
};

export default GithubStats;
