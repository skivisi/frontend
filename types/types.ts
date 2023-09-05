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
//skilledit/page.tsx,mypage/Skillview.tsxで使用
type Skill = {
  InherentDescription: string;
  InherentName: string;
  skillId: number;
  updatedAt: string;
  userId: number | null;
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
//mypage/Skillview.tsxで使用
type DevelopmentExperience = {
  specId: number;
  startYear: string;
  startDate: string;
  duration: string;
  assignedTask: string;
  teamSize: string;
  totalProjectHeadcount: string;
  projectName: string;
  jobDuties: string;
  img: string;
  environments: string[];
  programmingLanguages: string[];
  frameworks: string[];
  tools: string[];
};
//mypage/Skillview.tsxで使用
type Portfolio = {
  portfolioId: number;
  specId: number;
  heading: string;
  url: string;
};
//mypage/Skillview.tsxで使用
type PreviousWork = {
  previousWorkId: number;
  specId: number;
  industry: string;
  occupation: string;
  JobDuties: string;
};
//mypage/Skillview.tsxで使用
type Qualification = {
  qualificationId: number;
  specId: number;
  credential: string;
  acquisitionDate: string;
};
//mypage/Skillview.tsxで使用
type SellingPoint = {
  content: string;
  sellingPointId: number;
  specId: number;
  title: string;
};
//mypage/Skillview.tsxで使用
type SkillPoints = {
  AR: number;
  BK: number;
  COM: number;
  DB: number;
  FR: number;
  SBR: number;
  TS: number;
  skillPointId: number;
  userId: number;
};
//mypage/Skillview.tsxで使用
type SkillSummaries = {
  environment: string[];
  programmingLanguage: string[];
  framework: string[];
  library: string[];
  cloud: string[];
  tool: string[];
  developmentDomain: string[];
  skillSummaryId: number;
  specId: number;
};
//mypage/Skillview.tsxで使用
type Spec = {
  createdAt: string;
  github: string;
  offHours: string;
  searchs: boolean;
  specId: number;
  userId: number;
};
//mypage/Skillview.tsxで使用
type SpecialAbility = {
  spaecialAbilityId: number;
  userId: number;
  skillList: string;
  skillSelection: boolean;
  tagColor: number;
};
//mypage/Skillview.tsxで使用
type otherUser = {
  userId: number;
  affiliation: string;
  businessSituation: string;
  userName: string;
  employeeNumber: number;
};
//mypage/Skillview.tsxで使用
type UserData = {
  developmentExperience: DevelopmentExperience[];
  portfolio: Portfolio[];
  previousWork: PreviousWork[];
  qualification: Qualification[];
  sellingPoint: SellingPoint[];
  skill: Skill;
  skillPoint: SkillPoints;
  skillSummaries: SkillSummaries;
  spec: Spec;
  specId: number;
  specialAbility: SpecialAbility[];
  user: otherUser;
  userId: number;
};

type transformedObject = {
  コミュ力?: string;
  サーバーレス?: string;
  テスト?: string;
  データベース?: string;
  バック?: string;
  フロントエンド?: string;
  設計?: string;
};

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
export type { UserData };
export type { Portfolio };
export type { SkillSummaries };
export type { SellingPoint };
export type { Qualification };
export type { PreviousWork };
export type { DevelopmentExperience };
export type { transformedObject };
export type { SkillPoints };
export type { Spec };
