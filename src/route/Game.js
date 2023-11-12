import React, {useEffect, useState} from 'react'
import { Grid, TextField, Button, Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate, useParams } from 'react-router-dom';
import Group from '../components/Group'
import Header from '../components/Header';

import list from '../wordList';
import './Game.css'

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

const postion = {
  vertical: 'top',
  horizontal: 'center',
}

export default function Game() {
  const routeTo = useNavigate()
  const params = useParams()
  const mode = params.mode
  const wordList = list[mode]
  const maxTimes = mode === 'easy' ? 6 : 5
  const len = mode === 'easy' ? 6 : 7

  const [keyword, setKeyword] = useState(wordList[Math.floor(Math.random() * (wordList.length - 1))])
  const [results, setResults] = useState([])
  const [index, setIndex] = useState(0)
  const [word, setWord] = useState('')
  const [isWin, setIsWin] = useState(0)
  const [showTip, setShowTip] = useState(false)

//valid
const [invalidWordError, setInvalidWordError] = useState('');

  useEffect(() => {
    setKeyword(wordList[Math.floor(Math.random() * (wordList.length - 1))])
    setResults([])
    setIndex(0)
    setWord('')
    setIsWin(0)
    setShowTip(false)
    setInvalidWordError('')
  }, [params])

  const checkWordValidity = async (submittedWord) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${submittedWord}`);
      return response.ok;
    } catch (error) {
      console.error('There was an error checking the word validity:', error);
      setInvalidWordError('Error checking word. Try again.');
      return false;
    }
  };

  const handleSubmit = async () => {

    setShowTip(false);
    setInvalidWordError('');

    if (!word || word.trim().length !== len) {
      setShowTip(true);
      return;
    }

    const isValid = await checkWordValidity(word);
    if (!isValid) {
      setInvalidWordError('The submitted word is not a valid English word.');
      return;
    }


    console.log(word, keyword)
    if(!word || word.trim().length !== len) {
      return setShowTip(true)
    }

    const arr = word.split('')

    let newResults = results.slice(0)
    
    if(word === keyword) {
      newResults = newResults.concat(arr.map(val => {
        return {
          word: val,
          attributes: {
            isCorrect: true,
            isWrong: false,
            isElseWhere: false
          }
        }
      }))
      setIsWin(1)
    } else {
      const keywordArr = keyword.split('')
      arr.forEach((val, index) => {
        let chatRes = {
          word: val
        }
        if(val === keywordArr[index]) {
          chatRes.attributes = {
            isCorrect: true,
            isWrong: false,
            isElseWhere: false
          }
          keywordArr[index] = undefined
        } else {
          const i = keywordArr.indexOf(val)
          if(i > -1) {
            if(keywordArr[i] !== arr[i]) {
              chatRes.attributes = {
                isElseWhere: true,
                isCorrect: false,
                isWrong: false,
              }
              keywordArr[i] = undefined
            } else {
              chatRes.attributes = {
                isWrong: true,
                isCorrect: false,
                isElseWhere: false,
              }
            }
          } else {
            chatRes.attributes = {
              isWrong: true,
              isCorrect: false,
              isElseWhere: false,
            }
          }
        }
        newResults.push(chatRes)
      })
    }

    if(index === maxTimes - 1) {
      setIsWin(2)
    }
    setIndex(index + 1)
    setResults(newResults)

  }
  return (
    <>
      <Header />
      <Grid container direction="row"
        justifyContent="center"
        alignItems="center">


        <Grid item xs={8} md={8}>
          <h3 style={{textAlign: 'center'}}>Please enter your guessed word (length {mode === 'easy' ? 6 : 7})</h3>
        </Grid>
        <Grid item xs={8} md={8}>
          <div className='tc'>
            <div className="tip">you have {maxTimes - index} times to try</div>
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <Group mode={mode} words={results.map(val => val.word)}  attributes={results.map(val => val.attributes)} />
        </Grid>
        <Grid container item xs={12} md={8} justifyContent='center' style={{marginTop: '10px'}}>
          <TextField variant="outlined" value={word} onChange={(e) => setWord(e.target.value)} />
          <Button variant="contained" color="primary" style={{marginLeft: '10px'}} onClick={handleSubmit}>submit</Button>
        </Grid>
      </Grid>

      
      <Snackbar
        anchorOrigin={postion}
        open={showTip}
        autoHideDuration={2000}
        onClose={() => setShowTip(false)}
        message={`Please enter a word of length ${len}`}
      />

      <Snackbar
        anchorOrigin={postion}
        open={isWin === 1}
        autoHideDuration={null}
        message={`Congratulations!  Would you like to try again?`}
        action={
          <React.Fragment>
            <Button variant="contained" color="primary" style={{marginRight: '10px'}} size="small" onClick={() => {
              routeTo(0)
            }}>
              Restart
            </Button>
            <Button variant="contained" color="default" size="small" onClick={() => {
              routeTo(-1)
            }}>
              Back
            </Button>
          </React.Fragment>
        }
      />

<Snackbar
        anchorOrigin={postion}
        open={showTip}
        autoHideDuration={2000}
        onClose={() => setShowTip(false)}
        message={`Please enter a word of length ${len}`}
      />
      <Snackbar
        anchorOrigin={postion}
        open={invalidWordError !== ''}
        autoHideDuration={6000}
        onClose={() => setInvalidWordError('')}
        message={invalidWordError}
      />
      

      <Snackbar
        anchorOrigin={postion}
        open={isWin === 2}
        autoHideDuration={null}
        message={`you lost!`}
        action={
          <React.Fragment>
            <Button variant="contained" color="primary" style={{marginRight: '10px'}} size="small" onClick={() => {
              routeTo(0)
            }}>
              Restart
            </Button>
            <Button variant="contained" color="default" size="small" onClick={() => {
              routeTo(-1)
            }}>
              Back
            </Button>
          </React.Fragment>
        }
      />
    </>
  )
}