import React from "react";
import service from "../../service";
import { useNotification } from "../../context/NotificationContext";
import { Link, useParams } from "react-router";
import { BusinessType } from "../../type";
import CCard from "../Components/CCard";
import moment from "moment";
import Loading from "../Components/Loading";

const JobsShow: React.FC = () => {
  const [data, setData] = React.useState<
    { key: string; value: string; className?: string }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { openNotification } = useNotification();
  const { id } = useParams();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await service.get<BusinessType>("Businesses", { id });
      if (response) {
        setData([
          { key: "title", value: response?.title },
          { key: "sellPrice", value: `$ ${response?.sellPrice}` },
          { key: "workingCapital", value: `$ ${response?.workingCapital}` },
          { key: "annualRevenue", value: `$ ${response?.annualRevenue}` },
          { key: "buildingRent", value: `$ ${response?.buildingRent}` },
          {
            key: "establishYear",
            value: moment(response?.establishYear).format("YYYY/mm"),
          },
          { key: "employeeNumber", value: `${response?.employeeNumber}` },

          { key: "assetPrice", value: `$ ${response?.assetPrice}` },
          { key: "officeType", value: `${response?.officeType}` },
          { key: "marketCompetition", value: `${response?.marketCompetition}` },
          { key: "activationPrice", value: `${response?.activationPrice}` },
          { key: "trainingSupport", value: `${response?.trainingSupport}` },

          {
            key: "location",
            value: `${response?.country} - ${response?.city} - ${response?.address}`,
          },
          {
            key: "description",
            value: `${response?.description}`,
            className: "col-span-3",
          },
          {
            key: "longDescription",
            value: `${response?.longDescription}`,
            className: "col-span-3",
          },
          {
            key: "stockAsset",
            value: `${response?.stockAsset}`,
            className: "col-span-3",
          },
          {
            key: "saleReason",
            value: `${response?.saleReason}`,
            className: "col-span-3",
          },
          {
            key: "agent",
            value: `${response?.agent}`,
            className: "col-span-3",
          },
        ]);
      }
    } catch (error) {
      openNotification("error", error + "");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (id) fetchData();
  }, [id]);

  return data.length > 0 ? (
    <CCard title="bussinessInfo" data={data} />
  ) : (
    <Loading isLoading={isLoading} />
  );
};
export default JobsShow;
