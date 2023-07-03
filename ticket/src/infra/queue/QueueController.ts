import PaymentApproved from "../../domain/event/PaymentApproved";
import Registry from "../registry/Registry";

export default class QueueController {
  constructor(readonly registry: Registry) {
    const queue = registry.inject('queue')
    const paymentApproved = registry.inject('paymentApproved')

    queue.on('paymentApproved', async function (event: PaymentApproved) {
      await paymentApproved.execute(event)
    })
  }
}