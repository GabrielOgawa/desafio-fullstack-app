import BodyDashboard from "@/components/Dashboard/bodyDashboard"
import HeaderDashboard from "@/components/Dashboard/headerDashboard"
import api from "@/services/api"
import { IDashProps } from "@/types"
import { GetServerSideProps } from "next"
import nookies from "nookies"

const Dashboard = ({userName, token}: IDashProps) => {
  return (
    <>
      <HeaderDashboard userName={userName}/>
      <BodyDashboard token={token}/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  if(!cookies["desafio.token"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }
  return {
    props: {userName: cookies["desafio.userName"], token: cookies["desafio.token"]}
  }
}
export default Dashboard