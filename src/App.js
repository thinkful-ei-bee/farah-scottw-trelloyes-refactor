import React, { Component } from 'react';
import List from './List'
import './App.css';

class App extends Component {
  state = {
    lists: [
      {
        id: '1',
        header: 'First list',
        cardIds: [ 'a', 'b', 'e', 'f', 'g', 'j', 'l', 'm' ],
      },
      {
        id: '2',
        header: 'Second list',
        cardIds: ['b', 'c', 'd', 'f', 'h', 'i', 'k'],
      },
      {
        id: '3',
        header: 'Third list',
        cardIds: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm' ],
      },
      {
        id: '4',
        header: 'Fourth list',
        cardIds: [ 'l', 'm' ],
      },
    ],
    allCards: {
      'a': { id: 'a', title: 'First card', content: 'lorem ipsum' },
      'b': { id: 'b', title: 'Second card', content: 'lorem ipsum' },
      'c': { id: 'c', title: 'Third card', content: 'lorem ipsum' },
      'd': { id: 'd', title: 'Fourth card', content: 'lorem ipsum' },
      'e': { id: 'e', title: 'Fifth card', content: 'lorem ipsum' },
      'f': { id: 'f', title: 'Sixth card', content: 'lorem ipsum' },
      'g': { id: 'g', title: 'Seventh card', content: 'lorem ipsum' },
      'h': { id: 'h', title: 'Eighth card', content: 'lorem ipsum' },
      'i': { id: 'i', title: 'Ninth card', content: 'lorem ipsum' },
      'j': { id: 'j', title: 'Tenth card', content: 'lorem ipsum' },
      'k': { id: 'k', title: 'Eleventh card', content: 'lorem ipsum' },
      'l': { id: 'l', title: 'Twelfth card', content: 'lorem ipsum' },
      'm': { id: 'm', title: 'Thirteenth card', content: 'lorem ipsum' },
    }
  };

  //identify the list
  //map through list.cardIds removing targeted id
  //return the new array

  deleteCardId(listKey, cardKey) {
    return this.state.lists.map(obj => {
      if(obj.id === listKey) {
        return {
          ...obj,
          cardIds: obj.cardIds.filter(id => id !== cardKey ),
        }
      }else{return obj;}
    });
  }

  addRandomCard(){
    const id = Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }
  }
  addCardToList(listId, newCardId){
    return this.state.lists.map(obj => {
      if (obj.id === listId){
        return {
          ...obj, 
          cardIds: [...obj.cardIds, newCardId]
        };
      } else {return obj;}
      });
  }

  handleDeleteItem(listKey, cardKey){
    const newLists = this.deleteCardId(listKey, cardKey)
    this.setState({
      lists: newLists,
    })
  }
  handleAddRandomCard(listId){
    const randomCard = this.addRandomCard()
    // console.log(randomCard);
    // console.log(listId);
    const randomCardId = randomCard.id;
    const newLists = this.addCardToList(listId, randomCardId);
    this.setState({
      lists: newLists,
      allCards: {
        ...this.state.allCards,
        [randomCardId]: randomCard,
      }
    })
    // console.log(this.state.allCards);
  }

  deleteAllCardsFromLists(id){
    return this.state.lists.map(obj => {
      return {
        ...obj,
        cardIds: obj.cardIds.filter(cardId => cardId !== id ),
      };
    })
  }

  // deleteFromAllCards(id){
  //   const newAllCards = this.state.allCards.filter(prop => prop.id !== id);
  //   return newAllCards;
  // }

  omit(obj, keyToOmit) {
    return Object.entries(obj).reduce(
      (newObj, [key, value]) =>
          key === keyToOmit ? newObj : {...newObj, [key]: value},
      {}
    );
  }

  handleDeleteAllItem(id){
    const newLists = this.deleteAllCardsFromLists(id);
    const newCards = this.omit(this.state.allCards, id);
    this.setState({
      lists: newLists,
      allCards: newCards,
    })
  }



  render() {
    const store  = this.state
    console.log(this.state);
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
        {console.log(this.state.store)}
          {store.lists.map(list => (
            <List
              id={list.id}
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              deleteItem={this.handleDeleteItem.bind(this)}
              deleteAllItem={this.handleDeleteAllItem.bind(this)}
              addItem={this.handleAddRandomCard.bind(this)}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
