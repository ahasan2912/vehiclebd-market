import OrderList from './components/OrderList';

const UserOrders = async () => {
  let orders = [];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  try {
    const res = await fetch(`${baseUrl}/api/order`,
      { cache: "no-store" } // ensures fresh data on every request
    );

    if (res.ok) {
      const data = await res.json();
      orders = data.orders || [];
    } else {
      console.error("API responded with status:", res.status);
    }
  } catch (err) {
    console.error("Failed to fetch orders:", err);
  }
  return (
    <div>
      <OrderList orders={orders} />
    </div>
  );
};

export default UserOrders;