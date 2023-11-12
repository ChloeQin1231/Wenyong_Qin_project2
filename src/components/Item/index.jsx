import React, { Component } from "react";
import "./index.css"


export default class Item extends Component {
  render() {
    const { word, attribute } = this.props
    const { isWrong, isCorrect, isElseWhere } = attribute;
    return <div className={`item ${isWrong ? "wrong" : null} ${isCorrect ? "correct" : null} ${isElseWhere ? "elsewhere" : null}`}>
      {word.toUpperCase()}
    </div>;
  }
}
