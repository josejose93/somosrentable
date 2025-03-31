"use client";

import useAuth from "@/hooks/useAuth";
import { setUser } from "@/hooks/authStore";
import { useState } from "react";
import LoginModal from "@/components/LoginModal";
import Link from "next/link";

export default function Navbar() {
  const { user } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout/`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        🏡 RealEstate
      </Link>

      <div className="space-x-4 text-sm flex items-center">
        {user ? (
          <>
            <span className="text-gray-700">
              Welcome, <strong>{user.username}</strong>
            </span>

            {user.is_agent && (
              <Link
                href="/agent/dashboard"
                className="text-gray-700 hover:underline"
              >
                Agent Dashboard
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsLoginOpen(true)}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>

            <LoginModal
              isOpen={isLoginOpen}
              onClose={() => setIsLoginOpen(false)}
              onLoginSuccess={() => setIsLoginOpen(false)}
            />
          </>
        )}
      </div>
    </nav>
  );
}
