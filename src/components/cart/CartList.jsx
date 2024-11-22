import { Button, ButtonGroup, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decreaseQuantity, increaseQuantity } from "../../slices/products-app/productsSlices";

const CartList = (props) => {
  const { open, toggleDrawer } = props;

  const { items } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  console.log(items, 'items');

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartItemsArr = localStorage.getItem("cartList");
    const parseCartItemsArr = JSON.parse(cartItemsArr);

    setCartItems(parseCartItemsArr);
  }, []);

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 420 }} role="presentation"
          
        >
          <Typography sx={{ backgroundColor: "#0AAD0A" }}
            className="text-center mt-3 
          rounded-4 text-white" variant="h6">Cart Items</Typography>
          {items?.map((item) => {
            return (
              <Box className="d-flex justify-content-between align-items-center">
                <div>
                  <img className="mt-3 shadow p-2 rounded-3" width="70px" src={item?.image} alt="" />
                  <span> {item?.title?.length
                    >= 15 ? `${item?.title?.slice(0, 11)}...`
                    : item?.title}</span>
                </div>
                <ButtonGroup size="small" variant="text" aria-label="Basic button group">
                  <Button sx={{color: "#0AAD0A"}}>{<RemoveIcon onClick={()=> dispatch(decreaseQuantity(item))} />}</Button>
                  <Button sx={{color: "#0AAD0A"}}>{item.quantity}</Button>
                  <Button sx={{color: "#0AAD0A"}}>
                    {<AddIcon onClick={()=> dispatch(increaseQuantity(item))} />}</Button>
                </ButtonGroup>
                <span>{item?.price}</span>
              </Box>
            );
          })}
        </Box>
      </Drawer>
    </div>
  );
};


export default CartList;
