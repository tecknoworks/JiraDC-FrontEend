import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import * as signalR from "@microsoft/signalr";
import { FormControl,FormLabel,Radio,FormControlLabel,RadioGroup,List, ListItem,ListItemText,Divider,TextField,Button,Box} from '@material-ui/core';
import { toast } from 'react-toastify';

function Notifications() {
  const [projects, setProjects] = useState([]);
  const [connectionHub, setConnectionHub] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(null);

  const [selectedProject, setSelectedProject] = useState("PRJ1");

  const onTaskAddedRef = useRef((message) => {
    toast.error(message, {className: "succes"});

    // setTasks(tasks => [ ...tasks, message]);

  });
  
  useEffect(() => {
    establishConnection();
  }, []);

  useEffect(() => {
    if(connectionHub)
      subscribeTo("SendNotification", onTaskAddedRef.current);
    return () => {
      if(connectionHub)
        unsubscribeFrom("SendNotification", onTaskAddedRef.current);
    }
  }, [connectionHub]);

  useEffect(() => {
    if (selectedProject && connectionHub)
      joinGroup(selectedProject);
    return () => {
      if (selectedProject && connectionHub)
        leaveGroup(selectedProject);
    }
  }, [selectedProject, connectionHub]);

  const establishConnection = async () => {
    try {
      let connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:1106/hub")
        .configureLogging(signalR.LogLevel.Information)
        .build();
      await connection.start();
      console.log(`Connection state: ${connection.state}`);
      setConnectionHub(connection)
      
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const subscribeTo = (target, callback) => {
    connectionHub?.on(target, callback);
  };

  const unsubscribeFrom = (target, callback) => {
    connectionHub?.off(target, callback);
  };

  const joinGroup = (group) => {
    connectionHub?.send(
      "JoinGroup",
      group
    );
  };

  const leaveGroup = (group) => {
    connectionHub?.send(
      "LeaveGroup",
      group
    );
  }

  const addTask = async () => {
    try {
      console.log(`${selectedProject} ${newTask}`);
      var request = {
        project: selectedProject,
        message: "new task"
      };
      await fetch("http://localhost:1106/Project", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <Button onClick={addTask}>Add</Button> */}
    </div>
  );
}

export default Notifications;
