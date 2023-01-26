import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

//UTILITIES
import activityActions from "../../../redux/actions/activityActions";
import {connect} from "react-redux";
import { RootState } from "../../../main";

const SelectType = (props:any) => {
	const type = [
		{
			id:1,
			name:"Todos",
			type:"Todos"
		},

		{
			id: 2,
			name: "Taller",
			type:'Workshop'
		},

		{
			id:3,
			name:'Ciclo',
			type:'Cicle'
		},

		{
			id:4,
			name:'Clase',
			type:'Class'
		    
		},

		{
			id:5,
			name:'Evento',
			type:'Event'
		    
		},
	  ];
  function classNames(...classes: any): any {
    return classes.filter(Boolean).join(" ");
  }
  const [selected, setSelected] = useState(type[0]);
  
  return (
    <div className="w-32 ">
	    <Listbox value={selected} onChange={(event) => {
		    setSelected(event)
		    props.setParameters(event.type, 'type')
		    props.filterActivity(props.activitiesAuxiliar, props.parameters[0], props.parameters[1], props.parameters[2], event.type)
	    }}>
        {({ open }) => (
          <>
	     <div className="relative ">
              <Listbox.Button className="py-2 relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">{selected.name}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {type.map((type) => (
                    <Listbox.Option
                      key={type.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-indigo-600" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={type}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {type.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

const mapDispatch = {
	filterActivity:activityActions.filterActivity
}

const mapState = (state:RootState) => {
	return {
		activitiesAuxiliar:state.activityReducer.activitiesAuxiliar
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(SelectType)
