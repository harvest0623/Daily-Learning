import type { Response } from 'express'

export function setReturnToCookie(res: Response, url: string) {
    res.cookie('returnTo', url, { httpOnly: true, maxAge: 600_000 })
}

export function clearReturnTo(res: Response) {
    res.clearCookie('returnTo')
}