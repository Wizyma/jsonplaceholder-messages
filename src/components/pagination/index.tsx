import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MUIPagination from '@material-ui/lab/Pagination';

import { usePaginationContext } from '../../context/pagination-context';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);

export default function Pagination() {
  const classes = useStyles();
  const { pagination, onChangePage } = usePaginationContext();

  if (pagination?.count === 0) {
    return null;
  }

  return (
    <div className={classes.root}>
      <MUIPagination
        count={pagination?.count}
        page={pagination?.page}
        onChange={(_, page) => onChangePage?.(page)}
      />
    </div>
  );
}
