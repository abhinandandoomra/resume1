import { Button, List, ListItem } from "@material-ui/core";
import { ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";



function Medicine(props) {
  const [show, setShow] = useState(true);
  const handleDelete = () => {
    setShow(false);
  }
  return (
    <div>
      <List className="med_list">
        {/* className={classes.stodo} > */}
        {/* <ListItemAvatar>
            </ListItemAvatar> */}
        <ListItem>
          <ListItemText primary={show && props.item} />
          <div>
            <Button className="edit-btn" color="primary" variant="contained">
              EDIT
            </Button>
            <DeleteIcon
              className="delete-btn"
              cursor="pointer"
              color="secondary"
              onClick={handleDelete}
            />
          </div>
        </ListItem>
      </List>
    </div>
  );
}

export default Medicine;
