import { Add, CloudUpload, Inventory, NavigateNext } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getProductDetails,
  updateProduct,
  clearErrors,
} from '../../actions/productActions';
import Sidebar from '../../components/Admin/Sidebar';
import MetaData from '../../components/MetaData';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { id } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    'Laptop',
    'Mobile',
    'Bottom',
    'Tops',
    'Attire',
    'Camera',
    'Footwear',
    'Electronics',
  ];

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Product updated successfully');
      navigate('/admin/products');
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [alert, dispatch, error, updateError, isUpdated, navigate, id, product]);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });

    console.log(imagesPreview);
  };

  const removeImage = (imgToRemove) => {
    setImagesPreview((img) => img.filter((i) => i !== imgToRemove));
    setImages((img) => img.filter((i) => i !== imgToRemove));
  };

  const handleSubmit = () => {
    let productData;
    if (images.length > 0) {
      productData = { name, price, category, stock, images, description };
    } else {
      productData = { name, price, category, stock, description };
    }

    console.log(productData);

    dispatch(updateProduct(id, productData));
  };

  return (
    <>
      <MetaData title="Update Product" />
      <Stack direction="row" gap={1} mt={1}>
        <Sidebar tab="products" />

        <Stack flex={4}>
          <Paper sx={{ minHeight: '90vh', padding: '20px' }}>
            <Typography variant="subtitle2" fontSize={22} mb={2}>
              Edit Product
            </Typography>

            <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
              <Link to="/admin/products">Products</Link>
              <Typography variant="subtitle2">ID: {id}</Typography>
            </Breadcrumbs>

            <Stack direction="row" mt={1} gap={3}>
              <Stack flex={1}>
                <Typography variant="subtitle2" mt={2} mb={1}>
                  Product Name
                </Typography>
                <TextField
                  size="small"
                  placeholder="E.g. Nike Air Force"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                />

                <Stack direction="row" gap={1}>
                  <Stack flex={3}>
                    <Typography variant="subtitle2" mt={2} mb={1}>
                      Category
                    </Typography>
                    <Select
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      size="small"
                    >
                      <MenuItem value="">
                        <em>Select Category</em>
                      </MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>

                  <Stack flex={2}>
                    <Typography variant="subtitle2" mt={2} mb={1}>
                      Stock
                    </Typography>
                    <OutlinedInput
                      size="small"
                      type="Number"
                      startAdornment={
                        <InputAdornment position="start">
                          <Inventory />
                        </InputAdornment>
                      }
                      required
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </Stack>
                </Stack>

                <Typography variant="subtitle2" mt={2} mb={1}>
                  Price
                </Typography>
                <OutlinedInput
                  size="small"
                  type="Number"
                  startAdornment={
                    <InputAdornment position="start">₹</InputAdornment>
                  }
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <Typography variant="subtitle2" mt={2} mb={1}>
                  Description
                </Typography>
                <TextField
                  size="small"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={6}
                  required
                />
              </Stack>

              <Stack flex={1.3}>
                <Typography variant="subtitle2" mt={2} mb={1}>
                  Product Images
                </Typography>

                <Box
                  p={1}
                  sx={{
                    marginTop: '10px',
                    border: '2px dashed #cccccc',
                    borderRadius: '10px',
                    height: '300px',
                  }}
                >
                  <Stack mb={1}>
                    <Typography variant="subtitle2" color="gray" mb={1}>
                      Old Images
                    </Typography>
                    <Stack
                      direction="row"
                      columnGap={1}
                      rowGap={0}
                      flexWrap="wrap"
                    >
                      {oldImages &&
                        oldImages.map((img) => (
                          <Box
                            key={img}
                            component="span"
                            sx={{
                              width: '100px',
                              height: '100px',
                              border: '1px solid #ececec',
                              borderRadius: '10px',
                              backgroundColor: '#f7f7f7',
                              overflow: 'hidden',
                              cursor: 'pointer',
                            }}
                            // onClick={() => removeImage(img)}
                          >
                            <img
                              src={img.url}
                              alt="Product"
                              loading="lazy"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                              }}
                            />
                          </Box>
                        ))}
                    </Stack>
                  </Stack>

                  <Divider />

                  <Typography variant="subtitle2" color="gray" mt={1} mb={1}>
                    {imagesPreview.length > 0
                      ? 'Click on image to remove'
                      : 'Click to add new image (Old ones will be removed)'}
                  </Typography>

                  <Stack
                    direction="row"
                    columnGap={1}
                    rowGap={0}
                    flexWrap="wrap"
                  >
                    {imagesPreview.map((img) => (
                      <Box
                        key={img}
                        component="span"
                        sx={{
                          width: '100px',
                          height: '100px',
                          border: '1px solid #ececec',
                          borderRadius: '10px',
                          backgroundColor: '#f7f7f7',
                          overflow: 'hidden',
                          cursor: 'pointer',
                        }}
                        onClick={() => removeImage(img)}
                      >
                        <img
                          src={img}
                          alt="Product"
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    ))}

                    <Button
                      component="label"
                      sx={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '8px',
                      }}
                    >
                      {imagesPreview.length > 0 ? (
                        <Add fontSize="large" />
                      ) : (
                        <CloudUpload fontSize="large" />
                      )}
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleImages}
                        multiple
                      />
                    </Button>
                  </Stack>
                </Box>

                <Stack direction="row" mt={5} gap={2} justifyContent="flex-end">
                  <LoadingButton
                    loading={loading}
                    onClick={handleSubmit}
                    sx={{ width: 'fit-content' }}
                    variant="contained"
                  >
                    Update Product
                  </LoadingButton>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </>
  );
};

export default UpdateProduct;
