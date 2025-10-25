import { View, Text, StyleSheet, Font, Image } from "@react-pdf/renderer";
import Rabar_022 from "../assets/fonts/Rabar_022.ttf";
import React from "react";
import QRCode from "qrcode";
import type { OrderDetailsDataType } from "../modules/Orders/OrderDetails/orderdetails.type";
import helpers from "../helpers";
import { generateBarcode } from "../helper/generateBarcode";

export interface OrderSupplierContentPrintProps {
  // id: string;
  fromDate : string,
  toDate : string,
  supplier: string ;
  supplierId: string ;
  orderDetails: OrderDetailsDataType[] 
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
    // height: 35,
    display: "flex",
    alignItems: "center",
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
    paddingTop : 0,
    textAlign: "right",
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "Rabar_022",
    width: "50%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
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

const SupplierOrderContent = (data: OrderSupplierContentPrintProps) => {
  Font.register({
    family: "Rabar_022",
    src: Rabar_022,
  });

  const totalAmount = data.orderDetails!.reduce(
    (sum, item) => sum + item.productAmount,
    0
  );

  const driverAmount = data.orderDetails!.reduce(
    (sum, item) => sum + item.driverAmount,
    0
  );

  interface Props {
    id: number | string;
  }

  const DriverQRCode: React.FC<Props> = ({ id }) => {
    const [qrCodeDataURL, setQrCodeDataURL] = React.useState<string>("");

    React.useEffect(() => {
      const today = new Date().toISOString().split("T")[0];
      const qrText = `driverId:${id}/date:${today}`;

      QRCode.toDataURL(qrText, { margin: 1, width: 120 })
        .then(setQrCodeDataURL)
        .catch(console.error);
    }, [id]);

    return (
      <>{qrCodeDataURL && <Image src={qrCodeDataURL} style={styles.qr} />}</>
    );
  };

  const QRCodeGenerator: React.FC<Props> = ({ id }) => {
    const [qrCodeDataURL, setQrCodeDataURL] = React.useState<string>("");

    React.useEffect(() => {
      const qrText = `supplierId:${id}&fromDate:${data.fromDate}&toDate:${data.toDate}`;

      QRCode.toDataURL(qrText, { margin: 1, width: 120 })
        .then(setQrCodeDataURL)
        .catch(console.error);
    }, [id]);

    return (
      <>
        {qrCodeDataURL && (
          <Image
            src={qrCodeDataURL}
            style={{ width: 31, height: 31, marginVertical: 3 }}
          />
        )}
      </>
    );
  };

  return (
    <View>
      <View style={{ ...styles.box1, marginBottom: 10 }}>
        <DriverQRCode id={data.supplierId!} />
        <View style={{ width: "20%" }}></View>
       
        <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "bold",
                    fontFamily: "Rabar_022",
                    width: "25%",
                  }}>
           {data.toDate} {"-"} {data.fromDate}                
     </Text>
        <Text
          style={{ fontSize: 11, fontWeight: "bold", fontFamily: "Rabar_022" }}>
          بەڕێز : {data.supplier}
        </Text>

      </View>
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <View style={{ width: 25 }}>
            <Text style={{ ...styles.cellHeader, width: 25 }}>#</Text>
          </View>

          <Text style={styles.cellHeader}>كاڵا</Text>
          <Text style={styles.cellHeader}>نرخی بەرهەم</Text>
          {/* <Text style={styles.cellHeader}>نرخی گەیاندن</Text> */}
          <Text style={styles.cellHeader}>دۆخ کاڵا</Text>

          <Text style={styles.cellHeader}>ژ. وەرگر</Text>
            <Text style={styles.cellHeader}>ژ. وصل</Text>
          <Text style={styles.cellHeader}>ناونیشان</Text>
          
          <View style={{ width: 30 }}>
            <Text style={{ ...styles.cellHeader, width: 30 }}></Text>
          </View>
        </View>

        {data.orderDetails!.map((item, index) => (
          <View
            wrap={false}
            style={{
              ...styles.row,
              backgroundColor: index % 2 === 0 ? "#ffffff" : "#f7f7f7",
            }}
            key={index}>
            <View
              style={{
                width: 25,
                height: 25,
                padding: 0,
              }}>
              <Text style={{ ...styles.cell, width: 25 }}>{index + 1}</Text>
            </View>
            <Text style={styles.cell}>{item.productName}</Text>
            {/* <Text style={styles.cell}>{item.supplier.primaryPhone}</Text> */}

            <Text style={styles.cell}>{item.productAmount.toFixed(2)}</Text>
            {/* <Text style={styles.cell}>{item.deliveryAmount.toFixed(2)}</Text> */}
            {/* <Text style={styles.cell}>{item.driverAmount.toFixed(2)}</Text> */}
            <Text
              style={{
                ...styles.cell,
                backgroundColor: helpers.orderStatus.find((e) => e.value === item.status)
                  ?.color,
                borderRadius: 2,
                fontSize: 7,
                marginTop: 3,
                height: 20,
              }}>
              {helpers.orderStatus.find((e) => e.value === item.status)?.label}
            </Text>
                 <Text style={styles.cell}>{item.receiverNumberPhone}</Text>

                 {item.invoiceNo ? <Image style={{...styles.cell}} source={generateBarcode(item.invoiceNo ,index % 2 === 0 ? "#ffffff" : "#f7f7f7" )} /> : 
                 <Text style={styles.cell}></Text>
                 }
               

            <Text style={styles.cell}>{item.address}</Text>
            <View
              style={{
                padding: 2,
                width: 35,
              }}>
              <QRCodeGenerator id={item.id} />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.total}>
        <Text>کۆی گشتی : {totalAmount.toFixed(2)} دینار</Text>
        {/* <Text>نرخی گەیاندنی شۆفێر : {driverAmount.toFixed(2)} دینار</Text> */}
      </View>
    </View>
  );
};

export default SupplierOrderContent;
