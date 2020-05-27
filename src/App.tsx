import React from 'react';

import Page from './components/page';
import Posts from './components/posts';
import PaginationProvider from './context/pagination-context';
import Pagination from './components/pagination';
import PostCreation from './components/post-creation';

function App() {
  return (
    <React.Fragment>
      <PaginationProvider>
        <Page>
          <PostCreation />
          <Posts />
          <Pagination />
        </Page>
      </PaginationProvider>
    </React.Fragment>
  );
}

export default App;
