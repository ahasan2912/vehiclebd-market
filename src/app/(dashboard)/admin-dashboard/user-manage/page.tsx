import AllUser from './components/AllUser';

const UserManage = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const userDataFetch = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/alluser`,
                { cache: "no-store" } // ensures fresh data on every request
            );
            if (res.ok) {
                const data = await res.json();
                return data?.users;
            } else {
                console.error("API responded with status:", res.status);
            }
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        }
    }
    const users = await userDataFetch();
    return (
        <div>
            <AllUser users={users} />
        </div>
    );
};

export default UserManage;