import { View, Text, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { OrderStatus } from "../enums";
import Rabar_022 from "../assets/fonts/Rabar_022.ttf";
import { generateBarcode } from "../helper/generateBarcode";
import React from "react";
import QRCode from "qrcode";

export interface OrderDetail {
  productName: string;
  productAmount: number;
  supplier: number;
  receiverNumberPhone: string;
  address: string;
  deliveryAmount: number;
  driverAmount: number;
  invoiceNo: string;
  remark: string;
  status: number;
}

export interface OrderContentProps {
  driver: string;
  driverId: number | string;
  fromCity: string;
  toCity: string;
  zone: string;
  url: string;
  orderDetails: OrderDetail[];
}

const styles = StyleSheet.create({
  table: {
    width: "100%",
    direction: "rtl",
    fontFamily: "Rabar_022",
    border: "1px solid #f0f0f0",
    padding: 5,
  },
  headerRow: {
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderColor: "#000",
    backgroundColor: "#eaeaea",
  },
  row: {
    flexDirection: "row-reverse",
    borderColor: "#ccc",
  },
  cellHeader: {
    flex: 1,
    padding: 4,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Rabar_022",
  },
  cell: {
    flex: 1,
    padding: 4,
    fontSize: 9,
    textAlign: "center",
    fontFamily: "Rabar_022",
  },
  total: {
    padding: 10,
    textAlign: "right",
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "Rabar_022",
    width: "25%",
  },

  box1: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    direction: "rtl",
    width: "100%",
    paddingTop: 4,
  },
  qr: {
    position: "absolute",
    top: -7,
    left: 0,
    width: 35,
    height: 35,
  },
});

const OrderContent = (data: OrderContentProps) => {
  Font.register({
    family: "Rabar_022",
    src: Rabar_022,
  });

  const totalAmount = data.orderDetails.reduce(
    (sum, item) => sum + item.productAmount,
    0
  );

  const deliveryAmount = data.orderDetails.reduce(
    (sum, item) => sum + item.deliveryAmount,
    0
  );

  interface Props {
    driverId: number | string;
  }

  const DriverQRCode: React.FC<Props> = ({ driverId }) => {
    const [qrCodeDataURL, setQrCodeDataURL] = React.useState<string>("");

    React.useEffect(() => {
      const today = new Date().toISOString().split("T")[0];
      const qrText = `driverId:${driverId}/date:${today}`;

      QRCode.toDataURL(qrText, { margin: 1, width: 120 })
        .then(setQrCodeDataURL)
        .catch(console.error);
    }, [driverId]);

    return (
      <>{qrCodeDataURL && <Image src={qrCodeDataURL} style={styles.qr} />}</>
    );
  };

  return (
    <View>
      <View style={{ ...styles.box1, marginBottom: 10 }}>
        <DriverQRCode driverId={data.driverId} />
        <View style={{ width: "5%" }}></View>
        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            fontFamily: "Rabar_022",
            width: "15%",
          }}>
          {data.zone} :زۆن
        </Text>

        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            fontFamily: "Rabar_022",
            width: "15%",
          }}>
          {data.toCity} :بۆ
        </Text>
        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            fontFamily: "Rabar_022",
            width: "15%",
          }}>
          {data.fromCity} :لە
        </Text>
        <Text
          style={{ fontSize: 11, fontWeight: "bold", fontFamily: "Rabar_022" }}>
          {data.driver} :ناوی شۆفێر
        </Text>
      </View>
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <View style={{ width: 25 }}>
            <Text style={{ ...styles.cellHeader, width: 25 }}>#</Text>
          </View>
          <Text style={styles.cellHeader}>ناوی بەرهەم</Text>
          <Text style={styles.cellHeader}>نرخی بەرهەم</Text>
          <Text style={styles.cellHeader}>نرخی گەیاندن</Text>
          <Text style={styles.cellHeader}>نرخی شۆفێر</Text>
          <Text style={styles.cellHeader}>دۆخ</Text>

          <Text style={styles.cellHeader}>ژمارەی موبایل</Text>
          <Text style={styles.cellHeader}>ناونیشان</Text>
          <Text style={styles.cellHeader}>ژمارەی وەسڵ</Text>
          <Text style={styles.cellHeader}>تێبینی</Text>
        </View>

        {data.orderDetails.map((item, index) => (
          <View
            wrap={false}
            style={{
              ...styles.row,
              backgroundColor: index % 2 === 0 ? "#ffffff" : "#f7f7f7",
            }}
            key={index}>
            <View style={{ width: 25 }}>
              <Text style={{ ...styles.cell, width: 25 }}>{index + 1}</Text>
            </View>
            <Text style={styles.cell}>{item.productName}</Text>
            <Text style={styles.cell}>{item.productAmount.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.deliveryAmount.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.driverAmount.toFixed(2)}</Text>
            <Text
              style={{
                ...styles.cell,
                backgroundColor: OrderStatus.find((e) => e.id === item.status)
                  ?.color,
                borderRadius: 2,
                fontSize: 7,
                marginTop: 3,
                height: 20,
              }}>
              {OrderStatus.find((e) => e.id === item.status)?.kurdish}
            </Text>
            <Text style={styles.cell}>{item.receiverNumberPhone}</Text>

            <Text style={styles.cell}>{item.address}</Text>
            {item.invoiceNo === "" ? (
              <Text style={styles.cell}></Text>
            ) : (
              <>
                <Image
                  src={generateBarcode(item.invoiceNo)}
                  style={{ width: 100 }}
                />
              </>
            )}
            <Text style={styles.cell}>{item.remark}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.total}>
        کۆی گشتی: {totalAmount.toFixed(2)} د.ع
        {"\n"}پارەی گەیاندن: {deliveryAmount.toFixed(2)} د.ع
        {"\n"}کۆی گشتی بە گەیاندن: {(totalAmount + deliveryAmount).toFixed(2)}{" "}
        د.ع
      </Text>
    </View>
  );
};

export default OrderContent;
