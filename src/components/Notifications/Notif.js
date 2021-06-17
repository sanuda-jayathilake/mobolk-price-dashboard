import { store } from "react-notifications-component";

export const displayNotification = (
  notificationType,
  productName,
  attribute
) => {
  store.addNotification({
    title: "Product has been updated",
    message: `${productName} ${attribute} has been updated`,
    type: notificationType, //success, danger
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  });
};

export const displayMessage = (
  notificationType,
  message
) => {
  store.addNotification({
    title: "Error",
    message: message,
    type: notificationType, //success, danger
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  });
};

