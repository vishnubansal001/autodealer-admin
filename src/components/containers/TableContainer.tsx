import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { TableType } from '../../types/tableType';
const TableContainer = ({ aria, columns, data, id, renderCell }: TableType) => {
  return (
    <Table aria-label={aria}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item[id]}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TableContainer