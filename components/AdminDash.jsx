import Card from "./Card";
import { RxPerson } from "react-icons/rx";
import { IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import { BsCollection } from "react-icons/bs";

function AdminDash() {
  return (
    <div className="flex justify-around gap-5 lg:gap-10">
      <Card
        title="Total Students"
        stat="2,420"
        icon={<IoPeopleOutline size={22} />}
      />
      <Card
        title="Total Teachers"
        stat="120"
        icon={<IoPersonOutline size={18} />}
      />
      <Card
        title="Activities"
        stat="43"
        icon={<BsCollection size={18} />}
      />
    </div>
  );
}

export default AdminDash;
