import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CardExplore = (props:any) => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState();
    const [backgroundFile, setBackgroundFile] = useState()
    function setearOpen() {
      setOpen(!open);
    }

    useEffect(() => {
      async function fetchFile (){
      let file:string | any = await axios({
        method:'get',
        url:'http://localhost:4000/api/files/avatarProfile/' + props.activity?.author?._id,
      })

      let backgroundfile:string | any = await axios({
        method:'get',
        url:'http://localhost:4000/api/files/backgroundImageActivity/' + props.activity?._id,
      })

      setBackgroundFile(backgroundfile.data)
  
      setFile(file.data)

      }
  
      fetchFile()
    }, [props.activity])

	return (
		<div
			className="w-[13rem] h-[26rem] rounded overflow-hidden shadow-lg flex flex-col"
			key={props.activity?._id}
		>
		<img
			className="w-full h-44 object-cover"
			src={`data:image/png;base64,${backgroundFile}`}
			alt=""
		/>
		<div className="flex flex-col justify-start items-left px-6 py-2 grow gap-2">
		<div className="capitalize font-bold text-xl break-words">      
		{props.activity?.name.charAt(0)+props.activity?.name.toLocaleLowerCase().substring(1, props.max_length_title)}
		</div>
		<p className="text-[13px] text-gray-700 text-base">
		{props.activity?.desc.length >= props.max_length ? props?.activity?.desc.slice(0, props.max_length).toLowerCase() + "... " : props.activity?.desc.toLowerCase()}
		{
			props.activity?.desc.length >= props.max_length ?
			<Link className="text-[#007AE9] text-xs cursor-pointer" to={"/explore/activity/"+ props.activity?._id} onClick={props.resetStoreActivity}>Learn more</Link>
			: ""
		}
		</p>
		<div className="h-fit w-full mb-1 flex justify-between items-end grow">
		<div className="flex gap-2  items-center text-xs text-[#007AE9] font-bold cursor-pointer">
		<Link to={"/explore/profile/" + props?.activity?.author?._id} onClick={props.resetStoreTeacher}>
			<img
			className="object-cover rounded-full w-8 h-8"
			src={`data:image/png;base64,${file}`}
			alt="imagen"
			/>
		</Link>
		</div>
		<Link to={"/explore/activity/" + props?.activity?._id}>
			<p className="text-[#007AE9] text-xs cursor-pointer" onClick={props.resetStoreActivity}>
			Learn more
			</p>
		</Link>
		</div>
		</div>

		</div>
	)
}

export default CardExplore
