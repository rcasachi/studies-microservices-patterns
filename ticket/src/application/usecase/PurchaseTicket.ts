import Ticket from "../../domain/entities/Ticket"
import TicketReserved from "../../domain/event/TicketReserved"
import Queue from "../../infra/queue/Queue"
import Registry from "../../infra/registry/Registry"
import EventRepository from "../repository/EventRepository"
import TicketRepository from "../repository/TicketRepository"

export default class PurchaseTicket {
  ticketRepository: TicketRepository
  eventRepository: EventRepository
  queue: Queue

  constructor(readonly registry: Registry) {
    this.ticketRepository = registry.inject('ticketRepository')
    this.eventRepository = registry.inject('eventRepository')
    this.queue = registry.inject('queue')
  }

  async execute(input: Input): Promise<void> {
    const event = await this.eventRepository.get(input.eventId)
    const ticket = Ticket.create(input.eventId, input.email)
    await this.ticketRepository.save(ticket)

    const ticketReserved = new TicketReserved(
      ticket.ticketId, event.eventId, ticket.email, input.creditCardToken, event.price
    )

    await this.queue.publish("ticketReserved", ticketReserved)
  }
}

type Input = {
  eventId: string,
  email: string,
  creditCardToken: string,
}
