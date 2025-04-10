import { Activity } from "../types"

export type ActivityAction = 
{type : 'save-activity', payload : {newActivity : Activity}} |
// type son las acciones que se realizan, payload son los datos que se recuperan del formulario
{type : 'set-activeId', payload : {id : Activity['id']}} |
{type : 'delete-activity', payload : {id : Activity['id']}} |
{type : 'restart'} 

export type ActivityState = {
    activities : Activity[]
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[ ] => {
     const activities = localStorage.getItem('activities')
     return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState= {
    activities: localStorageActivities(),
    activeId: ''
}


export const activityReduce = (
        state : ActivityState = initialState, 
        action : ActivityAction
    ) => {

    if (action.type === 'save-activity') {
        let updateActivity : Activity[] = []
        if (state.activeId) {
            updateActivity = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        }else{
            updateActivity = [...state.activities, action.payload.newActivity]
        }
        return {...state, /* se recomiendo tomar una copia del state para evitar perder el estado */
            activities : updateActivity,
            activeId: ''
        }
        
    }

    if (action.type === 'set-activeId') {
        return {...state, activeId: action.payload.id}
    }

    if (action.type === 'delete-activity') {
        return{
            ...state,
            activities : state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if (action.type === 'restart') {
        return{
            activities: [],
            activeId: '' 
        }
    }
    return state
}