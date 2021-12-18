import React from "react";
import Context from "./Context";
import { useContext } from "react";
import { useTheme } from "@mui/system";
import AvatarEditor from "react-avatar-editor";
import { Box } from "@mui/material";

import Badge from "@mui/material/Badge";

import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
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

const UserCards = () => {
  const { oauth } = useContext(Context);
  const styles = useStyles(useTheme());
  return (
    <div css={styles.root}>
      {/* <AvatarEditor
        image="/images/marshmellow.jpg"
        width={250}
        height={250}
        border={50}
        color={[255, 255, 255, 0.6]}
        scale={1.2}
        rotate={0}
      /> */}

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
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              alt={oauth.email}
              src="/images/double.jpg"
              sx={{ width: 50, height: 50 }}
            />
          </StyledBadge>
          <div>
            {oauth ? (
              <h5 css={styles.logOidc}>Adresse Email : {oauth.email}</h5>
            ) : (
              <h5 className="card-title">{oauth.email}</h5>
            )}
          </div>
        </Box>
      </center>
    </div>
  );
};

export default UserCards;
