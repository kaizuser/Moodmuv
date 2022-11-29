//UTILITIES
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../../main";
import Dashboard from "./ActivityPanel";
import { Fade } from "react-awesome-reveal";
//icons
import ActivityIcon from "../../assets/PanelIconos/fireIcons.svg";
import CicleIcon from "../../assets/PanelIconos/folder-openIcons.svg";
import WorkshopIcon from "../../assets/PanelIconos/lightning-boltRayito.svg";
import EventIcon from "../../assets/PanelIconos/starIcons.svg";
import EclipseIcon from '../../assets/PanelIconos/Ellipse 138.svg'
function DashboardContent(props: any) {
  return (
    <>
      {props.currentUser && (
        <Box className="flex flex-col gap-8 justify-start items-center py-4 px-4 min-h-screen grow bg-[#f8f8f9]">
          <Box className="flex w-[99.50%] min-h-[10rem] bg-[#333] rounded-b-md bg-[url('https://user-images.githubusercontent.com/91817152/203515449-37e392bc-a22e-48b9-a49d-c062443ba7c6.png')] flex flex-col justify-center items-start px-4">
            <h1 className="drop-shadow-md text-3xl font-medium text-[#fff] relative">
              Panel de usuario
            </h1>
            <p className=" drop-shadow-md  font-medium text-[#fff] relative">
              El panel donde podrás ver tus actividades, eventos/festivales,
              clinicas de videos
            </p>
          </Box>
          <Box className="gap-4 flex flex-wrap justify-center  w-full min-h-[50vh] bg-[#f8f8f9]">
            {props.currentUser.type === "Teacher" ? (
              <>
                <Link
                  to="/account/panel/teacherActivities"
                  className="w-[49%] rounded-md relative bg-white h-[18rem] shadow flex flex-col gap-8 p-4"
                >
                  <h3 className="font-bold text-sm text-[#323232]">Actividades</h3>
                  <Fade className="flex gap-4">
                    <div className="flex gap-2 w-full items-center">
                      <img
                        className="p-1 w-6 h-6 rounded-full border border-[#3a57e8]"
                        src={CicleIcon}
                        alt="actividades"
                      />
                      <p className="font-bold text-[12px] text-[#323232]">
                        Actividades Regulares:
                      </p>
                    </div>
                  </Fade>
                  <Fade className="flex gap-4">
                    <div className="flex gap-2 w-full items-center">
                      <img
                        className="p-1 w-6 h-6 rounded-full border border-[#1aa053]"
                        src={ActivityIcon}
                        alt="actividades"
                      />
                      <p className="font-bold text-[12px] text-[#323232]">
                        Ciclos:
                      </p>
                    </div>
                  </Fade>

                  <Fade className="flex gap-4">
                    <div className="flex gap-2 w-full items-center">
                      <img
                        className="p-1 w-6 h-6 rounded-full border border-[#c03221]"
                        src={EventIcon}
                        alt="actividades"
                      />
                      <p className="font-bold text-[12px] text-[#323232]">
                        Eventos/Festivales:
                      </p>
                    </div>
                  </Fade>
                  <Fade className="flex gap-4">
                    <div className="flex gap-2 w-full items-center">
                      <img
                        className="p-1 w-6 h-6 rounded-full border border-[#3a57e8]"
                        src={WorkshopIcon}
                        alt="actividades"
                      />
                      <p className="font-bold text-[12px] text-[#323232]">
                        Workshops:
                      </p>
                    </div>
                  </Fade>
                </Link>
                <Link
                  to="/account/panel/teacherEvents"
                  className="w-[49%] rounded-md relative bg-white h-[18rem] shadow flex flex-col gap-8 p-4"
                >
                  <h3 className="font-bold text-sm text-[#323232]">Eventos de Calendario</h3>
                  <Fade className="flex gap-4">
                    <div className="flex gap-2 w-full items-center">
                      <img
                        className="p-1 w-6 h-6 rounded-full "
                        src={EclipseIcon}
                        alt="actividades"
                      />
                      <p className="font-bold text-[12px] text-[#323232]">
                        Cantidad de eventos:
                      </p>
                    </div>
                  </Fade>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/account/panel/studentActivities"
                  className='rounded relative bg-white w-[20rem] h-[15rem] shadow bg-[url("https://post.greatist.com/wp-content/uploads/sites/2/2021/08/GRT-acroyoga-couple-732x549-thumb.jpg")] bg-cover'
                >
                  <span className="text-sm py-1 px-4 bg-white rounded absolute top-2 left-2">
                    Actividades
                  </span>
                </Link>
                <Link
                  to="/account/panel/studentEvents"
                  className='rounded relative bg-white w-[20rem] h-[15rem] shadow bg-[url("https://cdn.andro4all.com/andro4all/2021/09/8-apps-para-descubrir-eventos-cercanos-a-tu-ubicacion.jpg")] bg-cover'
                >
                  <span className="text-sm py-1 px-4 bg-white rounded absolute top-2 left-2">
                    Eventos
                  </span>
                </Link>
              </>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

const mapState = (state: RootState) => {
  return {
    currentUser: state.userReducer.currentUser,
  };
};

const connector = connect(mapState, null);

export default connector(DashboardContent);
