import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware"
import { AuthStore, EventStore, OrdersStore, UnitsStore, UsersStore } from '../types/masterStore';

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (data) => set({
                user: { ...data }
            }),
            clearUser: () => set({
                user: null
            })
        }),
        {
            name: 'user',
            storage: createJSONStorage(() => localStorage)
        },
    ),
);


export const useUsersStore = create<UsersStore>()((set) => ({
    users: [],
    setUsers: (data) => set({
        users: data
    }),
}))


export const useEventsStore = create<EventStore>()((set) => ({
    events: [],
    setEvents: (data) => set({
        events: data
    }),
}))

export const useOrdersStore = create<OrdersStore>()((set) => ({
    orders: [],
    setOrders: (data) => set((state) => ({
        orders: data
    })),
}))

export const useUnitsStore = create<UnitsStore>()((set) => ({
    units: [],
    setUnits: (data) => set((state) => ({
        units: data
    })),
}))



