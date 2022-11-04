import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true
  },

  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true
  },

  {
    id: 3,
    text: 'Context 만들기',
    done: false
  },

  {
    id: 4,
    text: '기능 구현하기',
    done: false
  }

];

function todoReducer(state, action) {       // state,action 두 개의 파라미터를 가진 리듀서.
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);     //concat은 기존 배열에 새 배열을 추가하는 것임.즉 하나 생성하니까 하나 추가된 새 배열

    case 'TOGGLE':
      return state.map(todo =>              // map반복문을 이용한 삼항연산임. todo랑 action id 같으면 map 함수에 의해 
        todo.id === action.id ? { ...todo, done: !todo.done } : todo 
      );//state 배열 내의 객체 하나하나들({id:1, text: '프로젝트 생성하기', done: false} 등)을 처음부터 순차적으로 순회하면서 작업
      
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);  //filter는 조건에 알맞는 배열을 만들어줌. 

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
      throw new Error('Cannot find TodoProvider');
    }
    return context;
  }
  
  export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
      throw new Error('Cannot find TodoProvider');
    }
    return context;
  }
  
  export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
      throw new Error('Cannot find TodoProvider');
    }
    return context;
  }