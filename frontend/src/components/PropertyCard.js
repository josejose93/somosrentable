'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function PropertyCard({ property }) {
  const images = property.images || []
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length)
  }

  return (
    <Link href={`/properties/${property.slug}`}>
      <div className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer bg-white">
        {images.length > 0 && (
          <div className="relative">
            <Image
              src={images[currentImage]}
              alt={property.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    prevImage()
                  }}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 shadow hover:bg-white"
                >
                  ◀
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    nextImage()
                  }}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 shadow hover:bg-white"
                >
                  ▶
                </button>
              </>
            )}
          </div>
        )}

        <h2 className="text-lg font-semibold text-gray-900 truncate">{property.title}</h2>
        <p className="text-sm text-gray-700">{property.city}</p>
        <p className="font-bold text-base text-blue-700 mt-1">${property.price.toLocaleString()}</p>
      </div>
    </Link>
  )
}
