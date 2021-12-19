/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from "@mui/styles";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Divider from "@mui/material/Divider";
import UserContext from "./UserContext";
import { useContext } from "react";

import Avatar from "@mui/material/Avatar";
import InputEmoji from "react-input-emoji";

import { useState } from "react";
import FormControl from "@mui/material/FormControl";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const CreerCanal = () => {
  const useStyles = (theme) => ({
    root: {
      flex: "1 1 auto",
      background: "#0d1117",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& > div": {
        margin: "0px",
        marginLeft: "auto",
        marginRight: "auto",
      },
      "& fieldset": {
        border: "none",
        "& label": {
          marginBottom: "0px",
          display: "block",
        },
      },
    },
    content: {
      flex: "1 1 auto",
      maxWidth: "150px",
      "&.MuiTextField-root": {
        marginRight: "50px",
      },
    },
    box: {
      width: "500px",
      height: "400px",
      background: "#161b22",
      borderRadius: "10px",
      marginLeft: "20px",
      marginRight: "20px",
      ["@media (max-width:780px)"]: {
        // eslint-disable-line no-useless-computed-key
        width: "90%",
      },
    },
  });

  const [name, setName] = useState("");
  const navigate = useNavigate();

  const creerCanal = async () => {
    console.log("Entré");
    console.log(name); //^6.0.2
    await axios.post("http://localhost:3001/channels", { name: name });
    console.log("Passé");
    navigate("/");
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const styles = useStyles(useTheme());
  return (
    <div css={styles.root}>
      <div>
        <form onSubmit={CreerCanal}>
          <center>
            <Box
              component="form"
              css={styles.box}
              sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <center>
                <Avatar
                  src="/images/earth.jpg"
                  sx={{ width: 56, height: 56, marginBottom: 3 }}
                ></Avatar>
              </center>
              <FormControl
                fullWidth
                sx={{ m: 1, width: "90%" }}
                variant="filled"
              >
                <InputEmoji
                  value={name}
                  onChange={setName}
                  cleanOnEnter
                  css={styles.content}
                  onEnter={creerCanal}
                  placeholder="Entrer le nom de votre canal..."
                />
                <Divider sx={{ height: 30, m: 0.5 }} />
                <div>
                  <center>
                    <Button
                      variant="contained"
                      size="large"
                      color="success"
                      centerRipple="true"
                      onClick={() => {
                        creerCanal(name);
                      }}
                      endIcon={<AddBoxIcon />}
                    >
                      CreerCanal
                    </Button>
                  </center>
                </div>
              </FormControl>
            </Box>
          </center>
        </form>
      </div>
    </div>
  );
};

export default CreerCanal;
