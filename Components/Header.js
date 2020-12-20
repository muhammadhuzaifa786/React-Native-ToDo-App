import React,{useState} from 'react';
import {StyleSheet, Text, TextInput, View } from 'react-native';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
  
  export default function ButtonAppBar() {
    const classes = useStyles();
  
    return (
      <div style={useStyles.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" style={useStyles.menuButton} color="inherit" aria-label="menu">
            </IconButton>
            <Typography variant="h6" style={useStyles.title}>
              Home
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  const useStyles = StyleSheet.create ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: "4px",
    },
    title: {
      flexGrow: 1,
    },
  });