import React from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

import Rabar_015 from "../assets/fonts/Rabar_015.ttf";
import QRCode from "qrcode";

interface PrintPreviewProps {
  title?: string;
  setOpen : any;
  ids : string[]
}

const PrintMiniPreview: React.FC<PrintPreviewProps> = ({
  title = "Print",
  ids,
  setOpen
}) => {
  const styles = StyleSheet.create({
    page: {
      paddingHorizontal: 1,
      paddingTop: 1,
      paddingBottom: 1,
      fontSize: 1,
    },
    header: {
      display : "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },

    headerText: {
      fontSize: 4,
      fontWeight: "bold",
      fontFamily: "Rabar_015",
    },



    
  });

  Font.register({
    family: "Rabar_015",
    src: Rabar_015,
  });

  const QRCodeGenerator: React.FC<any> = ({ id }) => {
    const [qrCodeDataURL, setQrCodeDataURL] = React.useState<string>("");

    React.useEffect(() => {
      const qrText = id;

      QRCode.toDataURL(qrText, { margin: 1, width: 120 })
        .then(setQrCodeDataURL)
        .catch(console.error);
    }, [id]);

    return (
      <>
        {qrCodeDataURL && (
          <Image
            src={qrCodeDataURL}
            style={{ width: 25, height: 25 }}
          />
        )}
      </>
    );
  };



  return (

     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setOpen(null)}
     >
          <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] h-[90%] overflow-hidden">

            <div className="w-full h-full">
              <PDFViewer width="100%" height="100%" showToolbar={true}>
                 <Document
      title={title}
      author=""
      subject=""
      keywords=""
      creator="react-pdf"
      producer="react-pdf">
      <Page orientation={"portrait"} size={{width : 40, height : 58}} style={styles.page}>
{ids.map((e: string, index: number) => {
  return (

    <View key={index} style={{ ...styles.header }}>
      <Text style={styles.headerText}>بەسود پۆست</Text>

         
    <View
                      style={{
                        width: "100%",
                        display : "flex",
                        alignItems : "center",
                      }}>
                      <QRCodeGenerator id={e} />
                    </View>


    <Text style={{ ...styles.headerText, fontSize: 2  , marginTop : 2}}>

      {e}
        </Text>
        <Text style={{ ...styles.headerText, fontSize: 3 , marginVertical : 2 }}>
          : ناونیشان وەرگر
        </Text>

        <Text style={{ ...styles.headerText, fontSize: 3 }}>
          : عنون للمستلم
        </Text>
      </View>
  );

})}


      </Page>
    </Document>
              </PDFViewer>
            </div>
          </div>
        </div>

  );
};

export default PrintMiniPreview;
