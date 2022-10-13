import { BoltIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'
import { HiUser, HiVideoCamera } from 'react-icons/hi'
const features = [


  {
    name: 'Alumnos',
    description:
      'Registro por correo electrónico de alumnos, tendrás la información en un solo lugar y siempre disponible. Nombre, Edad, Fecha de Cumpleaños, Pagos, Reservas y mucho más!',
    icon: HiUser,
  },
  {
    name: 'Clases',
    description:
      'Un cronograma de clases con todas tus actividades. Cada clase tiene cupo, para que nunca haya más alumnos de los que indiques, el sistema controla todo de forma automática.',
    icon: HiVideoCamera,
  },
  {
    name: 'Pagos',
    description:
      'Puedes crear las fichas de pagos de tus alumnos para que ellos reserven sus clases. También puedes crear Packs de Clases!',
    icon: BoltIcon,
  },
  {
    name: 'Reservas y cancelaciones',
    description:
      'Los alumnos podrán cancelar y reagendar sus clases (siempre respetando las condiciones que estén definidas en el sistema).',
    icon: ChatBubbleBottomCenterTextIcon,
  },
]

export default function Example() {
  return (
    <div className="mt-12 rounded-3xl border py-12 bg-[#f8fafc] w-11/12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-lg font-semibold text-indigo-600">Integración</h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
          Todo en un solo lugar
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Cronograma de Clases, Alumnos, Reservas, Fichas de Pago, Packs de Clases, Balance, Gráficos de Estadísticas y mucho más!
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-[#222] text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}