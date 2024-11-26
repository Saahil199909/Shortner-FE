import React from "react";

export default function AnalyticsLargeComp(props) {
  const { categoryDetail = [], category, title } = props;
  return (
    <div className="w-full sm:w-1/5">
      <div className="flex flex-col border rounded-md p-2 min-h-[400px]">
        <p>Top {title} </p>
        <div className="flex justify-between mt-2 mb-2">
          <p>{category}</p>
          <p>clicks</p>
        </div>
        <hr />
        {categoryDetail.length > 0
          ? categoryDetail.map((obj) => (
              <div>
                <div className="flex justify-between mt-2 mb-2">
                  <p> {obj.os_name}</p>
                  <p> {obj.count}</p>
                </div>
                <hr />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
