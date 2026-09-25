export const COMMISSION_RATE = 0.1;

export interface RevenueInput {
  customerPaymentsReceived: number;
  excludedTaxes: number;
  refunds: number;
  chargebacks: number;
}

export function eligibleCollectedRevenue(input: RevenueInput): number {
  const value =
    input.customerPaymentsReceived -
    input.excludedTaxes -
    input.refunds -
    input.chargebacks;
  return Math.max(0, Math.round(value * 100) / 100);
}

/** Commission is never derived from a call, lead, estimate, or unpaid invoice. */
export function commissionDue(input: RevenueInput): number {
  return Math.round(eligibleCollectedRevenue(input) * COMMISSION_RATE * 100) / 100;
}
