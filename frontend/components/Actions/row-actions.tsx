import { cn } from "@/lib/utils"
import { IRowActionProps } from "./row-actions.type"

const RowActions = <T,>({
    row,
    actions,
    className
}: IRowActionProps<T>) => {

    const resolveActions = typeof actions === "function" ? actions(row) : actions

    return (
        <div className={cn("flex items-center gap-3", className)}>
            {resolveActions.filter(
                (action) => !(typeof action.hidden === "function" ? action?.hidden(row) : action.hidden)
            ).map((action) => {

                const disabled = 
                        typeof action.disabled === "function" 
                        ? action.disabled(row)
                        : action.disabled;

                const actionClassName = 
                        typeof action.className === "function" 
                        ? action.className(row)
                        : action.className
                return(
                    <button
                        key={action.key}
                        type="button"
                        disabled={disabled}
                        onClick={() => action.onClick(row)}
                        className={cn(
                            "inline-flex items-center gap-1 text-xs transition-colors disabled:opacity-50 disabled:pointer-events-none",
                            actionClassName
                        )}
                    >
                        {action.icon}
                         {action.label && <span>{action.label}</span>}
                    </button>
                )
            })}
        </div>
    )
} 

export default RowActions