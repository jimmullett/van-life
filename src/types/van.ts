export type VanType = "simple" | "luxury" | "rugged";

export interface Van {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    type: VanType;
    hostId: string;
}

export interface VanFromAPI extends Omit<Van, 'type'> {
    type: string;
}

export function assertVanType(type: string): asserts type is VanType {
    if (!["simple", "luxury", "rugged"].includes(type)) {
        throw new Error(`Invalid van type: ${type}`);
    }
} 