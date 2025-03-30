'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties/`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setProperties(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch properties:', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="text-center p-4">Loading...</p>

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Available Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="border rounded-xl p-4 shadow hover:shadow-md transition">
            {property.images.length > 0 && (
              <Image
                src={property.images[0]}
                alt={property.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
            )}
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <p className="text-sm text-gray-500">{property.city}</p>
            <p className="font-bold text-lg mt-1">${property.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
