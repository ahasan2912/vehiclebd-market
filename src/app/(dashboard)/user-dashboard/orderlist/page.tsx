import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import toast from 'react-hot-toast';
import OrderList from './components/OrderList';

const OrderPage = async () => {
  const session = await getServerSession(authOptions);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  if (!session?.user?.email) {
    return toast("Please log in to see your orders.");
  }
  let orders = [];
  try {
    /* here data fatch by query not params, if we are want to params then create forder and path must be order/[email]/route.ts */
    const res = await fetch(
      `${baseUrl}/api/order?email=${session.user.email}`,
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
export default OrderPage;