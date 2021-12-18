/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from "@mui/styles";
import { Grid, Typography } from "@mui/material";
import { ReactComponent as ChannelIcon } from "./icons/channel.svg";
import { ReactComponent as FriendsIcon } from "./icons/friends.svg";
import { ReactComponent as SettingsIcon } from "./icons/settings.svg";
import { IconButton, Link } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

const useStyles = (theme) => ({
  root: {
    height: "100%",
    flex: "1 1 auto",
    display: "flex",
    background: "rgba(0,0,0,.2)",
    border: "1px solid #30363d",
    marginLeft: "15px",
    borderRadius: "10px",
  },
  card: {
    textAlign: "center",
    border: "2px solid white",
    borderRadius: "7px",
    background: "#400CCC",
    width: "220px",
    height: "220px",
    padding: "3%",
    marginLeft: "30%",
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "100%",
      height: "100%",
    },
  },
  titre: {
    cursor: "pointer",
    fontWeight: 700,
  },
  a: {
    color: "white",
    fontWeight: 700,
    size: "28px",
  },
  icon: {
    width: "70%",
    ["@media (max-width:780px)"]: {
      width: "70%",
      height: "70%",
    },
    padding: "2ch",
    fill: "#fff",
  },
  zonemessage: {
    position: "absolute",
    top: "200px",
    maxWidth: "300px",
  },
  menu: {
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "80%",
      height: "30%",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  },
});

export default function Welcome() {
  const styles = useStyles(useTheme());
  return (
    <div css={styles.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
        css={styles.menu}
      >
        <Grid item xs>
          <div css={styles.card}>
            <ChannelIcon css={styles.icon} />
            <Typography color="textPrimary">
              <Link to="/creer-canal" component={RouterLink}>
                Creer un canal
              </Link>
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <FriendsIcon css={styles.icon} />
            <Typography color="textPrimary">
              <Link to="/creer-membre" component={RouterLink}>
                Ajouter des membres
              </Link>
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <SettingsIcon css={styles.icon} />
            <Typography color="textPrimary">
              <Link to="/parametres" component={RouterLink}>
                Paramètres
              </Link>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
