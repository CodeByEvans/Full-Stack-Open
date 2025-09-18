export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  kind: string;
}

export interface CourseParthWithDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CourseParthWithDescription {
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CourseParthWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

export interface CoursePartSpecial extends CourseParthWithDescription {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
