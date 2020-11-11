import React, { createContext, useReducer, useContext, Reducer } from 'react'
import { v4 } from 'uuid'
import { moveItem } from './moveItem'
import { findItemIndexById } from './utils/findItemIndexById'

type Action = | { type: "ADD_LIST", payload: string } | { type: "ADD_TASK", payload: { text: string; taskId: string } } | {
  type: "MOVE_LIST", payload: {
    dragIndex: number,
    hoverIndex: number
  }
}

interface Task {
  id: string;
  text: string
}

interface List {
  id: string;
  text: string;
  tasks: Task[];
}

export interface AppState {
  lists: List[]
}

const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "Todo",
      tasks: [{ id: "c0", text: "Geneerate app scafold" }]
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn typescript" }]
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }]
    }
  ]
}

interface AppStateContextProps {
  state: AppState
  dispatch: any
}


const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

const appStateReducer: Reducer<AppState, Action> = (state: AppState, action: Action) => {
  switch (action.type) {
    case "ADD_LIST": {
      return {
        ...state,
        lists: [
          { id: v4(), text: action.payload, tasks: [] }
        ]
      }
    }

    case "ADD_TASK": {
      const targetLaneIndex = findItemIndexById(state.lists, action.payload.taskId)
      state.lists[targetLaneIndex].tasks.push({
        id: v4(),
        text: action.payload.text
      })
      return {
        ...state,
      }
    }
    case "MOVE_LIST": {
      const { dragIndex, hoverIndex } = action.payload
      state.lists = moveItem(state.lists, dragIndex, hoverIndex)
      return {
        ...state
      }
    }

    default:
      return state

  }
}


export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData)

  const value = { state, dispatch }

  return (
    <AppStateContext.Provider value={value as AppStateContextProps}>
      {children}
    </AppStateContext.Provider>
  )
}


export const useAppState = () => {
  return useContext(AppStateContext)
}
