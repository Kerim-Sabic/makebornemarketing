/**
 * Subscriber cohorts with the same mechanics as src/lib/funnelModel.ts: each day's net payers split into monthly and
 * yearly subscribers; a monthly cohort loses `churn` at every 30-day renewal; yearly subscribers do not churn inside
 * the window. Renewals are processed before the day's new payers are added, which reproduces the calculator exactly.
 * Day indices are 0-based from an origin chosen by the caller.
 */
export class Book {
  private m: Float64Array;
  actM = 0;
  yearly = 0;

  constructor(size: number) {
    this.m = new Float64Array(Math.max(1, size));
  }

  /** Renewals due on `day`: every monthly cohort at a 30-day anniversary loses `churn`. */
  renew(day: number, churn: number) {
    let lost = 0;
    let due = 0;
    for (let k = day - 30; k >= 0; k -= 30) {
      const n = this.m[k];
      if (n !== 0) {
        due += n;
        const l = n * churn;
        this.m[k] = n - l;
        lost += l;
      }
    }
    this.actM -= lost;
    return { lost, due };
  }

  add(day: number, net: number, yearlyShare: number) {
    const mo = net * (1 - yearlyShare);
    this.m[day] += mo;
    this.actM += mo;
    this.yearly += net * yearlyShare;
  }

  /** Rescale every cohort (used to anchor the book to a logged Whop MRR snapshot). */
  scale(f: number) {
    for (let i = 0; i < this.m.length; i++) this.m[i] *= f;
    this.actM *= f;
    this.yearly *= f;
  }

  get active() {
    return this.actM + this.yearly;
  }

  mrr(price: number, yearlyDiscount: number) {
    return this.actM * price + this.yearly * price * (1 - yearlyDiscount);
  }
}
