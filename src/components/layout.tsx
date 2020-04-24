import * as React from 'react';

import { rhythm } from '../utils/typography';

// eslint-disable-next-line react/prop-types
const MainLayout: React.FC = ({ children }) => (
  <div
    style={{
      margin: '0 auto',
      marginBottom: rhythm(0.6),
      marginTop: rhythm(0.6),
      maxWidth: 650,
      paddingLeft: rhythm(3 / 4),
      paddingRight: rhythm(3 / 4),
    }}
  >
    {children}
  </div>
);

export default MainLayout;
