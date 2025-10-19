import React from "react";
import type { ShowDataProp } from "../gloabal.type";

const CShowData: React.FC<ShowDataProp> = ({
  label,
  data,
  vertical = false,
}) => {
  return (
    <div className={`flex ${vertical ? "flex-col " : "flex-row "} gap-1`}>
      <p className="font-semibold">{label}:</p>
      <p>{data}</p>
    </div>
  );
};
export default CShowData;
