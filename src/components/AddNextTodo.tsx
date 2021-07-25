import { Box, makeStyles, TextField } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import SubmitToDo from "./SubmitToDo";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  root: {
    padding: "10px 10px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: "2px solid #66fbf0",
    borderRadius: "5%",
  },
  inputProps: {
    color: "white",
  },
  input: {
    marginLeft: theme.spacing(1),
    minWidth: "90%",
  },
  iconButton: {
    padding: 10,
  },
}));

interface AddNextTodoProps {
  setNextToDo: Dispatch<SetStateAction<string>>;
  handleAddTodo: () => Promise<void>;
  loading: boolean;
  displaySuccess: boolean;
  nextToDo: string;
  errorMessage: string;
}

const AddNextTodo = ({
  setNextToDo,
  handleAddTodo,
  loading,
  displaySuccess,
  nextToDo,
  errorMessage,
}: AddNextTodoProps) => {
  const classes = useStyles();

  return (
    <Box display="flex" marginBottom="4vh">
      <TextField
        onChange={(event) => setNextToDo(event.target.value)}
        value={nextToDo}
        placeholder="Your next ToDo"
        className={classes.root}
        inputProps={{
          className: classes.inputProps,
        }}
      />
      <SubmitToDo
        handleAddTodo={handleAddTodo}
        loading={loading}
        errorMessage={errorMessage}
        displaySuccess={displaySuccess}
        value={nextToDo}
      />
    </Box>
  );
};

export default AddNextTodo;
