//BASICS
import { useEffect, useState,} from "react";

//UTILITIES
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import activityActions from "../../../redux/actions/activityActions";
import databaseActions from '../../../redux/actions/databaseActions'
import userActions from "../../../redux/actions/userActions";
import { RootState } from "../../../main";
import CardActivity from "./CardActivity";
import CardCarousel from "../../profile/account/CarouselCardsDetails";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

//INTERFACES
import activityDTO from "../../../types/activityDTO";

function DashboardContent(props: any) {
  let [activities, setActivities] = useState([]);
  let param = useParams()

  useEffect(() => {
    if (!props.activities) {
      props.fetchActivities();
    }
    if (props.activities && props.currentUser) {
      setActivities(props.activities.filter((activity: activityDTO) => {
          return activity.author?._id == props.currentUser._id;
        })
      );
    }
  }, [props.activities, props.currentUser]);

  const deleteActivity = async(id:string) =>{
    Swal.fire({
	title: 'Estas seguro de eliminar esta actividad',
	showDenyButton: true,
	confirmButtonText: 'Confirmar',
	denyButtonText: `Cancelar`,
	}).then(async(result) => {
	if (result.isConfirmed) {
		await props.deleteActivityImage(id)
		await props.deleteActivity(id)
		props.fetchActivities()

	} else if (result.isDenied) {
		Swal.fire('No se ha efectuado ninguna operación', '', 'info')
	}
	})
  }

  return (
    <>
      <Box className="flex flex-col gap-4 justify-start items-center py-4 px-4 min-h-screen grow bg-[#f8f8f9]">
        <Box className="flex w-[99.50%] min-h-[10rem] bg-[#333] rounded-b-md bg-[url('https://user-images.githubusercontent.com/91817152/203515449-37e392bc-a22e-48b9-a49d-c062443ba7c6.png')] flex flex-col justify-center items-start px-4">
          <h1 className="drop-shadow-md text-3xl font-medium text-[#fff] relative">
            Actividades
          </h1>
          <p className="drop-shadow-md  font-medium text-[#fff] relative">
            El panel donde podrás ver tus actividades regulares y no regulares.
          </p>
        </Box>
        <Box className="gap-4 py-4 items-center flex flex-col grow w-[99.50%] min-h-[50vh] bg-[#f8f8f9]">
          <Link
            to="/account/panel/teacherActivities/createactivity"
            className="flex gap-4 p-4 items-center text-white rounded bg-white w-full h-[6rem] shadow-sm bg-[#ecfdf5] bg-cover"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 p-2 rounded-full bg-[#34d399] text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <p className="text-[#047857]">Agregar Actividad</p>
          </Link>
          <div className="flex flex-col gap-8 w-full">
            <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B] drop-shadow-2xl text-3xl my-4 text-center">
              Actividades de {props.currentUser?.name}
            </h1>
            <div className="flex flex-wrap gap-4 w-full min-h-4 items-center justify-center">
              {activities &&
                activities
                  .filter((activity: activityDTO) => activity.type === param.type)
                  .map((activity: activityDTO) => (
                    <div
                      style={{
                        padding: ".7rem",
                        width: "20rem",
                        minHeight: "20rem",
                      }}
                      className="flex flex-col justify-start items-start rounded-3xl bg-[#fefefe] shadow m-4"
		      key={activity._id}
                    >
                      <CardCarousel activity={activity} />
			  <div className="flex justify-between w-full text-[#999] my-2 px-2">
				<Link to={"/explore/activity/" + activity._id } className="text-sm" onClick={props.resetStore}>Ver detalle</Link>
				<p className="text-sm cursor-pointer" onClick={()=>deleteActivity(activity._id)}>Eliminar</p>
				
			  </div>
                    </div>
                  ))}
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

const mapDispatch = {
  fetchActivities: activityActions.fetchActivities,
  verifyToken: userActions.verifyToken,
  resetStore:activityActions.resetStore,
  deleteActivity:activityActions.deleteActivity,
  deleteActivityImage:databaseActions.deleteActivityImage,

};

const mapState = (state: RootState) => {
  return {
    currentUser: state.userReducer.currentUser,
    activities: state.activityReducer.activities,
  };
};

const connector = connect(mapState, mapDispatch);

export default connector(DashboardContent);
