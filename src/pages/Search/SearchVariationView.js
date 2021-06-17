import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useState, useEffect } from "react";

const SearchVariationView = ({
  variations,
  isPriceUpdated,
  productId,
  addToList,
  productName,
  regularPrice,
  stockAvailability,
  display
}) => {
  const [modifiedProducts, setModifiedProducts] = useState([]);
  const [price, setPrice] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const { attributes, id } = variations;
  const [wrapper] = attributes;
  const { option } = wrapper;

  // useEffect(() => {
  //   setStockStatus({stockStatus: stockAvailability})
  // },[])

  const handlInput = (value) => {
    const inputPrice = value;
    setPrice({ price: inputPrice });
  };
  const handleDropDownChange = (value) => {
    setStockStatus({ stockStatus: value });
  };
  if (display) {
    return (
      <div style={{ lineHeight: "40px", display: "flex" }}>
        <div style={{ paddingRight: "20px" }}>{option}</div>
        <TextField
          id="standard-basic"
          label={regularPrice}
          onChange={(e) => handlInput(e.target.value)}
        />
        <div style={{ paddingLeft: "20px" }}>
          <Select
            labelId="label"
            id="select"
            value={
              stockStatus === "" ? stockAvailability : stockStatus.stockStatus
            }
            onChange={(e) => handleDropDownChange(e.target.value)}
            style={
              stockStatus.stockStatus === "instock" ||
              stockAvailability === "instock"
                ? {
                    backgroundColor: "green",
                    paddingLeft: "10px",
                    color: "white",
                    textAlign: "center",
                    marginRight: "20px",
                    position: "absolute",
                    left: "430px",
                    fontWeight: "bold",
                  }
                : {
                    backgroundColor: "#e54040",
                    paddingLeft: "10px",
                    color: "white",
                    textAlign: "center",
                    position: "absolute",
                    left: "430px",
                    fontWeight: "bold",
                  }
            }
          >
            <MenuItem value="instock">In Stock</MenuItem>
            <MenuItem value="outofstock">Out of Stock</MenuItem>
          </Select>
        </div>
        <div style={{ paddingLeft: "10px" }}>
          <Button
            size="small"
            style={{
              backgroundColor: "#21B0CA",
              color: "white",
              position: "absolute",
              left: "650px",
            }}
            onClick={() => {
              addToList(
                productId,
                id,
                price !== "" ? price.price : regularPrice,
                option,
                productName,
                stockStatus === "" ? stockAvailability : stockStatus.stockStatus
              );
            }}
          >
            Add To List
          </Button>
        </div>
      </div>
    );
  }
  else return null
};
export default SearchVariationView;
