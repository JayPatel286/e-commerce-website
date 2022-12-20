import {
  Avatar,
  CircularProgress,
  IconButton,
  Paper,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import MetaData from '../../components/MetaData';
import Sidebar from '../../components/Admin/Sidebar';
import {
  clearErrors,
  deleteReview,
  getAllReviews,
} from '../../actions/productActions';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';

const AdminReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, reviews, error } = useSelector(
    (state) => state.adminReviews
  );

  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.reviews
  );

  const columns = [
    {
      field: 'id',
      headerName: 'Review ID',
      flex: 0.4,
      cellClassName: 'blue',
    },
    {
      field: 'review',
      headerName: 'Review',
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Stack direction="row" gap={1}>
            <Avatar
              src={params.getValue(params.id, 'reviewer_img')}
              alt={params.getValue(params.id, 'reviewer')}
            />

            <Stack>
              <Typography variant="subtitle2" fontSize="14px">
                {params.getValue(params.id, 'reviewer')}
              </Typography>
              <Typography variant="subtitle2" fontSize="12px" color="gray">
                {params.getValue(params.id, 'comment')}
              </Typography>
            </Stack>
          </Stack>
        );
      },
    },
    {
      field: 'product',
      headerName: 'Product',
      flex: 0.4,
      sortable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" gap={1}>
            <img
              src={params.getValue(params.id, 'product_img')}
              alt={params.getValue(params.id, 'product')}
              style={{
                width: 60,
                height: 60,
                objectFit: 'contain',
                padding: '5px 0',
              }}
            />
            <Typography variant="subtitle2">
              {params.getValue(params.id, 'product')}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: 'rating',
      headerName: 'Rating',
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="subtitle2" fontSize="20px">
              {params.getValue(params.id, 'rating')}
            </Typography>
            <Rating
              value={params.getValue(params.id, 'rating')}
              readOnly
              size="small"
            />
          </Stack>
        );
      },
    },
    {
      flex: 0.1,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              color="error"
              onClick={() =>
                handleDelete(
                  params.getValue(params.id, 'id'),
                  params.getValue(params.id, 'product_id')
                )
              }
            >
              <Delete />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = [];
  reviews &&
    reviews.forEach((review, index) => {
      rows.push({
        id: review._id,
        reviewer: review.reviewer,
        reviewer_img: review.reviewer_img,
        comment: review.comment,
        rating: review.rating,
        product: review.product,
        product_id: review.product_id,
        product_img: review.product_img,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success('Review deleted successfully');
      dispatch({ type: DELETE_REVIEW_RESET });
    }

    dispatch(getAllReviews());
  }, [error, alert, dispatch, deleteError, isDeleted]);

  const handleDelete = (id, productId) => {
    dispatch(deleteReview(id, productId));
  };

  return (
    <>
      <MetaData title="Admin Reviews" />
      <Stack direction="row" gap={1} mt={1}>
        <Sidebar tab="reviews" />

        <Stack flex={4}>
          <Paper sx={{ minHeight: '90vh', padding: '20px' }}>
            <Typography variant="subtitle2" fontSize={22} mb={1}>
              Product Reviews
            </Typography>

            <Typography variant="subtitle2" fontSize={14} my={1} color="gray">
              In the product reviews section, you can review and manage all
              product reviews given by customers. You can view and delete any
              inappropriate review. Access to this area is limited. Only admins
              can reach.
            </Typography>

            {loading ? (
              <Stack
                sx={{ minHeight: '50%' }}
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress />
              </Stack>
            ) : (
              <DataGrid
                sx={{ marginTop: '20px' }}
                rows={rows}
                rowsPerPageOptions={[8]}
                getRowHeight={() => 'auto'}
                columns={columns}
                pageSize={8}
                disableSelectionOnClick
                autoHeight
              />
            )}
          </Paper>
        </Stack>
      </Stack>
    </>
  );
};

export default AdminReviews;
