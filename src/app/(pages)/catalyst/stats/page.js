import Template from '@/app/Template'
import Stats from "./Stats"

function page() {
  return (
    <Template Contents ={ <Stats />} />
  )
}

export default page