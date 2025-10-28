import { useTranslation } from "react-i18next";
import {
  useLoaderData,
  useNavigation,
  useRevalidator,
  useSearchParams,
} from "react-router";
import type { SupplierBalanceType } from "../supplierside.type";
import { Button, Input } from "antd";
import Loading from "../../components/Loading";
import CShowData from "../../components/CShowData";
import DayBalanceStatement from "../Components/DayBalanceStatement";

export default function Balance() {
  const data = useLoaderData() as SupplierBalanceType;
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const revalidator = useRevalidator();
  const orderData = [
    {
      date: "28-10-2025",
      totalOrders: 4,
      totalPrice: 45000, // Sum of productPrice for the day
      orderDetailes: [
        {
          productName: "Laptop Charger",
          productPrice: 15000,
          city: "Erbil (Gulan)",
          driver: "Ahmed Jihad Ali",
          status: "Completed",
          orderNo: 23462431,
        },
        {
          productName: "Wireless Mouse",
          productPrice: 5000,
          city: "Duhok (Azadi)",
          driver: "Omar Salah",
          status: "Pending",
          orderNo: 23462432,
        },
        {
          productName: "Keyboard",
          productPrice: 15000,
          city: "Sulimany (Kaziwa)",
          driver: "Rawa Taha",
          status: "Completed",
          orderNo: 23462433,
        },
        {
          productName: "Monitor Stand",
          productPrice: 10000,
          city: "Kirkuk (Center)",
          driver: "Ahmed Jihad Ali",
          status: "Cancelled",
          orderNo: 23462434,
        },
      ],
    },
    {
      date: "29-10-2025",
      totalOrders: 2,
      totalPrice: 25000,
      orderDetailes: [
        {
          productName: "Webcam",
          productPrice: 15000,
          city: "Baghdad (Mansour)",
          driver: "Ali Mustafa",
          status: "Completed",
          orderNo: 23462435,
        },
        {
          productName: "SSD Drive",
          productPrice: 10000,
          city: "Basra (Kornish)",
          driver: "Hassan Karim",
          status: "Completed",
          orderNo: 23462436,
        },
      ],
    },
    {
      date: "30-10-2025",
      totalOrders: 5,
      totalPrice: 65000,
      orderDetailes: [
        {
          productName: "Gaming Headset",
          productPrice: 20000,
          city: "Erbil (Park)",
          driver: "Ahmed Jihad Ali",
          status: "Pending",
          orderNo: 23462437,
        },
        {
          productName: "USB Hub",
          productPrice: 5000,
          city: "Sulimany (City)",
          driver: "Omar Salah",
          status: "Completed",
          orderNo: 23462438,
        },
        {
          productName: "Portable Speaker",
          productPrice: 15000,
          city: "Duhok (Old Town)",
          driver: "Rawa Taha",
          status: "Completed",
          orderNo: 23462439,
        },
        {
          productName: "External HDD",
          productPrice: 15000,
          city: "Mosul (Al-Hadba)",
          driver: "Ahmed Jihad Ali",
          status: "Shipped",
          orderNo: 23462440,
        },
        {
          productName: "Power Bank",
          productPrice: 10000,
          city: "Anbar (Ramadi)",
          driver: "Ali Mustafa",
          status: "Completed",
          orderNo: 23462441,
        },
      ],
    },
    {
      date: "31-10-2025",
      totalOrders: 3,
      totalPrice: 40000,
      orderDetailes: [
        {
          productName: "Screen Protector",
          productPrice: 5000,
          city: "Najaf (Center)",
          driver: "Hassan Karim",
          status: "Completed",
          orderNo: 23462442,
        },
        {
          productName: "Phone Case",
          productPrice: 10000,
          city: "Karbala (City)",
          driver: "Rawa Taha",
          status: "Completed",
          orderNo: 23462443,
        },
        {
          productName: "Smartwatch",
          productPrice: 25000,
          city: "Erbil (Ainkawa)",
          driver: "Omar Salah",
          status: "Pending",
          orderNo: 23462444,
        },
      ],
    },
    {
      date: "01-11-2025",
      totalOrders: 2,
      totalPrice: 20000,
      orderDetailes: [
        {
          productName: "E-reader",
          productPrice: 15000,
          city: "Sulimany (Goizha)",
          driver: "Ahmed Jihad Ali",
          status: "Shipped",
          orderNo: 23462445,
        },
        {
          productName: "LED Lamp",
          productPrice: 5000,
          city: "Duhok (Mazi)",
          driver: "Ali Mustafa",
          status: "Completed",
          orderNo: 23462446,
        },
      ],
    },
    {
      date: "02-11-2025",
      totalOrders: 4,
      totalPrice: 50000,
      orderDetailes: [
        {
          productName: "Projector",
          productPrice: 30000,
          city: "Baghdad (Karada)",
          driver: "Hassan Karim",
          status: "Completed",
          orderNo: 23462447,
        },
        {
          productName: "HDMI Cable",
          productPrice: 5000,
          city: "Basra (Center)",
          driver: "Rawa Taha",
          status: "Pending",
          orderNo: 23462448,
        },
        {
          productName: "Router",
          productPrice: 10000,
          city: "Erbil (Zaitun)",
          driver: "Omar Salah",
          status: "Completed",
          orderNo: 23462449,
        },
        {
          productName: "Ethernet Cable",
          productPrice: 5000,
          city: "Kirkuk (Tameen)",
          driver: "Ahmed Jihad Ali",
          status: "Completed",
          orderNo: 23462450,
        },
      ],
    },
    {
      date: "03-11-2025",
      totalOrders: 3,
      totalPrice: 20000,
      orderDetailes: [
        {
          productName: "Coffee Mug",
          productPrice: 5000,
          city: "Sulimany (Tafree')",
          driver: "Ali Mustafa",
          status: "Completed",
          orderNo: 23462451,
        },
        {
          productName: "T-shirt",
          productPrice: 10000,
          city: "Duhok (Center)",
          driver: "Hassan Karim",
          status: "Completed",
          orderNo: 23462452,
        },
        {
          productName: "Notebook",
          productPrice: 5000,
          city: "Mosul (Right Bank)",
          driver: "Rawa Taha",
          status: "Cancelled",
          orderNo: 23462453,
        },
      ],
    },
    {
      date: "04-11-2025",
      totalOrders: 5,
      totalPrice: 75000,
      orderDetailes: [
        {
          productName: "Gaming Chair",
          productPrice: 35000,
          city: "Erbil (Dream City)",
          driver: "Omar Salah",
          status: "Completed",
          orderNo: 23462454,
        },
        {
          productName: "Desk Mat",
          productPrice: 5000,
          city: "Baghdad (Karrada)",
          driver: "Ahmed Jihad Ali",
          status: "Completed",
          orderNo: 23462455,
        },
        {
          productName: "Webcam",
          productPrice: 10000,
          city: "Basra (Tanuma)",
          driver: "Ali Mustafa",
          status: "Shipped",
          orderNo: 23462456,
        },
        {
          productName: "Microphone",
          productPrice: 15000,
          city: "Kirkuk (Al-Qadisiyah)",
          driver: "Hassan Karim",
          status: "Pending",
          orderNo: 23462457,
        },
        {
          productName: "Tripod",
          productPrice: 10000,
          city: "Najaf (Al-Wadi)",
          driver: "Rawa Taha",
          status: "Completed",
          orderNo: 23462458,
        },
      ],
    },
    {
      date: "05-11-2025",
      totalOrders: 2,
      totalPrice: 15000,
      orderDetailes: [
        {
          productName: "Phone Grip",
          productPrice: 5000,
          city: "Karbala (City)",
          driver: "Omar Salah",
          status: "Completed",
          orderNo: 23462459,
        },
        {
          productName: "Air Freshener",
          productPrice: 10000,
          city: "Erbil (Bahar)",
          driver: "Ahmed Jihad Ali",
          status: "Completed",
          orderNo: 23462460,
        },
      ],
    },
    {
      date: "06-11-2025",
      totalOrders: 3,
      totalPrice: 30000,
      orderDetailes: [
        {
          productName: "Bluetooth Earbuds",
          productPrice: 15000,
          city: "Sulimany (Chwarta)",
          driver: "Ali Mustafa",
          status: "Pending",
          orderNo: 23462461,
        },
        {
          productName: "Screen Cleaner",
          productPrice: 5000,
          city: "Duhok (Barzan)",
          driver: "Hassan Karim",
          status: "Completed",
          orderNo: 23462462,
        },
        {
          productName: "Travel Adapter",
          productPrice: 10000,
          city: "Mosul (Al-Arabi)",
          driver: "Rawa Taha",
          status: "Completed",
          orderNo: 23462463,
        },
      ],
    },
  ];
  return (
    <section className="p-5 flex flex-col gap-5">
      {navigation.state === "loading" ||
        (revalidator.state === "loading" && <Loading isLoading />)}
      <div className="flex flex-col  gap-3">
        <div
          className={`bg-primary p-2 rounded-lg text-center text-white font-bold flex justify-between gap-3`}
        >
          <p>{t("totalPrice")}</p>
          <span className="flex items-center gap-4">
            <p className="bg-white rounded-full px-3 text-sm text-primary">
              {(data.credit || 3000000).toLocaleString()} {t("iqd")}
            </p>
          </span>
        </div>
        <div
          className={`bg-primary-light  p-2 rounded-lg text-center text-white font-bold flex justify-between items-center gap-3`}
        >
          <p>{t("paid")}</p>
          <span className="flex items-center gap-4">
            <p className="bg-white rounded-full px-3   text-sm text-primary">
              {(data.currentBalance - data.credit || 1750000).toLocaleString()}{" "}
              {t("iqd")}
            </p>
          </span>
        </div>
        <div
          className={`bg-primary-light  p-2 rounded-lg text-center text-white font-bold flex justify-between items-center gap-3`}
        >
          <p>{t("nonPaid")}</p>
          <span className="flex items-center gap-4">
            <p className="bg-white rounded-full px-3   text-sm text-primary">
              {(data.currentBalance || 1250000).toLocaleString()} {t("iqd")}
            </p>
          </span>
        </div>
      </div>
      <div className="flex gap-3 ">
        <Input
          type="number"
          placeholder={t("day")}
          onChange={(e) => searchParams.set("day", e.target.value)}
        />
        <Button type="primary" onClick={() => setSearchParams(searchParams)}>
          {t("getData")}
        </Button>
      </div>
      {orderData.map((order) => (
        <DayBalanceStatement data={order} />
      ))}
    </section>
  );
}
