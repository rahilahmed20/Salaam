import Navbar from "scenes/navbar";
import Typography from "@mui/material/Typography";
import DonationCard from "../../components/DonationCard.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setDonationPosts } from "state";

const DonationPage = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const donationPosts = useSelector((state) => state.donationPosts);

  const getDonationPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/donation/all", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setDonationPosts(data?.donations));
    } catch (err) {
      console.log(err);
      console.log("Error Occured While Fetching Donation Posts");
    }
  };

  useEffect(() => {
    getDonationPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Navbar />
      <Typography variant="h1" sx={{ textAlign: "center", mt: "30px" }}>
        Donation Page
      </Typography>
      <div className="container" id="container">
        {donationPosts &&
          donationPosts.map((post) => (
            <DonationCard cardDetails={post} key={post?._id} />
          ))}
      </div>
    </>
  );
};

export default DonationPage;
