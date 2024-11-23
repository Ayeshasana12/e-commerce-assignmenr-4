import { Button, ButtonGroup, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decreaseQuantity, increaseQuantity, removeItem } from "../../slices/products-app/productsSlices";
import DeleteIcon from '@mui/icons-material/Delete';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
const CartList = (props) => {
  const { open, toggleDrawer } = props;

  const { items } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const totalPrice = items?.length && items?.reduce(
    (sum, product) => sum + product?.price * product?.quantity,0);



  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartItemsArr = localStorage.getItem("cartList");
    const parseCartItemsArr = JSON.parse(cartItemsArr);

    setCartItems(parseCartItemsArr);
  }, []);

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box className="position-relative" sx={{ height: "100vh" }}>
          <Box
            sx={{ width: 420 }} role="presentation" >
            <Typography sx={{ backgroundColor: "#0AAD0A" }} className="text-center p-2 fw-semibold 
            text-white" variant="h6">Cart Items</Typography>
            {!items?.length ? <Typography sx={{ Color: "#0AAD0A" }}
              className="text-center mt-5 fw-semibold " variant="h5" >Nothing Show Item?
              <Box
                className="text-center mt-4 fw-semibold ">
                <ProductionQuantityLimitsIcon sx={{ color: "#0AAD0A", fontSize: "100px" }} />
              </Box> </Typography> : items?.map((item) => {
                return (
                  <Box className="d-flex justify-content-between align-items-center">
                    <div>
                      <img className="mt-3 shadow p-2 rounded-3" width="70px" src={item?.image} alt="" />
                      <span> {item?.title?.length
                        >= 15 ? `${item?.title?.slice(0, 11)}...`
                        : item?.title}</span>
                    </div>
                    <ButtonGroup size="small" variant="text" aria-label="Basic button group">
                      <Button sx={{ color: "#0AAD0A" }}>
                        {<RemoveIcon
                          onClick={() => dispatch(decreaseQuantity(item))} />}</Button>
                      <Button sx={{ color: "#0AAD0A" }}>{item.quantity}</Button>
                      <Button sx={{ color: "#0AAD0A" }}>
                        {<AddIcon onClick={() => dispatch(increaseQuantity(item))} />}</Button>
                    </ButtonGroup>
                    <span>{item?.price}</span>

                    <Button sx={{ color: "#0AAD0A" }}>
                      <DeleteIcon onClick={() => dispatch(removeItem(item))} />
                    </Button>

                  </Box>
                );
              })}
          </Box>
          <Box sx={{ backgroundColor: "#0AAD0A" }} className="position-absolute bottom-0 d-flex
           justify-content-between text-white p-3 rounded-top-3 w-100">
            <Typography variant="body1">Total Price</Typography>
            <Typography variant="body1">${totalPrice}</Typography>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};


export default CartList;
