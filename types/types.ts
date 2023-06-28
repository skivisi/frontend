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
  request: Request;
};

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
//skilledit/page.tsxで使用
type Skill = {
  InherentDescription: string;
  InherentName: string;
  skillId: number;
  updatedAt: string;
  userId: number;
};
//skilledit/page.tsxで使用
type SkillPoint = {
  userId: number | null;
  FR: number | null;
  BK: number | null;
  DB: number | null;
  SBR: number | null;
  AR: number | null;
  TS: number | null;
  COM: number | null;
};
//skilledit/page.tsxで使用
type Ability = {
  skillList: string;
  skillSelection: boolean;
  tagColor: number;
};
//skilledit/page.tsxで使用
type SkillsData = {
  skill: Skill;
  skillPoint: SkillPoint;
  abilities: Ability[];
};
//autoComplete.tsxで使用
type autoCalibration = {
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
//autoComplete.tsxで使用
type autoCalibrations = {
  autoCalibration: autoCalibration[];
  os: autoCalibration[];
  lang: autoCalibration[];
  framework: autoCalibration[];
  library: autoCalibration[];
  cloud: autoCalibration[];
  tool: autoCalibration[];
  assignedDevelopment: autoCalibration[];
};
//autoComplete.tsxで使用
type autoCalibrationArray = autoCalibration[];

export type { User };
export type { Admin };
export type { Request };
export type { SkillData };
export type { Skill };
export type { SkillPoint };
export type { Ability };
export type { SkillsData };
export type { autoCalibration };
export type { autoCalibrations };
export type { autoCalibrationArray };
