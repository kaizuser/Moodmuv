import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

//UTILITIES
import activityActions from "../../../redux/actions/activityActions";
import {connect} from "react-redux";
import { RootState } from "../../../main";

const SelectDisciples = (props:any) => {
	const disciples = [
		{
			id:1,
			name:"Todos"
		},

		{
			id: 2,
			name: "Yoga",
		},

		{
			id:3,
			name:'Acroyoga'
		    
		},

		{
			id:4,
			name:'Twerk'
		},

		{
			id:5,
			name:'Biodanza'
		},

		{
			id:6,
			name:'Acrobacia de piso'
		},

		{
			id:7,
			name:'Handstand'
		},
		{
			id:8,
			name:"Escalada"
		},

		{
			id: 9,
			name: "Mano con Mano",
		},

		{
			id:10,
			name:'Aerials'
		    
		},

		{
			id:11,
			name:'Danza Contemporaria'
		},

		{
			id:12,
			name:'Heels Dance'
		},

		{
			id:13,
			name:'Animal Flow'
		},

		{
			id:14,
			name:'Contact'
		},

		{
			id:15,
			name:'Poledance'
		},

	  ];
  function classNames(...classes: any): any {
    return classes.filter(Boolean).join(" ");
  }
  const [selected, setSelected] = useState(disciples[0]);
  
  return (
    <div className="w-32 ">
	    <Listbox value={selected} onChange={(event) => {
		    setSelected(event)
		    props.setParameters(event.name, 'disciples')
		    props.filterActivity(props.activitiesAuxiliar, props.parameters[0], event.name, props.parameters[2], props.parameters[3])
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
                  {disciples.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-indigo-600" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={person}
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
                              {person.name}
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

export default connector(SelectDisciples)
