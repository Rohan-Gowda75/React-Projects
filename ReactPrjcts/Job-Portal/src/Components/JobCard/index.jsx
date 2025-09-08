import dayjs from "dayjs";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function JobCard(props) {
  const postedDate = dayjs(props.postedOn);
  const postedFromNow = postedDate.fromNow();

  return (
    <div className="mx-4 md:mx-40 mb-4">
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-4 bg-zinc-200 rounded-md border border-black shadow-lg
                            hover:border-blue-500 hover:translate-y-1 hover:scale-105 transition-all"
      >
        {/* Job Info */}
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-lg font-semibold">
            {props.title} - {props.company}
          </h1>
          <p>
            {props.type} &#x2022; {props.experience} &#x2022; {props.location}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {props.skills?.map((skill, index) => (
              <p
                key={index}
                className="text-gray-500 py-1 px-2 rounded-md border border-black"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>

        {/* Apply Section */}
        <div className="flex flex-col md:items-end gap-2 mt-4 md:mt-0">
          <p className="text-gray-500">
            Posted  (
            {dayjs(props.postedOn).format("DD MMM YYYY")})
          </p>
          <a href={props.job_link} target="_blank" rel="noopener noreferrer">
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Apply
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
