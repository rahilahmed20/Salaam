import "./DonationCard.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useSelector } from "react-redux";

const Donation = ({ cardDetails }) => {
  const user = useSelector((state) => state.user);
  console.log();

  const checkout = async (amount) => {
    try {
      const {
        data: { key },
      } = await axios.get("http://localhost:3001/payment/getkey");

      const {
        data: { order },
      } = await axios.post("http://localhost:3001/payment/checkout", {
        amount,
      });

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Salaam",
        description: "Islamic Social Media App",
        image:
          "https://raw.githubusercontent.com/rahilahmed20/Salaam/391ab1a2c102e748d732b8f0401c00ba20de7c2a/client/public/assets/Salaam-logo.svg",
        order_id: order.id,
        callback_url: "http://localhost:3001/payment/paymentVerification",
        prefill: {
          name: user.firstName + " " + user.lastName,
          email: user.email,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#2691CF",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="cards-container">
      <div className="card">
        <div className="card-image">
          <img
            src={cardDetails?.picturePath}
            alt="masjid_Image"
            width={400}
            height={300}
          />
        </div>
        <div className="card-details">
          <p className="name">{cardDetails?.name}</p>
          <p className="description">{cardDetails?.description}</p>
          <Box sx={{ width: "100%" }}>
            <Typography variant="p" fontSize="18px" color="initial">
              Required : {cardDetails?.price}
            </Typography>
            <br />
            <Typography variant="p" fontSize="18px" color="initial">
              Gathered : 0
            </Typography>
            <br />
            <button onClick={() => checkout(cardDetails?.price)}>
              Pay Now
            </button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Donation;
