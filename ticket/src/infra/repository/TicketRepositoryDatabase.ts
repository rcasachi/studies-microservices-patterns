import pgp from "pg-promise";
import TicketRepository from "../../application/repository/TicketRepository";
import Ticket from "../../domain/entities/Ticket";

export default class TicketRepositoryDatabase implements TicketRepository {
  async save(ticket: Ticket): Promise<void> {
    const connection = pgp()('postgres://postgres:123456@localhost:5432/app')

    await connection.query('insert into studies_microservices.ticket (ticket_id, event_id, email, status) values ($1, $2, $3, $4)', [
      ticket.ticketId, ticket.eventId, ticket.email, ticket.status
    ])

    await connection.$pool.end()
  }

  async update(ticket: Ticket): Promise<void> {
    const connection = pgp()('postgres://postgres:123456@localhost:5432/app')

    await connection.query('update studies_microservices.ticket set status = $1 where ticket_id = $2', [
      ticket.status, ticket.ticketId,
    ])

    await connection.$pool.end()
  }

    async get(ticketId: string): Promise<Ticket> {
    const connection = pgp()('postgres://postgres:123456@localhost:5432/app')
    const [ticketData] = await connection.query(
      'select * from studies_microservices.ticket where ticket_id = $1',
      [ticketId]
    )
    await connection.$pool.end()

    return Ticket.restore(ticketData.ticket_id, ticketData.event_id, ticketData.email, ticketData.status)
  }
}