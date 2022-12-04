import { createContext, useContext, useEffect, useState } from "react";
import { usePaymentMethodData } from "../hooks/usePaymentMethod";
export interface IFillDetailOrder {
  name: string;
  setName: (c: string) => void;
  //  email
  email: string;
  setEmail: (c: string) => void;
  // phonenumber
  phonenumber: string;
  setPhonenumber: (c: string) => void;
  // address
  address: string;
  setAddress: (c: string) => void;
  // payment method
  paymentMethod: { id: number; logo: string; name: string };
  handlePaymentMethod: (data: number) => void;
  // dropship
  dropship: { name: string; phonenumber: string };
  setDropship: (data: { name: string; phonenumber: string }) => void;

  // validation
  errorName: { status: boolean; message: string };
  setErrorName: (status: { status: boolean; message: string }) => void;
  // email
  errorEmail: { status: boolean; message: string };
  setErrorEmail: (c: { status: boolean; message: string }) => void;
  // phonenumber
  errorPhonenumber: { status: boolean; message: string };
  setErrorPhonenumber: (c: { status: boolean; message: string }) => void;
  // address
  errorAddress: { status: boolean; message: string };
  setErrorAddress: (c: { status: boolean; message: string }) => void;
  validate: boolean;
  setValidate: (c: boolean) => void;
}

export const FillDetailOrder = createContext<IFillDetailOrder>({
  name: "",
  setName: () => {},
  //   email
  email: "",
  setEmail: () => {},
  // phonenumber
  phonenumber: "",
  setPhonenumber: () => {},
  // address
  address: "",
  setAddress: () => {},

  // paymentMethod
  paymentMethod: { id: -1, logo: "", name: "" },
  handlePaymentMethod: () => {},

  dropship: { name: "", phonenumber: "" },
  setDropship: () => {},

  //  validation
  errorName: { status: true, message: "" },
  setErrorName: () => {},
  errorEmail: { status: true, message: "" },
  setErrorEmail: () => {},
  errorPhonenumber: { status: true, message: "" },
  setErrorPhonenumber: () => {},
  errorAddress: { status: true, message: "" },
  setErrorAddress: () => {},

  validate: false,
  setValidate: () => {},
});

export const useFillDetailOrderContext = () => useContext(FillDetailOrder);

export const FillDetailOrderContextProvider = ({ children }) => {
  // state
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phonenumber, setPhonenumber] = useState("");

  const [address, setAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState({
    id: -1,
    name: "",
    logo: "",
  });

  const [dropship, setDropship] = useState({
    name: "",
    phonenumber: "",
  });

  // validation
  const [errorName, setErrorName] = useState({
    status: true,
    message: "",
  });
  const [errorEmail, setErrorEmail] = useState({
    status: true,
    message: "",
  });
  const [errorPhonenumber, setErrorPhonenumber] = useState({
    status: true,
    message: "",
  });
  const [errorAddress, setErrorAddress] = useState({
    status: true,
    message: "",
  });
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    const formValidation =
      !errorName.status &&
      name.length > 0 &&
      !errorEmail.status &&
      email.length > 0 &&
      !errorPhonenumber.status &&
      phonenumber.length > 0 &&
      !errorAddress.status &&
      address.length > 0;
    setValidate(formValidation);
  }, [
    errorName.status,
    errorEmail.status,
    errorPhonenumber.status,
    errorAddress.status,
    name,
    address,
    email,
    phonenumber,
  ]);

  // payment
  const paymentMethodData = usePaymentMethodData();
  const handlePaymentMethod = (data: number) => {
    const filterData = paymentMethodData.filter((item) => item.id === data)[0];
    setPaymentMethod(filterData);
  };

  return (
    <FillDetailOrder.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        phonenumber,
        setPhonenumber,
        address,
        setAddress,
        paymentMethod,
        handlePaymentMethod,
        dropship,
        setDropship,

        errorName,
        setErrorName,
        errorEmail,
        setErrorEmail,
        errorPhonenumber,
        setErrorPhonenumber,
        errorAddress,
        setErrorAddress,
        validate,
        setValidate,
        // checkValidation,
      }}
    >
      {children}
    </FillDetailOrder.Provider>
  );
};
