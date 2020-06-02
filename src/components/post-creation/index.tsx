import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useIsFetching, useMutation, queryCache } from 'react-query';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useState, useCallback, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import createPost from '../../async/createPost';
import { usePaginationContext } from '../../context/pagination-context';

const toastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
};

export default function PostCreation() {
  const { pagination } = usePaginationContext();
  const { register, handleSubmit } = useForm();
  // @ts-ignore
  const [mutate, { status, error }] = useMutation(createPost, {
    onSuccess: (data) => {
      setCreation(!create);
      if(data?.id) {
        queryCache.refetchQueries(['posts', pagination?.page, pagination?.limit]);
        toast.success(`Post ${data?.id} Crée`, toastConfig);
      }
    },
    onError: () => setCreation(!create),
  });
  const [create, setCreation] = useState(false);
  const isFetching = useIsFetching();
  const onSetCreation = useCallback(() => {
    setCreation(!create);
  }, [create]);
  const onSubmit = useCallback(
    (data: { private: boolean; title: string; content: string }) => {
      const { title, content: body } = data;
      mutate({ title, body });
    },
    [mutate],
  );

  useEffect(() => {
    if (isFetching && create) {
      setCreation(!create);
    }
  }, [create, isFetching]);

  if(error) {
    toast.error(error.message, toastConfig);
  }

  return (
    <React.Fragment>
      <ToastContainer hideProgressBar={false} closeOnClick rtl={false} />
      <Button disabled={isFetching === 1 || status === 'loading'} style={{ marginBottom: 10 }} onClick={onSetCreation}>
        Crée un nouveau post
      </Button>
      {create && (
        <Paper style={{ padding: 10, marginBottom: 10 }}>
          <form
            // @ts-ignore
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2} direction="column">
              <Grid item>
                <TextField type="text" fullWidth placeholder="Titre" inputRef={register} name="title" />
              </Grid>
              <Grid item>
                <TextField
                  type="text"
                  fullWidth
                  multiline
                  placeholder="Contenue"
                  inputRef={register}
                  name="content"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  label="Privé"
                  control={<Checkbox placeholder="Privé" name="private" inputRef={register} />}
                />
              </Grid>
              <Grid item>
                <Button disabled={status === 'loading'} type="submit">Valider</Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </React.Fragment>
  );
}
