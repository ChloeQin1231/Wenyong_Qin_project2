import React from 'react'
import { Grid } from '@material-ui/core'
import Header from '../components/Header';
import Item from '../components/Item';

export default function Rule() {
  const example = [
    {word: 'w', attributes: { isCorrect: true }},
    {word: 'a', attributes: { isElseWhere: true }},
    {word: 'r', attributes: { isWrong: true }},
    {word: 'm', attributes: { isWrong: true }},
    {word: 'e', attributes: { isCorrect: true }},
    {word: 'r', attributes: { isWrong: true }},
  ]

  return (
    <>
      <Header />
      <Grid container direction="row"
        justifyContent="center"
        alignItems="center">
        <Grid item xs={12} md={6} style={{textAlign: 'center'}}>
          <h3 style={{textAlign: 'center'}}>How to play? </h3>

          <p className='rule'>You have to guess the hidden word in 6 tries and the color of the letters changes to show how close you are.</p>
          <p className='rule'>To start the game, just enter any word, for example:</p>
          <p className='rule'>{
            example.map(val => <div style={{width: '40px', marginRight: '10px', display: 'inline-block'}}>
                <Item word={val.word} attribute={val.attributes} />
              </div>
            )
          }</p>
          <p className='rule'>
            <div style={{width: '50px', marginRight: '10px', display: 'inline-block'}}>
              <Item word={example[0].word} attribute={example[0].attributes} />
            </div>
            is in the word and in the correct spot.
          </p>
          <p className='rule'>
            <div style={{width: '50px', marginRight: '10px', marginLeft: '-5px', display: 'inline-block'}}>
              <Item word={example[1].word} attribute={example[1].attributes} />
            </div>
            is in the word but in the wrong spot.
          </p>
            <p className='rule'>
              <div style={{width: '50px', marginRight: '10px', marginLeft: '-50px', display: 'inline-block'}}>
                <Item word={example[2].word} attribute={example[2].attributes} />
              </div>
              isn't in the target word at all.
            </p>

            <p className='rule'>
              {
                example.map((val, i) => <div style={{width: '40px', marginRight: '10px', display: 'inline-block'}}>
                <Item word={['w', 'e', 'a', 'v', 'e', 's'][i]} attribute={{isCorrect: true}} />
              </div>)
              }
            </p>
            <p className='rule'>Got it!</p>
        </Grid>
      </Grid>
    </>
  )
}