'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog } from '@headlessui/react'

export default function PropertyGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const maxThumbnails = 5

  const handleClick = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px]">
        {images.map((img, index) => {
          const showBadge = index === maxThumbnails - 1 && images.length > maxThumbnails
          if (index >= maxThumbnails) return null

          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`border-2 rounded overflow-hidden focus:outline-none ${
                index === activeIndex ? 'border-blue-600' : 'border-transparent'
              } relative`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="object-cover"
              />
              {showBadge && (
                <span className="absolute inset-0 bg-black/60 text-white text-sm font-medium flex items-center justify-center">
                  +{images.length - maxThumbnails}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Main Image */}
      <div className="flex-1 border rounded-xl overflow-hidden">
        <Image
          src={images[activeIndex]}
          alt={`Image ${activeIndex + 1}`}
          width={800}
          height={500}
          loading="lazy"
          onClick={() => setIsOpen(true)}
          className="w-full h-auto object-cover cursor-zoom-in"
        />
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/80" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full flex items-center justify-center">
            {/* Botón cerrar */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-300"
            >
              ×
            </button>

            {/* Flecha izquierda */}
            {images.length > 1 && (
              <button
                onClick={() =>
                  setActiveIndex((activeIndex - 1 + images.length) % images.length)
                }
                className="absolute left-4 text-white text-3xl hover:text-gray-300"
              >
                ◀
              </button>
            )}

            {/* Imagen ampliada */}
            <Image
              src={images[activeIndex]}
              alt={`Zoom ${activeIndex + 1}`}
              width={1200}
              height={800}
              className="rounded-xl max-h-[90vh] object-contain"
            />

            {/* Flecha derecha */}
            {images.length > 1 && (
              <button
                onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
                className="absolute right-4 text-white text-3xl hover:text-gray-300"
              >
                ▶
              </button>
            )}
          </div>
        </div>
      </Dialog>

    </div>
  )
}
