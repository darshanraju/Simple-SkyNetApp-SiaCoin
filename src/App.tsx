import React, { useState } from "react";
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";
import {
  Box,
  Button,
  List,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import ToDoCard from "./components/ToDoCard";
import LoginInput from "./components/LoginInput";
import uuid from "uuid";
import AddNextTodo from "./components/AddNextTodo";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "40%",
  },
  input: {
    marginLeft: theme.spacing(1),
    minWidth: "90%",
  },
  iconButton: {
    padding: 10,
  },
  logout: {
    marginTop: "85vh",
    color: "#66fbf0",
    border: "2px solid #66fbf0",
    position: "absolute",
  },
  title: {
    color: "white",
    paddingBottom: "30px",
  },
}));

const portal =
  window.location.hostname === "localhost"
    ? process.env.REACT_APP_PORTAL_URL
    : undefined;

const skynetClient = new SkynetClient(portal);
const filename = "data.json";

function App() {
  const [secret, setSecret] = useState("");
  const [nextToDo, setNextToDo] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [todos, setTodos] = useState({});
  const handleReset = () => {
    setSecret("");
    setNextToDo("");
    setErrorMessage("");
    setLoading(false);
    setDisplaySuccess(false);
    setAuthenticated(false);
  };

  const loadToDos = async () => {
    try {
      const { publicKey } = genKeyPairFromSeed(secret);
      const entry = await skynetClient.db.getJSON(publicKey, filename);

      if (entry) {
        setNextToDo("");
        setTodos(entry.data ? entry.data : {});
        console.log("ToDos: ", entry.data);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setNextToDo("");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    await loadToDos();

    setAuthenticated(true);
    setLoading(false);
  };

  const handleAddTodo = async () => {
    setLoading(true);
    const { privateKey } = genKeyPairFromSeed(secret);
    try {
      const todoKey = uuid();
      const newTodos = { ...todos };
      newTodos[todoKey] = nextToDo;
      console.log("newTodos: ", newTodos);
      await skynetClient.db.setJSON(privateKey, filename, newTodos);
      setTodos(newTodos);
      setDisplaySuccess(true);
      setNextToDo("");
      setTimeout(() => setDisplaySuccess(false), 5000);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  const handleDeleteToDo = async (key: string) => {
    setLoading(true);
    const { privateKey } = genKeyPairFromSeed(secret);
    try {
      const newTodos = { ...todos };
      delete newTodos[key];
      console.log("newTodos: ", newTodos);
      await skynetClient.db.setJSON(privateKey, filename, newTodos);
      setTodos(newTodos);
      setDisplaySuccess(true);
      setTimeout(() => setDisplaySuccess(false), 5000);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  const todosKeys: Array<string> = Object.keys(todos);
  const classes = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      paddingTop="10vh"
      flexDirection="column"
      height="100vh"
      width="100vw"
      style={{ backgroundColor: "#0a192f" }}
    >
      {authenticated ? (
        <>
          <Typography variant="h2" className={classes.title}>
            SkyNet Todo List.
          </Typography>
          <AddNextTodo
            displaySuccess={displaySuccess}
            loading={loading}
            nextToDo={nextToDo}
            handleAddTodo={handleAddTodo}
            setNextToDo={setNextToDo}
            errorMessage={errorMessage}
          />
          <Box width="40%" maxWidth={800}>
            <Paper
              style={{
                maxHeight: "50vh",
                width: "100%",
                overflow: "auto",
                backgroundColor: "#0a192f",
              }}
            >
              <List style={{ color: "#66fbf0" }}>
                {todosKeys.map((key, idx) => (
                  <ToDoCard
                    text={todos[key]}
                    toDoKey={key}
                    key={idx}
                    handleToDoDelete={handleDeleteToDo}
                    loading={loading}
                  />
                ))}
              </List>
            </Paper>
          </Box>
          <Button
            className={classes.logout}
            style={{ color: "#66fbf0" }}
            onClick={handleReset}
            variant="outlined"
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <LoginInput
            loading={loading}
            setSecret={setSecret}
            handleLogin={handleLogin}
          />
        </>
      )}
    </Box>
  );
}

export default App;
