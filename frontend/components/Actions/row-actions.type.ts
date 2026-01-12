import { ReactNode } from "react"

export interface RowAction<T> {
    key: string
    label?: string 
    icon?: ReactNode
    onClick: (row: T) => void | Promise<void>
    className?: string | ((row: T) => string)
    disabled?: boolean | ((row: T) => boolean)
    hidden?: boolean | ((row: T) => boolean);
}

export interface IRowActionProps<T> {
    row: T, 
    actions: RowAction<T>[] | ((row: T) => RowAction<T>[]),
    className?: string
}
