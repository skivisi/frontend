type User = {
  affiliation: string;
  businessSituation: string;
  createdAt: string;
  email: string;
  employeeNumber: number;
  joinDate: string;
  updatedAt: string;
  userId: number;
  userName: string;
};

type Admin = {
    email: string;
    password: string;
    createdAt: string;
    request:Request;
}

type Request = {
  applicationId: number;
  userId: number;
  status: number;
  adminComment: string;
  engineerComment: string;
  adminId: number;
  createdAt: string;
  resultedAt: string;
  user: User;
  request: Request;
};

type SkillData = {
  CL: number;
  FR: number;
  JAVA: number;
  ML: number;
  PHP: number;
  QA: number;
  autoCalibrationId: number;
  category: number;
  skill: string;
};

export type { User };
export type { Admin };
export type { Request };
export type { SkillData };
