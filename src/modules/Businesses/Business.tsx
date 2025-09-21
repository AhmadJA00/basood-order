import React from "react";
import service from "../../service";
import helpers from "../../helpers";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { BusinessType } from "../../type";
import { useNotification } from "../../context/NotificationContext";
import { Button, Select } from "antd";
import { useAuth } from "../../providers/AuthProvider";
import Actions from "../../components/Actions";
import DataGrid from "../../components/DataGrid";

export default function Business({}: {}) {
  const [dataSource, setDataSource] = React.useState<BusinessType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const url = useLocation();
  const { t } = useTranslation();
  const { openNotification } = useNotification();
  const auth = useAuth();
  const navigate = useNavigate();

  const columns = [
    {
      title: t("businessName"),
      key: "businessNameEn",
      searchable: true,
      render: (row: BusinessType) => {
        return `${row?.businessNameEn}`;
      },
      sorter: (a: BusinessType, b: BusinessType) =>
        a.businessNameEn?.localeCompare(b.businessNameEn ?? ""),
    },
    {
      title: t("businessSize"),
      key: "businessSize",
      searchable: true,
      render: (row: BusinessType) => {
        return `${t(row?.businessSize ?? "")}`;
      },
      sorter: (a: BusinessType, b: BusinessType) =>
        a.businessSize?.localeCompare(b.businessSize ?? ""),
    },
    {
      title: t("annualRevenue"),
      key: "annualRevenue",
      searchable: true,
      render: (row: BusinessType) => {
        return `${row?.annualRevenue}$`;
      },
      sorter: (a: BusinessType, b: BusinessType) =>
        a.annualRevenue - b.annualRevenue,
    },
    {
      title: t("askingPrice"),
      key: "askingPrice",
      searchable: true,
      render: (row: BusinessType) => {
        return `${row?.askingPrice}$`;
      },
      sorter: (a: BusinessType, b: BusinessType) =>
        a.askingPrice - b.askingPrice,
    },
    {
      title: t("yearEstablished"),
      key: "yearEstablished",
      searchable: true,
      render: (row: BusinessType) => {
        return `${row?.yearEstablished}`;
      },
      sorter: (a: BusinessType, b: BusinessType) =>
        a.yearEstablished
          ?.toString()
          .localeCompare(b.yearEstablished?.toString() ?? ""),
    },
    {
      title: t("location"),
      key: "country",
      searchable: true,
      render: (row: BusinessType) => {
        return `${t(row?.country ?? "")} - ${t(row?.city ?? "")}`;
      },
      sorter: (a: BusinessType, b: BusinessType) =>
        `${t(a?.country ?? "")} - ${t(a?.city ?? "")}`.localeCompare(
          `${t(b?.country ?? "")} - ${t(b?.city ?? "")}`
        ),
    },
    {
      title: t("city"),
      key: "city",
      searchable: true,
      responsive: [""],
    },

    {
      title: t("action"),
      key: "action",
      render: (row: BusinessType) => {
        return (
          <div className="flex gap-2">
            <Actions
              row={row}
              isShow={false}
              isEdit
              isDelete={true}
              deleteConditions={[
                {
                  collectionName: "AppliedBusinesses",
                  queries: [
                    { field: "businessId", operator: "==", value: row.id },
                  ],
                  message: t("delete.cannotDeleteBusinessWithApplications"),
                },
                {
                  collectionName: "PrimumBusinesses",
                  queries: [{ field: "id", operator: "==", value: row.id }],
                  message: t("delete.cannotDeletePrimumBusiness"),
                },
              ]}
              collectionName="Businesses"
              fetchData={fetchData}
            />
          </div>
        );
      },
    },
  ];

  const fetchData = async () => {
    try {
      setIsLoading(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      openNotification("error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [url.pathname, url.search, auth.userData]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid
        title="anything with "
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        className="mt-4"
      />
    </div>
  );
}
