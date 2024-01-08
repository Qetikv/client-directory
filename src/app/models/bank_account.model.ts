export interface UserAccount {
    nId: number;
    customerNumber: number;
    accountType: string;
    currency: string;
    accountStatus: string;
}

export interface DropdownOptions {
    accountTypes: string[];
    currencies: string[];
    accountStatusOptions: string[];
}

export const dropdownOptions: DropdownOptions = {
    accountTypes: ['Current', 'Savings', 'Accumulation'],
    currencies: ['GEL', 'USD', 'EURO'],
    accountStatusOptions: ['ACTIVE', 'CLOSED'],
};
