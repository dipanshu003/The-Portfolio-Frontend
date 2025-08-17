// Certificate Interface
export interface CertificateEntity {
  id: number;
  certificateName: string;
  issuer: string;
  dateIssued: string; // or Date if you parse it
}

// Project Interface
export interface ProjectEntity {
  id: number;
  projectName: string;
  projectDesc: string;
  projectImg: string;
}

// Skill Interface
export interface SkillEntity {
  id: number;
  skill: string;
}

// User/Profile Interface
export interface InfoDataCommand {
  id: number;
  name: string;
  profileSummary: string;
  address: string;
  email: string;
  phoneNumber: string;
  designation: string;
  showNextPreviousButton?: boolean;
  certificates: CertificateEntity[];
  projects: ProjectEntity[];
  skills: SkillEntity[];
}

export interface SaveContactMeDetailsQuery {
  id:string;
  name: string;
  email: string;
  message: string;
}
