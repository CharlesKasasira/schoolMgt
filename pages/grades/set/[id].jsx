'use client'
import React from "react";
import Layout from "../../../components/Layout";
import Heading from "../../../components/Heading";
import { parseCookies } from "../../../utils/parseCookies";
import { supabase } from "../../../utils/supabase";
import { ImFilesEmpty } from "react-icons/im";
import ReportModal from "../../../components/ReportModal";
import { useState } from "react";

function SET({ reports, schoolStudents, exam }) {
  const [showReport, setShowReport] = useState(false);
  const [report, setReport] = useState(null);

  return (
    <Layout title={`${exam.set} ${exam.term} ${exam.year} - School`}>
      <Heading title={`${exam.set} ${exam.term} ${exam.year}`} tagline="Student Results" />
      <div className="">
        <div className="flex mb-2 items-end w-full">
          <label htmlFor="" className="md:w-1/3">
            Student Name
          </label>
          <div className="w-2/3 flex justify-between">
            <label htmlFor="" className="p-1 w-10">
              Math
            </label>
            <label htmlFor="" className="p-1 w-10">
              Eng
            </label>
            <label htmlFor="" className="p-1 w-10">
              Sci
            </label>
            <label htmlFor="" className="p-1 w-10">
              Sst
            </label>
            <label htmlFor="" className="p-1 w-10">
              avg
            </label>
            <label htmlFor="" className="p-1 w-10">
              Gra
            </label>
          </div>
        </div>
        {reports && reports.length > 0 ? (
          reports.map((exam, index) => (
            <>
            {showReport && report.student == exam.student && (
                <ReportModal
                  setShowReport={setShowReport}
                  report={report}
                  student={
                    schoolStudents.filter(
                      (student) => student.id === exam.student
                    )[0]
                  }
                />
              )}
            <div
              key={index}
              className="outline outline-1 outline-gray-300 px-3 py-2 cursor-pointer flex justify-between items-center bg-white mb-2 w-full"
              onClick={() => {
                setReport(exam);
                setShowReport(true);
              }}
            >
              
              <label htmlFor="" className="md:w-1/3">
                {schoolStudents.filter(
                  (student) => student.id === exam.student
                )[0].first_name +
                  " " +
                  schoolStudents.filter(
                    (student) => student.id === exam.student
                  )[0].last_name}
              </label>
              <div className="w-2/3 flex justify-between">
                <div className="p-1 w-10 rounded-sm">{exam.math}</div>
                <div className="p-1 w-10 rounded-sm">{exam.math}</div>
                <div className="p-1 w-10 rounded-sm">{exam.science}</div>
                <div className="p-1 w-10 rounded-sm">{exam.sst}</div>
                <div className="p-1 w-10 rounded-sm">{exam.average}</div>
                <div className="p-1 w-10 rounded-sm">{exam.grade}</div>
              </div>
            </div>
            </>
          ))
        ) : (
          <div className="flex px-5 py-5 flex-col items-center justify-center gap-3">
            <i>
              <ImFilesEmpty size={40} />
            </i>
            <div className="text-sm text-center">
              <h4>No reports</h4>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default SET;

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

  const { data: exam, error: examError } = await supabase
    .from("exams")
    .select("*")
    .eq("id", params.id)
    .single();

  const { data: reports, error } = await supabase
    .from("report")
    .select("*")
    .eq("exam", params.id)
    .order("year", { ascending: false });

  const { data: schoolStudents } = await supabase
    .from("usermeta")
    .select("*")
    .eq("claim", "student");

  // If there is a user, return it.
  return { props: { reports, schoolStudents, exam } };
}
