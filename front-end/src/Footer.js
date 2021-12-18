/** @jsxImportSource @emotion/react */
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";

const useStyles = (theme) => ({
  footer: {
    background: "#161b22",
    borderRadius: "30px 30px 0 0",
  },
  footerTxt: {
    background: "#161b22",
    size: "20px",
    color: "white",
  },
});

export default function Footer() {
  const styles = useStyles(useTheme());

  return (
    <AppBar position="static" css={styles.footer}>
      <Container maxWidth="la" css={styles.footer}>
        <Toolbar>
          <center>
            <Typography variant="body1" css={styles.footerTxt}>
              Copyright© 2021 CHATAPP{" "}
            </Typography>{" "}
          </center>{" "}
        </Toolbar>{" "}
      </Container>{" "}
    </AppBar>
  );
}
