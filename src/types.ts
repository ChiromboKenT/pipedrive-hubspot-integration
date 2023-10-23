// types.ts
const TYPES = {
  Logger: Symbol.for("Logger"),
  ExceptionHandler: Symbol.for("ExceptionHandler"),
  SyncController: Symbol.for("SyncController"),
  PipedriveService: Symbol.for("PipedriveService"),
  HubSpotService: Symbol.for("HubSpotService"),
};

export interface PipeDriveContact {
  id: number;
  name: string;
  email: string;
  organisation: string;
  openDeals: number;
  closedDeals: number;
  active: boolean;
  numberOfEmails?: string;
}

export interface PipeDriveDeal {
  id: number;
  title: string;
  value: number;
  currency: string;
  addTime: Date;
  updateTime: Date;
  expectedCloseDate: Date | null;
  status: string;
  stageId: number;
  ownerId: number;
  orgId: number;
  personId: number;
  emailMessagesCount: number;
  notesCount: number;
  activitiesCount: number;
  doneActivitiesCount: number;
  undoneActivitiesCount: number;
  followersCount: number;
  filesCount: number;
  email: string;
}

export default TYPES;
