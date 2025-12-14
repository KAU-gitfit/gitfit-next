import type { Repository } from "@/lib/types/repository";

export const mockRepositories: Repository[] = [
  {
    id: "1",
    name: "mock-user/gitfit-frontend",
    language: "TypeScript",
    visibility: "Public",
    lastPush: "2024-12-10",
    isSelected: false,
  },
  {
    id: "2",
    name: "mock-user/gitfit-backend",
    language: "Java",
    visibility: "Private",
    lastPush: "2024-12-08",
    isSelected: false,
  },
  {
    id: "3",
    name: "mock-user/algorithm-study",
    language: "Python",
    visibility: "Public",
    lastPush: "2024-11-25",
    isSelected: false,
  },
  {
    id: "4",
    name: "mock-user/react-component-lib",
    language: "JavaScript",
    visibility: "Public",
    lastPush: "2024-11-15",
    isSelected: false,
  },
  {
    id: "5",
    name: "mock-user/go-microservice",
    language: "Go",
    visibility: "Private",
    lastPush: "2024-10-30",
    isSelected: false,
  },
];
