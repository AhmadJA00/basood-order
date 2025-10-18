import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import basood from "../assets/basood.png";
import Rabar_015 from "../assets/fonts/Rabar_015.ttf";

interface PrintPreviewProps {
  title?: string;
  content: React.ReactNode | (() => React.ReactNode);
  orientation?: "portrait" | "landscape";
  fileName?: string;
}

const PrintPreview: React.FC<PrintPreviewProps> = ({
  title = "Print",
  content,
  orientation = "landscape",
  fileName = "document.pdf",
}) => {
  const styles = StyleSheet.create({
    page: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 45,
      fontSize: 12,
    },
    header: {
      position: "absolute",
      top: 10,
      left: 20,
      right: 20,
      height: 40,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #f0f0f0",
    },
    logo: {
      width: 50,
      height: 40,
    },
    headerText: {
      fontSize: 14,
      fontWeight: "bold",
      fontFamily: "Rabar_015",
    },
    footer: {
      position: "absolute",
      bottom: 10,
      left: 40,
      right: 40,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      borderTop: "1px solid #f0f0f0",
      paddingTop: 5,
    },
    pageNumber: {
      fontSize: 12,
      color: "grey",
    },
    content: {
      marginTop: 40,
      padding: 5,
      border: "1px solid #f0f0f0",
    },
    viewerWrapper: {
      width: "100%",
      height: "85vh",
      border: "1px solid #ddd",
      borderRadius: 8,
      overflow: "hidden",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    controls: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 10,
      gap: 10,
    },
    button: {
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: 5,
      padding: "6px 12px",
      cursor: "pointer",
      fontSize: 14,
    },
    title: {},
  });

  Font.register({
    family: "Rabar_015",
    src: Rabar_015,
  });

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

  // Inner PDF Document component
  const MyDocument = (
    <Document
      title={title}
      author=""
      subject=""
      keywords=""
      creator="react-pdf"
      producer="react-pdf">
      <Page orientation={orientation} size={"A4"} style={styles.page}>
        {/* Header */}
        <View style={{ ...styles.header }}>
          <Image style={styles.logo} src={basood} />
          <Text style={styles.headerText}>{title}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
            }}>
            <Text style={{ ...styles.headerText, fontSize: 11 }}>
              {"Hana"} : بەکارهێنەر
            </Text>
            <Text style={{ ...styles.headerText, fontSize: 11 }}>
              {formattedDate} : بەروار
            </Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {typeof content === "function" ? content() : content}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <View style={{ width: 60, height: 30 }}>
            <Text
              style={{ fontSize: 9, color: "grey" }}
              render={({ pageNumber, totalPages }) =>
                `Page ${pageNumber} / ${totalPages}`
              }
            />
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="p-4">
      {/* Controls */}
      <div style={styles.controls}>
        <PDFDownloadLink
          document={MyDocument}
          fileName={fileName}
          style={styles.button}>
          {({ loading }) => (loading ? "Preparing..." : "Download PDF")}
        </PDFDownloadLink>
      </div>

      {/* PDF Preview */}
      <div style={styles.viewerWrapper}>
        <PDFViewer width="100%" height="100%" showToolbar={true}>
          {MyDocument}
        </PDFViewer>
      </div>
    </div>
  );
};

export default PrintPreview;
