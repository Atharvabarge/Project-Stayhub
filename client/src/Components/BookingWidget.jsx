import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
// import {ReactTooltip} from "react-tooltip";
import PhoneInput from 'react-phone-number-input';
import "react-phone-number-input/style.css";

const BookingWidget = (props) => {
  const { place } = props;

  BookingWidget.propTypes = {
    place: PropTypes.object,
  };

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [numGuests, setNumGuests] = useState(0);
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const [redirect, setRedirect] = useState("");

  const {user} = useContext(UserContext);

  const dateFormat = "dd-MM-yyyy";

  useEffect(() => {

    if(user) {
      setName(user.name)
    }

  } , [user])

  let numberOfNights = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  // function convertDate(date) {
  //   if (date instanceof Date) {
  //     const day = date.getDate();
  //     const month = date.getMonth() + 1;
  //     const year = date.getFullYear();
  //     return `${day}-${month < 10 ? "0" + month : month}-${year}`;
  //   }
  //   return "";
  // }

  // function bookPlace() {

  //   // console.log(checkIn)
  //   // console.log(checkOut)
  //   // console.log(numGuests);
  //   // console.log(name);
  //   // console.log(phoneNum);



  //   const load = {
  //     place: place._id,
  //     checkIn,
  //     checkOut,
  //     numGuests,
  //     name,
  //     phoneNum,
  //     price: numberOfNights * place.price,
  //   };

  //   axios
  //     .post("/bookplace", load)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         const bookingId = response.data._id;
  //         // console.log(response);

  //         setRedirect(`/account/booking/${bookingId}`);
  //       } else {
  //         console.log(response.status);
  //         // setRedirect('/login')
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       if (e.response.status === 401) {

  //         alert("Login or Register to Book");
          
  //         setTimeout(() => {
  //          setRedirect('/login')
  //         }, 3000);
          
  //       }
  //     });
  // }

  if (redirect) {
    return <Navigate to={redirect} />;
  }


  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const option = {
      amount: numberOfNights * place.price * 100,
      currency: 'INR'
    }

    const result = await axios.post("http://localhost:4100/payment/orders" , option);

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_6zB6nYBKryafTj", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: name,
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:4100/payment/success",
          data
        );

        alert(result.data.msg);
      },
      prefill: {
        name: name,
        email: user.email,
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    console.log(payment);
  }


  return (
    <div className="sm:pt-8">
      <div className=" bg-gray-100 shadow rounded-2xl p-4">
        <div className="text-center text-2xl">
          <b>Price : </b>${place.price} / per night
        </div>

        <div className="border border-black rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4 ">
              <label className={`${checkIn} != null ? "" : text-red`}>
                Check in <span className="text-primary">*</span>
              </label>
              {/* <input
                type="date"
                className="bg-transparent"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              /> */}
              <DatePicker
                showTimeSelect
                placeholderText="dd-mm-yyyy"
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                minDate={new Date()} // Set minimum date to today
                dateFormat={dateFormat}
              />
            </div>

            <div className="border-l  border-black py-3 px-4">
              <label>
                Check Out <span className="text-primary">*</span>{" "}
              </label>
              {
                /* <input
                type="date"
                className="bg-transparent"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              /> */

                <DatePicker
                  showTimeSelect
                  placeholderText="dd-mm-yyyy"
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  minDate={checkIn || new Date()} // Set minimum date to check-in date or today
                  dateFormat={dateFormat}
                  required
                />
              }
            </div>
          </div>

          <div className="border-t border-black py-3 px-4">
            <label data-tip="More than 0">
              Number of Guest <span className="text-primary">*</span>{" "}
            </label>
            <input
              type="Number"
              className={`bg-transparent ${numGuests < 0 ? " border-b-8 border-red-500" : "" }`}
              value={numGuests}
              onChange={(ev) => setNumGuests(ev.target.value)}
              required
            />

            {numGuests <= 0 && (
              <p className="pb-2 text-red-500 text-sm">
                Number of Guests should be greater than 0
              </p>
            )}

            {checkIn && checkOut && (
              <>
                <label data-tip="Enter your full name">Your full name : </label>
                <input
                  type="text"
                  className="bg-transparent"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />

                <label>
                  Phone Number <span className="text-primary">*</span>{" "}
                </label>
                {/* <input
                  type="tel"
                  className="bg-transparent"
                  value={phoneNum}
                  onChange={(ev) => setPhoneNum(ev.target.value)}
                  required
                /> */}
                <PhoneInput
                  id="phineNumber"
                  international
                  countryCallingCodeEditable={false}
                  value={phoneNum}
                  onChange={(ev) => setPhoneNum(ev)}
                />
              </>
            )}
          </div>
        </div>

        <button
          className="mt-6 text-white font-bold w-full bg-primary py-2 rounded-3xl disabled:cursor-not-allowed"
          // onClick={bookPlace}
          onClick={displayRazorpay}
          disabled={!checkIn || !checkOut || numGuests <= 0 || !phoneNum}
        >
          Book this place
          {numberOfNights > 0 && (
            <span>
              {" "}
              at{" "}
              <b className="text-gray-800">
                ${numberOfNights * place.price}
              </b>{" "}
            </span>
          )}
          {numberOfNights > 0 && (
            <>
              <span className="text-black">
                {" "}
                <b className="text-white">For</b> {numberOfNights} nights{" "}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
