import React, { Component } from 'react'
import Item from "../Item"
import "./index.css"
export default class Screen extends Component {
    render() {
        const { words,attributes, mode } = this.props
        return (
            <div className={mode === 'easy' ? 'screen' : 'screen-hard'}>
                {
                    words.map((word, index) => {
                        return <Item key={index} word={word} attribute={attributes[index]} />
                    })
                }
            </div>
        )
    }
}
