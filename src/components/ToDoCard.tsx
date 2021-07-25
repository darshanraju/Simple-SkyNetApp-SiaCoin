import {
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  pos: {
    marginBottom: 12,
    color: "white",
  },
  card: {
    width: "100%",
    marginBottom: "3vh",
    opacity: "80%",
    backgroundColor: "grey",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
});

interface ToDoCardProps {
  text: string;
  toDoKey: string;
  handleToDoDelete: (key: string) => void;
  loading: boolean;
}

const ToDoCard = ({
  text,
  toDoKey,
  handleToDoDelete,
  loading,
}: ToDoCardProps) => {
  const classes = useStyles();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsDeleting(false);
    }
  }, [loading]);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" className={classes.pos} color="textSecondary">
          {text}
        </Typography>
        <IconButton
          aria-label="delete"
          onClick={() => {
            handleToDoDelete(toDoKey);
            setIsDeleting(true);
          }}
          disabled={loading}
        >
          {loading && isDeleting ? <CircularProgress /> : <DeleteIcon />}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ToDoCard;
