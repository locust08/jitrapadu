type AccessRequest = { req: { user?: { role?: string | null; collection?: string } | null } }

export const authenticated = ({ req }: AccessRequest) => req.user?.collection === 'users'
export const isAdmin = ({ req }: AccessRequest) => authenticated({ req }) && req.user?.role === 'admin'
export const publishedOrAuthenticated = ({ req }: AccessRequest) =>
  authenticated({ req }) || { _status: { equals: 'published' as const } }
export const approvedMediaOrAuthenticated = ({ req }: AccessRequest) =>
  authenticated({ req }) || { reviewStatus: { equals: 'approved' as const } }
