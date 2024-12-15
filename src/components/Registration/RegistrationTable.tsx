import { useState, useMemo } from "react";
import { Table, Input, Divider } from "rsuite";
import { User } from "../../type/user";

interface RegistrationTableProps {
  data: User[];
}

const RegistrationTable: React.FC<RegistrationTableProps> = ({ data }) => {
  const [search, setSearch] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User | "";
    direction: "asc" | "desc";
  }>({
    key: "",
    direction: "asc",
  });
  const { Column, HeaderCell, Cell } = Table;

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      `${item.firstName} ${item.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

 const sortedData = useMemo(() => {
  const sorted = [...filteredData]; 
  if (sortConfig.key) {
    sorted.sort((a, b) => {
      const key = sortConfig.key as keyof User; 
      if (a[key] && b[key]) {
        if (a[key] < b[key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
      }
      return 0;
    });
  }
  return sorted;
}, [filteredData, sortConfig]);

  

  const handleSort = (key: keyof User) => {
    setSortConfig((prevConfig) => {
      const direction =
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc";
      return { key, direction };
    });
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-2xl shadow-md h-[calc(100vh-305px)]">
      <div className="flex items-center justify-between">
        <Input
          value={search}
          onChange={(value) => setSearch(value)}
          placeholder="Search by name"
          style={{ width: 400 }}
        />
      </div>

      <Divider />

      <Table
        height={400}
        data={sortedData.length ? sortedData : data}
        sortColumn={sortConfig.key}
        sortType={sortConfig.direction}
        onSortColumn={(key) => handleSort(key as keyof User)}
        style={{
          width: "100%",
        }}
      >
        <Column width={70} align="center" fixed>
          <HeaderCell>No.</HeaderCell>
          <Cell>
            {(_, rowIndex) => (
              <span>{rowIndex !== undefined ? rowIndex + 1 : "N/A"}</span>
            )}
          </Cell>
        </Column>

        <Column width={200} sortable>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column width={200} sortable>
          <HeaderCell>Last Name</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>

        <Column width={200} sortable>
          <HeaderCell>Phone</HeaderCell>
          <Cell dataKey="phone" />
        </Column>
      </Table>
    </div>
  );
};

export default RegistrationTable;
