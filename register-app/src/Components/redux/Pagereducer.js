import { ADD_STATE } from "./actions";

const initialState = {
  name: "",
  Email: "",
  address: "",
  phoneNumber: "",
  birthdate: "",
  gender: "",
  companyName: "",
  CIN: "",
  productCode: "",
  quantity: "",
  orderNumber: "",
  paymentMethod: "",
  membershipLevel: "",
  subscriptionType: "",
  registrationDate: "",
  trackingNumber: "",
  shipmentStatus: "",
  customerFeedback: "",
  rating: "",
};

const pageReducer = (state = initialState, action) => {
  switch (action?.type) {
    case ADD_STATE:
      const data1 = action.data;
      return {
        ...state,
        ...data1,
      };
    default:
      return state;
  }
};
export default pageReducer;
