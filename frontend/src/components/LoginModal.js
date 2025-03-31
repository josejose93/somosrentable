"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { setUser } from "@/hooks/authStore";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const userData = await res.json();
      setUser(userData);
      onLoginSuccess();
      onClose();
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl relative">
          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Close login modal"
          >
            ×
          </button>

          <Dialog.Title className="text-xl font-bold mb-4 text-gray-900">
            Login
          </Dialog.Title>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Username
              </label>
              <input
                type="text"
                className="border rounded p-2 text-gray-900"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Password
              </label>
              <input
                type="password"
                className="border rounded p-2 text-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
