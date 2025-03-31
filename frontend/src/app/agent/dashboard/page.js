"use client";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function AgentDashboardPage() {
  const { user, loading } = useAuth();
  const [properties, setProperties] = useState([]);
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    if (user?.is_agent) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/agent/properties/`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then(setProperties)
        .catch(console.error);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/agent/visits/`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then(setVisits)
        .catch(console.error);
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!user || !user.is_agent) redirect("/");

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
      <p className="text-gray-800">Welcome, {user.username} 👋</p>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Properties
          </h2>
          <a
            href="/agent/properties/new"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition"
          >
            + Add Property
          </a>
        </div>

        {properties.length === 0 ? (
          <p className="text-gray-600 italic">
            You havent published any properties yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <h3 className="text-lg font-bold text-blue-700">
                  {prop.title}
                </h3>
                <p className="text-sm text-gray-600">{prop.city}</p>
                <p className="text-base font-semibold text-gray-800 mt-1">
                  ${prop.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Visit Requests {visits.length > 0 && `(${visits.length})`}
        </h2>

        {visits.length === 0 ? (
          <p className="text-gray-600 italic">
            You haven’t received any visit requests yet.
          </p>
        ) : (
          <div className="space-y-4">
            {visits.map((visit) => (
              <div
                key={visit.visit_id}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <h3 className="font-bold text-blue-800">
                  {visit.property.title}
                </h3>
                <p className="text-sm text-gray-700">
                  Visitor: <strong>{visit.user.username}</strong>
                </p>
                <p className="text-sm text-gray-700">
                  Date: {new Date(visit.visit_date).toLocaleString()}
                </p>
                {visit.message && (
                  <p className="text-sm italic text-gray-600 mt-1">
                    “{visit.message}”
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
