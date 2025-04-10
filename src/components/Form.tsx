import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4} from 'uuid'
import { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityAction, ActivityState } from "../reducers/activityReducer"

type FormProps = {
  dispatch : Dispatch<ActivityAction>
  state : ActivityState
}

const initialState : Activity = {
  id: uuidv4(), /* se instala la librerira uuid para crear id's */
  category: 1,
  name: '',
  calories: 0
}

export default function Form({dispatch, state} : FormProps) {

  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(() => {
    if (state.activeId) {
      setActivity(state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0])
    }
  }, [state.activeId])

  function handleChange(e : ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) {
    const isNumberField = ['category', 'calories'].includes(e.target.id)

    setActivity({
      ...activity,
      /* "key: value" es lo que representa la siguiente linea*/
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
      /* El más convierte el valor en number */
    })
  }
    
  function isValidActivity() {
    const {name, calories} = activity
    return name.trim() !== '' && calories > 0
    // .trim() sirve para eliminar los espacios en blanco pero no modifica la cadena original
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    dispatch({type: 'save-activity', payload : {newActivity : activity}})

    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }

  return (
    <form className=" space-y-5 bg-white shadow p-10 rounded-lg" id="calorie-form" onSubmit={handleSubmit}>

      <div className=" grid grid-cols-1 gap-3">
        <label htmlFor="category" className=" font-bold">Categria:</label>
        <select name="" id="category" className=" border border-slate-300 p-2 rounded-lg w-full bg-white" value={activity.category} onChange={handleChange}>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className=" font-bold">Actividad:</label>
        <input name="" id="name" type="text" className=" border border-slate-300 p-2 rounded-lg " placeholder="Ej. Comida, Bebida, Ejercicio" value={activity.name} onChange={handleChange}></input>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className=" font-bold">Calorias:</label>
        <input name="" id="calories" type="number" className=" border border-slate-300 p-2 rounded-lg" placeholder="Ej. 300" value={activity.calories} onChange={handleChange}></input>
      </div>

      <input 
      className=" bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer rounded disabled:opacity-10" 
      type="submit"
      value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
      id="BtnSubmit1"
      disabled={!isValidActivity()}>
      </input>

    </form>
  )
} 
