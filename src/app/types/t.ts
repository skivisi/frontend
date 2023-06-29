type DevelopmentExperience = {
  assignedTask: string;
  developmentExperienceId?: number;
  duration: string;
  environments: string[];
  frameworks: string[];
  img: string;
  jobDuties: string;
  programmingLanguages: string[];
  projectName: string;
  specId?: number;
  startDate: string;
  startYear: string;
  teamSize: string;
  tools: string[];
  totalProjectHeadcount: string;
};

type Portfolio = {
  heading: string;
  portfolioId?: number;
  specId?: number;
  url: string;
};

type PreviousWork = {
  previousWorkId?: number;
  specId?: number;
  industry: string;
  occupation: string;
  JobDuties: string;
};

type Qualification = {
  acquisitionDate?: string;
  credential?: string;
  qualificationId?: number;
  specId?: number;
  year?: string
  month?: string
};

type SellingPoint = {
  content: string;
  sellingPointId?: number;
  specId?: number;
  title: string;
};

type Skill = {
  InherentDescription: string;
  InherentName: string;
  skillId: number;
  updatedAt: string;
  userId: number;
};

type SkillPoint = {
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

type SkillSummaries = {
  cloud: string[];
  developmentDomain: string[];
  environment: string[];
  framework: string[];
  library: string[];
  programmingLanguage: string[];
  skillSummaryId: number | null;
  specId: number | null;
  tool: string[];
};

type Spec = {
  createdAt: string;
  github: string;
  offHours: string;
  searchs: boolean;
  specId: number;
  userId: number;
};

type SpecialAbility = {
  skillList: string;
  skillSelection: boolean;
  spaecialAbilityId: number;
  tagColor: number;
  userId: number;
};

type User = {
  affiliation: string;
  businessSituation: string;
  employeeNumber: number;
  userId: number;
  userName: string;
};

type UserObject = {
  developmentExperience: DevelopmentExperience[];
  portfolio: Portfolio[];
  previousWork: PreviousWork[];
  qualification: Qualification[];
  sellingPoint: SellingPoint[];
  skill: Skill;
  skillPoint: SkillPoint;
  skillSummaries: SkillSummaries;
  spec: Spec;
  specialAbility: SpecialAbility[];
  user: User;
  userId: number | null;
};

type DefaultSpec = {
  github: string;
  offHours: string;
};

type DefaultUser = {
  developmentExperiences: DevelopmentExperience[];
  portfolios: Portfolio[];
  previousWorks: PreviousWork[];
  qualifications: Qualification[];
  sellingPoints: SellingPoint[];
  skillSummaries?: SkillSummaries;
  spec: DefaultSpec;
};

type FileDetail = {
  lastModified?: number;
  lastModifiedDate?: Date;
  name?: string;
  size?: number;
  type?: string;
  webkitRelativePath?: string;
};

type InputData = (null | FileDetail)[];

export type { User };
export type { Portfolio };
export type { SellingPoint };
export type { Qualification };
export type { PreviousWork };
export type { DevelopmentExperience };
export type { UserObject };
export type { DefaultUser };
export type { InputData };
