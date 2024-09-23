export interface AuthStore {
    user: User | null,
    setUser: (data: User) => void,
    clearUser: () => void
}

export type User = {
    _id: string,
    name: string,
    email: string,
    password: string,
    jwtToken?: string,
    gender?: string,
    phone?: string,
    age?: string,
    bio?: string,
    img?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface EventStore {
    events: Event[],
    setEvents: (data: Event[]) => void,
}

export type Event = {
    _id: string,
    eventType: string,
    name: string,
    raiseDate: string,
    closeDate: string,
    details?: Array<object>,
}

export interface OrdersStore {
    orders: Orders[],
    setOrders: (orders: any) => void
}

export type Orders = {
    _id: string,
    name: string,
    email: string,
    country: string,
    phone: string,
    location: string,
    message: string,
}

export interface UsersStore {
    users: User[],
    setUsers: (data: User[]) => void,
}

export interface UnitsStore {
    units: Units[],
    setUnits: (data: any[]) => void,
}

export type Units = {
    _id: string,
    unitName: string,
    unitStatus: string,
    unitDescription: string,
    additionDate: string,
    unitDetails: Array<object>,
}