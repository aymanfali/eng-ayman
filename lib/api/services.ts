import { api } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export type Project = {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
  url?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type ContactMessageInput = {
  name: string;
  email: string;
  message: string;
};

export type ProjectListParams = {
  page?: number;
  limit?: number;
  tag?: string;
};

export async function getProjects(params: ProjectListParams = {}) {
  return api.get<Project[]>(apiEndpoints.projects.list, {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 20,
      ...(params.tag ? { tag: params.tag } : {}),
    },
  });
}

export async function submitContactMessage(input: ContactMessageInput) {
  return api.post<{ success: boolean; message?: string }>(apiEndpoints.contact.create, input);
}
