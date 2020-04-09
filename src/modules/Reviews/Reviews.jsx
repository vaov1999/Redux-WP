import React, { useEffect } from 'react';
import './reviews.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getReviewsAction } from './reviewsReducer';


export function Reviews() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(getReviewsAction()), []);
  const { reviews, isLoading } = useSelector(((state) => state.reviewsReducer));

  if (isLoading) {
    return (<LinearProgress className="todo__spinner" />);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="author">Author</TableCell>
              <TableCell className="review">Review</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Updated at</TableCell>
              <TableCell>Is Shown</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map(({
              author, review, createdAt, updatedAt, isVisible,
            }) => (
              <TableRow key={Math.random()}>
                <TableCell className="author">{author}</TableCell>
                <TableCell className="review">{review}</TableCell>
                <TableCell>{createdAt}</TableCell>
                <TableCell>{updatedAt}</TableCell>
                <TableCell>
                  <Switch
                    color="primary"
                    checked={isVisible}
                    value={isVisible}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
