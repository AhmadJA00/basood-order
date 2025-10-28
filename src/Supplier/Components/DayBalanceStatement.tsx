import React from "react";
import CShowData from "../../components/CShowData";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

export default function DayBalanceStatement({ data }) {
  const [isOpen, setIsOpen] = React.useState(false);
  console.log(data);
  const { t } = useTranslation();

  return (
    <div className="border border-primary rounded-lg overflow-hidden my-2 bg-primary/10">
      <div className="bg-gradient-to-br  from-primary-light from-40% to-primary !px-5 text-white text-lg text-center">
        {data.date}
      </div>
      <div className="p-2 grid grid-cols-2 justify-center items-center gap-2">
        <CShowData data={data.totalOrders} label={t("totalOrders")} />{" "}
        <CShowData
          data={`${data.totalPrice?.toLocaleString()} ${t("iqd")}`}
          label={t("totalPrice")}
        />
        {isOpen &&
          data.orderDetailes.map((order) => (
            <div className="border border-primary col-span-2 rounded-lg p-1 text-xs grid grid-cols-2 gap-2">
              <CShowData data={order.productName} label={t("productName")} />
              <CShowData
                data={`${order.productPrice?.toLocaleString()} ${t("iqd")}`}
                label={t("productPrice")}
              />
              <CShowData data={order.city} label={t("city")} />
              <CShowData data={order.driver} label={t("driver")} />
              <CShowData data={t(order.status)} label={t("status")} />
              <CShowData data={order.orderNo} label={t("orderNo")} />
            </div>
          ))}
        <Button
          type="primary"
          className="!col-span-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? t("close") : t("seeDetailes")}
        </Button>
      </div>
    </div>
  );
}
