import { Link, useLoaderData } from "react-router";
import type { TotalStatusType } from "../supplierside.type";
import helpers from "../../helpers";
import { useTranslation } from "react-i18next";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Home() {
  const data = useLoaderData() as TotalStatusType[];
  const { t } = useTranslation();
  const coloredData = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < helpers.orderStatus.length; j++) {
      if (data[i].status === helpers.orderStatus[j].label) {
        const newObj = {
          title: data[i].status,
          count: data[i].count,
          value: helpers.orderStatus[j].value,
          color: helpers.orderStatus[j].color,
        };
        coloredData.push(newObj);
      }
    }
  }
  return (
    <section>
      <div className="flex flex-col justify-center gap-3 p-5">
        <Link
          to={`orders?status=${coloredData[coloredData.length - 1].value}`}
          key={coloredData[coloredData.length - 1].title}
          className={`bg-primary col-span-2 p-2 rounded-lg text-center text-white flex justify-between gap-3`}
        >
          <p>{t(coloredData[coloredData.length - 1].title)}</p>
          <span className="flex items-center gap-4">
            <p className="bg-white rounded-full w-6 text-primary">
              {coloredData[coloredData.length - 1].count}
            </p>
            <FaArrowLeftLong size={15} />
          </span>
        </Link>
        {coloredData.map((st) => {
          if (st.title !== "Completed")
            return (
              <Link
                to={`orders?status=${st.value}`}
                key={st.title}
                style={{ backgroundColor: st.color }}
                className={` p-2 rounded-lg text-center text-white flex justify-between gap-3`}
              >
                <p>{t(st.title)}</p>
                <span className="flex items-center gap-4">
                  <p className="bg-white rounded-full w-6 text-primary">
                    {st.count}
                  </p>
                  <FaArrowLeftLong size={15} />
                </span>
              </Link>
            );
        })}
      </div>
    </section>
  );
}
