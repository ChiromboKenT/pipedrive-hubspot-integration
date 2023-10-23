import {HubSpotContact, HubSpotDeal} from "../types";

class HubSpotEntity {
  deal: any;
  contact: any;

  constructor(key: "Contact" | "Deal", data: any) {
    if (key === "Contact") {
      this.contact = data;
    } else {
      this.deal = data;
    }
  }

  public getContact(): HubSpotContact {
    const contact = this.contact;
    if (!contact) return null;
    return {
      firstName: contact.firstname?.value,
      lastName: contact.lastname?.value,
      city: contact.city?.value,
      createDate: contact.createdate?.value || `${Date.now()}`,
      company: contact.company?.value,
      state: contact.state?.value,
      email: contact.email?.value,
      website: contact.website?.value || "",
      jobTitle: contact.jobtitle?.value,
      lastUpdated: contact.lastmodifieddate?.value || `${Date.now()}`,
    };
  }
  getDeal(): HubSpotDeal {
    const deal = this.deal;
    if (!deal) return null;
    return {
      id: deal.id?.value,
      dealName: deal.dealname?.value,
      createDate: deal.createdate?.value || `${Date.now()}`,
      isClosed: deal.hs_is_closed?.value,
      daysToClose: deal.days_to_close?.value || 30,
      priority: deal.hs_priority?.value,
      ownerId: deal.hubspot_owner_id?.value,
      expectedCloseDate: deal.closedate?.value,
      dealStage: deal.dealStage?.value,
      dealType: deal.dealtype?.value,
      lastUpdated: deal.hs_lastmodifieddate?.value || `${Date.now()}`,
    };
  }
}
