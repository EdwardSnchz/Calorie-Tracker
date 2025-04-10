import { useMemo, Dispatch } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, XCircleIcon} from '@heroicons/react/24/outline'
import { ActivityAction } from "../reducers/activityReducer"

type ActivityListProps = {
  activities : Activity[],
  dispatch: Dispatch<ActivityAction>
}

export default function ActivityList({activities, dispatch } : ActivityListProps) {
  
  const categoryName = useMemo(() => 
    (category : Activity['category']) => categories.map( cat => cat.id === category ? cat.name : ''), [activities])
  
  const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

  function scrolltop() {
    const idForm = document.getElementById('calorie-form');
    const BtnText1 = document.getElementById('BtnSubmit1') as HTMLButtonElement
    const BtnText2 = document.getElementById('BtnSubmit2') as HTMLButtonElement

    if (idForm) {
      setTimeout(() => {
        BtnText2.hidden = false
        BtnText1.hidden = true
      }, 100);

      // Eliminar clase después de un tiempo (4 segundos)
      const removeBorder = () => {
        setTimeout(() => {
          idForm.classList.remove('sombra');
        }, 4000);
      };

      /* Redirige al usuario hacia el formulario para editarlo*/
      window.scrollTo({
        top: 0, /* ó se puede usar "idForm.offsetTop" para obtener la posición vertical de un elemento relativa a su contenedor posicionado*/
        behavior: 'smooth'
      });
      
      idForm.classList.add('sombra');
      removeBorder();
    } else {
      console.error('Formulario no encontrado');
    }
  }

  return (
    <>
      <h2 className=" text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>
      { isEmptyActivities ?
        <p className=" text-center pt-5">No hay actividades aun...</p> :
        activities.map(activity => (
          <div key={activity.id} className=" px-5 py-10 bg-white mt-5 flex justify-between">
            <div className="space-y-2 relative">

              <p className={` absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold rounded-sm ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                {categoryName(+activity.category)}
              </p>

              <p className=" text-2xl font-bold pt-5">{activity.name}</p>

              <p className={`font-black text-4xl ${activity.category === 1 ? 'text-lime-500' : 'text-orange-500'}`}>
                {activity.calories} {''}
                <span>Calorias</span>
              </p>
            </div>

            <div className=" flex gap-5 items-center">
              <button 
                onClick={() => {
                  dispatch({type:'set-activeId', payload: {id: activity.id}});
                  scrolltop()
                }}
              >
                <PencilSquareIcon
                  className=" h-8 w-8 text-gray-800 cursor-pointer"
                />
              </button>

              <button onClick={() => dispatch({type:'delete-activity', payload: {id: activity.id}})}>
                <XCircleIcon
                  className=" h-8 w-8 text-red-500 cursor-pointer"
                />
              </button>
            </div>
          </div>
        ))
      }
    </>
  )
}
