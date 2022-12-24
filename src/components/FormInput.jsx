import React from "react";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  row: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",

    "& label": {
      textAlign: "left",
      padding: "0.25rem 0",
    },

    "& input": {
      margin: "0.5rem 0",
      padding: "1rem",
      border: "none",
      borderRadius: "10px",
    },
  },
});

export const FormInput = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      <label>{props.description}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.handleChange(e)}
      />
    </div>
  );
};
