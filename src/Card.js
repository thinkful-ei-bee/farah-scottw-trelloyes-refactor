import React from 'react';
import './Card.css';

export default function Card(props) {
  return (
    <div className='Card'>
      <button
        onClick={() => {props.deleteItem(props.listKey, props.id)}}
        type='button'
      >
        delete
      </button>
      <button
        onClick={() => {props.deleteAllItem(props.id)}}
        type='button'
      >
        delete all
      </button>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  )
}
