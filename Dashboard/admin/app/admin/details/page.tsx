"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import reports from "../../../reports.json";
import Navbar from "@/app/zonal-head/components/Navbar";
import { Suspense } from "react";
// import Navbar from "../components/Navbar";

export default function Details() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsContent />
    </Suspense>
  );
}

function DetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const report = reports.reports.find((r) => r.id === id);

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
        <Navbar />
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Report Not Found
            </h1>
            <p className="text-gray-600">
              The report you&apos;re looking for could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-red-100 text-red-900 border border-red-200";

      case "Resolved":
        return "bg-green-100 text-green-900 border border-green-200";
      default:
        return "bg-gray-50 text-gray-800 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800 drop-shadow-sm">
            Report Details
          </h1>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm ${getStatusColor(
              report.status
            )}`}
          >
            {report.status}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Location Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Location Information
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-semibold">
                    Location ID:
                  </span>
                  <span className="text-gray-600">#{report.id}</span>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-semibold">
                      Coordinates:
                    </span>
                    <a
                      href={`https://www.google.com/maps?q=${report.coordinates.lat},${report.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                    >
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      View on Maps
                    </a>
                  </div>
                  <span className="text-gray-600">
                    {report.coordinates.lat}° N, {report.coordinates.lng}° E
                  </span>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-semibold block mb-1">
                    Address:
                  </span>
                  <span className="text-gray-600">{report.location}</span>
                </div>
              </div>
            </div>

            {/* Assignment Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Assignment Details
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-semibold">Driver:</span>
                  <span className="text-gray-600">Rakesh Kumar</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-semibold">Vehicle:</span>
                  <span className="text-gray-600">
                    {report.assignedVehicle}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Status and Timestamps */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Timeline
              </h2>

              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-semibold block mb-1">
                    Reported On:
                  </span>
                  <span className="text-gray-600">{report.timestamp}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-semibold block mb-1">
                    Last Updated:
                  </span>
                  <span className="text-gray-600">{report.lastUpdated}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-semibold block mb-1">
                    Reporting Mode:
                  </span>
                  <span className="text-gray-600">{report.reportingMode}</span>
                </div>
              </div>
            </div>

            {/* Image Display */}
            {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                Site Image
              </h2>
              <div className="rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={report.imageURL}
                  alt="Waste Site"
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
