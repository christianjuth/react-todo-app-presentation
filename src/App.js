import * as React from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [inputVal, setInputVal] = React.useState('');

  let initItems = [];
  try {
    initItems = JSON.parse(localStorage.todoItems);
  } catch(e) {}
  const [items, setItems] = React.useState(initItems);

  function handleCheck(id) {
    const index = items.findIndex(item => item.id === id);
    const itemsClone = items.slice(0);

    const selected = itemsClone[index];

    itemsClone[index] = {
      ...selected,
      checked: !selected.checked
    }

    setItems(itemsClone);
  }

  React.useEffect(() => {
    const itemsClone = items.slice(0).filter(item => !item.checked);
    localStorage.todoItems = JSON.stringify(itemsClone);
  }, [items]);

  return (
    <div className="app">
      <div className="todoList">
        <h1>Todo List</h1>
        <hr/>
        {items.map((item, i) => (
          <form 
            key={item.id}
            className="todoItem"
            onClick={() => handleCheck(item.id)}
            onSubmit={e => {
              e.preventDefault();
              handleCheck(item.id);
            }}
          >
            <span
              style={{
                textDecoration: item.checked ? 'line-through' : undefined
              }}
            >
              {item.title}
            </span>
            <input
              checked={item.checked}
              type='checkbox'
              onChange={() => handleCheck(item.id)}
            />
            <button 
              type='submit'
              style={{display: 'none'}}
            />
          </form>
        ))}
        <form 
          onSubmit={e => {
            e.preventDefault();
            if (inputVal !== '') {
              setItems([
                ...items,
                {
                  id: uuidv4(),
                  title: inputVal,
                  checked: false
                }
              ]);
              setInputVal('');
            } 
          }}
        >
          <input 
            value={inputVal}
            className="input"
            placeholder="What needs to get done?"
            onChange={e => setInputVal(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default App;