import { useEffect, useReducer } from "react"
import Form from "./components/Form"
import { initialState, activityReduce } from "./reducers/activityReducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"

function App() {

  const [state, dispatch] = useReducer(activityReduce, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  },[state.activities])

  // const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])
  const canRestartApp : boolean = state.activities.length > 0
  
  return (
    <>
      <header className=" bg-lime-600 py-3">
        <div className=" max-w-4xl mx-auto flex justify-between items-center">
          <h1 className=" text-center text-lg font-bold text-white uppercase">Contador de calorias</h1>
          <button className=" bg-gray-800 hover:bg-gray-950 p-2 font-bold uppercase text-white cursor-pointer rounded-xl text-sm disabled:opacity-10 disabled:cursor-auto"
            disabled={!canRestartApp}
            onClick={() => dispatch({type:'restart'})}
          >
            Reiniciar app
          </button>
        </div>
      </header>

      <section className=" bg-lime-500 py-20 px-5">
        <div className=" max-w-4xl mx-auto">
          <Form
          dispatch={dispatch}
          state={state}
          />
        </div>
      </section>

      <section className=" bg-gray-800 py-10">
        <div className=" max-w-4xl mx-auto">
          <CalorieTracker
            activities={state.activities }
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
