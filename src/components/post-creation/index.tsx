import { useForm } from 'react-hook-form';
import { useIsFetching, useMutation, queryCache } from 'react-query';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useState, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';

import createPost from '../../async/createPost';
import { usePaginationContext } from '../../context/pagination-context';

export default function PostCreation() {
  const {  pagination } = usePaginationContext();
  const { register, handleSubmit } = useForm();
  // @ts-ignore
  const [ mutate ] = useMutation(createPost, {
    onSuccess: () => queryCache.refetchQueries(['posts', pagination?.page, pagination?.limit]),
    onError: error => toast.error(error.message),
  });
  const [create, setCreation] = useState(false);
  const isFetching = useIsFetching();
  const onSetCreation = useCallback(() => {
    setCreation(!create);
  }, [create])
  const onSubmit = useCallback((data: { private: boolean; title: string; content: string;  }) => {
    const { title, content: body } = data;
    onSetCreation()
    mutate({ title, body })
  }, [onSetCreation, mutate]);
  
  return (
    <React.Fragment>
      <Button disabled={isFetching === 1} style={{ marginBottom: 10 }} onClick={onSetCreation} >Crée un nouveau post</Button>
      {create && (
        <Paper style={{ padding: 10, marginBottom: 10 }}>
          <form 
            // @ts-ignore
            onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <TextField type="text" fullWidth placeholder="Titre" inputRef={register}  name="title" />
              </Grid>
              <Grid item>
                <TextField type="text" fullWidth multiline placeholder="Contenue" inputRef={register}  name="content" />
              </Grid>
              <Grid item>
                <FormControlLabel label="Privé" control={<Checkbox placeholder="Privé" name="private" inputRef={register} />} />
              </Grid>
              <Grid item>
                <Button type="submit">Valider</Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </React.Fragment>
  );
}