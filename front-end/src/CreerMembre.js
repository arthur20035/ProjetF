/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from "@mui/styles";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import AddBoxIcon from "@mui/icons-material/AddBox";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import AccountCircle from "@mui/icons-material/AccountCircle";

const CreerMembre = () => {
  const navigate = useNavigate();

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

  const [password, setPassword] = useState("");

  const creerMembre = async () => {
    console.log("Entré");
    console.log(name); //^6.0.2
    await axios.post("http://localhost:3001/users", {
      username: name,
    });
    console.log("Passé");
    navigate("/");
  };

  const styles = useStyles(useTheme());
  return (
    <div css={styles.root}>
      <div>
        <form onSubmit={CreerMembre}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "56ch" },
              width: 500,
              height: 300,
              backgroundColor: "black",
              opacity: [0.5, 0.5, 0.5],
              borderRadius: 5,
              padding: 7,
              "&:hover": {
                backgroundColor: "black",
                opacity: [0.5, 0.5, 0.5],
              },
            }}
            noValidate
            autoComplete="off"
          >
            <center>
              <Avatar
                src="/images/marshmellow.jpg"
                sx={{ width: 56, height: 56, marginBottom: 3 }}
              ></Avatar>
            </center>
            <TextField
              id="name"
              name="name"
              label="Nom d'utilisateur"
              variant="filled"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              placeholder="Entrer votre nom d'utilisateur..."
            />
            {/* <TextField
              id="password"
              name="password"
              label="Mot de Passe"
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              placeholder="Entrer votre mot de passe..."
              //helperText="Entrer un bon username"
            /> */}
            <Divider sx={{ height: 30, m: 0.5 }} />
            <div>
              <center>
                <Button
                  variant="contained"
                  size="large"
                  color="success"
                  centerRipple="true"
                  onClick={() => {
                    creerMembre(name, password);
                  }}
                  endIcon={<AddBoxIcon />}
                >
                  Se connecter au chat
                </Button>
              </center>
            </div>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default CreerMembre;
