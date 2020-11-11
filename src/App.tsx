import * as React from 'react';
import { AppContainer } from './styles'
import { Column } from './Column'
import { useAppState } from './AppStateContext'
import { AddNewItem } from './AddNewItem';

function App() {
  const { state, dispatch } = useAppState()

  return (
    <AppContainer>
      {state.lists.map((list, i) => (
        <Column index={i} text={list.text} key={list.id} />
      ))}
      <AddNewItem toggleButtonText="+ Add another card " onAdd={text => dispatch({ type: "ADD_LIST", payload: text })} />
    </AppContainer>
  );
}

export default App;
