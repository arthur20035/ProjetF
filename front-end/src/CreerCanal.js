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
import FormControl from "@mui/material/FormControl";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { MessageTwoTone } from "@mui/icons-material";
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
                "& .MuiTextField-root": { m: 1, width: "10ch" },
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
                <TextField
                  id="name"
                  name="name"
                  label="Name du canal"
                  variant="filled"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MessageTwoTone />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Entrer le nom de votre canal..."
                  //helperText="Entrer un bon username"
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
