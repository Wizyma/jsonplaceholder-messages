import { ToastContainer } from 'react-toastify';
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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
      </React.Fragment>
  );
}

export default App;
