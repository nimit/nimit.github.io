// import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { motion } from "framer-motion";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

// export function ResumeViewer() {
//   const [numPages, setNumPages] = useState<number>(0);
//   const [pageNumber, setPageNumber] = useState<number>(1);
//   const [scale, setScale] = useState(1.0);

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//     setNumPages(numPages);
//     setPageNumber(1);
//   }

//   return (
//     <motion.div
//       className="relative p-4 flex-1"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//     >
//       <div
//         className="
//         mx-auto max-w-4xl h-[80vh]
//         bg-white/10 dark:bg-gray-900/30
//         backdrop-blur-lg rounded-xl
//         shadow-xl ring-1 ring-white/20 dark:ring-gray-800/40
//         overflow-auto flex flex-col items-center p-4
//       "
//       >
//         {/* Controls */}
//         <div className="mb-4 flex items-center space-x-3">
//           <button
//             className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded disabled:opacity-50"
//             disabled={pageNumber <= 1}
//             onClick={() => setPageNumber((p) => p - 1)}
//           >
//             Prev
//           </button>
//           <span className="text-sm text-gray-800 dark:text-gray-200">
//             Page {pageNumber} of {numPages}
//           </span>
//           <button
//             className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded disabled:opacity-50"
//             disabled={pageNumber >= numPages}
//             onClick={() => setPageNumber((p) => p + 1)}
//           >
//             Next
//           </button>
//         </div>

//         {/* PDF Viewer */}
//         <div className="flex-1 w-full flex justify-center">
//           <Document
//             file="/static/nimit-resume.pdf"
//             onLoadSuccess={onDocumentLoadSuccess}
//             loading={
//               <p className="text-gray-500 dark:text-gray-400">Loading PDF…</p>
//             }
//             error={<p className="text-red-500">Failed to load PDF.</p>}
//           >
//             <Page
//               pageNumber={pageNumber}
//               width={600}
//               scale={scale}
//               className="rounded-lg shadow-md"
//             />
//           </Document>
//         </div>

//         <div className="absolute top-2 right-2 flex flex-col space-y-2">
//           <button
//             onClick={() => setScale((s) => Math.min(s + 0.1, 3))}
//             className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded p-2 shadow backdrop-blur-sm hover:scale-105 transition"
//           >
//             +
//           </button>
//           <button
//             onClick={() => setScale((s) => Math.max(s - 0.1, 0.5))}
//             className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded p-2 shadow backdrop-blur-sm hover:scale-105 transition"
//           >
//             -
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

//? V1

export function ResumeViewer() {
  return (
    <object
      data="/static/nimit-resume.pdf"
      type="application/pdf"
      width="100%"
      height="100%"
      style={{ minHeight: "100vh", position: "absolute", top: 0 }}
    >
      <p>
        Your browser does not support PDFs.
        <a
          href="/static/nimit-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download the PDF
        </a>
        .
      </p>
    </object>
  );
}
