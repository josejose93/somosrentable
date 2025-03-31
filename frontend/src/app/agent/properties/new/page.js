"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPropertyPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    images: null,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setForm({ ...form, images: files });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Crear propiedad
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: form.title,
            description: form.description,
            address: form.address,
            city: form.city,
            price: form.price,
            bedrooms: form.bedrooms,
            bathrooms: form.bathrooms,
            area: form.area,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to create property");

      const data = await res.json();

      if (form.images?.length) {
        for (let img of form.images) {
          const formData = new FormData();
          formData.append("image", img);

          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/properties/${data.id}/upload-image/`,
            {
              method: "POST",
              credentials: "include",
              body: formData,
            }
          );
        }
      }

      setSuccess("Property created successfully!");
      router.push("/agent/dashboard");
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ["title", "Title"],
          ["description", "Description"],
          ["address", "Address"],
          ["city", "City"],
          ["price", "Price"],
          ["bedrooms", "Bedrooms"],
          ["bathrooms", "Bathrooms"],
          ["area", "Area (m²)"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-800">
              {label}
            </label>
            {name === "description" ? (
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded p-2 text-gray-900"
                rows={4}
                required
              />
            ) : (
              <input
                type={
                  ["price", "bedrooms", "bathrooms", "area"].includes(name)
                    ? "number"
                    : "text"
                }
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full border rounded p-2 text-gray-900"
                required
                min="0"
                step={name === "price" ? "0.01" : "1"}
              />
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Images
          </label>

          <label
            htmlFor="images"
            className="inline-block cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 text-sm text-gray-800 px-4 py-2 rounded shadow-sm transition"
          >
            📁 Choose Images
          </label>

          <input
            id="images"
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />

          <p className="mt-1 text-xs text-gray-600">
            You can select multiple images (JPG, PNG, etc.)
          </p>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Publish Property
        </button>
      </form>
    </div>
  );
}
