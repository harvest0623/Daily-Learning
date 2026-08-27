import type { Request } from 'express'

export interface User {
    id: string
    name: string
}

export async function createSession(req: Request, user: User) {
    req.session = req.session ?? {};
    req.session.userId = user.id;
}

export async function destroySession(req: Request) {
    req.session = undefined;
}