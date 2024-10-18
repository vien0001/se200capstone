import Sidebar from "../../components/Sidebar";
const Home = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      <Sidebar />
      <div className="flex-1 p-4"></div>
    </div>
  );
};

export default Home;
