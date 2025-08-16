// Certificate Interface
export interface CertificateEntity {
  id: number;
  certificateName: string;
  issuer: string;
  dateIssued: string; // could use Date if you parse it
}

// User/Profile Interface
export interface InfoDataCommand {
  id: number;
  name: string;
  profileSummary: string;
  certificates: CertificateEntity[];
}
