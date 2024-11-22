import {
  Autocomplete,
  Box,
  Card,
  CircularProgress,
  Divider,
  Grid,
  Snackbar,
  SnackbarContent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./AllProduct.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Visibility from '@mui/icons-material/Visibility';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/add-cart/addCartSlices";
import { addProduct } from "../../slices/products-app/productsSlices";
import { ToastContainer, toast } from 'react-toastify';


function AllProduct() {
  const [cartList, setCartList] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [categoryOption, setCategoryOption] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState({});
  const [allProducts, setAllProducts] = useState([]);

  const { isToast } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  console.log(isToast, "toast");

  const cartHandler = (product) => {
    const isExist = cartList.find((cart) => cart.id === product.id);
    if (!isExist) {
      setCartList((prev) => [...prev, product]);
    } else {
      setOpenAlert(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const searchHandler = (event) => {
    if (event.target.value === "") {
    } else {
      const filteredArr = products?.filter((product) =>
        product?.name.toLowerCase().includes(event?.target?.value.toLowerCase()));

      setProducts(filteredArr);
      console.log(filteredArr);
    }
  };

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const products = await axios.get("https://fakestoreapi.com/products");

        if (products.status === 200) {

          setIsLoading(false);
          setProducts(products?.data);
          setAllProducts(products?.data);

          const filterCategories = products?.data?.map((product) => {
            return {
              label: product?.category,
              value: product?.category,
            };
          });

          const uniqueCategories = filterCategories.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.value === item.value)
          );

          setCategoryOption(uniqueCategories);

        } else {
          setIsLoading(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {

    let filteredProducts = allProducts.filter((product) =>
      product?.category === categoryFilter?.value);

    setProducts(filteredProducts)

    console.log(filteredProducts, 'filteredProducts');


  }, [categoryFilter]);

   useEffect(()=> {

    if(isToast){
      toast("Product Already Added!")
    }
   }, [isToast]);

  return (
    <>
      <ToastContainer />
      <Box className={"container mt-5 "}>
        <Autocomplete
          size="small"
          disablePortal
          options={categoryOption}
          onChange={(e, newValue) => {
            setCategoryFilter(newValue);

          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Categories" />}
        />

      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >

        <SnackbarContent
          style={{
            backgroundColor: "#bb2124",
          }}
          message={
            <Box>
              <span id="client-snackbar">Product Already Added to Cart List</span>
              <CloseIcon className="ms-5" onClick={handleClose} />
            </Box>
          }
        />
      </Snackbar>
      {isLoading ? (
        <Box className="text-center mt-5">
          <CircularProgress color="inherit" />
        </Box>
      ) : <Grid container className="container mt-5 ">
        {products?.map((product, index) => (

          <Grid item xs={12} md={3} mb={2}>
            <Card className=" shadow" key={product.id} sx={{
              padding: "20px ",
              width: "250px", border: "1px solid #0AAD0A"
            }}>
              <Box>
                <Box className="text-center">
                  <img
                    style={{ maxHeight: "140px", minHeight: "140px" }}
                    className="product-img products" width={100}
                    src={product.image} alt={product.name} />
                </Box>
                <Tooltip title={product?.title} placement="top">
                  <Typography className="mt-3 fw-semibold product-img" variant="body1">
                    {product?.title?.length
                      >= 22 ? `${product?.title?.slice(0, 18)}...`
                      : product?.title}
                  </Typography>

                </Tooltip>
                <Divider className="mt-2 " sx={{ borderColor: "#0AAD0A" }}
                  variant="fullWidth" />
                <Box className="d-flex justify-content-between mt-2">
                  <Tooltip className="product-img" title="product details">
                    <Visibility sx={{ color: "#0AAD0A" }} on onClick={() => {
                      navigate(`/product-details/${product?.id}`)
                    }} />
                  </Tooltip >
                  <Tooltip className="product-img" title="Add To Cart">
                    <AddShoppingCartIcon onClick={() => dispatch(addProduct(product))}
                      sx={{ color: "#0AAD0A" }} />
                  </Tooltip>
                  <Tooltip className="product-img" title="Add To Favorite">
                    <FavoriteIcon sx={{ color: "#0AAD0A" }} />
                  </Tooltip>

                </Box>
              </Box>
            </Card>
          </Grid>
        )
        )};

      </Grid>}
    </>
  );
}

export default AllProduct;











