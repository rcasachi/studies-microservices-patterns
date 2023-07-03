import axios from 'axios'

test("should buy a ticket", async function () {
  const input = {
    event_id: 'bf6a9b3d-4d5c-4c9d-bf12-7as98scb7as0',
    email: 'seller@gmail.com',
    creditCardToken: '987654321',
  }

  const response = await axios.post('http://localhost:3000/purchase-ticket', input)
  const output = response.data

  expect(output.ticketId).toBeDefined()
})
