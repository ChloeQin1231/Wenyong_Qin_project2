import './App.css';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { UserNameCtx } from '../context/userName';
import { useContext, useState } from 'react';

function App() {
  const routeTo = useNavigate()
  const { value, setValue } = useContext(UserNameCtx)
  const [showBtn, setShowBtn] = useState(!!value)
  const [text, setText] = useState('')

  return (
    <div className="App">
      <Box className="App-body">
        <Typography variant="h2" component="h3" style={{marginBottom: '100px'}}>
          W o r d l e
        </Typography>
        {
          !showBtn && <>
            <TextField placeholder='please input your name' value={text} onChange={(e) => setText(e.target.value)} />
            <Button variant="contained" size='large' color="primary" style={{width: '200px', marginTop: '20px'}} onClick={() => {
              if(text) {
                setValue(text)
              }
              setShowBtn(true)
            }}>
                Continue
            </Button>
            <Button variant="contained" size='large' color="primary" style={{width: '200px', marginTop: '20px'}} onClick={() => setShowBtn(true)}>
                Skip
            </Button>
          </>
        }
        {
          showBtn && (
            <>
              <Button variant="contained" size='large' color="primary" style={{width: '200px', marginBottom: '20px'}} onClick={() => routeTo('/game/easy')}>
                Easy
              </Button>
              <Button variant="contained" size='large' color="secondary" style={{width: '200px', marginBottom: '20px'}} onClick={() => routeTo('/game/hard')}>
                Hard
              </Button>
              <Button variant="contained" size='large' color="default" style={{width: '200px', marginBottom: '20px'}} onClick={() => routeTo('/rule')}>
                Rule
              </Button>
            </>
          )
        }
      </Box>
    </div>
  );
}

export default App;
