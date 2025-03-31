import Image from 'next/image'
import VisitForm from '@/components/VisitForm'
import PropertyGallery from '@/components/PropertyGallery'

async function getProperty(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties/${slug}/`, {
    cache: 'no-store',
    credentials: 'include',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch property data')
  }

  return res.json()
}

export default async function PropertyPage({ params }) {
    const { slug } = await params;
    const property = await getProperty(slug);

  return (
    <div className="space-y-8">
        <section>
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <p className="text-gray-700">{property.address}, {property.city}</p>
            <p className="text-lg font-bold text-blue-700 mt-2">${property.price.toLocaleString()}</p>
        </section>

        <section>
            <PropertyGallery images={property.images} />
        </section>

        <section className="prose max-w-none">
            <h2>Description</h2>
            <p>{property.description}</p>

            <h2>Agent</h2>
            <p><strong>{property.agent.name}</strong></p>
            <p>{property.agent.phone}</p>
        </section>

        <VisitForm propertyId={property.id} />
    </div>
  )
}
