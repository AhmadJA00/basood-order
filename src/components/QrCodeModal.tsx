import { useRef, useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import type { Html5QrcodeCameraScanConfig } from "html5-qrcode";
import { useNavigate } from "react-router";

type Props = {
  onChange: (decodedText: string) => void; // called on successful scan
};

export default function QrScannerModal({ onChange }: Props) {
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    startScanner();

    return () => {
      stopScanner(true);
    };
  }, []);

  const startScanner = async () => {
    if (scanning) return;
    setScanning(true);

    const divId = "qr-reader";
    if (!html5QrcodeRef.current) {
      html5QrcodeRef.current = new Html5Qrcode(divId);
    }

    const config: Html5QrcodeCameraScanConfig = {
      fps: 20,
      qrbox: { width: 250, height: 250 },
    };

    try {
      await html5QrcodeRef.current.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          onChange(decodedText);
          stopScanner(true); 
        },
        (errorMessage) => {
          console.debug("Scan frame error:", errorMessage);
        }
      );
    } catch (err) {
      console.error("Camera not accessible or permission denied:", err);
      setScanning(false);
    }
  };

  const stopScanner = async (force: boolean = false) => {
    if (!html5QrcodeRef.current) return;

    try {
      await html5QrcodeRef.current.stop();
      await html5QrcodeRef.current.clear();
    } catch (err) {
      console.warn("Error stopping scanner:", err);
    } finally {
      setScanning(false);
      if (force) {
      }
    }
  };

  const navigator = useNavigate();

  return (
   <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
  <div className="bg-white rounded-2xl shadow-2xl w-[450px] h-[400px] flex flex-col items-center justify-center p-4">
    
    <div className="w-[400px] h-[300px] border-2 border-gray-300 rounded-lg overflow-hidden">
      <div
        id="qr-reader"
        className="w-full h-full"
      ></div>
    </div>

    <button
      onClick={() => {
        stopScanner(true);
        navigator(-1); 
      }}
      className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-[400px]"
    >
      Close
    </button>
  </div>
</div>


  );
}
