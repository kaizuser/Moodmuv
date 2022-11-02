import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

function DashboardContent() {

  return (
        <Box className="flex flex-col items-center p-4 h-screen grow bg-[#f8f8f9]">
            <Box className=" w-11/12 h-[15rem] bg-[#333] rounded bg-[url('https://www.teclab.edu.ar/wp-content/uploads/2017/04/Carrera.jpg')] bg-cover bg-center relative flex justify-center items-center">
                <span className="absolute w-full h-full bg-black opacity-50"></span>
                <h1 className="text-5xl font-bold text-center text-[#fff] relative">Eventos</h1>
            </Box>
        </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
