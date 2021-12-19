/** @jsxImportSource @emotion/react */
import { useState } from "react";
import axios from "axios";
// Layout
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/styles";
import InputEmoji from "react-input-emoji";
import Context from "../Context";
import { useContext } from "react";

const useStyles = (theme) => {
  // See https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/OutlinedInput/OutlinedInput.js
  const borderColor = "rgba(255, 255, 255, 0.23)";
  return {
    form: {
      borderTop: `2px solid ${borderColor}`,
      marginLeft: "0px",
      display: "flex",
      position: "relative",
      bottom: "-10px",
    },
    content: {
      flex: "1 1 auto",
      maxWidth: "150px",
      "&.MuiTextField-root": {
        marginRight: "50px",
      },
    },
    send: {
      color: "black",
      height: "55px",
      width: "70px",
    },
  };
};

const Form = ({ addMessage, channel }) => {
  const [content, setContent] = useState("");
  const styles = useStyles(useTheme());
  const [username, setUsername] = useState("");

  const onSubmit = async () => {
    /*  */

    const { data: message } = await axios.post(
      `http://localhost:3001/channels/${channel.id}/messages`,
      {
        content: content,
        author: oauth.email,
      }
    );
    addMessage(message);
    setContent("");
  };
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const { oauth } = useContext(Context);
  return (
    <form css={styles.form} noValidate>
      <InputEmoji
        value={content}
        onChange={setContent}
        cleanOnEnter
        css={styles.content}
        onEnter={onSubmit}
        placeholder="Entrer votre message..."
      />
    </form>
  );
};

export default Form;
