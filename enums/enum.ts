export enum UserStatus {
  Banned = -1,
  Active = 1,
}

export enum RequestStatus {
  Cancel = -2,
  Timeout = -1,
  Created = 0,
  Success = 1,
}

export enum PartnerOrderStatus {
  Cancel = -2,
  Timeout = -1,
  Created = 0,
  Success = 1,
  Pending = 2,
}

export enum TransactionStatus {
  Timeout = -2,
  Cancel = -1,
  Created = 0,
  Success = 1,
}

export enum EmailType {
  Gmail = 1,
  Hotmail = 2,
}
export enum TransactionType {
  Credit = 1,
  Debit = 2,
}
