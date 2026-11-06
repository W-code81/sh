export type RegistrationListItem = {
  id: string;
  passId: string;
  name: string;
  email: string;
  phoneNumber: string;
  source: "website" | "on_arrival";
  registrationStatus: "active" | "cancelled";
  paymentMethod: "card" | "bank_transfer" | "pay_on_arrival" | "onsite" | null;
  paymentStatus: "pending" | "due" | "paid" | "failed" | "refunded";
  createdAt: string | null;
};

export type RegistrationListResponse = {
  registrations: RegistrationListItem[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
};

export type RegistrationDetails = {
  id: string;
  passId: string;
  attendee: {
    fullName: string;
    email: string;
    phoneNumber: string;
    fellowshipGroup: string;
    ageGroup: string;
  };
  emergencyContact: { name: string; phone: string };
  requests: { dietaryAccessibility?: string };
  registrationSource: "website" | "on_arrival";
  registrationStatus: "active" | "cancelled";
  payment: {
    method: RegistrationListItem["paymentMethod"];
    status: RegistrationListItem["paymentStatus"];
    currency: "NGN";
    amountDueKobo: number | null;
    amountPaidKobo: number;
    provider: "opay" | "paystack" | null;
    providerReference: string | null;
    paidAt: string | null;
  };
  createdAt: string | null;
};
