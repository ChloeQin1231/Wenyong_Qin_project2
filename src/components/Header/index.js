import React, { useContext } from 'react'
import { AppBar, Toolbar, Typography, Link, Button, Menu, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { UserNameCtx } from '../../context/userName';
import { flushSync } from 'react-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  link: {
    marginRight: theme.spacing(2),
    color: '#fff'
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold'
  },
}));

export default function Header() {
  const classes = useStyles();
  const routeTo = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { value, setValue } = useContext(UserNameCtx)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title} onClick={() => routeTo('/')}>
              Wordle
            </Typography>
            <Link
              className={classes.link}
              component="button"
              onClick={() => routeTo('/game/easy')}
            >
              Easy
            </Link>
            <Link
              className={classes.link}
              component="button"
              onClick={() => routeTo('/game/hard')}
            >
              Hard
            </Link>
            <Link
              className={classes.link}
              component="button"
              onClick={() => routeTo('/rule')}
            >
              Rule
            </Link>

            {
              value && <Button aria-controls="simple-menu" style={{color: 'skyblue'}} aria-haspopup="true" onClick={handleClick}>
                {value}
              </Button>
            }
          </Toolbar>
        </AppBar>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {
            setValue('')
            routeTo('/')
          }}>Logout</MenuItem>
        </Menu>
      </>
    )
}
