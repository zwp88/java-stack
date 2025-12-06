import { Category, ResourceItem } from './types';

export const CATEGORIES = [
  Category.ALL,
  Category.JAVA_CORE,
  Category.SPRING_ECOSYSTEM,
  Category.DATABASE,
  Category.FRONTEND,
  Category.DEVOPS,
  Category.TOOLS,
];

export const RESOURCES: ResourceItem[] = [
  // Java Core
  {
    id: 'jc-1',
    title: 'Java 集合框架 (Collections)',
    category: Category.JAVA_CORE,
    shortDescription: '精通 List, Set, Map 和 Queue 及其底层实现原理。',
    tags: ['ArrayList', 'HashMap', 'ConcurrentHashMap'],
    iconName: 'Box',
    difficulty: 'Intermediate',
  },
  {
    id: 'jc-2',
    title: 'Java 多线程与并发 (Concurrency)',
    category: Category.JAVA_CORE,
    shortDescription: '深入理解线程、Runnable、ExecutorService 以及 Java 内存模型 (JMM)。',
    tags: ['Threads', 'CompletableFuture', '锁机制'],
    iconName: 'Cpu',
    difficulty: 'Advanced',
  },
  {
    id: 'jc-3',
    title: 'Java 8+ 新特性',
    category: Category.JAVA_CORE,
    shortDescription: '掌握 Lambda 表达式、Stream流式 API、Optional 以及新的日期时间 API。',
    tags: ['Stream API', 'Lambda', '函数式接口'],
    iconName: 'Code2',
    difficulty: 'Intermediate',
  },
  
  // Spring Ecosystem
  {
    id: 'sp-1',
    title: 'Spring Boot 基础与实战',
    category: Category.SPRING_ECOSYSTEM,
    shortDescription: '自动配置原理、Starter 机制、Actuator 监控及嵌入式服务器。',
    tags: ['Spring Boot', '依赖注入', 'AOP'],
    iconName: 'Zap',
    difficulty: 'Beginner',
  },
  {
    id: 'sp-2',
    title: 'Spring Security (JWT/OAuth2)',
    category: Category.SPRING_ECOSYSTEM,
    shortDescription: '使用 Spring Security、JWT 令牌和 OAuth2 协议保护应用程序安全。',
    tags: ['安全架构', 'JWT', 'OAuth2'],
    iconName: 'ShieldCheck',
    difficulty: 'Advanced',
  },
  {
    id: 'sp-3',
    title: 'Spring Data JPA & Hibernate',
    category: Category.SPRING_ECOSYSTEM,
    shortDescription: 'ORM 对象关系映射概念、Repository 模式及复杂查询优化。',
    tags: ['JPA', 'Hibernate', 'SQL优化'],
    iconName: 'Database',
    difficulty: 'Intermediate',
  },

  // Database
  {
    id: 'db-1',
    title: 'PostgreSQL 性能优化',
    category: Category.DATABASE,
    shortDescription: '索引策略、查询计划分析以及 JSONB 高级用法。',
    tags: ['SQL', '索引', '性能调优'],
    iconName: 'Server',
    difficulty: 'Advanced',
  },
  {
    id: 'db-2',
    title: 'Redis 缓存策略',
    category: Category.DATABASE,
    shortDescription: '使用 Redis 进行缓存设计、发布/订阅模式及分布式锁实现。',
    tags: ['NoSQL', '缓存', 'Redis'],
    iconName: 'Layers',
    difficulty: 'Intermediate',
  },

  // DevOps
  {
    id: 'do-1',
    title: 'Java 开发者 Docker 指南',
    category: Category.DEVOPS,
    shortDescription: 'Java 应用容器化、多阶段构建 (Multi-stage builds) 及 Docker Compose。',
    tags: ['Docker', '容器化', 'CI/CD'],
    iconName: 'Container',
    difficulty: 'Beginner',
  },
  {
    id: 'do-2',
    title: 'Kubernetes (K8s) 基础',
    category: Category.DEVOPS,
    shortDescription: '将 Spring Boot 应用部署到 K8s，理解 Pods, Services 和 Deployments。',
    tags: ['K8s', '容器编排', '云原生'],
    iconName: 'Cloud',
    difficulty: 'Advanced',
  },

  // Frontend
  {
    id: 'fe-1',
    title: 'React & TypeScript 实战',
    category: Category.FRONTEND,
    shortDescription: '构建类型安全的现代化 UI 并对接 Java REST API。',
    tags: ['React', 'TypeScript', 'Hooks'],
    iconName: 'Layout',
    difficulty: 'Intermediate',
  },

  // Tools
  {
    id: 'tl-1',
    title: '微服务架构设计',
    category: Category.TOOLS,
    shortDescription: '服务发现、API 网关、断路器模式及分布式链路追踪。',
    tags: ['系统设计', '微服务', 'Resilience4j'],
    iconName: 'Network',
    difficulty: 'Advanced',
  },
  {
    id: 'tl-2',
    title: 'Maven & Gradle 构建工具',
    category: Category.TOOLS,
    shortDescription: '依赖管理、构建生命周期、多模块项目及插件配置。',
    tags: ['构建工具', '自动化', 'CI'],
    iconName: 'Wrench',
    difficulty: 'Beginner',
  },
];