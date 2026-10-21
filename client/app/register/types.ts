export const AGE_GROUPS = ["18–22", "23–29", "30+"] as const;

export type AgeGroup = (typeof AGE_GROUPS)[number];

export interface RegisForm {
  attendee: {
    fullName: string;
    phoneNumber: string;
    email: string;
    fellowshipGroup: string;
    ageGroup: AgeGroup;
  };
  emergency: {
    name: string;
    phone: string;
  };
  requests: {
    dietaryAccessibility: string;
  };
}

export type AttendeeFieldChange = <K extends keyof RegisForm["attendee"]>(
  field: K,
  value: RegisForm["attendee"][K],
) => void;

export type EmergencyFieldChange = <K extends keyof RegisForm["emergency"]>(
  field: K,
  value: RegisForm["emergency"][K],
) => void;
