import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ErrorMessageTimeout } from "../../components/ErrorMessage/ErrorMessage";
import { OrdersInfo } from "./OrdersInfo/OrdersInfo";
import { Button } from "../../components/Button/Button";

import {
  // clearOrderResult,
  // clearOrders,
  // getOrdersBy,
  redirectTo,
} from "../../store/actions/main";
import EmailSearchForm from "./EmailSearchForm/EmailSearchForm";

import "./InfoPage.scss";

const InfoPage = () => {
  const { orderResult, orders } = useSelector((store) => store.main);
  const [searchedString, setSearchedString] = useState("");
  const dispatch = useDispatch();

  const handleSearchSubmit = ({ searchString }) => {
    setSearchedString(searchString);
    alert (' dispatch(getOrdersBy({ email: searchString }))')
  };

  const handleBackToForm = (e) => {
    e.preventDefault();
    // dispatch(clearOrderResult());
    dispatch(redirectTo("/masters/preorder"));
  };

  return (
    <div className="infoPage">
      <ErrorMessageTimeout showTime={5000} />
      {orderResult && (
        <div className="orders-info">
          <h2>Congratulations! New order registered!</h2>
          <OrdersInfo orders={[orderResult]} />
          {orderResult.isEmailSent && (
            <h3>(order information was also sent to email)</h3>
          )}
          <Button onClick={handleBackToForm}>Back to form</Button>
        </div>
      )}

      {orders && (
        <div className="orders-info">
          <h2>We've found the next orders with e-mail "{searchedString}":</h2>
          <OrdersInfo orders={orders} />
          <Button
            className = "orders-info__clear-button"
            onClick={() => {
              alert ('dispatch(clearOrders());')
            }}
          >
            Clear information
          </Button>
        </div>
      )}

      {!orderResult && (
        <div className="infoPage__search-email">
          <EmailSearchForm onSubmit={handleSearchSubmit} />
        </div>
      )}
    </div>
  );
};

export default InfoPage;
