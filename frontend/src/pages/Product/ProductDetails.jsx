import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Add,
  AddShoppingCart,
  NavigateBefore,
  NavigateNext,
  ProductionQuantityLimits,
  RateReview,
  Remove,
} from '@mui/icons-material';
import { useAlert } from 'react-alert';
import {
  clearErrors,
  getProductDetails,
  submitNewReview,
} from '../../actions/productActions';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import { addItemsToCart } from '../../actions/cartActions';
import MetaData from '../../components/MetaData';
import ReviewCard from '../../components/ReviewCard';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const handleClose = () => {
    setRating(0);
    setComment('');
    setOpen(false);
  };

  const submitReviewHandller = () => {
    const reviewData = {
      rating: rating,
      comment: comment,
      productId: id,
    };

    dispatch(submitNewReview(reviewData));
    handleClose();
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success(success);
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));

    alert.success('Item added to cart');

    navigate('/cart');
  };

  return (
    <>
      <MetaData title={product.name} />
      {loading ? (
        <Stack
          sx={{ minHeight: '90vh' }}
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <Container sx={{ marginTop: '50px' }}>
            <Stack direction="row" gap={20}>
              <Carousel
                NextIcon={<NavigateNext />}
                PrevIcon={<NavigateBefore />}
                sx={{
                  width: '400px',
                  height: '450px',
                }}
              >
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      src={item.url}
                      alt={`${i} Slide`}
                      key={item.url}
                      style={{
                        width: '400px',
                        height: '400px',
                        objectFit: 'contain',
                      }}
                    />
                  ))}
              </Carousel>

              <Stack>
                <Typography variant="h3">{product.name}</Typography>
                <Stack direction="row" gap={1}>
                  <Rating
                    value={product.rating}
                    precision={0.5}
                    readOnly
                    color="primary"
                  />
                  <Typography variant="subtitle2">
                    ({product.numOfReviews} reviews)
                  </Typography>
                </Stack>

                <Typography variant="subtitle1" mt={2}>
                  {product.description}
                </Typography>

                <Typography color="goldenrod" mt={2} variant="h4">
                  ₹ {product.price && product.price.toLocaleString()}
                </Typography>

                <Stack direction="row" gap={3} mt={2} alignItems="center">
                  <Typography variant="h6">Quantity</Typography>

                  <Stack direction="row">
                    <Stack direction="row">
                      <IconButton
                        color="primary"
                        style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
                        onClick={() => {
                          if (quantity > 1) setQuantity((prev) => prev - 1);
                        }}
                      >
                        <Remove />
                      </IconButton>
                      <input
                        type="number"
                        readOnly
                        value={quantity}
                        style={{
                          border: 'none',
                          outline: 'none',
                          background: 'transparent',
                          width: '40px',
                          textAlign: 'center',
                          fontSize: '18px',
                        }}
                      />
                      <IconButton
                        color="primary"
                        style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
                        onClick={() => {
                          if (quantity < product.stock)
                            setQuantity((prev) => prev + 1);
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Stack>

                <Button
                  sx={{ width: 'max-content', marginTop: '15px' }}
                  variant="contained"
                  color="warning"
                  disabled={product.stock < 1}
                  onClick={addToCartHandler}
                  startIcon={
                    product.stock < 1 ? (
                      <ProductionQuantityLimits />
                    ) : (
                      <AddShoppingCart />
                    )
                  }
                >
                  Add To Cart
                </Button>

                <Typography
                  mt={2}
                  style={{
                    background:
                      product.stock > 0
                        ? 'rgba(0,255,0,0.3)'
                        : 'rgba(255,0,0,0.3)',
                    width: 'fit-content',
                    borderRadius: '5px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    padding: '2px 8px',
                  }}
                >
                  {product.stock > 0 ? 'In Stock' : 'Out Of Stock'}
                </Typography>

                <Button
                  sx={{ width: 'max-content', marginTop: '30px' }}
                  variant="contained"
                  startIcon={<RateReview />}
                  onClick={() => setOpen(true)}
                >
                  Submit a Review
                </Button>
              </Stack>
            </Stack>
          </Container>

          <Dialog open={open} onClose={handleClose} maxWidth="lg">
            <DialogTitle>Submit a Review</DialogTitle>

            <DialogContent sx={{ minWidth: '500px' }}>
              <Stack gap={2}>
                <Rating
                  size="large"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                <TextField
                  multiline
                  label="Comment"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleClose} color="error">
                Cancel
              </Button>
              <Button variant="contained" onClick={submitReviewHandller}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <Container sx={{ marginTop: '50px' }}>
            <Typography variant="h4" textAlign={'center'}>
              Reviews
            </Typography>

            {product.reviews && product.reviews[0] ? (
              <Stack
                mt={5}
                direction="row"
                gap={5}
                justifyContent="center"
                flexWrap="wrap"
              >
                {product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </Stack>
            ) : (
              <Typography variant="h5" mt={3} textAlign={'center'}>
                No Reviews Yet
              </Typography>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default ProductDetails;
