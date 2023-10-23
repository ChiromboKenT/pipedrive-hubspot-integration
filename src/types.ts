// types.ts

const TYPES = {
  Logger: Symbol.for("Logger"),
  ExceptionHandler: Symbol.for("ExceptionHandler"),
  HubSpotController: Symbol.for("HubSpotController"),
  PipeDriveController: Symbol.for("PipeDriveController"),
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
export interface HubSpotContact {
  firstName: string;
  lastName: string;
  city?: string;
  createDate: string;
  company: string;
  state: string;
  email: string;
  website?: string;
  jobTitle: string;
  lastUpdated: string;
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

export interface HubSpotDeal {
  id: string;
  dealName: string;
  daysToClose: number;
  ownerId: string;
  dealType: string;
  expectedCloseDate: string;
  dealStage: string;
  createDate: string;
  isClosed: boolean;
  priority: string;
  lastUpdated: string;
}


export default TYPES;
