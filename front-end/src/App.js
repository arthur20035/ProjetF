/** @jsxImportSource @emotion/react */
import { useContext, useState } from "react";
// Local
import Oups from "./Oups";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Context from "./Context";
import CreerCanal from "./CreerCanal";
import CreerMembre from "./CreerMembre";
import Parametres from "./userCards";
// Rooter
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

const styles = {
  root: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#0d1117",
    padding: "0px",
  },
  header: {
    backgroundColor: "#0d1117",
  },
};

export default function App() {
  const location = useLocation();
  const { oauth } = useContext(Context);
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false);
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible);
  };
  const gochannels = (
    <Navigate
      to={{
        pathname: "/channels",
        state: { from: location },
      }}
    />
  );
  const gohome = (
    <Navigate
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  );
  return (
    <div className="App" css={styles.root}>
      <Header drawerToggleListener={drawerToggleListener} css={styles.header} />
      <Routes>
        <Route exact path="/" element={oauth ? gochannels : <Login />} />
        <Route path="/channels/*" element={oauth ? <Main /> : gohome} />
        <Route path="/Oups" element={<Oups />} />
        <Route path="/creer-canal" element={<CreerCanal />} />
        <Route path="/creer-membre" element={<CreerMembre />} />
        <Route path="/parametres" element={<Parametres />} />
      </Routes>
      <Footer />
    </div>
  );
}
