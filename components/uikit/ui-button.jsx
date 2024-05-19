import clsx from "clsx";

/**
 * @param {{
* children: any,
* className: string,
* size: 'md' | 'lg',
* variant: 'primary' | 'outline'
* }} props
*/

export function UiButton({ className, children, size, variant }) {
    const buttonClassName = clsx(
        "transition-colors", 
        className,
        {
            md: "rounded px-6 py-2 leading-tight text-sm",
            lg: "rounded-lg px-5 py-2 leading-tight text-2xl",
        }[size],
        {
            primary: "bg-teal-600 hover:bg-teal-500 text-white",
            outline: "border border-teal-500 text-teal-500 hover:bg-teal-50",
        }[variant]
    );
    return (
        <button className={buttonClassName}>{children}</button>
    )
};