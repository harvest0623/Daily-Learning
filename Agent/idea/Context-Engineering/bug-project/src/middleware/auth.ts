import type { Request, Response, NextFunction } from 'express'
const PROTECTED_PATHS = ['/user', '/admin', '/settings'];

declare module 'express-serve-static-core' {
    interface Request {
        session?: { userId?: string } | undefined
    }
}

export function setReturnTo(req: Request, res: Response, next: NextFunction) {
    const isProtected = PROTECTED_PATHS.some(p => req.path.startsWith(p));
    const isLoggedIn = Boolean(req.session?.userId);

    if (isProtected && !isLoggedIn) {
        res.cookie('returnTo', req.originalUrl, { httpOnly: true, maxAge: 600_000 });
        return res.redirect('/auth/login');
    }
    next();
}
