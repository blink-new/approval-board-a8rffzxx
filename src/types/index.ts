export type BoardStage = 'new-lead' | 'needs-docs' | 'credit-reviewed' | 'submitted' | 'delivered' | 'follow-up';

export type ClientStatus = 'ready' | 'needs-attention' | 'stalled';

export type DocumentType = 'license' | 'paystub' | 'address' | 'void-check';

export interface Document {
  type: DocumentType;
  completed: boolean;
  receivedDate?: Date;
}

export interface Communication {
  id: string;
  type: 'sms' | 'email' | 'call';
  message: string;
  timestamp: Date;
  direction: 'inbound' | 'outbound';
}

export interface Client {
  id: string;
  name: string;
  creditScore: number;
  stage: BoardStage;
  status: ClientStatus;
  issues: string[];
  income: string;
  vehicleRequest: string;
  approvalOdds: number;
  documents: Document[];
  communications: Communication[];
  lastContact: Date;
  urgentTask?: string;
}

export interface BoardColumn {
  id: BoardStage;
  title: string;
  clients: Client[];
}

export const BOARD_STAGES: { id: BoardStage; title: string }[] = [
  { id: 'new-lead', title: 'New Lead' },
  { id: 'needs-docs', title: 'Needs Docs' },
  { id: 'credit-reviewed', title: 'Credit Reviewed' },
  { id: 'submitted', title: 'Submitted / Pending' },
  { id: 'delivered', title: 'Delivered' },
  { id: 'follow-up', title: 'Follow-Up' },
];

export const SMS_TEMPLATES = [
  "Hey [Name], just checking in — still waiting on your pay stub 📎",
  "All good — we'll revisit your file in a few months 👍 I'll check in!",
  "I might have a creative solution that wasn't an option before 👀 Want me to take another look?",
];

export const NAZ_QUOTES = [
  "If they're not replying, they're not ready. Next!",
  "You're not a magician. You're a finance manager with solutions.",
  "Every 'no' gets you closer to a 'yes'.",
  "Credit is a number, but opportunity is everything.",
];