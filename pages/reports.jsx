import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import ReportModal from "../components/ReportModal";
import { IoIosArrowDown } from "react-icons/io";
import { parseCookies } from "../utils/parseCookies";
import { ImFilesEmpty } from "react-icons/im";
import { useAuth } from "../utils/auth";

function Reports({ person, reports }) {
  const [showReport, setShowReport] = useState(false);
  const [report, setReport] = useState(null);
  const [myReports, setMyReports] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    getReports();
    return () => {};
  }, []);

  const getReports = async () => {
    const { data, error } = await supabase
      .from("report")
      .select("*")
      .eq("student", JSON.parse(person.user).user.id)
      .order("year", { ascending: false });
    if (data) {
      setMyReports(data);
    } else if (error) {}
  };

  return (
    <Layout title="Report - School">
      <Heading title="Reports" tagline="Mange your reports" />
      {showReport && (
        <ReportModal
          setShowReport={setShowReport}
          report={report}
          student={user}
        />
      )}
      <div className="">
        {reports && reports.length > 0 ? (
          reports.map((report, index) => (
            <div
              key={index}
              className="outline outline-1 outline-gray-300 px-3 py-2 cursor-pointer flex justify-between items-center bg-white"
              onClick={() => {
                setReport(report);
                setShowReport(true);
              }}
            >
              <p>
                Term {report.term} {report.set?.toUpperCase()} {report.year}
              </p>
              <IoIosArrowDown />
            </div>
          ))
        ) : (
          <div className="flex px-5 py-5 flex-col items-center justify-center gap-3">
            <i>
              <ImFilesEmpty size={40} />
            </i>
            <div className="text-sm text-center">
              <h4>No Reports</h4>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Reports;

export async function getServerSideProps({ req, res, params }) {
  const person = parseCookies(req);
  if (res) {
    if (!person.user) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    }
  }

  const { data: reports, error } = await supabase
    .from("report")
    .select("*")
    .eq("student", JSON.parse(person.user).user.id)
    .order("year", { ascending: false });

  return { props: { person, reports } };
}
