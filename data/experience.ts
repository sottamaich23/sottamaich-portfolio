export type Experience = {
  role: string;
  company: string;
  period: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: 'Network Security Associate',
    company: 'Fortinet',
    period: 'May 2023 – Jul 2023',
    points: [
      'Hands-on experience with firewalls, IDS/IPS, and VPN configurations.',
      'Implemented encryption and authentication workflows.',
      'Conducted vulnerability assessments and risk analysis.'
    ]
  },
  {
    role: 'Cloud Computing Intern',
    company: 'HDLC Technologies',
    period: 'Jul 2023 – Aug 2023',
    points: [
      'Leveraged AWS and Azure for scalable resource provisioning.',
      'Worked with Docker and Kubernetes orchestration concepts.',
      'Delivered secure and optimized cloud-based solutions.'
    ]
  }
];


