export default class TicketReserved {
  constructor(
    readonly ticketId: string,
    readonly eventId: string,
    readonly email: string,
    readonly creditCardToken: string,
    readonly price: number,
  ) {}
}