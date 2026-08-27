import type { Request, Response } from 'express'
import { clearReturnTo } from '../utils/cookies.js'

export function postLoginRedirect(req: Request, res: Response) {
    const returnTo = req.cookies?.returnTo;
    if (typeof returnTo === 'string' && returnTo.startsWith('/')) {
        clearReturnTo(res);
        return res.redirect(returnTo);
    }
    res.redirect('/');
}
