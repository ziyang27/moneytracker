const balanceCalculator = (transactions) => {
    let balance = 0;
    for (const transaction of transactions) {
        balance = balance + transaction.price;
    }
    return balance.toFixed(2);
}

export { balanceCalculator };