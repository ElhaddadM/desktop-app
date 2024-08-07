"use client";
import {  Modal, Space } from 'antd';
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { AllDataByGroup, AllDataByFiliere,detailGrp,detailGrpFiliere,exportToExcel ,PrintPdf} from "../app/(pages)/catalyst/Functions";
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
import { DoubleRightOutlined ,FileExcelOutlined,FilePdfOutlined,DashOutlined} from '@ant-design/icons';
import CardA from './CardA';

function TableB() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([]);
  const [TotalActive, setTotalActive] = useState(0);
  const [TotalAll, setTotalAll] = useState(0);
  const [TotalNActive, setTotalNActive] = useState(0);
  const [Organization, setOrganization] = useState("-");
  const [count, setCount] = useState(false);
  const [file,setFile]  = useState('Groups')
  const [details,setDetails]  = useState([])

  const fetchData = async (choix = 1) => {
    const dataa = choix == 1 ?  await AllDataByGroup() : await AllDataByFiliere();
    console.log(" await AllDataByGroup()" ,  await AllDataByGroup() , );
    setOrganization(dataa.env[0]?.Organization)
    setTotalAll(dataa.TotalAll)
    setTotalActive(dataa.TotalActive)
    setTotalNActive(dataa.TotalNActive)
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


  const handleFile = (filea)=>{
    const env =[...data]
        env.push({"Organization": data[0].Organization ,Group :"TOTAL",Active:TotalActive,NotActive :TotalNActive,Total:TotalAll,PourCentageA: ((TotalActive/TotalAll)*100).toFixed(), "PourCentageN":((TotalNActive/TotalAll)*100).toFixed(),date:data[0].date})
    filea =="excel" ? exportToExcel(env,file) : PrintPdf({env},file)
    // console.log("Selected" , env);
  }



  const handleFileDetail = async(filea)=>{
    const detail = (await detailGrp(filea))
    const env =[...detail.env]
    env.push({"Organization": data[0].Organization ,Group :"TOTAL",Active:detail.TotalActive,NotActive :detail.TotalNActive,Total:detail.TotalAll,PourCentageA: ((detail.TotalActive/detail.TotalAll)*100).toFixed(), "PourCentageN":((detail.TotalNActive/detail.TotalAll)*100).toFixed(),date:data[0].date})
    const filez = "Datails_" + filea
    exportToExcel(env,filez) 
    // console.log("Selected" , detail);
  }

  const handleFileFiliere = async (gr) =>{
    const DetailFilier = (await detailGrpFiliere(gr))
    console.log("ICI",DetailFilier);
    const env =[...DetailFilier.env]
    env.push({"Organization": data[0].Organization ,Group :"TOTAL",Active:DetailFilier.TotalActive,NotActive :DetailFilier.TotalNActive,Total:DetailFilier.TotalAll,PourCentageA: ((DetailFilier.TotalActive/DetailFilier.TotalAll)*100).toFixed(), "PourCentageN":((DetailFilier.TotalNActive/DetailFilier.TotalAll)*100).toFixed(),date:data[0].date})

    const name = 'Details_'+gr
    exportToExcel(env,name)  
  }
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

const handleDetailsGroup = async (grp)=>{
  const detail =  (await detailGrp(grp)).env
      setDetails(detail)
      // console.log("Click" , detail);
      // info(detail)
      document.getElementById('my_modal_4').showModal()
}

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
    {
      accessorKey: "  ",
      header: ({ column }) => (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          
          <ArrowUpDown className="ml-2 h-4 w-4 text-blue-500 hidden" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className={`${file == "Groups" ? "dropdown dropdown-hover Groups" : "hidden"}`} >
          <div tabIndex={0} role="button" className="m-1"><DashOutlined /></div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-20 p-2 shadow">
            <li className='cursor-pointer my-4 font-bold text-md w-7' onClick={() => { handleDetailsGroup(row.getValue("Group")) }} title={"Details " + row.getValue("Group")}>Details</li>
            <li className='cursor-pointer font-bold text-xl w-7' onClick={() => { handleFileDetail(row.getValue("Group")) }} title='Export XLSX'><FileExcelOutlined className='text-green-600 cursor-pointer' /></li>
          </ul>
        </div>
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
        setFile("Groups")
        fetchData(1);
        setCount(false)
    } else if (radioRef2.current.checked) {
      setFile("Filiers")
        fetchData(2);
        setCount(false)

    }
  }, []);


  return (
    <div className="w-full">

<dialog id="my_modal_4" className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg text-blue-500">Detail {details[0]?.Group}!</h3>
  
    <div className="overflow-x-auto h-96 overflow-y-scroll font-bold text-xl " >
              <table className="table table-xs w-full">
                <thead>
                  <tr>
                    <td>N°</td>
                    <td>Group</td>
                    <td>Active</td>
                    <td>Not Active</td>
                    <td>Total</td>
                    <td>PourCentageA</td>
                    <td>PourCentageN</td>
                    <td></td>
                    
                  </tr>
                </thead>
                <tbody className=''>
                  {
                    details?.map((e,i)=>{
                      return (
                        <tr key={i}>
                          <th>{i +1} </th>
                          <td>{e.Group}</td>
                          <td>{e.Active}</td>
                          <td>{e.NotActive}</td>
                          <td>{e.Total}</td>
                          <td>{e.PourCentageA}</td>
                          <td>{e.PourCentageN}</td>
                          <td><FileExcelOutlined className='text-green-600 font-bold text-2xl cursor-pointer' onClick={()=>{handleFileFiliere(e.Group)}}/> </td>
                      </tr>
                      )
                    })
                  }
                 
                  </tbody>
                    <tfoot>
                        <tr>
                          <th>N°</th>
                          <th>Group</th>
                          <th>Active</th>
                          <th>Not Active</th>
                          <th>Total</th>
                          <th>PourCentageA</th>
                          <th>PourCentageN</th>
                      </tr>
                    </tfoot>
                  </table>
            </div>
   
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>


        <div className=' flex gap-6 flex-wrap '>
          <div className='flex-grow-1 basis-96'><CardA title={Organization} num={"Organization"} /></div>
          <div className='flex-grow-1 basis-96'> <CardA title={"Active"} num={TotalActive} pourcentage={ ((TotalActive/TotalAll)*100).toFixed()  + "%" } /></div>
          <div className='flex-grow-1 basis-96'><CardA title={"Not Active"} num={TotalNActive} pourcentage={((TotalNActive/TotalAll)*100).toFixed() + "%"} /></div>
          <div className='flex-grow-1 basis-96'><CardA title={"Total"} num={TotalAll} pourcentage={((TotalAll/TotalAll)*100).toFixed() + "%"} /> </div>
          
        </div>

<span  className={`${count ? 'hidden' : " bg-blue-700 w-full h-8 flex justify-center items-center text-gray-900 dark:text-gray-100 dark:bg-gray-950"}`} >
	<div>
		<h1 className="text-ls md:text-lg font-bold flex items-center">L<svg stroke="currentColor" fill="currentColor" strokeWidth="0"
				viewBox="0 0 24 24" className="animate-spin" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
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
        
                <div className="form-controle mx-8 font-bold flex w-40  " >
                    <label className="label cursor-pointer " >
                        <span className="label-text badge badge-primary">Groups</span>
                        <input type="radio" ref={radioRef1} name="group" value="1" onClick={handleCheck}  className="radio checked:bg-red-500 mx-2" defaultChecked  />
                    </label>
                    
                
                    <label className="label cursor-pointer">
                        <span className="label-text badge badge-primary ">Filieres</span>
                        <input type="radio" ref={radioRef2} name="group" value="2"onClick={handleCheck}  className="radio checked:bg-blue-500 mx-2"  />
                    </label>
                </div>
                <div className='ms-32 flex gap-6'>
                 <div className="badge badge-primary badge-outline w-28">Export  <DoubleRightOutlined />  </div>
                 <FileExcelOutlined className='text-green-600 font-bold text-2xl cursor-pointer' onClick={()=>{handleFile("excel")}}/> 
                 <FilePdfOutlined className='text-red-500 font-bold text-2xl cursor-pointer'  onClick={()=>{handleFile("pdf")}} />
              </div>

              <div className='ms-32 flex gap-6'>
                 <div className="badge badge-primary   w-28">Date  <DoubleRightOutlined />  :</div>
                 <div className='badge badge-primary ' > {data[0]?.date} </div>
                 
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
