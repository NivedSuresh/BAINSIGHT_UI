export type Client = {
  ucc: string,
  email: string,
  phoneNumber: string,
  username: string,
  isAuthenticated: boolean
}

export type Clients = {
  clients: Client[],
  error: string
}

