import { Add, CloudUpload, Inventory } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewProduct, clearErrors } from '../../actions/productActions';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
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

  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Product created successfully');
      navigate('/admin/dashboard');
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [alert, dispatch, error, success, navigate]);

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

  const clear = () => {
    setName('');
    setCategory('');
    setPrice(0);
    setDescription('');
    setStock(0);
    setImages([]);
    setImagesPreview([]);
  };

  const handleSubmit = () => {
    const productData = {
      name,
      price,
      category,
      stock,
      images,
      description,
    };

    console.log(productData);

    dispatch(addNewProduct(productData));
  };

  return (
    <Stack direction="row" mt={2} gap={3}>
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
          startAdornment={<InputAdornment position="start">₹</InputAdornment>}
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

        {imagesPreview.length < 1 ? (
          <Box
            sx={{
              marginTop: '10px',
              border: '2px dashed #cccccc',
              borderRadius: '10px',
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <CloudUpload fontSize="large" color="primary" />
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImages}
                multiple
              />
            </IconButton>
            <Typography variant="subtitle2" color="primary">
              Click here to upload product images
            </Typography>
          </Box>
        ) : (
          <Box
            p={1}
            sx={{
              marginTop: '10px',
              border: '2px dashed #cccccc',
              borderRadius: '10px',
              height: '300px',
            }}
          >
            <Typography variant="subtitle2" color="gray" mb={1}>
              Click on image to remove
            </Typography>
            <Stack direction="row" columnGap={1} rowGap={0} flexWrap="wrap">
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
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              ))}

              <Button
                component="label"
                sx={{ width: '100px', height: '100px', borderRadius: '8px' }}
              >
                <Add fontSize="large" />
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
        )}

        <Stack direction="row" mt={5} gap={2} justifyContent="flex-end">
          <LoadingButton
            loading={loading}
            onClick={handleSubmit}
            sx={{ width: 'fit-content' }}
            variant="contained"
          >
            Add Product
          </LoadingButton>
          <Button variant="outlined" color="error" onClick={clear}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NewProduct;
