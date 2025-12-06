export enum Category {
  ALL = '全部',
  JAVA_CORE = 'Java 核心',
  SPRING_ECOSYSTEM = 'Spring 生态',
  DATABASE = '数据库',
  DEVOPS = '运维 & 部署',
  FRONTEND = '前端技术',
  TOOLS = '工具 & 架构'
}

export interface ResourceItem {
  id: string;
  title: string;
  category: Category;
  shortDescription: string;
  tags: string[];
  iconName: string; // Used to map to Lucide icons
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface AIStudyGuide {
  summary: string;
  keyConcepts: string[];
  interviewQuestions: string[];
  learningPath: string[];
}

export interface AIState {
  loading: boolean;
  data: AIStudyGuide | null;
  error: string | null;
}