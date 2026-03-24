import { Link } from "@tanstack/react-router"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

type DashboardRow = {
  section: string
}

const columnHelper = createColumnHelper<DashboardRow>()

const columns = [
  columnHelper.accessor("section", {
    header: "Section",
    cell: (info) => info.getValue(),
  }),
]

function DashboardPage() {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <main className="min-h-svh bg-[radial-gradient(circle_at_top,_#fffefc_0%,_#f4efe7_48%,_#ece5db_100%)] px-6 py-10 text-[#232323] sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_20px_70px_rgba(53,45,31,0.08)] backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium tracking-[0.24em] text-[#9c8f7d] uppercase">
              Dashboard
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.03em]">
              Empty dashboard
            </h1>
          </div>
          <ButtonLink />
        </div>

        <div className="rounded-[24px] border border-dashed border-[#ddd4c8] bg-[#fbf8f3] p-8 text-center">
          <p className="text-lg font-medium">No widgets yet.</p>
          <p className="mt-2 text-sm text-[#7e7569]">
            TanStack Table is wired up and ready once dashboard data is added.
          </p>
        </div>

        <div className="hidden">
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

function ButtonLink() {
  return (
    <Link
      to="/login"
      className="inline-flex h-11 items-center justify-center rounded-full border border-[#d9d1c4] bg-white px-5 text-sm font-semibold text-[#3b342c] transition hover:bg-[#f7f2ea]"
    >
      Back to login
    </Link>
  )
}

export { DashboardPage }
