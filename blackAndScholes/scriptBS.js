function cnd(x) {
    const a1 = 0.319381530;
    const a2 = -0.356563782;
    const a3 = 1.781477937;
    const a4 = -1.821255978;
    const a5 = 1.330274429;

    const L = Math.abs(x);
    const k = 1.0 / (1.0 + 0.2316419 * L);
    const w = 1.0 - 1.0 / Math.sqrt(2 * Math.PI) *
        Math.exp(-L * L / 2) *
        (a1 * k + a2 * k * k + a3 * Math.pow(k, 3) + a4 * Math.pow(k, 4) + a5 * Math.pow(k, 5));

    return x < 0 ? 1.0 - w : w;
}

function blackScholes(S, K, r, sigma, T, type = "call") {
    const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);

    if (type === "call") {
        let res = S * cnd(d1) - K * Math.exp(-r * T) * cnd(d2);
        document.getElementById("call_price").innerText = res;
    } else {
        return K * Math.exp(-r * T) * cnd(-d2) - S * cnd(-d1);
    }
    console.log(userInputSpotPrice)
    //getElementById("call_price").innerText = blackScholes(100, 95, 0.02, 0.25, 0.5, "call");
}

let calcKnap = document.getElementById('calculateBtn')

calcKnap.addEventListener("click", () => {
    const S = Number(document.getElementById("spot_price").value);
    const K = Number(document.getElementById("strike_price").value);
    const r = Number(document.getElementById("risk_free").value);
    const sigma = Number(document.getElementById("volatility").value);
    const T = Number(document.getElementById("ttm").value);

    blackScholes(S, K, r, sigma, T, "call");
});


// Eksempel på kald:
// const price = blackScholes(100, 95, 0.02, 0.25, 0.5, "call");
// console.log("Option price:", price);
