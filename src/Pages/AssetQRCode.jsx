import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import { useBarcode } from '@createnextapp/react-barcode';

export default function AssetQRCode({ asset = { id: 1, name: "Demo Asset" } }) {
  // Hardcoded demo QR code value pointing to asset ID 1
  const qrValue = `https://yourapp.com/assets/1`;

  // Setup barcode using the asset ID
  const { inputRef } = useBarcode({
    value: asset.id.toString(),
    options: {
      format: 'CODE128',
      lineColor: '#4F46E5', // Indigo color matching theme
      width: 2,
      height: 60,
      displayValue: true,
    },
  });

  // Ref for QR code SVG container to enable download
  const qrRef = useRef(null);

  // Function to download the QR code as an SVG file
  const downloadQRCode = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(xml);
    const b64Start = 'data:image/svg+xml;base64,';
    const image64 = b64Start + svg64;

    const a = document.createElement('a');
    a.href = image64;
    a.download = `asset-${asset.id}-qr.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-bold text-indigo-600 mb-4">{asset.name} QR & Barcode</h3>

      {/* QR Code */}
      <div ref={qrRef} className="bg-gray-100 p-4 rounded-md flex justify-center">
        <QRCode value={qrValue} size={180} bgColor="#ffffff" fgColor="#4F46E5" />
      </div>

      <button
        onClick={downloadQRCode}
        className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg hover:shadow-lg transition"
      >
        Download QR Code
      </button>

      {/* Barcode */}
      <div className="mt-6 flex justify-center">
        <svg ref={inputRef} />
      </div>

      <p className="mt-2 text-center text-sm text-gray-600">
        Scan the QR code or barcode to get asset details.
      </p>
    </div>
  );
}
