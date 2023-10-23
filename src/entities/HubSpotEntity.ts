import {injectable} from "inversify";

@injectable()
export class HubSpotContact {
  vid: number;
  createdate: string;
  state: string;
  city: string;
  lastname: string;
  firstname: string;
  email: string;
  company: string;
  website: string;
  jobtitle: string;
  twitterhandle: string;

  constructor(data: any) {
    this.vid = data.vid;
    this.createdate = data.properties.createdate.value;
    this.state = data.properties.state.value;
    this.city = data.properties.city.value;
    this.lastname = data.properties.lastname.value;
    this.firstname = data.properties.firstname.value;
    this.email = data.properties.email.value;
    this.company = data.properties.company.value;
    this.website = data.properties.website.value;
    this.jobtitle = data.properties.jobtitle.value;
    this.twitterhandle = data.properties.twitterhandle.value;
  }

  getFullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  getContactInfo(): string {
    return `Email: ${this.email}`;
  }

  getLocation(): string {
    return `${this.city}, ${this.state}`;
  }
}
