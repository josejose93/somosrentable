'use client'

import { useState } from 'react'

export default function VisitForm({ propertyId }) {
  const [visitDate, setVisitDate] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess(null)
    setError(null)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visit-request/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          property_id: propertyId,
          visit_date: new Date(visitDate).toISOString(),
          message,
        }),
      })

      if (!res.ok) throw new Error('Failed to schedule visit')

      setSuccess('Visit scheduled successfully!')
      setVisitDate('')
      setMessage('')
    } catch (err) {
      console.error(err)
      setError('Could not schedule visit. Please log in.')
    }
  }

  return (
    <div className="mt-8 border-t pt-4">
      <h2 className="text-xl font-bold mb-2">Schedule a Visit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Date and Time</label>
          <input
            type="datetime-local"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Message (optional)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded p-2"
            rows={3}
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  )
}
