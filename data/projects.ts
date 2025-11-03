export type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: 'Driver Drowsiness Elimination System',
    description: 'Detects driver fatigue using CNNs and real-time video feed with OpenCV + Dlib.',
    image: '/assets/projects/ChatGPT Image Nov 3, 2025, 11_58_49 PM.png',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'Dlib', 'SVM'],
    github: '#',
    demo: '#'
  },
  {
    title: 'PPE Kit Detection using Image Classification',
    description: 'Detects PPE compliance using TensorFlow-Keras CNN models.',
    image: '/assets/projects/ChatGPT Image Nov 4, 2025, 12_00_47 AM.png',
    tech: ['Python', 'TensorFlow', 'Keras', 'CNN'],
    github: '#',
    demo: '#'
  }
];


