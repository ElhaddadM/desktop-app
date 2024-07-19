"use client";
import {  Progress } from 'antd';
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { AllDataByGroup, AllDataByFiliere } from "../app/(pages)/catalyst/Functions";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function TableB() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [count, setCount] = useState(true);

  const fetchData = async (choix = 1) => {
    const dataa = choix == 1 ?  await AllDataByGroup() : await AllDataByFiliere();
  //   const dataFilieres = 
    setData(dataa.env);
    setCount(true)
  //   setData2(dataFilieres.env);
  };

  useEffect(() => {
   
    fetchData(1);
    // const alo = setInterval(() => {
    //     setCount(prev=>prev+5)
    // }, 2200);
    // if (data.length > 0) clearInterval(alo)
  }, []);

//   const handleFetchData = useCallback(
//     (choix = 1) => {
//       const ftec = choix === 1 ? data1 : data2;
//       const formattedData = ftec?.map((itm, index) => ({
//         id: index,
//         Group: itm.group,
//         Active: itm.Active,
//         NotActive: itm.NotActive,
//         Total: itm.Total,
//         PourCentageA: itm.PourCentageA,
//         PourCentageN: itm.PourCentageN,
//       }));
//       setData(formattedData);
//     },
//     [data1, data2]
//   );

//   useEffect(() => {
//     handleFetchData(1);
//   }, [handleFetchData]);

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "Group",
        header: ({ column }) => (
          <Button
            className="font-bold"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Group
            <ArrowUpDown className="ml-2 h-4 w-4 text-blue-500 " />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="capitalize font-bold">{row.getValue("Group")}</div>
        ),
      },
      {
        accessorKey: "Active",
        header: ({ column }) => (
          <Button
            className="font-bold"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Active
            <ArrowUpDown className="ml-2 h-4 w-4 text-blue-500 " />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="lowercase text-green-500 text-md font-bold">{row.getValue("Active")}</div>
        ),
      },
      {
        accessorKey: "NotActive",
        header: ({ column }) => (
          <Button
            className="font-bold"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            NotActive
            <ArrowUpDown className="ml-2 h-4 w-4 text-blue-500" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="capitalize text-red-600 text-md font-bold">{row.getValue("NotActive")}</div>
        ),
      },
      {
        accessorKey: "Total",
        header: ({ column }) => (
          <Button
            className="font-bold"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total
            <ArrowUpDown className="ml-2 h-4 w-4 text-blue-500" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="capitalize text-blue-700 text-md font-bold">{row.getValue("Total")}</div>
        ),
      },
      {
        accessorKey: "PourCentageA",
        header: ({ column }) => (
          <Button
            className="font-bold"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            PourCentageA
            <ArrowUpDown className="ml-2 h-4 w-4 text-blue-500 " />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="capitalize text-green-500 text-md font-bold">{row.getValue("PourCentageA")}</div>
        ),
      },
      {
        accessorKey: "PourCentageN",
        header: ({ column }) => (
          <Button
            className="font-bold"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            PourCentageN
            <ArrowUpDown className="ml-2 h-4 w-4 text-blue-500" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="capitalize text-red-600 text-md font-bold">{row.getValue("PourCentageN")}</div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const radioRef1 = useRef(null);
  const radioRef2 = useRef(null);

  const handleCheck = useCallback(() => {
    if (radioRef1.current.checked) {
        fetchData(1);
        setCount(false)
    } else if (radioRef2.current.checked) {
        fetchData(2);
        setCount(false)

    }
  }, []);


  return (
    <div className="w-full">
      {/* <Progress
      percent={50}
      className={`${count ? 'hidden' : ''}`}
      percentPosition={{
        align: 'center',
        type: 'outer',
      }}

    /> */}


<span  className={`${count ? 'hidden' : " bg-blue-700 w-full h-8 flex justify-center items-center text-gray-900 dark:text-gray-100 dark:bg-gray-950"}`} >
	<div>
		<h1 class="text-ls md:text-lg font-bold flex items-center">L<svg stroke="currentColor" fill="currentColor" stroke-width="0"
				viewBox="0 0 24 24" class="animate-spin" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z">
				</path>
			</svg> ading . . .</h1>
	</div>
</span>

      <div className="flex items-center py-4">
        <Input
          placeholder="Filter group..."
          value={(table.getColumn("Group")?.getFilterValue() ?? "")}
          onChange={(event) =>
            table.getColumn("Group")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        
                <div className="form-control mx-8 font-bold " >
                    <label className="label cursor-pointer " >
                        <span className="label-text badge badge-accent">Groups</span>
                        <input type="radio" ref={radioRef1} name="group" value="1" onClick={handleCheck}  className="radio checked:bg-red-500 mx-2" defaultChecked  />
                    </label>
                    
                
                    <label className="label cursor-pointer">
                        <span className="label-text">Filieres</span>
                        <input type="radio" ref={radioRef2} name="group" value="2"onClick={handleCheck}  className="radio checked:bg-blue-500 mx-2"  />
                    </label>
                </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-2 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TableB;
