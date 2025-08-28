import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import Header from './Header';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const fetchUserData = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/role?email=${session?.user?.email}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch, status: ${res.status}`);
      }
      const data = await res.json();
      return data?.role;
    } catch (error) {
      console.log("Failed to fetch product details", error);
    }
  }
  const userData = await fetchUserData() || {};
  return (
    <div>
      <Header userInfo={userData} />
    </div>
  );
}
export default Navbar;