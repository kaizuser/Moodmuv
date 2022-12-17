import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";

import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function Example(props:any) {
    let [fileValue, setFile] = useState('')

	useEffect(() => {
	  async function fetchFile (){
		let file:string | any = await axios({
			method:'get',
			url:'http://localhost:4000/api/files/backgroundImageActivity/' + props.activity?._id,
		})

		setFile(file.data)
	  }

	  fetchFile()
	}, [props.activity])

      const max_length =  16
    return (
      <Card className="w-96 my-4">
        <CardHeader color="blue" className="relative h-56">
          <img
            src={`data:image/png;base64,${fileValue}`}
            alt="img-blur-shadow"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2 break-all">
            {props.activities?.name.length > max_length ? (props.activities?.name.slice(0, max_length) + "...") : (props.activities?.name)}
          </Typography>

        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
            <Link to={"/explore/activity/" + props.activities?._id}>
              <Typography variant="small" color="gray" className="flex gap-1">
            Ver detalle
              </Typography>
            </Link>
          <Typography variant="small" color="gray" className="flex gap-1">
            <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
            Eliminar
          </Typography>
        </CardFooter>
      </Card>
    );
  }
