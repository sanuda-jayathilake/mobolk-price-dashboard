import React, { Component } from "react";
import SearchView from "./SearchPhoneView";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { TextField, Button } from "@material-ui/core";
import { store } from "react-notifications-component";
import ClipLoader from "react-spinners/ClipLoader";
import "./Search.css";
import { displayNotification } from "../../components/Notifications/Notif";
import Headers from "../../Headers";

let modificationList = [];
const api = new WooCommerceRestApi({
  url: "https://mobo.lk/",
  consumerKey: "ck_209e539f8c7b35f06425835f12859a1e7c179a94",
  consumerSecret: "cs_e0fb2bb26b80e3422628ae942e4989215117b983",
  version: "wc/v3",
  queryStringAuth: true,
});

class SearchViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      searchQuery: "",
      modifiedList: [],
      isAuthorized: false,
      isSearchEmpty: false
    };
  }
  componentDidMount() {
    if (sessionStorage.getItem("AUTHORIZATION") === "SUCCESS") {
      this.setState({ isAuthorized: true });
      api
        .get("products", {
          per_page: 100,
        })
        .then((response) => {
          // Successful request
          this.setState({ productData: response.data });
        })
        .catch((error) => {
          // Invalid request, for 4xx and 5xx statuses
        });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.handleSearchResult();
    }
  }
  addToList = (productId, variationId, price, option, productName, stockStatus) => {
    modificationList.push({
      productId: productId,
      variationId: variationId,
      price: price,
      attribute: option,
      productName: productName,
      stockAvailability: stockStatus
    });
    this.setState({ modifiedList: modificationList });
  };
  handleSearchResult = () => {
    let searchResult = [];
    const { searchQuery, productData } = this.state;
    const match = productData.length
      ? productData.filter((data) =>
          data.name.toLowerCase().includes(searchQuery)
        )
      : null;
    // const { id } = match;

    if (match !== null) {
      // eslint-disable-next-line no-unused-expressions
      match.length
        ? match.map((match) => {
            searchResult.push({
              name: match.name,
              id: match.id,
              price: match.price,
            });
          })
        : null;
    }
    return searchResult;
  };
  triggerVariationEndPOint = (modifiedObjectList) => {
    modifiedObjectList.map((item) => {
      const { productId, variationId, price, productName, attribute, stockAvailability } = item;
      api
        .put(`products/${productId}/variations/${variationId}`, {
          regular_price: price,
          stock_status: stockAvailability
        })
        .then((response) => {
          displayNotification("success", productName, attribute);

          // Successful request
        })
        .catch((error) => {
          // Invalid request, for 4xx and 5xx statuses
          displayNotification("danger", productName, attribute);
        });
    });
  };
  handleSearchQuery = (e) => {
    this.setState({ searchQuery: e.target.value });
    if(e.target.value === ""){
      this.setState({isSearchEmpty: true})
    }
    else{
      this.setState({isSearchEmpty: false})
    }
  };
  removeItemFromTheList = (id, list) => {
    const filteredArray = list.filter((item) => item.variationId !== id);
    modificationList = [];
    modificationList = filteredArray;
    this.setState({ modifiedList: modificationList });
  };
  render() {
    // const result = this.handleSearchResult();
    const { modifiedList, productData, isAuthorized, isSearchEmpty } = this.state;
    console.log("This is the state")
    if (productData.length && isAuthorized) {
      return (
        <Headers>
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: "150px",
              paddingTop: "50px",
            }}
          >
            <div>
              <div className="inputContainer">
                <TextField
                  id="standard-basic"
                  // label={obj.price}
                  onChange={this.handleSearchQuery}
                  placeholder="Search Product..."
                />
              </div>
              <div style={{ paddingTop: "10px" }}>
                {this.handleSearchResult().length
                  ? this.handleSearchResult().map((res) => (
                      <SearchView
                        onChange={this.handleSearchQuery}
                        result={res}
                        addToList={this.addToList}
                        isSearchEmpty={isSearchEmpty}
                      />
                    ))
                  : null}
              </div>
            </div>
            <div style={{ paddingLeft: "20px" }}>
              {modifiedList.length
                ? modifiedList.map((item) => (
                    <div
                      style={{
                        display: "flex",
                        border: "solid 1px black",
                        padding: "10px",
                        borderRadius: "8px",
                        backgroundColor: "#dbf3f3",
                        marginBottom: "5px",
                        transition: "0.6s",
                        width: "330px",
                      }}
                    >
                      <div style={{ flex: 11 }}>
                        <div>Product Name: {item.productName}</div>
                        <div>Attribute Name: {item.attribute}</div>
                        <div>Price: {item.price}</div>
                        <div>Stock Status: {item.stockAvailability}</div>
                      </div>
                      <div
                        style={{ flex: 1, cursor: "pointer" }}
                        onClick={() =>
                          this.removeItemFromTheList(
                            item.variationId,
                            modifiedList
                          )
                        }
                      >
                        &#10006;
                      </div>
                    </div>
                  ))
                : null}
              <Button
                size="small"
                style={{
                  backgroundColor: "#21B0CA",
                  color: "white",
                  // position: "absolute",
                  // left: "350px"
                }}
                onClick={() => this.triggerVariationEndPOint(modifiedList)}
              >
                Update Prices
              </Button>
            </div>
          </div>
        </Headers>
      );
    } else if (!isAuthorized) {
      return <h1>Page Not Found</h1>;
    } else {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40px",
          }}
        >
          <ClipLoader color="#21B0CA" loading={true} size={150} />
        </div>
      );
    }
    return null;
  }
}
export default SearchViewContainer;
