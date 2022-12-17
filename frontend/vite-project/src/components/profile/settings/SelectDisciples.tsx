import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function AnimatedMulti(props:any) {

  const disciples= [
    { value: 'Acroyoga', label: 'Acroyoga', isFixed: true },
    { value: 'Yoga', label: 'Yoga', isFixed: true },
    { value: 'Handstand', label: 'Handstand', isFixed: true },
    { value: 'Twerk', label: 'Twerk',isFixed: true },
    { value: 'Animal Flow', label: 'Animal Flow', isFixed: true },
    { value: 'Danza Contemporanea', label: 'Danza Contemporanea', isFixed: true }
  ];
  const selectValues = (values:any) =>{
    let listDisc:any = []
    values.forEach((e:any) => {
      listDisc.push(e.value)
    })
    props.setDisc(listDisc)
}
  let listDisciples:any = []
  props.disciples.forEach((e:any) =>{
    let disciple = { 
      value: e,
      label: e,
      isFixed: true
  }
  listDisciples.push(disciple)
  })
  
  return (
    <Select
      className='grow '
      closeMenuOnSelect={false}
      components={animatedComponents}
      name={"disciples"}
      isMulti
      defaultValue={listDisciples}/* OBJETOS */
      options={disciples}/* ARRAYS */
      onChange={async(e)=>{
        selectValues(e)
      }}
    />
  )
}
