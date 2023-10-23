import {PipeDriveContact, PipeDriveDeal} from "../types";

class PipedriveEntity {
  contact: any;
  deal: any;

  constructor(key: "Contact" | "Deal", data: any) {
    if (key === "Contact") {
      this.contact = data;
    } else {
      this.deal = data;
    }
  }

  public getDeal(): PipeDriveDeal {
    if (!this.deal) return null;
    return {
      id: this.deal.id,
      title: this.deal.title,
      value: this.deal.value,
      currency: this.deal.currency,
      addTime: new Date(this.deal.add_time),
      updateTime: new Date(this.deal.update_time),
      expectedCloseDate: this.deal.expeccted_close_date
        ? new Date(this.deal.expeccted_close_date)
        : null,
      status: this.deal.status,
      stageId: this.deal.stage_id,
      ownerId: this.deal.user_id,
      orgId: this.deal.org_id,
      personId: this.deal.person_id,
      emailMessagesCount: this.deal.email_messages_count,
      notesCount: this.deal.notes_count,
      activitiesCount: this.deal.activities_count,
      doneActivitiesCount: this.deal.done_activities_count,
      undoneActivitiesCount: this.deal.undone_activities_count,
      followersCount: this.deal.followers_count,
      filesCount: this.deal.files_count,
      email: this.deal.cc_email,
    };
  }

  public getContact(): PipeDriveContact {
    if (!this.contact) return null;
    return {
      id: this.contact?.owner_id,
      name: this.contact?.first_name,
      email: this.contact?.cc_email,
      organisation: this.contact?.org_name,
      openDeals: this.contact?.open_deals_count,
      active: this.contact?.active,
      closedDeals: this.contact?.closedDeals,
    };
  }
}
