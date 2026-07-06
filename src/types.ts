export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  timestamp: string;
}

export interface LaunchConfig {
  whatsappLink: string;
  launchDate: string; // ISO string or YYYY-MM-DDTHH:mm
  title: string;
  subtitle: string;
  description: string;
  videoEmbed?: string; // YouTube/Vimeo embed source
  leadCountOffset: number; // Seed number to show as social proof
  emailRequired: boolean;
  phoneRequired: boolean;
  hotmartLink: string; // Added link to Hotmart
}
