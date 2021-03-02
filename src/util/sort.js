//@flow
export default (
    first: string,
    second: string,
    ascending: boolean = true
): number => {
    if (ascending) {
        return first.localeCompare(second)
    }
    return second.localeCompare(first)
}
