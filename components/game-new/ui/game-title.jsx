export function GameTitle({ children = "Крестики нолики" }){
    return (
        <h1 className="text-4xl leading-tight">{children}</h1>
    )
}