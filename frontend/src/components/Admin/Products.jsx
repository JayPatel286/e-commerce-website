import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import {
  clearErrors,
  deleteProduct,
  getAdminProducts,
} from '../../actions/productActions';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Product ID',
      flex: 0.5,
      cellClassName: 'blue',
    },
    {
      field: 'image',
      headerName: 'Image',
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Box
            component="span"
            sx={{
              py: 0.5,
            }}
          >
            <img
              src={params.value}
              alt={params.getValue(params.id, 'name')}
              width={70}
              height={70}
              style={{ objectFit: 'contain' }}
            />
          </Box>
        );
      },
      sortable: false,
    },
    {
      field: 'name',
      headerName: 'Product',
      flex: 0.4,
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 0.3,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.2,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      flex: 0.25,
      renderCell: (params) => {
        return params.getValue(params.id, 'stock') > 0 ? (
          <Typography variant="subtitle2">
            {params.getValue(params.id, 'stock')}
          </Typography>
        ) : (
          <Chip
            label="Out of stock"
            size="small"
            variant="outlined"
            color="error"
          />
        );
      },
      // align: 'center',
    },
    {
      flex: 0.2,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}>
              <IconButton color="primary">
                <Edit />
              </IconButton>
            </Link>
            <IconButton
              color="error"
              onClick={() => handleDelete(params.getValue(params.id, 'id'))}
            >
              <Delete />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = [];
  products &&
    products.forEach((product) => {
      rows.push({
        id: product._id,
        name: product.name,
        image: product.images[0].url,
        category: product.category,
        price: `₹ ${product.price.toLocaleString()}`,
        stock: product.stock,
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
      alert.success('Product deleted successfully');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProducts());
  }, [error, alert, dispatch, deleteError, isDeleted]);

  return (
    <>
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
          rowsPerPageOptions={[5]}
          getRowHeight={() => 'auto'}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
          autoHeight
        />
      )}
    </>
  );
};

export default Products;
