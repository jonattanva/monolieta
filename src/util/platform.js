//@flow
export const isMac: boolean = (() =>
    navigator.userAgent.toLowerCase().indexOf('mac') !== -1)()
