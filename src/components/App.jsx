import Header from "./Header";
import Order from "./Order";
import Inventory from "./inventory";
import Fish from "./Fish";

import { useState, useEffect } from "react";
import sampleFishes from "../data/sample-fishes";
import { useParams } from "react-router-dom";

import { storeFishesInFirebase, attachFishesChangeListener } from "../persistence/fishRepository";
import { storeOrders, loadOrders } from "../persistence/orderRepository";

const App = () => {
  const { storeId } = useParams();

  const [fishes, setFishes] = useState({});
  const [orders, setOrders] = useState({});

  const addFish = (fish) => {
    const new_fishes = {
      ...fishes,
      [`fish${Date.now()}`]: fish,
    };

    setFishes(new_fishes);

    storeFishesInFirebase(storeId, new_fishes).catch((error) => {
      console.error("Failed to store fishes in Firebase:", error);
    });
  };

  const addOrder = (key) => {
    const new_orders = { ...orders };
    new_orders[key] = new_orders[key] + 1 || 1;

    setOrders(new_orders);
    storeOrders(storeId, new_orders);
  };

  const loadSampleFishes = () => {
    const new_fishes = { ...sampleFishes };
    setFishes(new_fishes);

    storeFishesInFirebase(storeId, new_fishes).catch((error) => {
      console.error("Failed to store fishes in Firebase:", error);
    });
  };

  useEffect(() => {
    const savedOrders = loadOrders(storeId);
    setOrders(savedOrders);
  }, [storeId]);

  useEffect(() => {
    if (!storeId) return;

    const detach = attachFishesChangeListener(
      storeId,
      (data) => setFishes({ ...data }),
      (err) => {
        console.error("Firebase subscription error:", err);
        setFishes({});
      }
    );

    return () => detach();
  }, [storeId]);

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Seafood Market" />

        {Object.keys(fishes).map((key) => (
          <Fish
            key={key}
            index={key}
            details={fishes[key]}
            addOrder={addOrder}
          />
        ))}
      </div>

      <Order fishes={fishes} orders={orders} />
      <Inventory addFish={addFish} loadSampleFishes={loadSampleFishes} />
    </div>
  );
};

export default App; 
