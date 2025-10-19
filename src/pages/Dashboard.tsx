import type {
  OrderContentProps,
  OrderDetail,
} from "../components/OrderContent";
import OrderContent from "../components/OrderContent";
import PrintPreview from "../components/PrintPreview";

export default function Dashboard() {
  const orderDetails: OrderDetail[] = [
    {
      id: "7b2c5f2a-cc8b-4d14-8a7f-f7d8b47a11a1",
      productAmount: 15000,
      supplierName: "کۆمپانیا ١",
      supplierNumberPhone: "07501234567",
      receiverNumberPhone: "07501234567",
      address: "سەرچناری نوێ - شەقامی ١٢",
      driverAmount: 7000,
    },
    {
      id: "fa8c9425-91c9-4d6f-a22c-4b3d4d17b6cf",
      productAmount: 400000,
      supplierName: "کۆمپانیا ٢",
      supplierNumberPhone: "07504321987",
      receiverNumberPhone: "07504321987",
      address: "ئاڤەنی گڕین - ژمارە ٨",
      driverAmount: 9000,
    },
    {
      id: "a3546e6f-1297-48f0-bb64-3c84aee95ff5",
      productAmount: 60000,
      supplierName: "کۆمپانیا ٣",
      supplierNumberPhone: "07504567890",
      receiverNumberPhone: "07501234567",
      address: "ڕێگای کاوا - ژمارە ٢٥",
      driverAmount: 7000,
    },
    {
      id: "a679b7d2-8b5a-4a4c-b1ce-c2b52b7a39cf",
      productAmount: 450000,
      supplierName: "کۆمپانیا ٤",
      supplierNumberPhone: "07701239876",
      receiverNumberPhone: "07891234567",
      address: "شەقامی گولان - ژمارە ١٠",
      driverAmount: 9000,
    },
    {
      id: "f8bfa0f9-64a4-4939-9f1b-7c4e7a6e58a3",
      productAmount: 120000,
      supplierName: "کۆمپانیا ٥",
      supplierNumberPhone: "07505554433",
      receiverNumberPhone: "07502221110",
      address: "شەقامی سەد مەتر",
      driverAmount: 7000,
    },
  ];

  const orderContent: OrderContentProps = {
    id: "c9a1e8a2-52b1-44f7-bb61-d39d9ad7b3d1",
    driver: "ئەحمەد کەریم",
    driverId: 45,
    fromCity: "هەولێر",
    toCity: "سلێمانی",
    zone: "فەرمانبەران",
    orderDetails,
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <PrintPreview
        title="ڕاپۆرتی شۆفێر"
        content={<OrderContent {...orderContent} />}
        fileName="Order_Report.pdf"
      />
    </div>
  );
}
