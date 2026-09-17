import { useCallback, useState, memo } from 'react'
import './App.css'

const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
const colors = ['navy', 'blue', 'aqua', 'teal', 'olive', 'green', 'lime', 'yellow', 'orange', 'red', 'maroon', 'fuchsia', 'purple', 'silver', 'gray', 'black'];
const fruits = ['apple', 'banana', 'watermelon', 'orange', 'peach', 'tangerine', 'pear', 'kiwi', 'mango', 'pineapple'];

const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.reduce(
          (acc, color) => [
            ...acc,
            {
              name: `${size} ${color} ${fruit}`,
              color,
            },
          ],
          [],
        ),
      ],
      [],
    ),
  ],
  [],
);

const ListItem = memo(function ListItem({ item, selected, onToggle }) {
  const handleClick = useCallback(() => {
    onToggle(item.name)
  }, [item.name, onToggle])

  return (
    <li
      className={`List__item List__item--${item.color} ${
        selected ? 'List__item--selected' : ''
      } ${
        (item.color === 'black' || item.color === 'navy') && selected ? 'List__item--selected_black' : ''
      }`}
      onClick={handleClick}
    >
      {item.name}
    </li>
  )
})


function App() {
  const [selectedItems, setSelectedItems] = useState(() => new Set())

  const toggleItem = useCallback((itemName) => {
    setSelectedItems((currentSelected) => {
      const nextSelected = new Set(currentSelected)

      if (nextSelected.has(itemName)) {
        nextSelected.delete(itemName)
      } else {
        nextSelected.add(itemName)
      }

      return nextSelected
    })
  }, [])

  const selectedNames = Array.from(selectedItems)

  return (
    <>
      <div className="SelectedItems">
        <h2>Selected Items</h2>

        {selectedNames.length === 0 ? (
          <p>No items selected</p>
        ) : (
          <ul>
            {selectedNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        )}
      </div>

      <ul className="List">
        {items.map((item) => (
          <ListItem
            key={item.name}
            item={item}
            selected={selectedItems.has(item.name)}
            onToggle={toggleItem}
          />
        ))}
      </ul>
    </>
  )
}

export default App
