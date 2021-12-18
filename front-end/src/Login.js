/** @jsxImportSource @emotion/react */
import * as React from "react";

import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import crypto from "crypto";
import qs from "qs";
import axios from "axios";
// Layout
import { useTheme } from "@mui/styles";
import { Link } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LoginIcon from "@mui/icons-material/Login";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FilledInput from "@mui/material/FilledInput";
import Avatar from "@mui/material/Avatar";

// Local
import Context from "./Context";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { AccountCircleRounded } from "@mui/icons-material";

const base64URLEncode = (str) => {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

const sha256 = (buffer) => {
  return crypto.createHash("sha256").update(buffer).digest();
};

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
  logOidc: {
    width: "250px",
    height: "40px",
    borderRadius: "30px",
    marginBottom: "5px",
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "80%",
    },
  },
  bouton: {
    width: "250px",
    height: "40px",
    borderRadius: "30px",
    marginBottom: "5px",
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "80%",
    },
  },
  pass: {
    marginTop: "20px",
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "80%",
    },
  },
  diviseur: {
    marginTop: "10px",
    marginBottom: "10px",
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "80%",
    },
  },
  diviseurTxt: {
    marginTop: "10px",
    marginBottom: "10px",
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "80%",
    },
  },
});

const Redirect = ({ config, codeVerifier }) => {
  const styles = useStyles(useTheme());
  const redirect = (e) => {
    e.stopPropagation();
    const code_challenge = base64URLEncode(sha256(codeVerifier));
    const url = [
      `${config.authorization_endpoint}?`,
      `client_id=${config.client_id}&`,
      `scope=${config.scope}&`,
      `response_type=code&`,
      `redirect_uri=${config.redirect_uri}&`,
      `code_challenge=${code_challenge}&`,
      `code_challenge_method=S256`,
    ].join("");
    window.location = url;
  };
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div css={styles.root}>
      <div>
        <form>
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
              <Avatar
                //alt={oauth.email}
                src="/images/earth.jpg"
                sx={{ width: 50, height: 50 }}
              />
              <div>
                <FormControl
                  fullWidth
                  sx={{ m: 1, width: "90%" }}
                  variant="filled"
                >
                  <FilledInput
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange("username")}
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircleRounded />
                      </InputAdornment>
                    }
                    placeholder="Entrer votre nom d'utilisateur..."
                  />
                  <InputLabel htmlFor="password">Username</InputLabel>
                  <FilledInput
                    id="password"
                    name="password"
                    label="Mot de passe"
                    css={styles.pass}
                    placeholder="Entrer votre mot de passe..."
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    startAdornment={
                      <InputAdornment position="start">
                        <VpnKeyIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <Divider css={styles.diviseur} variant="middle" />
              <div>
                <center>
                  <Button
                    variant="contained"
                    size="large"
                    color="success"
                    centerRipple="true"
                    css={styles.bouton}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    /* onClick={() => window.open("/Channels")} */
                    endIcon={<LoginIcon />}
                  >
                    Se connecter
                  </Button>
                </center>
              </div>

              <Divider css={styles.diviseurTxt}>
                <Chip label="LOGIN OIDC" />
              </Divider>
              <div>
                <center>
                  <Button
                    variant="contained"
                    size="large"
                    color="success"
                    centerRipple="true"
                    css={styles.logOidc}
                    onClick={redirect}
                    endIcon={<VpnKeyIcon />}
                  >
                    OpenID / OAuth2
                  </Button>
                </center>
              </div>

              <Link
                css={styles.addMember}
                to="/creer-membre"
                component={RouterLink}
              >
                Creer un membre
              </Link>
            </Box>
          </center>
        </form>
      </div>
    </div>
  );
};

const Tokens = ({ oauth }) => {
  const { setOauth } = useContext(Context);
  const styles = useStyles(useTheme());
  const { id_token } = oauth;
  const id_payload = id_token.split(".")[1];
  const { email } = JSON.parse(atob(id_payload));
  const logout = (e) => {
    e.stopPropagation();
    setOauth(null);
  };
  return (
    <div css={styles.root}>
      Welcome {email}
      <Link onClick={logout} color="secondary">
        logout
      </Link>
    </div>
  );
};

const LoadToken = ({ code, codeVerifier, config, removeCookie, setOauth }) => {
  const styles = useStyles(useTheme());
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.post(
          config.token_endpoint,
          qs.stringify({
            grant_type: "authorization_code",
            client_id: `${config.client_id}`,
            redirect_uri: `${config.redirect_uri}`,
            code_verifier: `${codeVerifier}`,
            code: `${code}`,
          })
        );
        console.log(data);

        removeCookie("code_verifier");
        setOauth(data);
        //navigate("/");
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  });
  return <div css={styles.root}>Loading tokens</div>;
};

export default function Login({ onUser }) {
  const styles = useStyles(useTheme());
  // const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { oauth, setOauth } = useContext(Context);
  const config = {
    authorization_endpoint: "http://127.0.0.1:5556/dex/auth",
    token_endpoint: "http://127.0.0.1:5556/dex/token",
    client_id: "example-app",
    redirect_uri: "http://127.0.0.1:3000",
    scope: "openid%20email%20offline_access",
  };
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  // is there a code query parameters in the url
  if (!code) {
    // no: we are not being redirected from an oauth server
    if (!oauth) {
      const codeVerifier = base64URLEncode(crypto.randomBytes(32));
      console.log("set code_verifier 1", codeVerifier);
      setCookie("code_verifier", codeVerifier);
      return (
        <Redirect
          codeVerifier={codeVerifier}
          config={config}
          css={styles.root}
        />
      );
    } else {
      // yes: user is already logged in, great, is is working
      return <Tokens oauth={oauth} css={styles.root} />;
    }
  } else {
    // yes: we are coming from an oauth server
    console.log("get code_verifier Last", cookies.code_verifier);
    return (
      <LoadToken
        code={code}
        codeVerifier={cookies.code_verifier}
        config={config}
        setOauth={setOauth}
        removeCookie={removeCookie}
      />
    );
  }
}
