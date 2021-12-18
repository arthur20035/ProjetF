/** @jsxImportSource @emotion/react */
import { useContext, useEffect } from "react";
import axios from "axios";
// Layout
import { Link } from "@mui/material";
import { List } from "@mui/material";

import { Grid } from "@mui/material";

// Local
import * as React from "react";

import Context from "./Context";
import { useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    background: "#0d1117",
  },
  channel: {
    whiteSpace: "nowrap",
  },
  Link: {
    paddingLeft: "100px",
    marginTop: "100px",
    cursor: "pointer",
    width: "200px",
    border: "1px solid #2f353c",

    display: "inline",
    heigth: "200px",
    background: "#0d1117",
  },
  reductionListe: {
    background: "#0d1117",
    border: "1px solid #2f353c",
    borderRadius: "10px",
    position: "relative",
    top: "0px",
  },
};

const chooseChannelBg = {
  link: "/images/earth.jpg",
};

export default function Channels() {
  const { oauth, channels, setChannels } = useContext(Context);
  const naviate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: channels } = await axios.get(
          "http://localhost:3001/channels",
          {
            headers: {
              Authorization: `Bearer ${oauth.access_token}`,
            },
          }
        );
        setChannels(channels);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [oauth, setChannels]);
  return (
    <Grid
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
      css={styles.reductionListe}
    >
      <List
        sx={{
          width: "100%",
        }}
      >
        <li css={styles.channel}>
          {channels.map((channel, i) => (
            <ListItem alignItems="flex-start" css={styles.root} key={i}>
              <ListItemAvatar>
                <Avatar alt={channel.name} src={chooseChannelBg.link} />
              </ListItemAvatar>
              <ListItemText
                primary={channel.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <Link
                        href={`/channels/${channel.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          naviate(`/channels/${channel.id}`);
                        }}
                      >
                        {channel.name}
                      </Link>
                    </Typography>
                  </React.Fragment>
                }
              />
              <Divider variant="inset" component="li" />
            </ListItem>
          ))}
        </li>
      </List>
    </Grid>
  );
}
