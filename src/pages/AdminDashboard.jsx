import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Button from '../components/Button'
import { supabase } from '../lib/supabaseClient'

export default function AdminDashboard() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setLeads(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      const { error: updateError } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId)

      if (updateError) throw updateError

      setLeads(leads.map(lead =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ))
    } catch (err) {
      alert('Error updating lead status: ' + err.message)
    }
  }

  const filteredLeads = statusFilter === 'all'
    ? leads
    : leads.filter(lead => lead.status === statusFilter)

  const getStatusBadgeColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <p className="text-xl text-secondary-600">Loading leads...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-secondary-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-xl text-secondary-600">
              Manage your leads and track inquiries
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">Error: {error}</p>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('all')}
                >
                  All ({leads.length})
                </Button>
                <Button
                  variant={statusFilter === 'new' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('new')}
                >
                  New ({leads.filter(l => l.status === 'new').length})
                </Button>
                <Button
                  variant={statusFilter === 'contacted' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('contacted')}
                >
                  Contacted ({leads.filter(l => l.status === 'contacted').length})
                </Button>
                <Button
                  variant={statusFilter === 'qualified' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('qualified')}
                >
                  Qualified ({leads.filter(l => l.status === 'qualified').length})
                </Button>
              </div>
              <Button size="sm" onClick={fetchLeads}>
                Refresh
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredLeads.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-secondary-600">No leads found</p>
              </div>
            ) : (
              filteredLeads.map((lead) => (
                <div key={lead.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-secondary-900">
                          {lead.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-secondary-600 mb-4">
                        <div>
                          <strong>Email:</strong> {lead.email}
                        </div>
                        {lead.phone && (
                          <div>
                            <strong>Phone:</strong> {lead.phone}
                          </div>
                        )}
                        {lead.company && (
                          <div>
                            <strong>Company:</strong> {lead.company}
                          </div>
                        )}
                        {lead.service_interest && (
                          <div>
                            <strong>Interest:</strong> {lead.service_interest}
                          </div>
                        )}
                        <div>
                          <strong>Source:</strong> {lead.source}
                        </div>
                        <div>
                          <strong>Date:</strong> {formatDate(lead.created_at)}
                        </div>
                      </div>

                      <div className="bg-secondary-50 rounded-lg p-4">
                        <strong className="block text-sm text-secondary-700 mb-2">Message:</strong>
                        <p className="text-secondary-900">{lead.message}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 lg:min-w-[160px]">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className="px-4 py-2 border border-secondary-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}
