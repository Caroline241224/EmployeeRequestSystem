import { useEffect, useState } from "react"
import { getRequests, createRequest, updateStatus } from "./services/requestService"
import type { Request } from "./types/Request"

function App() {

  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [employeeName, setEmployeeName] = useState("")
  const [requestType, setRequestType] = useState("")
  const [description, setDescription] = useState("")

  const loadRequests = async () => {
    setError("")
    try {
      setLoading(true)
      const data = await getRequests()
      setRequests(data)
    } catch {
      setError("Error loading requests")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRequests()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      
      // EmployeeName, Type y Description (con Mayúsculas)
      await createRequest({
        EmployeeName: employeeName,
        Type: requestType, 
        Description: description
      } as any) 

      // Limpiar campos después de enviar
      setEmployeeName("")
      setRequestType("")
      setDescription("")

      loadRequests()

    } catch {
      setError("Error creating request. Check if the backend is running and validations pass.")
    }
  }

  const changeStatus = async (id: string, status: string) => {
    try {
      await updateStatus(id, status)
      loadRequests()
    } catch {
      setError("Error updating status")
    }
  }

  if (loading)
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading requests...</h2>
      </div>
    )

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>

      <h1>Employee Request System</h1>

      {error && (
        <div style={{ 
          backgroundColor: "#ffebee", 
          color: "#c62828", 
          padding: "10px", 
          borderRadius: "4px",
          marginBottom: "20px" 
        }}>
          {error}
        </div>
      )}

      <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
        <h2>Create Request</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Employee Name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            style={{ padding: "8px", width: "250px" }}
          />

          <br /><br />

          <input
            placeholder="Request Type (e.g. Vacation)"
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
            style={{ padding: "8px", width: "250px" }}
          />

          <br /><br />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: "8px", width: "250px" }}
          />

          <br /><br />

          <button 
            type="submit" 
            style={{ 
              padding: "10px 20px", 
              backgroundColor: "#1976d2", 
              color: "white", 
              border: "none", 
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Create Request
          </button>
        </form>
      </div>

      <hr style={{ margin: "30px 0" }} />

      <h2>Requests List</h2>

      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {requests.map((r) => (
            <li key={r.id} style={{ 
              borderBottom: "1px solid #ddd", 
              padding: "15px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <strong>{r.employeeName}</strong> - {r.requestType} <br />
                <small style={{ color: "#666" }}>Status: {r.status}</small>
              </div>

              <div>
                <button 
                  onClick={() => changeStatus(r.id, "Approved")}
                  style={{ marginRight: "10px", color: "green" }}
                >
                  Approve
                </button>
                <button 
                  onClick={() => changeStatus(r.id, "Rejected")}
                  style={{ color: "red" }}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App