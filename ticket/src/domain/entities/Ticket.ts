import crypto from 'crypto'

export default class Ticket {
  private constructor(
    readonly ticketId: string,
    readonly eventId: string,
    readonly email: string,
    public status: string,
  ) { }

  static create(eventId: string, email: string) {
    const ticketId = crypto.randomUUID()
    const initialStatus = "reserved"
    return new Ticket(ticketId, eventId, email, initialStatus)
  }

  static restore(ticketId: string, eventId: string, email: string, status: string) {
    return new Ticket(ticketId, eventId, email, status)
  }

  approve() {
    this.status = 'approved'
  }

  cancel() {
    this.status = 'cancelled'
  }
}