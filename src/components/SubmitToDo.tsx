import {
  Box,
  CircularProgress,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SendIcon from "@material-ui/icons/Send";

interface SubmitToDoProps {
  handleAddTodo: () => Promise<void>;
  loading: boolean;
  displaySuccess: boolean;
  errorMessage: string;
  value: string;
}

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: 10,
  },
}));

const SubmitToDo = ({
  handleAddTodo,
  loading,
  displaySuccess,
  errorMessage,
  value,
}: SubmitToDoProps) => {
  const classes = useStyles();
  const [isAddingNewTodo, setIsAddingNewTodo] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsAddingNewTodo(false);
    }
  }, [loading]);

  return (
    <Box>
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={() => {
          handleAddTodo();
          setIsAddingNewTodo(true);
        }}
        disabled={loading || value === ""}
      >
        {loading && isAddingNewTodo ? (
          <CircularProgress />
        ) : (
          <SendIcon style={{ color: "#66fbf0" }} />
        )}
      </IconButton>
    </Box>
  );
};

export default SubmitToDo;
