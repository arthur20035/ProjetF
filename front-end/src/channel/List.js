/** @jsxImportSource @emotion/react */
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
// Layout
import { useTheme } from "@mui/styles";
// Markdown
import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
// Time
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(calendar);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  calendar: {
    sameElse: "DD/MM/YYYY hh:mm A",
  },
});

const useStyles = (theme) => ({
  root: {
    marginRight: "10px",
    marginLeft: "10px",
    marginTop: "0px",
    flex: "1 1 auto",
    overflow: "auto",
    background: "#0c1218",
    border: "1px solid #2f353c",
    borderRadius: "10px",

    "& ul": {
      padding: 0,
      borderRadius: "10px",
      textIndent: 0,
      listStyleType: 0,
    },
  },
  message: {
    padding: ".2rem .5rem",
    borderRadius: "10",
    ":hover": {
      backgroundColor: "rgba(255,255,255,.2)",
      borderRadius: "10px",
    },
    marginRight: "10px",
    marginLeft: "10px",
    marginBottom: "10px",
    marginTop: "10px",
  },
  h1: {
    paddingLeft: "20px",
  },
});

export default forwardRef(({ channel, messages, onScrollDown }, ref) => {
  const styles = useStyles(useTheme());
  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll,
  }));
  const rootEl = useRef(null);
  const scrollEl = useRef(null);
  const scroll = () => {
    scrollEl.current.scrollIntoView();
  };
  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null); // react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const rootNode = rootEl.current; // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null;
          const { scrollTop, offsetHeight, scrollHeight } = rootNode; // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight);
        }, 200);
      }
    };
    handleScroll();
    rootNode.addEventListener("scroll", handleScroll);
    return () => rootNode.removeEventListener("scroll", handleScroll);
  });
  return (
    <div css={styles.root} ref={rootEl}>
      <h1> Messages du canal: {channel.name} </h1>
      <ul>
        {messages.map((message, i) => {
          const { value } = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content);
          return (
            <li key={i} css={styles.message}>
              <p>
                <span> {message.author} </span> {" - "}
                <span> {dayjs().calendar(message.creation)} </span>
              </p>
              <div dangerouslySetInnerHTML={{ __html: value }}></div>
            </li>
          );
        })}
      </ul>
      <div ref={scrollEl} />
    </div>
  );
});
