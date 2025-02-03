export interface User {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  gender: string;
  age: number;
}

export async function fetchUsers(
  page: number,
  search: string,
  gender: string,
): Promise<{ users: User[]; total: number }> {
  try {
    const response = await fetch("/exam-2/exam-2.json");
    const data = await response.json();

    let filteredUsers = data;

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user: User) =>
          user.fullName.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.phone.includes(search),
      );
    }

    // Filter by gender
    if (gender) {
      filteredUsers = filteredUsers.filter((user: User) => user.gender === gender);
    }

    // Sort by id or age
    filteredUsers.sort((a: User, b: User) => {
      const aValue = a.id; // default sort by id
      const bValue = b.id;

      return aValue > bValue ? 1 : -1; // asc order
    });

    // Pagination logic
    const total = filteredUsers.length;
    const perPage = 10;
    const start = (page - 1) * perPage;
    const paginatedUsers = filteredUsers.slice(start, start + perPage);

    return { users: paginatedUsers, total };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return { users: [], total: 0 };
  }
}
