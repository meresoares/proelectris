// src/interfaces/person.interface.ts

export interface Person {
    id_person?: number;
    name: string;
    address: string;
    phone?: string;
    email?: string;
    tax_id: string;
    created_at?: Date;
    updated_at?: Date;
  }
  