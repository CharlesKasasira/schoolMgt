import { AiFillCloseCircle } from "react-icons/ai";
import { BsPrinterFill } from "react-icons/bs";

function ReportModal({ setShowReport, report }) {
  console.log(report);

  return (
    <div
      className={`bg-black z-20 bg-opacity-40 w-screen min-h-screen fixed top-0 left-0 right-0 flex justify-center`}
    >
      <div className="relative bg-white dark:bg-dark-bg max-h-screen overflow-auto dark:text-secondary-text w-10/12 md:8/12  rounded-sm m-5 sm:mb-5 shadow-md top-50 z-20 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b-[1px] px-4">
            <h1 className="text-center font-bold py-2">
              Term {report.term} {report.year} Report
            </h1>
            <AiFillCloseCircle
              size={25}
              className="cursor-pointer"
              onClick={() => {
                setShowReport(false);
              }}
            />
          </div>
          <main id="printSection" className="w-full">
            <div className="px-4 py-4">
              <h2>School Name</h2>
              <p>Address</p>
            </div>
            <div className="px-4 py-4">
              <div className="flex">
                <p className="w-1/3 font-semibold">Full Name:</p>
                <p>Kasasira Charles</p>
              </div>
              <div className="flex">
                <p className="w-1/3 font-semibold">Gender:</p>
                <p>Male</p>
              </div>
              <div className="flex">
                <p className="w-1/3 font-semibold">Student Number:</p>
                <p>21000</p>
              </div>
              <div className="flex">
                <p className="w-1/3 font-semibold">Year:</p>
                <p>{report.year}</p>
              </div>
              <div className="flex">
                <p className="w-1/3 font-semibold">Term:</p>
                <p>{report.term}</p>
              </div>
            </div>
            <div className="px-4 py-4">
              <table className="outline w-full outline-1 outline-gray-200">
                <thead>
                  <tr>
                    <th className="text-left px-2 py-2">Subject</th>
                    <th className="text-left px-2 py-2">Marks</th>
                    <th className="text-left px-2 py-2">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left px-2 py-1">Science</td>
                    <td className="text-left px-2 py-1">{report.science}</td>
                    <td className="text-left px-2 py-1">Good work</td>
                  </tr>
                  <tr>
                    <td className="text-left px-2 py-1">Math</td>
                    <td className="text-left px-2 py-1">{report.math}</td>
                    <td className="text-left px-2 py-1">Good work</td>
                  </tr>
                  <tr>
                    <td className="text-left px-2 py-1">Social Studies</td>
                    <td className="text-left px-2 py-1">{report.sst}</td>
                    <td className="text-left px-2 py-1">Good work</td>
                  </tr>
                  <tr>
                    <td className="text-left px-2 py-1">English</td>
                    <td className="text-left px-2 py-1">{report.english}</td>
                    <td className="text-left px-2 py-1">Good work</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
        <div className="flex items-center justify-between border-t-[1px] px-4 py-2">
          <h1 className="text-center font-bold py-2"></h1>
          <button
            className="px-3 py-2 bg-gray-900 text-white rounded flex items-center gap-2"
            onClick={() => {
              window.print();
            }}
          >
            <BsPrinterFill />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportModal;
