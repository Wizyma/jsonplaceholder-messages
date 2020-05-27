import React, { useMemo } from 'react';
import { usePaginatedQuery } from 'react-query';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

import fetchPosts, { Post } from '../../async/fetchPosts';
import { usePaginationContext } from '../../context/pagination-context';

export default function Posts() {
  const { pagination, setCount } = usePaginationContext();
  const skeletonsCount = useMemo(() => new Array(10).fill('i').map((item, index) => `${item}-${index}`), []);

  const { status, resolvedData, isFetching } = usePaginatedQuery<
    Post[],
    [string, number | undefined, number | undefined]
  >(['posts', pagination?.page, pagination?.limit], (_, page, limit) => {
    return fetchPosts(setCount, page, limit);
  });

  if (isFetching) {
    return (
      <React.Fragment>
        {skeletonsCount.map((item) => (
          <React.Fragment key={item}>
            <Typography variant="h2">
              <Skeleton />
            </Typography>
            <Typography variant="body1">
              <Skeleton />
            </Typography>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }

  return (
    <Grid container spacing={2}>
      {status === 'success' &&
        resolvedData?.map((item) => (
          <Grid item key={item.id}>
            <Paper style={{ padding: 10 }}>
              <Typography variant="h5">
                {item.isPrivate && <Chip size="small" label="private" />} {item.title}
              </Typography>
              <Typography variant="body1">{item.body}</Typography>
            </Paper>
          </Grid>
        ))}
    </Grid>
  );
}
