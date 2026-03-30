import type { Request } from "../types/Request"

const API_URL = "http://localhost:5063/api/requests"

export const getRequests = async () => {

  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error("Error fetching requests")
  }

  return response.json()
}

export const createRequest = async (request: Omit<Request, "id" | "status">) => {

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  })

  if (!response.ok) {
    throw new Error("Error creating request")
  }

  return response.json()
}

export const updateStatus = async (id: string, status: string) => {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  })

  if (!response.ok) {
    throw new Error("Error updating status")
  }

}