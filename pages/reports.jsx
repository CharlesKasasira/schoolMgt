import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import ReportModal from "../components/ReportModal";
import { IoIosArrowDown } from "react-icons/io";
import { parseCookies } from "../utils/parseCookies";

function Reports({ person }) {
  const [showReport, setShowReport] = useState(false);
  const [report, setReport] = useState(null);
  const [myReports, setMyReports] = useState([]);

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
      console.log(data);
      setMyReports(data);
    } else if (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Report - School">
      <Heading title="Reports" tagline="Mange your reports" />
      {showReport && (
        <ReportModal setShowReport={setShowReport} report={report} />
      )}
      <div className="">
        {myReports &&
          myReports.length > 0 &&
          myReports.map((report, index) => (
            <div
              key={index}
              className="outline outline-1 outline-gray-300 px-3 py-2 cursor-pointer flex justify-between items-center"
              onClick={() => {
                setReport(report);
                setShowReport(true);
              }}
            >
              <p>
                Term {report.term} {report.year}
              </p>
              <IoIosArrowDown />
            </div>
          ))}
        {/* <div className="outline outline-1 px-3 py-2 cursor-pointer flex justify-between items-center">
          <p>2023</p>
          <IoIosArrowDown />
        </div>
        <ul className="px-10 py-2">
          <li
            className="cursor-pointer"
            onClick={() => {
              setReport({ term: 1, year: 2023 });
              setShowReport(true);
            }}
          >
            Term 1
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              setReport({ term: 2, year: 2023 });
              setShowReport(true);
            }}
          >
            Term 2
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              setReport({ term: 3, year: 2023 });
              setShowReport(true);
            }}
          >
            Term 3
          </li>
        </ul>
      </div>
      <div className="">
        <div className="outline outline-1 px-3 py-2 cursor-pointer flex justify-between items-center">
          <p>2022</p>
          <IoIosArrowDown />
        </div>
        <ul className="px-10 py-2">
          <li
            className="cursor-pointer"
            onClick={() => {
              setReport({ term: 1, year: 2022 });
              setShowReport(true);
            }}
          >
            Term 1
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              setReport({ term: 2, year: 2022 });
              setShowReport(true);
            }}
          >
            Term 2
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              setReport({ term: 3, year: 2022 });
              setShowReport(true);
            }}
          >
            Term 3
          </li>
        </ul>
      </div>
      <div className="">
        <div className="outline outline-1 px-3 py-2 cursor-pointer flex justify-between items-center">
          <p>2021</p>
          <IoIosArrowDown />
        </div>
        <ul className="px-10 py-2">
          <li
            className="cursor-pointer"
            onClick={() => {
              setReport({ term: 1, year: 2021 });
              setShowReport(true);
            }}
          >
            Term 1
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              setReport({ term: 2, year: 2021 });
              setShowReport(true);
            }}
          >
            Term 2
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              setReport({ term: 3, year: 2021 });
              setShowReport(true);
            }}
          >
            Term 3
          </li>
        </ul> */}
      </div>
    </Layout>
  );
}

export default Reports;

export async function getServerSideProps({ req, res }) {
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

  // If there is a user, return it.
  return { props: { person } };
}
