/** @jsxImportSource @emotion/react */
import { useContext } from "react";
// Layout
import { useTheme } from "@mui/material/styles";
import { IconButton, Link } from "@mui/material";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import { FormGroup } from "@material-ui/core";
import Context from "./Context";
import { Link as RouterLink } from "react-router-dom";
import logo1 from "./images/2.svg";

const useStyles = (theme) => ({
  header: {
    background: "#161b22",
    paddingRight: "79px",
    paddingLeft: "0px",
    borderRadius: "0 0 30px 30px",
    flexShrink: 0,
    ["@media (max-width:780px"]: {},
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
    ["@media (max-width:780px)"]: {
      textAlign: "center",
      marginLeft: "25%",
    },
  },
  headerLogIn: {
    backgroundColor: "red",
  },
  headerLogOut: {
    backgroundColor: "blue",
  },
  menu: {
    backgroundColor: "grey",
    ["@media (min-width:780px)"]: {
      display: "none !important",
    },
  },
  lien: {
    ["@media (max-width:780px)"]: {
      marginLeft: "135px",
    },
    ["@media (max-width:1500px)"]: {
      position: "relative",
      bottom: "50px",
    },
  },
});

export default function Header({ drawerToggleListener }) {
  const styles = useStyles(useTheme());
  const { oauth, setOauth, drawerVisible, setDrawerVisible } =
    useContext(Context);
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible);
  };
  const onClickLogout = (e) => {
    e.stopPropagation();
    setOauth(null);
  };

  const { logo } = useStyles();

  const Logo = (
    <Typography variant="h6" css={styles.logo}>
      CHATAPP
    </Typography>
  );
  const displayDesktop = () => {
    return <Toolbar>{Logo}</Toolbar>;
  };
  return (
    <FormGroup>
      <header css={styles.header}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={drawerToggle}
          css={styles.menu}
        >
          <MenuIcon />
        </IconButton>

        <span>
          <img src={logo1} css={styles.logo} height={100} width={150} />
        </span>

        {oauth ? (
          <span>
            {oauth.email}
            {oauth.username}
            <Link to="/channels" component={RouterLink}>
              Accueil
            </Link>
            <Link to="/parametres" component={RouterLink}>
              Paramètres
            </Link>
            <Link onClick={onClickLogout}>Deconnexion</Link>
          </span>
        ) : (
          <span>
            <Link to="/creer-membre" css={styles.lien} component={RouterLink}>
              Creer un membre
            </Link>
          </span>
        )}
      </header>
    </FormGroup>
  );
}
