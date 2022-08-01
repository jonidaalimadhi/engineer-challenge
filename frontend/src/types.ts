export type Status = "ACTIVE" | "PENDING" | "CANCELLED" | "DROPPED_OUT";
export type InsuranceType = "ACTIVE";

export interface BadgeProps {
  text: Status | string;
  randomizeColor?: boolean;
}

export interface BadgeResponse {
  textColor: string;
  backgroundColor: string;
}

export interface Member {
  firstName: string;
  lastName: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface Policy {
  id: string;
  customer: Customer[];
  provider: string;
  insuranceType: InsuranceType;
  status: Status;
  startDate: string;
  endDate?: string;
  members: Member[];
}

export interface GetPoliciesParams {
  search?: string;
}

export interface SearchBarProps {
  value: string;
  setSearchCallback: (arg0: string) => void;
}
