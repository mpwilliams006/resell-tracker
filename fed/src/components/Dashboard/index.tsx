import React, { useEffect, useState } from 'react';

interface Purchase {
  _id: string;
  item: string;
  userId: string;
  quantity: number;
  datePurchased: string;
  dateSold: string;
  purchasePrice: number;
  soldPrice: number;
  categories: Array<string>;
}

interface PurchaseProps {
  purchases: Array<Purchase>;
}

const Dashboard = ({ purchases }: PurchaseProps) => {
  const [totalSales, setTotalSales] = useState(0);
  const [profits, setProfits] = useState(0);
  const getTotalSales = () => {
    if (purchases.length > 0) {
      let total = purchases.reduce(function (acc, cur) {
        if (Number.isInteger(cur.soldPrice)) acc += cur.soldPrice;
        return acc;
      }, 0);
      setTotalSales(total);
    }
  }
  const getTotalProfits = () => {
    if (purchases.length > 0) {
      let total = purchases.reduce(function (acc, cur) {
        if (Number.isInteger(cur.soldPrice)) acc += (cur.soldPrice - cur.purchasePrice);
        return acc;
      }, 0);
      setProfits(total);
    }
  }
  useEffect(() => {
    purchases && getTotalSales();
    purchases && getTotalProfits();
  });
  return (
    <div className="mx-auto">
      <div>
        <span>Total Sales</span>
        <div>${totalSales}</div>
      </div>
      <div>
        <span>Profits</span>
        <div>${profits}</div>
      </div>

    </div>
  );
};

export { Dashboard as default };