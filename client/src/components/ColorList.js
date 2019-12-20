import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' }
}

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  console.log(colorToEdit);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  }

  const saveEdit = event => {
    event.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res.data);
        updateColors(colors.map(color => color.id === res.data.id ? res.data : color));
        setEditing(false);
      })
  }

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        console.log(res);
        // updateColors(colors.filter(color => {
        //   if (color.id !== res.data) {
        //     return color;
        //   }
        // }))
        updateColors(colors.filter(color => color.id !== res.data));
      })
  }

  const addColor = () => {
    
  }

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className='delete' onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className='spacer' />
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
                <input
            onChange={e =>
              setColorToEdit({ ...colorToEdit, color: e.target.value })
            }
            value={colorToEdit.color}
          />
        </label>
        <label>
          hex code:
                <input
            onChange={e =>
              setColorToEdit({
                ...colorToEdit,
                code: { hex: e.target.value }
              })
            }
            value={colorToEdit.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">save</button>
          <button onClick={() => setEditing(false)}>cancel</button>
        </div>
      </form>
      )}
          <div className="spacer" />
    </div>
  );
};

export default ColorList;