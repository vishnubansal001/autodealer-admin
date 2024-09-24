import { ReactNode } from "react"

export interface TableType {
    aria: string,
    columns: Array<any>,
    data: Array<any>,
    id: string,
    renderCell: (row: any, column: any) => ReactNode,
}