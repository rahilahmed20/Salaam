import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

const TypeWriter = () => {
  const [text] = useTypewriter({
    words: [
      "The Messenger of Allah (peace be upon him) said, 'Whoever donates to a mosque, whether it is large or small, Allah will build for him a house in Paradise.'",
      "The Messenger of Allah (peace be upon him) said, 'He who builds a mosque for Allah, Allah will build for him a house like it in Paradise.'",
      "Charity extinguishes sins as water extinguishes fire.",
      "When a person dies, their deeds come to an end except for three: ongoing charity, beneficial knowledge, and a righteous child who will pray for them.",
    ],
    loop: {},
    typeSpeed: 120,
    delaySpeed: 30,
    deleteSpeed: 40,
  });

  const { palette } = useTheme();
  const dark = palette.logo.dark;
  const light = palette.logo.light;
  const mode = useSelector((state) => state.mode);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "200px",
      }}
    >
      <div style={{ width: "80%" }}>
        <Typography
          sx={{ m: "20px", textAlign: "center" }}
          variant="h1"
          color={mode === "light" ? dark : light}
        >
          <span>{text}</span>
          <span>
            <Cursor />
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default TypeWriter;
