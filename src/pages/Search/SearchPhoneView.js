import { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import SearchVariationView from "./SearchVariationView";

const SearchView = ({ onChange, result, addToList, isSearchEmpty }) => {
  const api = new WooCommerceRestApi({
    url: "https://mobo.lk/",
    consumerKey: "ck_209e539f8c7b35f06425835f12859a1e7c179a94",
    consumerSecret: "cs_e0fb2bb26b80e3422628ae942e4989215117b983",
    version: "wc/v3",
    queryStringAuth: true
  });

  const [variationData, setVariationData] = useState([]);
  const [modifiedData, setModifiedData] = useState([]);
  const [isPriceUpdated, setPriceUpdated] = useState(false);

  useEffect(() => {
    displayVariations()
  }, [isSearchEmpty])


  const getVariationData = (object) => {
    const { name, id } = object;
    api
      .get(`products/${id}/variations`)
      .then((response) => {
        // Successful request
        storeVariationData(response.data);
        setVariationData({ variationData: response.data });
      })
      .catch((error) => {
        // Invalid request, for 4xx and 5xx statuses
      });
  };
  const displayVariations = () =>{
    if(!isSearchEmpty){
      const emptyArray = []
      setVariationData({variationData: emptyArray})
    }
  } 
  const indicatePriceUpdated = (boolean) => {
    setPriceUpdated({ isPriceUpdated: boolean });
  };
  const storeVariationData = (object) => {
    let storage = [];
    object.map((data) => {
      const { id, price } = data;
      storage.push({
        variationId: id,
        variationPrice: price
      });
      setModifiedData({ modifiedData: storage });
    });
  };
  const getAttributeNames = (data) => {
    const { variationData } = data;
    const { attributes } = variationData;
    const { option } = attributes[0];
    // return option;
  };
  // displayVariations()
  const variations = variationData.variationData;
  return (
    <div>
      <div
        style={{
          padding: "15px",
          border: "solid 1px navy",
          borderRadius: "5px",
          width: "1030px"
          // display: "flex"
        }}
      >
        <div style={{ display: "flex" }}>
          <div>{result.name}</div>
          <div>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              style={{
                backgroundColor: "#21B0CA",
                position: "absolute",
                left: "830px"
              }}
              onClick={() => {
                getVariationData(result);
              }}
            >
              Add
            </Button>
          </div>
        </div>
        <div>
          {variations !== undefined && variations !== []
            ? variations.map((data) => (
                <SearchVariationView
                  variations={data}
                  isPriceUpdated={setPriceUpdated}
                  productId={result.id}
                  productName={result.name}
                  regularPrice={data.price}
                  addToList={addToList}
                  stockAvailability={data.stock_status}
                  display={variations !== undefined ? true : false}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
export default SearchView;
