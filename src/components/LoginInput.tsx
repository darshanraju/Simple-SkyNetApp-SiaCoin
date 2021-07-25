import React from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

interface LoginFormProps {
  handleLogin: (event: any) => Promise<void>;
  setSecret: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "40%",
  },
  input: {
    marginLeft: theme.spacing(1),
    minWidth: "40%",
    border: "2px solid #66fbf0",
    padding: "10px 10px",
    borderRadius: "5%",
  },
  iconButton: {
    padding: 10,
  },
  inputProps: {
    color: "white",
  },
}));

const LoginInput = ({ handleLogin, setSecret, loading }: LoginFormProps) => {
  const classes = useStyles();

  return (
    <Box display="flex" width="100vw" justifyContent="center">
      <TextField
        className={classes.input}
        onChange={(event) => setSecret(event.target.value)}
        placeholder="Enter your Seed Phrase"
        inputProps={{
          className: classes.inputProps,
        }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={handleLogin}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <SendIcon style={{ color: "#66fbf0" }} />
        )}
      </IconButton>
    </Box>
  );
};

export default LoginInput;
