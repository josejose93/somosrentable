import PropertyCard from '@/components/PropertyCard'

async function getProperties() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties/`, {
    cache: 'no-store',
    credentials: 'include',
  })

  if (!res.ok) throw new Error('Failed to fetch properties')

  return res.json()
}

export default async function HomePage() {
  const properties = await getProperties()

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Available Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </main>
  )
}
