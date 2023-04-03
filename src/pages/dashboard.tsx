import BodyDashboard from "@/components/Dashboard/bodyDashboard"
import HeaderDashboard from "@/components/Dashboard/headerDashboard"
import nookies from "nookies"
import { GetServerSideProps } from "next";
import { IDashboardProps } from "@/types";

const Dashboard = ({token, userId}: IDashboardProps) => {
  return (
    <>
      <HeaderDashboard token={token} userId={userId}/>
      <BodyDashboard token={token}/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  if (!cookies["desafio.token"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { 
        token: cookies["desafio.token"],
        userId: cookies["desafio.userId"]
    },
  };
};
export default Dashboard