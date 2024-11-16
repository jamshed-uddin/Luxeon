import { ColumnCell } from "@/lib/definition";

interface TableProps<T extends object> {
  column: ColumnCell<T>[];
  data: T[];
}

const isKeyOfT = <T extends object>(
  field: string | number | symbol,
  obj: T
): field is keyof T => {
  return field in obj;
};

const Table = <T extends object>({ column, data }: TableProps<T>) => {
  return (
    <div className="overflow-auto relative min-h-[70vh] max-h-[70vh] hide-scrollbar  flex flex-col  ">
      <table className="w-max relative min-w-full ">
        <thead className=" bg-gray-100 sticky top-0 left-0 right-0 z-50 border-b border-black">
          <tr className=" ">
            {column?.map((singleColumn) => (
              <th
                key={String(singleColumn.headerName)}
                className="text-left px-2 text-lg font-semibold py-3  overflow-hidden "
                style={{
                  width: singleColumn.width
                    ? `${singleColumn.width}px`
                    : "fit-content",
                }}
              >
                {singleColumn.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {data.map((item) => (
            <tr
              key={(item as { _id: string })?._id}
              className="  h-[3.2rem]  text-left  text-base overflow-x-scroll  px-2 border-b border-black"
            >
              {column.map((singleColumn) => (
                <td
                  key={String(singleColumn.headerName)}
                  className="px-2  overflow-hidden"
                  style={{
                    maxWidth: singleColumn.width
                      ? `${singleColumn.width}px`
                      : "fit-content",
                  }}
                >
                  {String(singleColumn.field).toLowerCase() === "action" &&
                  singleColumn.renderCell ? (
                    singleColumn.renderCell(item)
                  ) : String(singleColumn.field).toLowerCase() === "avatar" &&
                    singleColumn.renderCell ? (
                    <div className="h-[3.1rem] w-[3.1rem] rounded-lg overflow-hidden">
                      {singleColumn.renderCell(item)}
                    </div>
                  ) : isKeyOfT(singleColumn.field, item) ? (
                    <h2 className="w-max">
                      {String(item[singleColumn.field])}
                    </h2>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
