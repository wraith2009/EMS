export interface DepartmentFormData {
  name: string;
  departmentCode: string;
  description: string;
  parentId: string;
  instituteId?: string;
}

export interface CreateDepartmentResponse {
  success: boolean;
  message?: string;
  data?: any;
}
