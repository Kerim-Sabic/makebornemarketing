"""Reference implementation of the Makeborne funnel calculator (mirrors funnel.json formulas)."""
import json, sys

PRICES = {"create": 20, "studio": 49, "scale": 99}
BUCKETS = ("creators", "boosts", "contentRewards")


def run(p):
    days = p["days"]
    shape = p["weeklyShape"]
    organic_total = sum(p["visitsPerDay"].values()) * days
    blended = sum(p["planMix"][k] * PRICES[k] for k in PRICES)
    ys, yd = p["yearlyShare"], p["yearlyDiscount"]
    conv = p["signupRate"] * p["paidRate"]
    mult = p["paidConversionMultiplier"]
    ri = p["reinvest"]
    spend = {b: [0.0] * days for b in BUCKETS}
    for line in p["budgetSchedule"]:
        if line.get("conditional"):
            continue
        per_day = line["usd"] / (len(line["weeks"]) * 7)
        for w in line["weeks"]:
            for d in range((w - 1) * 7, min(w * 7, days)):
                spend[line["bucket"]][d] += per_day
    cpv = {
        "creators": p["creatorCPM"] / (1000 * p["creatorClickRate"]),
        "boosts": p["adCPC"],
        "contentRewards": p["contentRewardsCPM"] / (1000 * p["contentRewardsClickRate"]),
    }
    cohorts = []
    yearly_active = 0.0
    weeks = {}
    cum = dict(paidSpend=0.0, paidNet=0.0, gross=0.0, net=0.0, visits=0.0, loopGross=0.0, reinvest=0.0, budgetSpent=0.0)
    active_prev, mrr = 0.0, 0.0
    weekly_cash = [0.0] * (days // 7 + 2)
    weekly_reinvest = [0.0] * (days // 7 + 2)
    weekly_paid_spend = [0.0] * (days // 7 + 2)
    mrr_day = []
    for d in range(days):
        w = d // 7 + 1
        if d % 7 == 0 and w >= ri["startWeek"]:
            cac = cum["paidSpend"] / cum["paidNet"] if cum["paidNet"] > 0 else float("inf")
            share = 0.0
            if cum["paidNet"] >= ri["minPaidPayers"]:
                if cac <= ri["cacTarget"]:
                    share = ri["share"]
                elif cac <= ri["cacTarget"] * 1.25:
                    share = ri["reducedShare"]
            budget = share * weekly_cash[w - 1]
            cap = min(ri["maxWeeklyUsd"], max(ri["growthFloorUsd"], weekly_reinvest[w - 1] * ri["maxWeeklyGrowth"]))
            budget = min(budget, cap)
            weekly_reinvest[w] = budget
            if share > 0:
                for line in p["budgetSchedule"]:
                    if line.get("conditional") and w in line["weeks"]:
                        per_day = line["usd"] / (len(line["weeks"]) * 7)
                        for dd in range(d, min(d + 7, days)):
                            spend[line["bucket"]][dd] += per_day
            cr_share = ri["contentRewardsShare"] if mrr >= ri["contentRewardsMinMrr"] else 0.0
            for dd in range(d, min(d + 7, days)):
                spend["contentRewards"][dd] += budget * cr_share / 7
                spend["creators"][dd] += budget * (1 - cr_share) / 7
            cum["reinvest"] += budget
        org = organic_total * shape[w - 1] / 7
        pv = {b: spend[b][d] / cpv[b] for b in BUCKETS}
        paid_visits = sum(pv.values())
        day_spend = sum(spend[b][d] for b in BUCKETS)
        pvw = p.get("preview", {})
        on = pvw.get("enabled") and w >= pvw.get("fromWeek", 99)
        c = conv * (pvw.get("paidRateUplift", 1.0) if on else 1.0)
        paid_gross = sum(pv[b] * c * mult[b] for b in BUCKETS)
        loop_gross = p["viralCoefficient"] / 30 * active_prev
        gross = org * c + paid_gross + loop_gross
        preview_cost = (org + paid_visits) * p["signupRate"] * pvw.get("takeRate", 0) * pvw.get("costUsd", 0) if on else 0.0
        net = gross * (1 - p["refundRate"])
        new_m, new_y = net * (1 - ys), net * ys
        cohorts.append((d, new_m))
        yearly_active += new_y
        act_m = 0.0
        for cd, n in cohorts:
            act_m += n * (1 - p["monthlyChurn"]) ** ((d - cd) // 30)
        active = act_m + yearly_active
        mrr = act_m * blended + yearly_active * blended * (1 - yd)
        mrr_day.append(mrr)
        first_cash = new_m * blended + new_y * blended * 12 * (1 - yd)
        net_new_cash = first_cash * (1 - p["feePct"]) - net * p["feeFixed"] - preview_cost
        cum["previewCost"] = cum.get("previewCost", 0.0) + preview_cost
        cum["peakGrossDay"] = max(cum.get("peakGrossDay", 0.0), gross)
        cum["firstCash"] = cum.get("firstCash", 0.0) + net_new_cash
        act = p["activationRate"]["weeks1to4"] if w <= 4 else p["activationRate"]["after"]
        cum["activated"] = cum.get("activated", 0.0) + net * act
        weekly_cash[w] += net_new_cash
        weekly_paid_spend[w] += day_spend
        cum["paidSpend"] += day_spend
        cum["paidNet"] += paid_gross * (1 - p["refundRate"])
        cum["gross"] += gross
        cum["net"] += net
        cum["visits"] += org + paid_visits
        cum["loopGross"] += loop_gross
        wk = weeks.setdefault(w, dict(visits=0.0, signups=0.0, gross=0.0, net=0.0, loop=0.0, spend=0.0, cash=0.0))
        wk["visits"] += org + paid_visits
        wk["signups"] += (org + paid_visits) * p["signupRate"]
        wk["gross"] += gross
        wk["net"] += net
        wk["loop"] += loop_gross
        wk["spend"] += day_spend
        wk["cash"] += net_new_cash
        wk["active"], wk["mrr"] = active, mrr
        active_prev = active
    weekly = []
    for w, v in sorted(weeks.items()):
        weekly.append(dict(week=w, visits=round(v["visits"]), signups=round(v["signups"]), grossPaid=round(v["gross"], 1),
                           netPaid=round(v["net"], 1), loopShare=round(v["loop"] / v["gross"], 3) if v["gross"] else 0,
                           paidSpend=round(v["spend"]), activeSubs=round(v["active"]), mrr=round(v["mrr"])))
    summary = dict(
        qualifiedVisits=round(cum["visits"]), grossPaid=round(cum["gross"]), netPaid=round(cum["net"]),
        loopShareOverall=round(cum["loopGross"] / cum["gross"], 3), activeEnd=round(active_prev),
        mrrDay30=round(mrr_day[29]), mrrDay60=round(mrr_day[59]), mrrEnd=round(mrr_day[-1]), arrEnd=round(mrr_day[-1] * 12),
        paidSpendTotal=round(cum["paidSpend"]), reinvestedFromRevenue=round(cum["reinvest"]),
        paidCac=round(cum["paidSpend"] / cum["paidNet"], 1) if cum["paidNet"] else None,
        netArpu=round(blended * (1 - ys * yd), 2), visitToPaid=round(conv, 4),
        loopVisitsImplied=round(cum["loopGross"] / conv), activatedPayers=round(cum["activated"]),
        netNewCashFirstPayments=round(cum["firstCash"]), previewAiCost=round(cum["previewCost"]),
        peakGrossPerDay=round(cum["peakGrossDay"], 1),
        aiLimitNeededPerDayUsd=[round(cum["peakGrossDay"] * p["firstBuildsPerPayerDay1"] * p["firstSiteBuildCostUsd"]["median"]),
                                round(cum["peakGrossDay"] * p["firstBuildsPerPayerDay1"] * p["firstSiteBuildCostUsd"]["worst"])],
        monthlyContributionEnd=round(active_prev * sum(p["planMix"][k] * p["contributionPerSubMonth"][k] for k in PRICES)),
    )
    return summary, weekly


if __name__ == "__main__":
    P = json.load(open(sys.argv[1]))
    if "scenarios" in P:  # data/funnel.json: run every scenario's inputs
        P = {s["id"]: s["inputs"] for s in P["scenarios"]}
    for name, sc in P.items():
        s, wk = run(sc)
        print(name, s)
        if "-v" in sys.argv:
            for r in wk:
                print("   ", r)
